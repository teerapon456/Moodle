// Custom Database Connection for Custom Tables
import mysql from 'mysql2/promise';
import type {
  Employee,
  Position,
  Level,
  Department,
  Division,
  Company,
  CourseMetadata,
  CourseType,
  LearningMethod,
} from '../../types';

class CustomDatabase {
  private pool: mysql.Pool;

  constructor() {
    this.pool = mysql.createPool({
      host: process.env.MYSQL_HOST || 'mysql',
      port: parseInt(process.env.MYSQL_PORT || '3306'),
      database: process.env.MYSQL_DATABASE || 'moodle',
      user: process.env.MYSQL_USER || 'moodleuser',
      password: process.env.MYSQL_PASSWORD || 'moodlepass',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  async query<T = any>(sql: string, params?: any[]): Promise<T[]> {
    const [rows] = await this.pool.execute(sql, params);
    return rows as T[];
  }

  async queryOne<T = any>(sql: string, params?: any[]): Promise<T | null> {
    const rows = await this.query<T>(sql, params);
    return rows[0] || null;
  }

  // Employee Queries
  async getEmployeeById(id: number): Promise<Employee | null> {
    const sql = `
      SELECT e.*, p.name as position_name, p.code as position_code,
             l.level_code, l.level_name, l.level_order,
             d.name as department_name, d.code as department_code,
             div.name as division_name, div.code as division_code,
             c.name as company_name, c.code as company_code
      FROM employees e
      LEFT JOIN positions p ON e.position_id = p.id
      LEFT JOIN levels l ON e.level_id = l.id
      LEFT JOIN departments d ON e.department_id = d.id
      LEFT JOIN divisions div ON e.division_id = div.id
      LEFT JOIN companies c ON e.company_id = c.id
      WHERE e.id = ?
    `;
    return this.queryOne<Employee>(sql, [id]);
  }

  async getEmployeeByMoodleUserId(moodleUserId: number): Promise<Employee | null> {
    const sql = `SELECT * FROM employees WHERE moodle_user_id = ?`;
    return this.queryOne<Employee>(sql, [moodleUserId]);
  }

  async getEmployees(filters?: {
    positionId?: number;
    levelId?: number;
    departmentId?: number;
    divisionId?: number;
    companyId?: number;
  }): Promise<Employee[]> {
    let sql = 'SELECT * FROM employees WHERE 1=1';
    const params: any[] = [];

    if (filters?.positionId) {
      sql += ' AND position_id = ?';
      params.push(filters.positionId);
    }
    if (filters?.levelId) {
      sql += ' AND level_id = ?';
      params.push(filters.levelId);
    }
    if (filters?.departmentId) {
      sql += ' AND department_id = ?';
      params.push(filters.departmentId);
    }
    if (filters?.divisionId) {
      sql += ' AND division_id = ?';
      params.push(filters.divisionId);
    }
    if (filters?.companyId) {
      sql += ' AND company_id = ?';
      params.push(filters.companyId);
    }

    return this.query<Employee>(sql, params);
  }

  async createEmployee(employee: {
    moodleUserId?: number;
    employeeId: string;
    positionId?: number | null;
    levelId?: number | null;
    departmentId?: number | null;
    divisionId?: number | null;
    companyId?: number | null;
  }): Promise<number> {
    const sql = `
      INSERT INTO employees (moodle_user_id, employee_id, position_id, level_id, department_id, division_id, company_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await this.pool.execute(sql, [
      employee.moodleUserId || null,
      employee.employeeId,
      employee.positionId || null,
      employee.levelId || null,
      employee.departmentId || null,
      employee.divisionId || null,
      employee.companyId || null,
    ]);
    return (result as any).insertId;
  }

  async updateEmployee(id: number, employee: Partial<{
    moodleUserId: number;
    employeeId: string;
    positionId: number | null;
    levelId: number | null;
    departmentId: number | null;
    divisionId: number | null;
    companyId: number | null;
  }>): Promise<void> {
    const fields: string[] = [];
    const values: any[] = [];

    Object.entries(employee).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    });

    if (fields.length === 0) return;

    values.push(id);
    const sql = `UPDATE employees SET ${fields.join(', ')} WHERE id = ?`;
    await this.pool.execute(sql, values);
  }

  // Position Queries
  async getPositions(): Promise<Position[]> {
    return this.query<Position>('SELECT * FROM positions ORDER BY name');
  }

  async getPositionById(id: number): Promise<Position | null> {
    return this.queryOne<Position>('SELECT * FROM positions WHERE id = ?', [id]);
  }

  // Level Queries
  async getLevels(): Promise<Level[]> {
    return this.query<Level>('SELECT * FROM levels ORDER BY level_order');
  }

  async getLevelById(id: number): Promise<Level | null> {
    return this.queryOne<Level>('SELECT * FROM levels WHERE id = ?', [id]);
  }

  async getLevelByCode(code: string): Promise<Level | null> {
    return this.queryOne<Level>('SELECT * FROM levels WHERE level_code = ?', [code]);
  }

  // Department Queries
  async getDepartments(divisionId?: number): Promise<Department[]> {
    if (divisionId) {
      return this.query<Department>('SELECT * FROM departments WHERE division_id = ? ORDER BY name', [divisionId]);
    }
    return this.query<Department>('SELECT * FROM departments ORDER BY name');
  }

  async getDepartmentById(id: number): Promise<Department | null> {
    return this.queryOne<Department>('SELECT * FROM departments WHERE id = ?', [id]);
  }

  // Division Queries
  async getDivisions(companyId?: number): Promise<Division[]> {
    if (companyId) {
      return this.query<Division>('SELECT * FROM divisions WHERE company_id = ? ORDER BY name', [companyId]);
    }
    return this.query<Division>('SELECT * FROM divisions ORDER BY name');
  }

  async getDivisionById(id: number): Promise<Division | null> {
    return this.queryOne<Division>('SELECT * FROM divisions WHERE id = ?', [id]);
  }

  // Company Queries
  async getCompanies(): Promise<Company[]> {
    return this.query<Company>('SELECT * FROM companies ORDER BY name');
  }

  async getCompanyById(id: number): Promise<Company | null> {
    return this.queryOne<Company>('SELECT * FROM companies WHERE id = ?', [id]);
  }

  // Course Metadata Queries
  async getCourseMetadata(moodleCourseId: number): Promise<CourseMetadata | null> {
    const sql = `
      SELECT cm.*, ct.type_code, ct.type_name, lm.method_code, lm.method_name
      FROM course_metadata cm
      LEFT JOIN course_types ct ON cm.course_type_id = ct.id
      LEFT JOIN learning_methods lm ON cm.learning_method_id = lm.id
      WHERE cm.moodle_course_id = ?
    `;
    return this.queryOne<CourseMetadata>(sql, [moodleCourseId]);
  }

  async createCourseMetadata(metadata: {
    moodleCourseId: number;
    courseTypeId?: number | null;
    learningMethodId?: number | null;
  }): Promise<number> {
    const sql = `
      INSERT INTO course_metadata (moodle_course_id, course_type_id, learning_method_id)
      VALUES (?, ?, ?)
    `;
    const [result] = await this.pool.execute(sql, [
      metadata.moodleCourseId,
      metadata.courseTypeId || null,
      metadata.learningMethodId || null,
    ]);
    return (result as any).insertId;
  }

  async updateCourseMetadata(moodleCourseId: number, metadata: Partial<{
    courseTypeId: number | null;
    learningMethodId: number | null;
  }>): Promise<void> {
    const fields: string[] = [];
    const values: any[] = [];

    Object.entries(metadata).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    });

    if (fields.length === 0) return;

    values.push(moodleCourseId);
    const sql = `UPDATE course_metadata SET ${fields.join(', ')} WHERE moodle_course_id = ?`;
    await this.pool.execute(sql, values);
  }

  // Course Type Queries
  async getCourseTypes(): Promise<CourseType[]> {
    return this.query<CourseType>('SELECT * FROM course_types ORDER BY type_code');
  }

  async getCourseTypeById(id: number): Promise<CourseType | null> {
    return this.queryOne<CourseType>('SELECT * FROM course_types WHERE id = ?', [id]);
  }

  // Learning Method Queries
  async getLearningMethods(): Promise<LearningMethod[]> {
    return this.query<LearningMethod>('SELECT * FROM learning_methods ORDER BY method_code');
  }

  async getLearningMethodById(id: number): Promise<LearningMethod | null> {
    return this.queryOne<LearningMethod>('SELECT * FROM learning_methods WHERE id = ?', [id]);
  }

  // Service Account Queries
  async getServiceAccountById(id: number): Promise<any | null> {
    const sql = 'SELECT * FROM service_accounts WHERE id = ?';
    return this.queryOne(sql, [id]);
  }

  async getServiceAccountByApiKey(apiKey: string): Promise<any | null> {
    const sql = 'SELECT * FROM service_accounts WHERE api_key = ? AND is_active = TRUE';
    return this.queryOne(sql, [apiKey]);
  }

  // Close connection pool
  async close(): Promise<void> {
    await this.pool.end();
  }
}

// Export singleton instance
export const dbCustom = new CustomDatabase();
export default dbCustom;
