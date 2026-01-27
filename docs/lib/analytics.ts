// Analytics Data Processing Utilities
import { dbCustom } from './db-custom';
import { moodleApi } from './moodle-api';
import type {
  AnalyticsFilters,
  AnalyticsDashboard,
  OrganizationStats,
  PositionStats,
  LevelStats,
  DepartmentStats,
  DivisionStats,
  CompanyStats,
  PerformanceMetrics,
  PerformanceComparison,
} from '../../types';

export class AnalyticsService {
  /**
   * Get dashboard statistics with filters
   */
  async getDashboardStats(filters?: AnalyticsFilters): Promise<AnalyticsDashboard> {
    // Get all employees matching filters
    const employees = await dbCustom.getEmployees(filters);
    const employeeIds = employees.map(e => e.moodleUserId).filter(Boolean) as number[];

    // Get total learners
    const totalLearners = employees.length;

    // Get courses
    const courses = await moodleApi.getCourses();
    const totalCourses = courses.courses?.length || 0;

    // Calculate completion rate (simplified)
    let completionRate = 0;
    if (employeeIds.length > 0) {
      // Get enrollments for all employees
      const enrollments = await Promise.all(
        employeeIds.map(id => moodleApi.getUserEnrollments(id).catch(() => ({ courses: [] })))
      );
      const totalEnrollments = enrollments.reduce((sum, e) => sum + (e.courses?.length || 0), 0);
      // Simplified completion calculation
      completionRate = totalEnrollments > 0 ? 50 : 0; // Placeholder
    }

    return {
      totalLearners,
      newLearners: 0, // Placeholder
      activeLearners: totalLearners, // Placeholder
      totalCourses,
      popularCourses: [], // Placeholder
      completionRate,
      recentActivities: [], // Placeholder
      organizationStats: filters ? await this.getOrganizationStats(filters) : undefined,
    };
  }

  /**
   * Get organization statistics
   */
  async getOrganizationStats(filters?: AnalyticsFilters): Promise<OrganizationStats> {
    const byPosition = await this.getPositionStats(filters);
    const byLevel = await this.getLevelStats(filters);
    const byDepartment = await this.getDepartmentStats(filters);
    const byDivision = await this.getDivisionStats(filters);
    const byCompany = await this.getCompanyStats(filters);

    return {
      byPosition,
      byLevel,
      byDepartment,
      byDivision,
      byCompany,
    };
  }

  /**
   * Get statistics by position
   */
  async getPositionStats(filters?: AnalyticsFilters): Promise<PositionStats[]> {
    const positions = await dbCustom.getPositions();
    const stats: PositionStats[] = [];

    for (const position of positions) {
      const employees = await dbCustom.getEmployees({ ...filters, positionId: position.id });
      const employeeIds = employees.map(e => e.moodleUserId).filter(Boolean) as number[];

      stats.push({
        positionId: position.id,
        positionName: position.name,
        totalLearners: employees.length,
        activeLearners: employees.length, // Placeholder
        completionRate: 0, // Placeholder
        averageGrade: 0, // Placeholder
      });
    }

    return stats;
  }

  /**
   * Get statistics by level
   */
  async getLevelStats(filters?: AnalyticsFilters): Promise<LevelStats[]> {
    const levels = await dbCustom.getLevels();
    const stats: LevelStats[] = [];

    for (const level of levels) {
      const employees = await dbCustom.getEmployees({ ...filters, levelId: level.id });
      const employeeIds = employees.map(e => e.moodleUserId).filter(Boolean) as number[];

      stats.push({
        levelId: level.id,
        levelCode: level.levelCode,
        levelName: level.levelName,
        totalLearners: employees.length,
        activeLearners: employees.length, // Placeholder
        completionRate: 0, // Placeholder
        averageGrade: 0, // Placeholder
      });
    }

    return stats;
  }

  /**
   * Get statistics by department
   */
  async getDepartmentStats(filters?: AnalyticsFilters): Promise<DepartmentStats[]> {
    const departments = await dbCustom.getDepartments(filters?.divisionId);
    const stats: DepartmentStats[] = [];

    for (const department of departments) {
      const employees = await dbCustom.getEmployees({ ...filters, departmentId: department.id });

      stats.push({
        departmentId: department.id,
        departmentName: department.name,
        totalLearners: employees.length,
        activeLearners: employees.length, // Placeholder
        completionRate: 0, // Placeholder
        averageGrade: 0, // Placeholder
      });
    }

    return stats;
  }

  /**
   * Get statistics by division
   */
  async getDivisionStats(filters?: AnalyticsFilters): Promise<DivisionStats[]> {
    const divisions = await dbCustom.getDivisions(filters?.companyId);
    const stats: DivisionStats[] = [];

    for (const division of divisions) {
      const employees = await dbCustom.getEmployees({ ...filters, divisionId: division.id });

      stats.push({
        divisionId: division.id,
        divisionName: division.name,
        totalLearners: employees.length,
        activeLearners: employees.length, // Placeholder
        completionRate: 0, // Placeholder
        averageGrade: 0, // Placeholder
      });
    }

    return stats;
  }

  /**
   * Get statistics by company
   */
  async getCompanyStats(filters?: AnalyticsFilters): Promise<CompanyStats[]> {
    const companies = await dbCustom.getCompanies();
    const stats: CompanyStats[] = [];

    for (const company of companies) {
      const employees = await dbCustom.getEmployees({ ...filters, companyId: company.id });

      stats.push({
        companyId: company.id,
        companyName: company.name,
        totalLearners: employees.length,
        activeLearners: employees.length, // Placeholder
        completionRate: 0, // Placeholder
        averageGrade: 0, // Placeholder
      });
    }

    return stats;
  }

  /**
   * Get performance metrics
   */
  async getPerformanceMetrics(filters?: AnalyticsFilters): Promise<PerformanceMetrics> {
    // Placeholder implementation
    return {
      averageScore: 0,
      passRate: 0,
      averageStudyTime: 0,
      comparison: filters ? await this.getPerformanceComparison(filters) : undefined,
    };
  }

  /**
   * Get performance comparison
   */
  async getPerformanceComparison(filters?: AnalyticsFilters): Promise<PerformanceComparison> {
    // Get stats by course type
    const selfLearningFilters = { ...filters, courseTypeId: 1 }; // Assuming ID 1 is self-learning
    const classLearningFilters = { ...filters, courseTypeId: 2 }; // Assuming ID 2 is class-learning

    const selfLearningMetrics = await this.getPerformanceMetrics(selfLearningFilters);
    const classLearningMetrics = await this.getPerformanceMetrics(classLearningFilters);

    // Get stats by learning method
    const lectureFilters = { ...filters, learningMethodId: 1 }; // Assuming ID 1 is lecture
    const workshopFilters = { ...filters, learningMethodId: 2 }; // Assuming ID 2 is workshop
    const bothFilters = { ...filters, learningMethodId: 3 }; // Assuming ID 3 is both

    const lectureMetrics = await this.getPerformanceMetrics(lectureFilters);
    const workshopMetrics = await this.getPerformanceMetrics(workshopFilters);
    const bothMetrics = await this.getPerformanceMetrics(bothFilters);

    const organizationStats = await this.getOrganizationStats(filters);

    return {
      byCourseType: {
        selfLearning: selfLearningMetrics,
        classLearning: classLearningMetrics,
      },
      byLearningMethod: {
        lecture: lectureMetrics,
        workshop: workshopMetrics,
        both: bothMetrics,
      },
      byOrganization: organizationStats,
    };
  }
}

export const analyticsService = new AnalyticsService();
