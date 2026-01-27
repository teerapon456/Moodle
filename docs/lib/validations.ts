// Validation Schemas using Zod
import { z } from 'zod';

// User Validation
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstname: z.string().min(1, 'First name is required'),
  lastname: z.string().min(1, 'Last name is required'),
});

// Employee Validation
export const employeeSchema = z.object({
  employeeId: z.string().min(1, 'Employee ID is required'),
  moodleUserId: z.number().optional(),
  positionId: z.number().optional().nullable(),
  levelId: z.number().optional().nullable(),
  departmentId: z.number().optional().nullable(),
  divisionId: z.number().optional().nullable(),
  companyId: z.number().optional().nullable(),
});

export const positionSchema = z.object({
  name: z.string().min(1, 'Position name is required'),
  code: z.string().min(1, 'Position code is required'),
  description: z.string().optional(),
});

export const levelSchema = z.object({
  levelCode: z.string().regex(/^L\d+$/, 'Level code must be in format L0-L13'),
  levelName: z.string().min(1, 'Level name is required'),
  levelOrder: z.number().min(0).max(13),
  description: z.string().optional(),
});

export const departmentSchema = z.object({
  name: z.string().min(1, 'Department name is required'),
  code: z.string().min(1, 'Department code is required'),
  divisionId: z.number().min(1, 'Division ID is required'),
  description: z.string().optional(),
});

export const divisionSchema = z.object({
  name: z.string().min(1, 'Division name is required'),
  code: z.string().min(1, 'Division code is required'),
  companyId: z.number().min(1, 'Company ID is required'),
  description: z.string().optional(),
});

export const companySchema = z.object({
  name: z.string().min(1, 'Company name is required'),
  code: z.string().min(1, 'Company code is required'),
  description: z.string().optional(),
});

// Course Metadata Validation
export const courseMetadataSchema = z.object({
  moodleCourseId: z.number().min(1, 'Moodle course ID is required'),
  courseTypeId: z.number().optional().nullable(),
  learningMethodId: z.number().optional().nullable(),
});

export const courseTypeSchema = z.object({
  typeCode: z.enum(['self-learning', 'class-learning']),
  typeName: z.string().min(1, 'Type name is required'),
  description: z.string().optional(),
});

export const learningMethodSchema = z.object({
  methodCode: z.enum(['lecture', 'workshop', 'both']),
  methodName: z.string().min(1, 'Method name is required'),
  description: z.string().optional(),
});

// Course Validation
export const courseSchema = z.object({
  fullname: z.string().min(1, 'Course full name is required'),
  shortname: z.string().min(1, 'Course short name is required'),
  categoryid: z.number().min(1, 'Category ID is required'),
  summary: z.string().optional(),
  visible: z.number().min(0).max(1).default(1),
});

// Analytics Filter Validation
export const analyticsFiltersSchema = z.object({
  positionId: z.number().optional(),
  levelId: z.number().optional(),
  departmentId: z.number().optional(),
  divisionId: z.number().optional(),
  companyId: z.number().optional(),
  courseTypeId: z.number().optional(),
  learningMethodId: z.number().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
});

// Export Report Validation
export const exportReportSchema = z.object({
  reportName: z.string().min(1, 'Report name is required'),
  reportType: z.enum(['dashboard', 'progress', 'performance', 'engagement']),
  filters: analyticsFiltersSchema.optional(),
  format: z.enum(['excel', 'pdf']),
});
