-- =========================================================
-- 97_test_data.sql
-- Enterprise LMS - Test Data for QA and Development
-- Purpose: Comprehensive test data for system testing without using Moodle GUI
-- Usage: Run this AFTER installing all custom tables (00_install_all.sql) AND sample data (98_sample_data.sql)
-- =========================================================
--
-- DEPENDENCIES:
-- This script REQUIRES 98_sample_data.sql to be run first, which creates:
-- - Organization structure (divisions, departments, positions)
-- - Learning programs (program IDs 1-3)
-- - Department mappings (DEPT001-DEPT012)
--
-- This script will:
-- - Create test users and link them to existing org structure
-- - Create cohorts and update department mappings
-- - Create courses and link them to existing learning programs
-- - Create enrollments, completions, certificates, and compliance records
--
-- =========================================================
--
-- This file creates:
-- - 30+ test users (admin, manager, teacher, student roles)
-- - 10+ cohorts (one per department)
-- - 10+ courses (various types: short, program, compliance)
-- - Enrollments (users enrolled in courses)
-- - User employment records (linking users to org structure)
-- - Course extensions
-- - Course completions (partial)
-- - Certificates
-- - Compliance tracking
-- - Learning program assignments
--
-- IMPORTANT NOTES:
-- - Password for all test users: Pass@123
-- - All timestamps use UNIX_TIMESTAMP() - adjust as needed
-- - User IDs start from 100 to avoid conflicts with existing users
-- - Course IDs start from 100 to avoid conflicts
-- - Context IDs are placeholders - may need adjustment based on actual Moodle installation
-- 
-- AUTOMATIC CLEANUP:
-- - This script automatically deletes existing test data (IDs 100+) before inserting new data
-- - You can run this script multiple times without manual cleanup
-- - Moodle core data (IDs < 100) will NOT be affected
--
-- =========================================================

SET NAMES utf8mb4;
SET foreign_key_checks = 0;

-- =========================================================
-- CLEANUP: Delete existing test data (IDs 100+)
-- =========================================================
-- IMPORTANT: This section deletes test data created by this script
-- It will NOT affect existing Moodle core data or data with IDs < 100
-- 
-- This cleanup is ESSENTIAL to prevent duplicate key errors when running
-- this script multiple times. The script will automatically clean up before
-- inserting new test data.
-- =========================================================
SELECT '>>> CLEANUP: Deleting existing test data...' as '';
SELECT 'This will delete test data with IDs 100+ only' as '';
SELECT 'Moodle core data (IDs < 100) will NOT be affected' as '';
SELECT '' as '';

-- Delete in reverse order of dependencies (child tables first)
-- This ensures foreign key constraints are respected

-- 1. User profile data (custom fields)
DELETE FROM mdl_user_info_data 
WHERE userid >= 100 AND userid <= 130 
AND fieldid IN (SELECT id FROM mdl_user_info_field WHERE shortname IN ('employeeid', 'jobrole', 'department', 'positionlevel'));

-- 2. Compliance tracking
DELETE FROM mdl_compliance_tracking WHERE userid >= 100 AND userid <= 130;

-- 3. Certificates
DELETE FROM mdl_certificate_expiry WHERE userid >= 100 AND userid <= 130;

-- 4. Course completions
DELETE FROM mdl_course_completions WHERE userid >= 100 AND userid <= 130;

-- 5. User enrollments
DELETE FROM mdl_user_enrolments WHERE userid >= 100 AND userid <= 130;

-- 6. Cohort members
DELETE FROM mdl_cohort_members WHERE (userid >= 100 AND userid <= 130) OR (cohortid >= 100 AND cohortid <= 111);

-- 7. Learning program courses (test courses only)
DELETE FROM mdl_learning_program_courses WHERE courseid >= 100 AND courseid <= 121;

-- 8. Job role courses (test courses only)
DELETE FROM mdl_job_role_courses WHERE courseid >= 100 AND courseid <= 121;

-- 9. Auto enrollment rules (test courses only)
DELETE FROM mdl_auto_enrollment_rules WHERE courseid >= 100 AND courseid <= 121;

-- 10. Module contexts (contextlevel 70, instanceid = course module IDs 2000-2621)
-- Note: Context IDs are 3000-3907, but we delete by instanceid (course module ID) which is the unique key
DELETE FROM mdl_context WHERE contextlevel = 70 AND instanceid >= 2000 AND instanceid <= 2621;

-- 11. Course modules
DELETE FROM mdl_course_modules WHERE id >= 2000 AND id <= 2621;

-- 12. Activities (Quiz, Assignment, Page, URL, H5P)
DELETE FROM mdl_quiz WHERE id >= 2000 AND id <= 2021;
DELETE FROM mdl_assign WHERE id >= 2100 AND id <= 2121;
DELETE FROM mdl_page WHERE id >= 2300 AND id <= 2321;
DELETE FROM mdl_url WHERE id >= 2400 AND id <= 2421;
DELETE FROM mdl_h5pactivity WHERE id >= 2500 AND id <= 2521;

-- 13. Course sections
DELETE FROM mdl_course_sections WHERE id >= 1000 AND id <= 1213;

-- 14. Course contexts (contextlevel 50, instanceid = course IDs 100-121)
DELETE FROM mdl_context WHERE contextlevel = 50 AND instanceid >= 100 AND instanceid <= 121;

-- 15. Course extensions
DELETE FROM mdl_course_extended WHERE courseid >= 100 AND courseid <= 121;

-- 16. Courses
DELETE FROM mdl_course WHERE id >= 100 AND id <= 121;

-- 17. Course categories
DELETE FROM mdl_course_categories WHERE id >= 10 AND id <= 13;

-- 18. Enrol instances (for test courses)
DELETE FROM mdl_enrol WHERE id >= 200 AND id <= 221;

-- 19. User employment records
DELETE FROM mdl_user_employment WHERE userid >= 100 AND userid <= 130;

-- 20. Cohorts
DELETE FROM mdl_cohort WHERE id >= 100 AND id <= 111;

-- 21. Users (last, as it's referenced by many tables)
DELETE FROM mdl_user WHERE id >= 100 AND id <= 130;

SELECT '✓ Cleanup completed' as '';
SELECT 'All test data (IDs 100+) has been deleted' as '';
SELECT 'Moodle core data (IDs < 100) is safe and unchanged' as '';
SELECT 'Proceeding with INSERT statements...' as '';
SELECT '' as '';

-- =========================================================
-- Helper: Get next available ID
-- =========================================================
-- Note: These queries assume IDs are available. Adjust if needed.

-- =========================================================
-- STEP 1: Create Test Users (30+ users)
-- =========================================================
SELECT '>>> STEP 1: Creating Test Users...' as '';

-- Password hash for "Pass@123" (Moodle uses SHA-512 with salt)
-- IMPORTANT: You MUST set passwords via Moodle password reset feature after running this script
-- Option 1: Use Moodle password reset (recommended - easiest)
--   - Go to: Site Administration → Users → Accounts → Browse list of users
--   - Click on each user → Reset password → Set to "Pass@123"
-- Option 2: Create users via Moodle GUI first, then run this script to update other fields
-- Option 3: Use Moodle API to set passwords programmatically
-- 
-- To generate password hash for "Pass@123" in PHP (if needed):
-- $password = 'Pass@123';
-- $hash = hash_internal_user_password($password); // Moodle function
-- 
-- For now, using placeholder - passwords MUST be set via Moodle password reset
-- Format: Moodle uses $2y$ for bcrypt or $6$ for SHA-512
SET @password_hash = '$6$rounds=5000$somesaltstring$hashedpasswordplaceholder12345678901234567890123456789012345678901234567890';

-- WARNING: The password hash above is a PLACEHOLDER!
-- You MUST set passwords via Moodle password reset feature after running this script
-- All test users should have password: Pass@123

INSERT INTO mdl_user (
    id, auth, confirmed, policyagreed, deleted, suspended, mnethostid,
    username, password, idnumber, firstname, lastname, email,
    lang, calendartype, timezone, timecreated, timemodified
) VALUES
-- Admins (IDs 100-102)
-- NOTE: Password needs to be set via Moodle password reset or use actual hash
(100, 'manual', 1, 1, 0, 0, 1, 'test_admin', @password_hash, 'EMP001', 'ทดสอบ', 'แอดมิน', 'test_admin@company.com', 'th', 'gregorian', '99', UNIX_TIMESTAMP() - 86400*30, UNIX_TIMESTAMP()),
(101, 'manual', 1, 1, 0, 0, 1, 'test_admin2', @password_hash, 'EMP002', 'Admin', 'Test', 'test_admin2@company.com', 'en', 'gregorian', '99', UNIX_TIMESTAMP() - 86400*30, UNIX_TIMESTAMP()),

-- Managers (IDs 103-107) - L5-L7
(103, 'manual', 1, 1, 0, 0, 1, 'manager_hr', @password_hash, 'EMP003', 'สมชาย', 'ใจดี', 'manager_hr@company.com', 'th', 'gregorian', '99', UNIX_TIMESTAMP() - 86400*180, UNIX_TIMESTAMP()),
(104, 'manual', 1, 1, 0, 0, 1, 'manager_it', @password_hash, 'EMP004', 'สมหญิง', 'เทคโนโลยี', 'manager_it@company.com', 'th', 'gregorian', '99', UNIX_TIMESTAMP() - 86400*200, UNIX_TIMESTAMP()),
(105, 'manual', 1, 1, 0, 0, 1, 'manager_sales', @password_hash, 'EMP005', 'John', 'Smith', 'manager_sales@company.com', 'en', 'gregorian', '99', UNIX_TIMESTAMP() - 86400*150, UNIX_TIMESTAMP()),

-- Teachers/Trainers (IDs 108-112) - L3-L4
(108, 'manual', 1, 1, 0, 0, 1, 'teacher01', @password_hash, 'EMP008', 'วิมล', 'สอนดี', 'teacher01@company.com', 'th', 'gregorian', '99', UNIX_TIMESTAMP() - 86400*100, UNIX_TIMESTAMP()),
(109, 'manual', 1, 1, 0, 0, 1, 'teacher02', @password_hash, 'EMP009', 'Sarah', 'Johnson', 'teacher02@company.com', 'en', 'gregorian', '99', UNIX_TIMESTAMP() - 86400*120, UNIX_TIMESTAMP()),

-- Employees/Students (IDs 113-130) - L1-L2
(113, 'manual', 1, 1, 0, 0, 1, 'emp001', @password_hash, 'EMP101', 'มานะ', 'ขยัน', 'emp001@company.com', 'th', 'gregorian', '99', UNIX_TIMESTAMP() - 86400*60, UNIX_TIMESTAMP()),
(114, 'manual', 1, 1, 0, 0, 1, 'emp002', @password_hash, 'EMP102', 'มานี', 'ดีใจ', 'emp002@company.com', 'th', 'gregorian', '99', UNIX_TIMESTAMP() - 86400*90, UNIX_TIMESTAMP()),
(115, 'manual', 1, 1, 0, 0, 1, 'emp003', @password_hash, 'EMP103', 'Peter', 'Parker', 'emp003@company.com', 'en', 'gregorian', '99', UNIX_TIMESTAMP() - 86400*45, UNIX_TIMESTAMP()),
(116, 'manual', 1, 1, 0, 0, 1, 'emp004', @password_hash, 'EMP104', 'Mary', 'Jane', 'emp004@company.com', 'en', 'gregorian', '99', UNIX_TIMESTAMP() - 86400*30, UNIX_TIMESTAMP()),
(117, 'manual', 1, 1, 0, 0, 1, 'emp005', @password_hash, 'EMP105', 'ประเสริฐ', 'คุณธรรม', 'emp005@company.com', 'th', 'gregorian', '99', UNIX_TIMESTAMP() - 86400*120, UNIX_TIMESTAMP()),
(118, 'manual', 1, 1, 0, 0, 1, 'emp006', @password_hash, 'EMP106', 'สุดา', 'รักงาน', 'emp006@company.com', 'th', 'gregorian', '99', UNIX_TIMESTAMP() - 86400*75, UNIX_TIMESTAMP()),
(119, 'manual', 1, 1, 0, 0, 1, 'emp007', @password_hash, 'EMP107', 'David', 'Lee', 'emp007@company.com', 'en', 'gregorian', '99', UNIX_TIMESTAMP() - 86400*100, UNIX_TIMESTAMP()),
(120, 'manual', 1, 1, 0, 0, 1, 'emp008', @password_hash, 'EMP108', 'Lisa', 'Wang', 'emp008@company.com', 'en', 'gregorian', '99', UNIX_TIMESTAMP() - 86400*50, UNIX_TIMESTAMP()),
(121, 'manual', 1, 1, 0, 0, 1, 'emp009', @password_hash, 'EMP109', 'วราภรณ์', 'พัฒนาทักษะ', 'emp009@company.com', 'th', 'gregorian', '99', UNIX_TIMESTAMP() - 86400*200, UNIX_TIMESTAMP()),
(122, 'manual', 1, 1, 0, 0, 1, 'emp010', @password_hash, 'EMP110', 'อภิสิทธิ์', 'มุ่งมั่น', 'emp010@company.com', 'th', 'gregorian', '99', UNIX_TIMESTAMP() - 86400*180, UNIX_TIMESTAMP()),
(123, 'manual', 1, 1, 0, 0, 1, 'emp011', @password_hash, 'EMP111', 'Robert', 'Brown', 'emp011@company.com', 'en', 'gregorian', '99', UNIX_TIMESTAMP() - 86400*160, UNIX_TIMESTAMP()),
(124, 'manual', 1, 1, 0, 0, 1, 'emp012', @password_hash, 'EMP112', 'Jennifer', 'Taylor', 'emp012@company.com', 'en', 'gregorian', '99', UNIX_TIMESTAMP() - 86400*140, UNIX_TIMESTAMP()),
(125, 'manual', 1, 1, 0, 0, 1, 'emp013', @password_hash, 'EMP113', 'นันทนา', 'สุขสันต์', 'emp013@company.com', 'th', 'gregorian', '99', UNIX_TIMESTAMP() - 86400*25, UNIX_TIMESTAMP()),
(126, 'manual', 1, 1, 0, 0, 1, 'emp014', @password_hash, 'EMP114', 'กมล', 'สว่าง', 'emp014@company.com', 'th', 'gregorian', '99', UNIX_TIMESTAMP() - 86400*15, UNIX_TIMESTAMP()),
(127, 'manual', 1, 1, 0, 0, 1, 'emp015', @password_hash, 'EMP115', 'Michael', 'Chen', 'emp015@company.com', 'en', 'gregorian', '99', UNIX_TIMESTAMP() - 86400*35, UNIX_TIMESTAMP()),
(128, 'manual', 1, 1, 0, 0, 1, 'emp016', @password_hash, 'EMP116', 'Emily', 'Davis', 'emp016@company.com', 'en', 'gregorian', '99', UNIX_TIMESTAMP() - 86400*20, UNIX_TIMESTAMP()),
(129, 'manual', 1, 1, 0, 0, 1, 'emp017', @password_hash, 'EMP117', 'วิชัย', 'ประสบความสำเร็จ', 'emp017@company.com', 'th', 'gregorian', '99', UNIX_TIMESTAMP() - 86400*220, UNIX_TIMESTAMP()),
(130, 'manual', 1, 1, 0, 0, 1, 'emp018', @password_hash, 'EMP118', 'อรทัย', 'มานะพยายาม', 'emp018@company.com', 'th', 'gregorian', '99', UNIX_TIMESTAMP() - 86400*80, UNIX_TIMESTAMP());

-- Note: Password hash above is a placeholder. In production, use actual Moodle password hashing.
-- For testing, you may need to:
-- 1. Create users via Moodle GUI first, then update other fields
-- 2. OR use Moodle's password reset to set password to "Password123"

SELECT '✓ Test users created (20 users: 2 admins, 3 managers, 2 teachers, 13 employees)' as '';

-- =========================================================
-- STEP 2: Assign User Roles (requires mdl_role_assignments)
-- =========================================================
-- Note: Role assignments should be done via Moodle GUI or API
-- This section is commented out as it requires context IDs which vary by installation
-- 
-- To assign roles, use Moodle GUI:
-- Site Administration → Users → Permissions → Assign roles
-- Or use Moodle API after users are created

-- =========================================================
-- STEP 3: Create Cohorts (one per department)
-- =========================================================
SELECT '>>> STEP 2: Creating Cohorts for Departments...' as '';

-- Note: contextid = 1 is typically the system context, but may need adjustment
INSERT INTO mdl_cohort (
    id, contextid, name, idnumber, description, descriptionformat,
    visible, component, timecreated, timemodified
) VALUES
(100, 1, 'HR-REC Department', 'HR-REC', 'Recruitment Department Cohort', 1, 1, '', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(101, 1, 'HR-TRN Department', 'HR-TRN', 'Training & Development Department Cohort', 1, 1, '', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(102, 1, 'HR-ADM Department', 'HR-ADM', 'HR Administration Department Cohort', 1, 1, '', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(103, 1, 'IT-DEV Department', 'IT-DEV', 'Development Department Cohort', 1, 1, '', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(104, 1, 'IT-INF Department', 'IT-INF', 'Infrastructure Department Cohort', 1, 1, '', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(105, 1, 'IT-SEC Department', 'IT-SEC', 'Security Department Cohort', 1, 1, '', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(106, 1, 'FIN-ACC Department', 'FIN-ACC', 'Accounting Department Cohort', 1, 1, '', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(107, 1, 'FIN-TAX Department', 'FIN-TAX', 'Tax Department Cohort', 1, 1, '', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(108, 1, 'OPS-LOG Department', 'OPS-LOG', 'Logistics Department Cohort', 1, 1, '', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(109, 1, 'OPS-QA Department', 'OPS-QA', 'Quality Assurance Department Cohort', 1, 1, '', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(110, 1, 'SALES-DOM Department', 'SALES-DOM', 'Domestic Sales Department Cohort', 1, 1, '', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(111, 1, 'SALES-EXP Department', 'SALES-EXP', 'Export Sales Department Cohort', 1, 1, '', UNIX_TIMESTAMP(), UNIX_TIMESTAMP());

SELECT '✓ Cohorts created (12 cohorts)' as '';

-- =========================================================
-- Update Department Mapping with Cohort IDs
-- =========================================================
-- NOTE: mdl_department_mapping was created in 98_sample_data.sql
-- We update the cohortid field to link departments to the cohorts we just created
-- Department IDs from 98_sample_data.sql:
-- DEPT001 = HR-REC (Recruitment) -> Cohort 100
-- DEPT002 = HR-TRN (Training & Development) -> Cohort 101
-- DEPT003 = HR-ADM (HR Administration) -> Cohort 102
-- DEPT004 = IT-DEV (Development) -> Cohort 103
-- DEPT005 = IT-INF (Infrastructure) -> Cohort 104
-- DEPT006 = IT-SEC (Security) -> Cohort 105
-- DEPT007 = FIN-ACC (Accounting) -> Cohort 106
-- DEPT008 = FIN-TAX (Tax) -> Cohort 107
-- DEPT009 = OPS-LOG (Logistics) -> Cohort 108
-- DEPT010 = OPS-QA (Quality Assurance) -> Cohort 109
-- DEPT011 = SALES-DOM (Domestic Sales) -> Cohort 110
-- DEPT012 = SALES-EXP (Export Sales) -> Cohort 111

UPDATE mdl_department_mapping SET cohortid = 100 WHERE departmentid = 'DEPT001';
UPDATE mdl_department_mapping SET cohortid = 101 WHERE departmentid = 'DEPT002';
UPDATE mdl_department_mapping SET cohortid = 102 WHERE departmentid = 'DEPT003';
UPDATE mdl_department_mapping SET cohortid = 103 WHERE departmentid = 'DEPT004';
UPDATE mdl_department_mapping SET cohortid = 104 WHERE departmentid = 'DEPT005';
UPDATE mdl_department_mapping SET cohortid = 105 WHERE departmentid = 'DEPT006';
UPDATE mdl_department_mapping SET cohortid = 106 WHERE departmentid = 'DEPT007';
UPDATE mdl_department_mapping SET cohortid = 107 WHERE departmentid = 'DEPT008';
UPDATE mdl_department_mapping SET cohortid = 108 WHERE departmentid = 'DEPT009';
UPDATE mdl_department_mapping SET cohortid = 109 WHERE departmentid = 'DEPT010';
UPDATE mdl_department_mapping SET cohortid = 110 WHERE departmentid = 'DEPT011';
UPDATE mdl_department_mapping SET cohortid = 111 WHERE departmentid = 'DEPT012';

SELECT '✓ Department mappings updated with cohort IDs' as '';

-- =========================================================
-- STEP 4: Assign Users to Cohorts
-- =========================================================
SELECT '>>> STEP 3: Assigning Users to Cohorts...' as '';

-- HR Department (cohort 100-102)
-- NOTE: Using INSERT IGNORE to avoid duplicate key errors if data already exists
INSERT IGNORE INTO mdl_cohort_members (cohortid, userid, timeadded) VALUES
(100, 103, UNIX_TIMESTAMP()), -- manager_hr
(100, 113, UNIX_TIMESTAMP()), -- emp001
(100, 114, UNIX_TIMESTAMP()), -- emp002
(101, 108, UNIX_TIMESTAMP()), -- teacher01
(101, 115, UNIX_TIMESTAMP()), -- emp003
(102, 116, UNIX_TIMESTAMP()), -- emp004

-- IT Department (cohort 103-105)
(103, 104, UNIX_TIMESTAMP()), -- manager_it
(103, 117, UNIX_TIMESTAMP()), -- emp005
(103, 118, UNIX_TIMESTAMP()), -- emp006
(104, 119, UNIX_TIMESTAMP()), -- emp007
(104, 120, UNIX_TIMESTAMP()), -- emp008
(105, 121, UNIX_TIMESTAMP()), -- emp009

-- Sales Department (cohort 110-111)
(110, 105, UNIX_TIMESTAMP()), -- manager_sales
(110, 122, UNIX_TIMESTAMP()), -- emp010
(110, 123, UNIX_TIMESTAMP()), -- emp011
(111, 124, UNIX_TIMESTAMP()), -- emp012
(111, 125, UNIX_TIMESTAMP()); -- emp013

SELECT '✓ Users assigned to cohorts' as '';

-- =========================================================
-- STEP 5: Create User Employment Records
-- =========================================================
SELECT '>>> STEP 4: Creating User Employment Records...' as '';

-- NOTE: This section uses organization structure from 98_sample_data.sql:
-- Divisions: 1=HR, 2=IT, 3=FIN, 4=OPS, 5=SALES
-- Departments: 1=HR-REC, 2=HR-TRN, 3=HR-ADM, 4=IT-DEV, 5=IT-INF, 6=IT-SEC,
--               7=FIN-ACC, 8=FIN-TAX, 9=OPS-LOG, 10=OPS-QA, 11=SALES-DOM, 12=SALES-EXP
-- Positions: 1-13 (L01-L13) from 98_sample_data.sql

INSERT INTO mdl_user_employment (
    userid, employee_id, divisionid, departmentid, positionid,
    hire_date, timecreated, timemodified
) VALUES
-- Admins
(100, 'ADM001', 1, 2, 7, UNIX_TIMESTAMP() - 86400*365, UNIX_TIMESTAMP() - 86400*365, UNIX_TIMESTAMP()), -- HR-TRN, L07
(101, 'ADM002', 2, 4, 6, UNIX_TIMESTAMP() - 86400*400, UNIX_TIMESTAMP() - 86400*400, UNIX_TIMESTAMP()), -- IT-DEV, L06

-- Managers (L5-L7)
(103, 'HRM001', 1, 1, 5, UNIX_TIMESTAMP() - 86400*180, UNIX_TIMESTAMP() - 86400*180, UNIX_TIMESTAMP()), -- HR-REC, L05
(104, 'ITM001', 2, 4, 6, UNIX_TIMESTAMP() - 86400*200, UNIX_TIMESTAMP() - 86400*200, UNIX_TIMESTAMP()), -- IT-DEV, L06
(105, 'SLM001', 5, 11, 6, UNIX_TIMESTAMP() - 86400*150, UNIX_TIMESTAMP() - 86400*150, UNIX_TIMESTAMP()), -- SALES-DOM, L06

-- Teachers (L3-L4)
(108, 'HRT001', 1, 2, 3, UNIX_TIMESTAMP() - 86400*100, UNIX_TIMESTAMP() - 86400*100, UNIX_TIMESTAMP()), -- HR-TRN, L03
(109, 'ITT001', 2, 5, 4, UNIX_TIMESTAMP() - 86400*120, UNIX_TIMESTAMP() - 86400*120, UNIX_TIMESTAMP()), -- IT-INF, L04

-- Employees (L1-L2) - HR Division
(113, 'EMP101', 1, 1, 1, UNIX_TIMESTAMP() - 86400*60, UNIX_TIMESTAMP() - 86400*60, UNIX_TIMESTAMP()), -- HR-REC, L01
(114, 'EMP102', 1, 1, 2, UNIX_TIMESTAMP() - 86400*90, UNIX_TIMESTAMP() - 86400*90, UNIX_TIMESTAMP()), -- HR-REC, L02

-- Employees - IT Division
(115, 'EMP103', 2, 4, 1, UNIX_TIMESTAMP() - 86400*45, UNIX_TIMESTAMP() - 86400*45, UNIX_TIMESTAMP()), -- IT-DEV, L01
(116, 'EMP104', 2, 5, 1, UNIX_TIMESTAMP() - 86400*30, UNIX_TIMESTAMP() - 86400*30, UNIX_TIMESTAMP()), -- IT-INF, L01
(117, 'EMP105', 2, 4, 2, UNIX_TIMESTAMP() - 86400*120, UNIX_TIMESTAMP() - 86400*120, UNIX_TIMESTAMP()), -- IT-DEV, L02
(118, 'EMP106', 2, 6, 1, UNIX_TIMESTAMP() - 86400*75, UNIX_TIMESTAMP() - 86400*75, UNIX_TIMESTAMP()), -- IT-SEC, L01

-- Employees - Finance Division
(119, 'EMP107', 3, 7, 1, UNIX_TIMESTAMP() - 86400*100, UNIX_TIMESTAMP() - 86400*100, UNIX_TIMESTAMP()), -- FIN-ACC, L01
(120, 'EMP108', 3, 8, 2, UNIX_TIMESTAMP() - 86400*50, UNIX_TIMESTAMP() - 86400*50, UNIX_TIMESTAMP()), -- FIN-TAX, L02

-- Employees - Sales Division
(121, 'EMP109', 5, 11, 2, UNIX_TIMESTAMP() - 86400*200, UNIX_TIMESTAMP() - 86400*200, UNIX_TIMESTAMP()), -- SALES-DOM, L02
(122, 'EMP110', 5, 11, 1, UNIX_TIMESTAMP() - 86400*180, UNIX_TIMESTAMP() - 86400*180, UNIX_TIMESTAMP()), -- SALES-DOM, L01
(123, 'EMP111', 5, 11, 1, UNIX_TIMESTAMP() - 86400*160, UNIX_TIMESTAMP() - 86400*160, UNIX_TIMESTAMP()), -- SALES-DOM, L01
(124, 'EMP112', 5, 12, 2, UNIX_TIMESTAMP() - 86400*140, UNIX_TIMESTAMP() - 86400*140, UNIX_TIMESTAMP()), -- SALES-EXP, L02
(125, 'EMP113', 5, 12, 1, UNIX_TIMESTAMP() - 86400*25, UNIX_TIMESTAMP() - 86400*25, UNIX_TIMESTAMP()), -- SALES-EXP, L01

-- Employees - Operations Division
(126, 'EMP114', 4, 9, 1, UNIX_TIMESTAMP() - 86400*15, UNIX_TIMESTAMP() - 86400*15, UNIX_TIMESTAMP()), -- OPS-LOG, L01
(127, 'EMP115', 4, 10, 1, UNIX_TIMESTAMP() - 86400*35, UNIX_TIMESTAMP() - 86400*35, UNIX_TIMESTAMP()), -- OPS-QA, L01
(128, 'EMP116', 4, 9, 2, UNIX_TIMESTAMP() - 86400*20, UNIX_TIMESTAMP() - 86400*20, UNIX_TIMESTAMP()), -- OPS-LOG, L02

-- Employees - Others
(129, 'EMP117', 1, 3, 2, UNIX_TIMESTAMP() - 86400*220, UNIX_TIMESTAMP() - 86400*220, UNIX_TIMESTAMP()), -- HR-ADM, L02
(130, 'EMP118', 2, 6, 1, UNIX_TIMESTAMP() - 86400*80, UNIX_TIMESTAMP() - 86400*80, UNIX_TIMESTAMP()); -- IT-SEC, L01

SELECT '✓ User employment records created' as '';

-- =========================================================
-- STEP 6: Create Course Categories
-- =========================================================
SELECT '>>> STEP 5: Creating Course Categories...' as '';

-- NOTE: According to DEVELOPMENT-PHASES.md, we need 4 categories:
-- 1. Short Courses
-- 2. Learning Programs
-- 3. Blended Courses
-- 4. Compliance Courses
--
-- Category IDs start from 10 to avoid conflicts with default category (ID 1)
-- Structure: id, name, idnumber, description, descriptionformat, parent, sortorder, 
--           coursecount, visible, visibleold, timemodified, depth, path, theme

INSERT INTO mdl_course_categories (
    id, name, idnumber, description, descriptionformat, parent, sortorder,
    coursecount, visible, visibleold, timemodified, depth, path, theme
) VALUES
-- Category 10: Short Courses (for standalone short courses)
(10, 'Short Courses', 'SHORT', 'Standalone short courses for skill development', 1, 0, 10010,
 0, 1, 1, UNIX_TIMESTAMP(), 1, '/10', NULL),

-- Category 11: Learning Programs (for structured learning programs)
(11, 'Learning Programs', 'PROGRAM', 'Structured learning programs with multiple courses', 1, 0, 10011,
 0, 1, 1, UNIX_TIMESTAMP(), 1, '/11', NULL),

-- Category 12: Blended Courses (for courses with both online and offline components)
(12, 'Blended Courses', 'BLENDED', 'Courses combining online and offline learning', 1, 0, 10012,
 0, 1, 1, UNIX_TIMESTAMP(), 1, '/12', NULL),

-- Category 13: Compliance Courses (for mandatory compliance training)
(13, 'Compliance Courses', 'COMPLIANCE', 'Mandatory compliance and safety training courses', 1, 0, 10013,
 0, 1, 1, UNIX_TIMESTAMP(), 1, '/13', NULL);

SELECT '✓ Course categories created (4 categories)' as '';

-- =========================================================
-- STEP 7: Create Courses (10+ courses)
-- =========================================================
SELECT '>>> STEP 6: Creating Courses...' as '';

-- NOTE: Course IDs start from 100 to avoid conflicts
-- Courses are mapped to appropriate categories:
-- - Compliance Courses (100, 101) → Category 13 (Compliance Courses)
-- - Learning Programs (102, 103) → Category 11 (Learning Programs)
-- - Short Courses (104-110) → Category 10 (Short Courses)

INSERT INTO mdl_course (
    id, category, sortorder, fullname, shortname, idnumber, summary, summaryformat,
    format, showgrades, newsitems, startdate, enddate,
    visible, visibleold, enablecompletion, timecreated, timemodified
) VALUES
-- Compliance Courses (Category 13: Compliance Courses)
(100, 13, 10001, 'Safety & Security Training', 'SAFETY001', 'SAFETY001', 'Mandatory safety training for all employees', 1,
 'topics', 1, 5, UNIX_TIMESTAMP() - 86400*30, UNIX_TIMESTAMP() + 86400*365, 1, 1, 1, UNIX_TIMESTAMP() - 86400*60, UNIX_TIMESTAMP()),
(101, 13, 10002, 'Information Security Awareness', 'SEC001', 'SEC001', 'Information security best practices', 1,
 'topics', 1, 5, UNIX_TIMESTAMP() - 86400*20, UNIX_TIMESTAMP() + 86400*365, 1, 1, 1, UNIX_TIMESTAMP() - 86400*50, UNIX_TIMESTAMP()),

-- Learning Programs (Category 11: Learning Programs)
(102, 11, 10003, 'New Employee Orientation', 'ONBOARD001', 'ONBOARD001', 'Complete onboarding program for new employees', 1,
 'topics', 1, 5, UNIX_TIMESTAMP() - 86400*10, UNIX_TIMESTAMP() + 86400*365, 1, 1, 1, UNIX_TIMESTAMP() - 86400*40, UNIX_TIMESTAMP()),
(103, 11, 10004, 'Company Culture & Values', 'CULTURE001', 'CULTURE001', 'Learn about company culture and core values', 1,
 'topics', 1, 5, UNIX_TIMESTAMP() - 86400*5, UNIX_TIMESTAMP() + 86400*365, 1, 1, 1, UNIX_TIMESTAMP() - 86400*30, UNIX_TIMESTAMP()),

-- Blended Courses (Category 12: Blended Courses)
(111, 12, 10012, 'Advanced Leadership Workshop', 'LEAD-BLEND001', 'LEAD-BLEND001', 'Blended leadership training with online and in-person sessions', 1,
 'topics', 1, 5, UNIX_TIMESTAMP() - 86400*7, UNIX_TIMESTAMP() + 86400*365, 1, 1, 1, UNIX_TIMESTAMP() - 86400*25, UNIX_TIMESTAMP()),
(112, 12, 10013, 'Customer Service Excellence', 'CS-BLEND001', 'CS-BLEND001', 'Blended customer service training program', 1,
 'topics', 1, 5, UNIX_TIMESTAMP() - 86400*3, UNIX_TIMESTAMP() + 86400*365, 1, 1, 1, UNIX_TIMESTAMP() - 86400*18, UNIX_TIMESTAMP()),
(113, 12, 10014, 'Team Building & Collaboration', 'TEAM-BLEND001', 'TEAM-BLEND001', 'Blended team building course with online modules and workshops', 1,
 'topics', 1, 5, UNIX_TIMESTAMP(), UNIX_TIMESTAMP() + 86400*365, 1, 1, 1, UNIX_TIMESTAMP() - 86400*12, UNIX_TIMESTAMP()),

-- Short Courses (Category 10: Short Courses)
(104, 10, 10005, 'Leadership Fundamentals', 'LEAD001', 'LEAD001', 'Basic leadership skills for managers', 1,
 'topics', 1, 5, UNIX_TIMESTAMP(), UNIX_TIMESTAMP() + 86400*365, 1, 1, 1, UNIX_TIMESTAMP() - 86400*20, UNIX_TIMESTAMP()),
(105, 10, 10006, 'Effective Communication', 'COMM001', 'COMM001', 'Improve your communication skills', 1,
 'topics', 1, 5, UNIX_TIMESTAMP(), UNIX_TIMESTAMP() + 86400*365, 1, 1, 1, UNIX_TIMESTAMP() - 86400*15, UNIX_TIMESTAMP()),
(106, 10, 10007, 'Project Management Basics', 'PM001', 'PM001', 'Fundamentals of project management', 1,
 'topics', 1, 5, UNIX_TIMESTAMP(), UNIX_TIMESTAMP() + 86400*365, 1, 1, 1, UNIX_TIMESTAMP() - 86400*10, UNIX_TIMESTAMP()),

-- Technical Short Courses (Category 10: Short Courses)
(107, 10, 10008, 'Database Fundamentals', 'DB001', 'DB001', 'Introduction to databases', 1,
 'topics', 1, 5, UNIX_TIMESTAMP(), UNIX_TIMESTAMP() + 86400*365, 1, 1, 1, UNIX_TIMESTAMP() - 86400*25, UNIX_TIMESTAMP()),
(108, 10, 10009, 'Web Development Basics', 'WEB001', 'WEB001', 'Learn web development fundamentals', 1,
 'topics', 1, 5, UNIX_TIMESTAMP(), UNIX_TIMESTAMP() + 86400*365, 1, 1, 1, UNIX_TIMESTAMP() - 86400*20, UNIX_TIMESTAMP()),

-- Sales Short Courses (Category 10: Short Courses)
(109, 10, 10010, 'Sales Techniques', 'SALES001', 'SALES001', 'Advanced sales techniques and strategies', 1,
 'topics', 1, 5, UNIX_TIMESTAMP(), UNIX_TIMESTAMP() + 86400*365, 1, 1, 1, UNIX_TIMESTAMP() - 86400*15, UNIX_TIMESTAMP()),
(110, 10, 10011, 'Customer Relationship Management', 'CRM001', 'CRM001', 'CRM best practices', 1,
 'topics', 1, 5, UNIX_TIMESTAMP(), UNIX_TIMESTAMP() + 86400*365, 1, 1, 1, UNIX_TIMESTAMP() - 86400*10, UNIX_TIMESTAMP()),

-- =========================================================
-- NEW: Life Cycle Courses (8 courses - 2 per category)
-- =========================================================
-- Compliance Courses - Life Cycle (Category 13)
(114, 13, 10015, 'Employee Life Cycle: Onboarding Compliance', 'LIFECYCLE-COMP001', 'LIFECYCLE-COMP001', 'Compliance training for new employee onboarding process', 1,
 'topics', 1, 5, UNIX_TIMESTAMP(), UNIX_TIMESTAMP() + 86400*365, 1, 1, 1, UNIX_TIMESTAMP() - 86400*8, UNIX_TIMESTAMP()),
(115, 13, 10016, 'Employee Life Cycle: Exit Compliance', 'LIFECYCLE-COMP002', 'LIFECYCLE-COMP002', 'Compliance requirements for employee exit and offboarding', 1,
 'topics', 1, 5, UNIX_TIMESTAMP(), UNIX_TIMESTAMP() + 86400*365, 1, 1, 1, UNIX_TIMESTAMP() - 86400*6, UNIX_TIMESTAMP()),

-- Learning Programs - Life Cycle (Category 11)
(116, 11, 10017, 'Employee Life Cycle: Career Development Program', 'LIFECYCLE-PROG001', 'LIFECYCLE-PROG001', 'Comprehensive career development program throughout employee life cycle', 1,
 'topics', 1, 5, UNIX_TIMESTAMP(), UNIX_TIMESTAMP() + 86400*365, 1, 1, 1, UNIX_TIMESTAMP() - 86400*4, UNIX_TIMESTAMP()),
(117, 11, 10018, 'Employee Life Cycle: Performance Management Program', 'LIFECYCLE-PROG002', 'LIFECYCLE-PROG002', 'Performance management training for all stages of employee life cycle', 1,
 'topics', 1, 5, UNIX_TIMESTAMP(), UNIX_TIMESTAMP() + 86400*365, 1, 1, 1, UNIX_TIMESTAMP() - 86400*2, UNIX_TIMESTAMP()),

-- Blended Courses - Life Cycle (Category 12)
(118, 12, 10019, 'Employee Life Cycle: Talent Acquisition Workshop', 'LIFECYCLE-BLEND001', 'LIFECYCLE-BLEND001', 'Blended course on talent acquisition and recruitment process', 1,
 'topics', 1, 5, UNIX_TIMESTAMP(), UNIX_TIMESTAMP() + 86400*365, 1, 1, 1, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(119, 12, 10020, 'Employee Life Cycle: Retention & Engagement Workshop', 'LIFECYCLE-BLEND002', 'LIFECYCLE-BLEND002', 'Blended workshop on employee retention and engagement strategies', 1,
 'topics', 1, 5, UNIX_TIMESTAMP(), UNIX_TIMESTAMP() + 86400*365, 1, 1, 1, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),

-- Short Courses - Life Cycle (Category 10)
(120, 10, 10021, 'Employee Life Cycle: Recruitment Basics', 'LIFECYCLE-SHORT001', 'LIFECYCLE-SHORT001', 'Fundamentals of recruitment and selection process', 1,
 'topics', 1, 5, UNIX_TIMESTAMP(), UNIX_TIMESTAMP() + 86400*365, 1, 1, 1, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(121, 10, 10022, 'Employee Life Cycle: Succession Planning', 'LIFECYCLE-SHORT002', 'LIFECYCLE-SHORT002', 'Introduction to succession planning and talent pipeline management', 1,
 'topics', 1, 5, UNIX_TIMESTAMP(), UNIX_TIMESTAMP() + 86400*365, 1, 1, 1, UNIX_TIMESTAMP(), UNIX_TIMESTAMP());

SELECT '✓ Courses created (22 courses: 14 original + 8 Life Cycle courses)' as '';

-- =========================================================
-- STEP 8: Create Course Contexts
-- =========================================================
SELECT '>>> STEP 7: Creating Course Contexts...' as '';

-- NOTE: Context levels in Moodle:
-- 10 = CONTEXT_SYSTEM
-- 50 = CONTEXT_COURSE
-- 70 = CONTEXT_MODULE (for activities)
-- 
-- We need to create course contexts (contextlevel 50) for each course
-- Context IDs start from 1000 to avoid conflicts

INSERT INTO mdl_context (
    id, contextlevel, instanceid, path, depth, locked
) VALUES
-- Course contexts (contextlevel 50)
-- Compliance Courses
(1000, 50, 100, '/1/1000', 2, 0), -- Safety & Security Training
(1001, 50, 101, '/1/1001', 2, 0), -- Information Security Awareness

-- Learning Programs
(1002, 50, 102, '/1/1002', 2, 0), -- New Employee Orientation
(1003, 50, 103, '/1/1003', 2, 0), -- Company Culture & Values

-- Short Courses
(1004, 50, 104, '/1/1004', 2, 0), -- Leadership Fundamentals
(1005, 50, 105, '/1/1005', 2, 0), -- Effective Communication
(1006, 50, 106, '/1/1006', 2, 0), -- Project Management Basics
(1007, 50, 107, '/1/1007', 2, 0), -- Database Fundamentals
(1008, 50, 108, '/1/1008', 2, 0), -- Web Development Basics
(1009, 50, 109, '/1/1009', 2, 0), -- Sales Techniques
(1010, 50, 110, '/1/1010', 2, 0), -- Customer Relationship Management

-- Blended Courses
(1011, 50, 111, '/1/1011', 2, 0), -- Advanced Leadership Workshop
(1012, 50, 112, '/1/1012', 2, 0), -- Customer Service Excellence
(1013, 50, 113, '/1/1013', 2, 0), -- Team Building & Collaboration

-- Life Cycle Courses - Compliance (Category 13)
(1014, 50, 114, '/1/1014', 2, 0), -- Employee Life Cycle: Onboarding Compliance
(1015, 50, 115, '/1/1015', 2, 0), -- Employee Life Cycle: Exit Compliance

-- Life Cycle Courses - Learning Programs (Category 11)
(1016, 50, 116, '/1/1016', 2, 0), -- Employee Life Cycle: Career Development Program
(1017, 50, 117, '/1/1017', 2, 0), -- Employee Life Cycle: Performance Management Program

-- Life Cycle Courses - Blended (Category 12)
(1018, 50, 118, '/1/1018', 2, 0), -- Employee Life Cycle: Talent Acquisition Workshop
(1019, 50, 119, '/1/1019', 2, 0), -- Employee Life Cycle: Retention & Engagement Workshop

-- Life Cycle Courses - Short Courses (Category 10)
(1020, 50, 120, '/1/1020', 2, 0), -- Employee Life Cycle: Recruitment Basics
(1021, 50, 121, '/1/1021', 2, 0); -- Employee Life Cycle: Succession Planning

SELECT '✓ Course contexts created (22 contexts: 14 original + 8 Life Cycle)' as '';

-- =========================================================
-- STEP 9: Create Course Sections
-- =========================================================
SELECT '>>> STEP 8: Creating Course Sections...' as '';

-- NOTE: Each course needs at least 3-4 sections (topics)
-- Section 0 is typically the general section
-- Sections 1+ are topic sections
-- Sequence field stores comma-separated course module IDs

INSERT INTO mdl_course_sections (
    id, course, section, name, summary, summaryformat, sequence, visible, timemodified
) VALUES
-- Course 100: Safety & Security Training (Compliance)
(1000, 100, 0, NULL, 'Welcome to Safety & Security Training', 1, '', 1, UNIX_TIMESTAMP()),
(1001, 100, 1, 'Introduction to Safety', 'Learn the basics of workplace safety', 1, '', 1, UNIX_TIMESTAMP()),
(1002, 100, 2, 'Safety Procedures', 'Understand safety procedures and protocols', 1, '', 1, UNIX_TIMESTAMP()),
(1003, 100, 3, 'Assessment', 'Complete the safety assessment', 1, '', 1, UNIX_TIMESTAMP()),

-- Course 101: Information Security Awareness (Compliance)
(1010, 101, 0, NULL, 'Welcome to Information Security Awareness', 1, '', 1, UNIX_TIMESTAMP()),
(1011, 101, 1, 'Security Fundamentals', 'Learn basic security concepts', 1, '', 1, UNIX_TIMESTAMP()),
(1012, 101, 2, 'Threats and Prevention', 'Understand common threats and how to prevent them', 1, '', 1, UNIX_TIMESTAMP()),
(1013, 101, 3, 'Security Assessment', 'Test your security knowledge', 1, '', 1, UNIX_TIMESTAMP()),

-- Course 102: New Employee Orientation (Learning Program)
(1020, 102, 0, NULL, 'Welcome to New Employee Orientation', 1, '', 1, UNIX_TIMESTAMP()),
(1021, 102, 1, 'Company Overview', 'Learn about our company', 1, '', 1, UNIX_TIMESTAMP()),
(1022, 102, 2, 'Policies and Procedures', 'Understand company policies', 1, '', 1, UNIX_TIMESTAMP()),
(1023, 102, 3, 'Getting Started', 'Resources to help you get started', 1, '', 1, UNIX_TIMESTAMP()),

-- Course 103: Company Culture & Values (Learning Program)
(1030, 103, 0, NULL, 'Welcome to Company Culture & Values', 1, '', 1, UNIX_TIMESTAMP()),
(1031, 103, 1, 'Our Mission and Vision', 'Learn about our mission and vision', 1, '', 1, UNIX_TIMESTAMP()),
(1032, 103, 2, 'Core Values', 'Understand our core values', 1, '', 1, UNIX_TIMESTAMP()),
(1033, 103, 3, 'Living Our Values', 'How to apply values in daily work', 1, '', 1, UNIX_TIMESTAMP()),

-- Course 104: Leadership Fundamentals (Short Course)
(1040, 104, 0, NULL, 'Welcome to Leadership Fundamentals', 1, '', 1, UNIX_TIMESTAMP()),
(1041, 104, 1, 'Leadership Basics', 'Introduction to leadership', 1, '', 1, UNIX_TIMESTAMP()),
(1042, 104, 2, 'Leadership Styles', 'Different leadership styles and when to use them', 1, '', 1, UNIX_TIMESTAMP()),
(1043, 104, 3, 'Leadership Practice', 'Practice your leadership skills', 1, '', 1, UNIX_TIMESTAMP()),

-- Course 105: Effective Communication (Short Course)
(1050, 105, 0, NULL, 'Welcome to Effective Communication', 1, '', 1, UNIX_TIMESTAMP()),
(1051, 105, 1, 'Communication Basics', 'Learn fundamental communication skills', 1, '', 1, UNIX_TIMESTAMP()),
(1052, 105, 2, 'Verbal and Non-verbal', 'Understand verbal and non-verbal communication', 1, '', 1, UNIX_TIMESTAMP()),
(1053, 105, 3, 'Communication Assessment', 'Test your communication skills', 1, '', 1, UNIX_TIMESTAMP()),

-- Course 106: Project Management Basics (Short Course)
(1060, 106, 0, NULL, 'Welcome to Project Management Basics', 1, '', 1, UNIX_TIMESTAMP()),
(1061, 106, 1, 'Project Fundamentals', 'Introduction to project management', 1, '', 1, UNIX_TIMESTAMP()),
(1062, 106, 2, 'Planning and Execution', 'Learn how to plan and execute projects', 1, '', 1, UNIX_TIMESTAMP()),
(1063, 106, 3, 'Project Assessment', 'Complete the project management assessment', 1, '', 1, UNIX_TIMESTAMP()),

-- Course 107: Database Fundamentals (Short Course)
(1070, 107, 0, NULL, 'Welcome to Database Fundamentals', 1, '', 1, UNIX_TIMESTAMP()),
(1071, 107, 1, 'Database Concepts', 'Learn basic database concepts', 1, '', 1, UNIX_TIMESTAMP()),
(1072, 107, 2, 'SQL Basics', 'Introduction to SQL', 1, '', 1, UNIX_TIMESTAMP()),
(1073, 107, 3, 'Database Practice', 'Practice with database exercises', 1, '', 1, UNIX_TIMESTAMP()),

-- Course 108: Web Development Basics (Short Course)
(1080, 108, 0, NULL, 'Welcome to Web Development Basics', 1, '', 1, UNIX_TIMESTAMP()),
(1081, 108, 1, 'HTML and CSS', 'Learn HTML and CSS fundamentals', 1, '', 1, UNIX_TIMESTAMP()),
(1082, 108, 2, 'JavaScript Basics', 'Introduction to JavaScript', 1, '', 1, UNIX_TIMESTAMP()),
(1083, 108, 3, 'Web Development Project', 'Build a simple web project', 1, '', 1, UNIX_TIMESTAMP()),

-- Course 109: Sales Techniques (Short Course)
(1090, 109, 0, NULL, 'Welcome to Sales Techniques', 1, '', 1, UNIX_TIMESTAMP()),
(1091, 109, 1, 'Sales Fundamentals', 'Learn basic sales concepts', 1, '', 1, UNIX_TIMESTAMP()),
(1092, 109, 2, 'Sales Strategies', 'Advanced sales strategies', 1, '', 1, UNIX_TIMESTAMP()),
(1093, 109, 3, 'Sales Assessment', 'Test your sales knowledge', 1, '', 1, UNIX_TIMESTAMP()),

-- Course 110: Customer Relationship Management (Short Course)
(1100, 110, 0, NULL, 'Welcome to Customer Relationship Management', 1, '', 1, UNIX_TIMESTAMP()),
(1101, 110, 1, 'CRM Concepts', 'Introduction to CRM', 1, '', 1, UNIX_TIMESTAMP()),
(1102, 110, 2, 'CRM Best Practices', 'Learn CRM best practices', 1, '', 1, UNIX_TIMESTAMP()),
(1103, 110, 3, 'CRM Assessment', 'Complete the CRM assessment', 1, '', 1, UNIX_TIMESTAMP()),

-- Course 111: Advanced Leadership Workshop (Blended Course)
(1110, 111, 0, NULL, 'Welcome to Advanced Leadership Workshop', 1, '', 1, UNIX_TIMESTAMP()),
(1111, 111, 1, 'Online Module: Leadership Theory', 'Complete online modules before workshop', 1, '', 1, UNIX_TIMESTAMP()),
(1112, 111, 2, 'Workshop: Practical Application', 'In-person workshop session', 1, '', 1, UNIX_TIMESTAMP()),
(1113, 111, 3, 'Post-Workshop Assessment', 'Complete assessment after workshop', 1, '', 1, UNIX_TIMESTAMP()),

-- Course 112: Customer Service Excellence (Blended Course)
(1120, 112, 0, NULL, 'Welcome to Customer Service Excellence', 1, '', 1, UNIX_TIMESTAMP()),
(1121, 112, 1, 'Online: Service Fundamentals', 'Learn customer service basics online', 1, '', 1, UNIX_TIMESTAMP()),
(1122, 112, 2, 'Workshop: Role Play & Practice', 'Practice in workshop session', 1, '', 1, UNIX_TIMESTAMP()),
(1123, 112, 3, 'Final Assessment', 'Complete final assessment', 1, '', 1, UNIX_TIMESTAMP()),

-- Course 113: Team Building & Collaboration (Blended Course)
(1130, 113, 0, NULL, 'Welcome to Team Building & Collaboration', 1, '', 1, UNIX_TIMESTAMP()),
(1131, 113, 1, 'Online: Team Dynamics', 'Learn about team dynamics online', 1, '', 1, UNIX_TIMESTAMP()),
(1132, 113, 2, 'Workshop: Team Activities', 'Participate in team building activities', 1, '', 1, UNIX_TIMESTAMP()),
(1133, 113, 3, 'Reflection & Assessment', 'Reflect on learning and complete assessment', 1, '', 1, UNIX_TIMESTAMP()),

-- =========================================================
-- NEW: Life Cycle Courses Sections (8 courses)
-- =========================================================
-- Course 114: Employee Life Cycle: Onboarding Compliance (Compliance)
(1140, 114, 0, NULL, 'Welcome to Onboarding Compliance Training', 1, '', 1, UNIX_TIMESTAMP()),
(1141, 114, 1, 'Onboarding Requirements', 'Learn compliance requirements for new employee onboarding', 1, '', 1, UNIX_TIMESTAMP()),
(1142, 114, 2, 'Documentation & Procedures', 'Understand required documentation and procedures', 1, '', 1, UNIX_TIMESTAMP()),
(1143, 114, 3, 'Onboarding Compliance Assessment', 'Complete the compliance assessment', 1, '', 1, UNIX_TIMESTAMP()),

-- Course 115: Employee Life Cycle: Exit Compliance (Compliance)
(1150, 115, 0, NULL, 'Welcome to Exit Compliance Training', 1, '', 1, UNIX_TIMESTAMP()),
(1151, 115, 1, 'Exit Process Requirements', 'Learn compliance requirements for employee exit', 1, '', 1, UNIX_TIMESTAMP()),
(1152, 115, 2, 'Final Documentation', 'Understand final documentation and clearance procedures', 1, '', 1, UNIX_TIMESTAMP()),
(1153, 115, 3, 'Exit Compliance Assessment', 'Complete the exit compliance assessment', 1, '', 1, UNIX_TIMESTAMP()),

-- Course 116: Employee Life Cycle: Career Development Program (Learning Program)
(1160, 116, 0, NULL, 'Welcome to Career Development Program', 1, '', 1, UNIX_TIMESTAMP()),
(1161, 116, 1, 'Career Planning Fundamentals', 'Introduction to career planning and development', 1, '', 1, UNIX_TIMESTAMP()),
(1162, 116, 2, 'Skills Development', 'Develop skills for career advancement', 1, '', 1, UNIX_TIMESTAMP()),
(1163, 116, 3, 'Career Path Assessment', 'Assess your career path and development plan', 1, '', 1, UNIX_TIMESTAMP()),

-- Course 117: Employee Life Cycle: Performance Management Program (Learning Program)
(1170, 117, 0, NULL, 'Welcome to Performance Management Program', 1, '', 1, UNIX_TIMESTAMP()),
(1171, 117, 1, 'Performance Management Basics', 'Learn fundamentals of performance management', 1, '', 1, UNIX_TIMESTAMP()),
(1172, 117, 2, 'Goal Setting & Review', 'Understand goal setting and performance review process', 1, '', 1, UNIX_TIMESTAMP()),
(1173, 117, 3, 'Performance Assessment', 'Complete performance management assessment', 1, '', 1, UNIX_TIMESTAMP()),

-- Course 118: Employee Life Cycle: Talent Acquisition Workshop (Blended)
(1180, 118, 0, NULL, 'Welcome to Talent Acquisition Workshop', 1, '', 1, UNIX_TIMESTAMP()),
(1181, 118, 1, 'Online: Recruitment Fundamentals', 'Learn recruitment basics online', 1, '', 1, UNIX_TIMESTAMP()),
(1182, 118, 2, 'Workshop: Interview Techniques', 'Practice interview techniques in workshop', 1, '', 1, UNIX_TIMESTAMP()),
(1183, 118, 3, 'Talent Acquisition Assessment', 'Complete talent acquisition assessment', 1, '', 1, UNIX_TIMESTAMP()),

-- Course 119: Employee Life Cycle: Retention & Engagement Workshop (Blended)
(1190, 119, 0, NULL, 'Welcome to Retention & Engagement Workshop', 1, '', 1, UNIX_TIMESTAMP()),
(1191, 119, 1, 'Online: Employee Engagement Strategies', 'Learn engagement strategies online', 1, '', 1, UNIX_TIMESTAMP()),
(1192, 119, 2, 'Workshop: Retention Best Practices', 'Practice retention techniques in workshop', 1, '', 1, UNIX_TIMESTAMP()),
(1193, 119, 3, 'Retention Assessment', 'Complete retention and engagement assessment', 1, '', 1, UNIX_TIMESTAMP()),

-- Course 120: Employee Life Cycle: Recruitment Basics (Short Course)
(1200, 120, 0, NULL, 'Welcome to Recruitment Basics', 1, '', 1, UNIX_TIMESTAMP()),
(1201, 120, 1, 'Recruitment Fundamentals', 'Introduction to recruitment process', 1, '', 1, UNIX_TIMESTAMP()),
(1202, 120, 2, 'Selection Methods', 'Learn various selection methods and techniques', 1, '', 1, UNIX_TIMESTAMP()),
(1203, 120, 3, 'Recruitment Assessment', 'Complete recruitment basics assessment', 1, '', 1, UNIX_TIMESTAMP()),

-- Course 121: Employee Life Cycle: Succession Planning (Short Course)
(1210, 121, 0, NULL, 'Welcome to Succession Planning', 1, '', 1, UNIX_TIMESTAMP()),
(1211, 121, 1, 'Succession Planning Concepts', 'Learn fundamentals of succession planning', 1, '', 1, UNIX_TIMESTAMP()),
(1212, 121, 2, 'Talent Pipeline Management', 'Understand talent pipeline and development', 1, '', 1, UNIX_TIMESTAMP()),
(1213, 121, 3, 'Succession Planning Assessment', 'Complete succession planning assessment', 1, '', 1, UNIX_TIMESTAMP());

SELECT '✓ Course sections created (88 sections: 56 original + 32 for 8 Life Cycle courses)' as '';

-- =========================================================
-- STEP 10: Create Course Modules and Activities
-- =========================================================
SELECT '>>> STEP 9: Creating Course Modules and Activities...' as '';

-- NOTE: Module IDs from mdl_modules:
-- assign = 1, quiz = 17, page = 15, url = 21, h5pactivity = 10
-- 
-- We'll create activities for each course:
-- - At least 1 quiz per course (for assessment)
-- - At least 1 assignment per course (for practice)
-- - 1-2 page resources per course (for content)
-- - 1 video (h5pactivity) per course (for learning)
--
-- Course Module IDs start from 2000
-- Activity Instance IDs start from 2000

-- First, create Quiz activities
-- NOTE: mdl_quiz structure includes timecreated before timemodified
INSERT INTO mdl_quiz (
    id, course, name, intro, introformat, timeopen, timeclose, timelimit,
    attempts, grademethod, sumgrades, grade, timecreated, timemodified
) VALUES
-- Compliance Courses
(2000, 100, 'Safety Assessment Quiz', 'Complete this quiz to test your safety knowledge', 1, 0, 0, 0, 3, 1, 100.00000, 100.00000, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(2001, 101, 'Security Awareness Quiz', 'Test your information security knowledge', 1, 0, 0, 0, 3, 1, 100.00000, 100.00000, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),

-- Learning Programs
(2002, 102, 'Orientation Quiz', 'Quiz about company orientation', 1, 0, 0, 0, 2, 1, 100.00000, 100.00000, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(2003, 103, 'Culture & Values Quiz', 'Test your understanding of company culture', 1, 0, 0, 0, 2, 1, 100.00000, 100.00000, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),

-- Short Courses
(2004, 104, 'Leadership Quiz', 'Test your leadership knowledge', 1, 0, 0, 0, 2, 1, 100.00000, 100.00000, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(2005, 105, 'Communication Quiz', 'Test your communication skills', 1, 0, 0, 0, 2, 1, 100.00000, 100.00000, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(2006, 106, 'Project Management Quiz', 'Test your project management knowledge', 1, 0, 0, 0, 2, 1, 100.00000, 100.00000, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(2007, 107, 'Database Quiz', 'Test your database knowledge', 1, 0, 0, 0, 2, 1, 100.00000, 100.00000, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(2008, 108, 'Web Development Quiz', 'Test your web development knowledge', 1, 0, 0, 0, 2, 1, 100.00000, 100.00000, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(2009, 109, 'Sales Techniques Quiz', 'Test your sales knowledge', 1, 0, 0, 0, 2, 1, 100.00000, 100.00000, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(2010, 110, 'CRM Quiz', 'Test your CRM knowledge', 1, 0, 0, 0, 2, 1, 100.00000, 100.00000, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),

-- Blended Courses
(2011, 111, 'Leadership Workshop Quiz', 'Post-workshop assessment', 1, 0, 0, 0, 2, 1, 100.00000, 100.00000, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(2012, 112, 'Customer Service Quiz', 'Test your customer service knowledge', 1, 0, 0, 0, 2, 1, 100.00000, 100.00000, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(2013, 113, 'Team Building Quiz', 'Assessment on team building concepts', 1, 0, 0, 0, 2, 1, 100.00000, 100.00000, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),

-- Life Cycle Courses - Quizzes
(2014, 114, 'Onboarding Compliance Quiz', 'Test your onboarding compliance knowledge', 1, 0, 0, 0, 2, 1, 100.00000, 100.00000, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(2015, 115, 'Exit Compliance Quiz', 'Test your exit compliance knowledge', 1, 0, 0, 0, 2, 1, 100.00000, 100.00000, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(2016, 116, 'Career Development Quiz', 'Test your career development knowledge', 1, 0, 0, 0, 2, 1, 100.00000, 100.00000, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(2017, 117, 'Performance Management Quiz', 'Test your performance management knowledge', 1, 0, 0, 0, 2, 1, 100.00000, 100.00000, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(2018, 118, 'Talent Acquisition Quiz', 'Test your talent acquisition knowledge', 1, 0, 0, 0, 2, 1, 100.00000, 100.00000, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(2019, 119, 'Retention & Engagement Quiz', 'Test your retention and engagement knowledge', 1, 0, 0, 0, 2, 1, 100.00000, 100.00000, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(2020, 120, 'Recruitment Basics Quiz', 'Test your recruitment basics knowledge', 1, 0, 0, 0, 2, 1, 100.00000, 100.00000, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(2021, 121, 'Succession Planning Quiz', 'Test your succession planning knowledge', 1, 0, 0, 0, 2, 1, 100.00000, 100.00000, UNIX_TIMESTAMP(), UNIX_TIMESTAMP());

-- Create Assignment activities
INSERT INTO mdl_assign (
    id, course, name, intro, introformat, duedate, allowsubmissionsfromdate,
    grade, timemodified, completionsubmit
) VALUES
-- Compliance Courses
(2100, 100, 'Safety Procedure Assignment', 'Submit your safety procedure analysis', 1, UNIX_TIMESTAMP() + 86400*30, UNIX_TIMESTAMP(), 100, UNIX_TIMESTAMP(), 1),
(2101, 101, 'Security Case Study', 'Analyze a security case study', 1, UNIX_TIMESTAMP() + 86400*30, UNIX_TIMESTAMP(), 100, UNIX_TIMESTAMP(), 1),

-- Learning Programs
(2102, 102, 'Orientation Reflection', 'Reflect on your orientation experience', 1, UNIX_TIMESTAMP() + 86400*14, UNIX_TIMESTAMP(), 100, UNIX_TIMESTAMP(), 1),
(2103, 103, 'Values Application', 'Describe how you apply company values', 1, UNIX_TIMESTAMP() + 86400*14, UNIX_TIMESTAMP(), 100, UNIX_TIMESTAMP(), 1),

-- Short Courses
(2104, 104, 'Leadership Scenario', 'Complete a leadership scenario exercise', 1, UNIX_TIMESTAMP() + 86400*21, UNIX_TIMESTAMP(), 100, UNIX_TIMESTAMP(), 1),
(2105, 105, 'Communication Exercise', 'Practice your communication skills', 1, UNIX_TIMESTAMP() + 86400*21, UNIX_TIMESTAMP(), 100, UNIX_TIMESTAMP(), 1),
(2106, 106, 'Project Plan', 'Create a project plan', 1, UNIX_TIMESTAMP() + 86400*21, UNIX_TIMESTAMP(), 100, UNIX_TIMESTAMP(), 1),
(2107, 107, 'Database Design', 'Design a simple database', 1, UNIX_TIMESTAMP() + 86400*21, UNIX_TIMESTAMP(), 100, UNIX_TIMESTAMP(), 1),
(2108, 108, 'Web Project', 'Build a simple web page', 1, UNIX_TIMESTAMP() + 86400*21, UNIX_TIMESTAMP(), 100, UNIX_TIMESTAMP(), 1),
(2109, 109, 'Sales Pitch', 'Create a sales pitch', 1, UNIX_TIMESTAMP() + 86400*21, UNIX_TIMESTAMP(), 100, UNIX_TIMESTAMP(), 1),
(2110, 110, 'CRM Strategy', 'Develop a CRM strategy', 1, UNIX_TIMESTAMP() + 86400*21, UNIX_TIMESTAMP(), 100, UNIX_TIMESTAMP(), 1),

-- Blended Courses
(2111, 111, 'Leadership Reflection', 'Reflect on workshop experience', 1, UNIX_TIMESTAMP() + 86400*28, UNIX_TIMESTAMP(), 100, UNIX_TIMESTAMP(), 1),
(2112, 112, 'Service Scenario', 'Complete customer service scenario', 1, UNIX_TIMESTAMP() + 86400*28, UNIX_TIMESTAMP(), 100, UNIX_TIMESTAMP(), 1),
(2113, 113, 'Team Project', 'Complete team collaboration project', 1, UNIX_TIMESTAMP() + 86400*28, UNIX_TIMESTAMP(), 100, UNIX_TIMESTAMP(), 1),

-- Life Cycle Courses - Assignments
(2114, 114, 'Onboarding Compliance Checklist', 'Complete onboarding compliance checklist', 1, UNIX_TIMESTAMP() + 86400*30, UNIX_TIMESTAMP(), 100, UNIX_TIMESTAMP(), 1),
(2115, 115, 'Exit Process Documentation', 'Submit exit process documentation review', 1, UNIX_TIMESTAMP() + 86400*30, UNIX_TIMESTAMP(), 100, UNIX_TIMESTAMP(), 1),
(2116, 116, 'Career Development Plan', 'Create your personal career development plan', 1, UNIX_TIMESTAMP() + 86400*21, UNIX_TIMESTAMP(), 100, UNIX_TIMESTAMP(), 1),
(2117, 117, 'Performance Goal Setting', 'Set and document performance goals', 1, UNIX_TIMESTAMP() + 86400*21, UNIX_TIMESTAMP(), 100, UNIX_TIMESTAMP(), 1),
(2118, 118, 'Interview Practice Assignment', 'Practice interview techniques and submit reflection', 1, UNIX_TIMESTAMP() + 86400*28, UNIX_TIMESTAMP(), 100, UNIX_TIMESTAMP(), 1),
(2119, 119, 'Retention Strategy Plan', 'Develop a retention strategy plan', 1, UNIX_TIMESTAMP() + 86400*28, UNIX_TIMESTAMP(), 100, UNIX_TIMESTAMP(), 1),
(2120, 120, 'Recruitment Process Analysis', 'Analyze and document recruitment process', 1, UNIX_TIMESTAMP() + 86400*21, UNIX_TIMESTAMP(), 100, UNIX_TIMESTAMP(), 1),
(2121, 121, 'Succession Plan Template', 'Create a succession plan template', 1, UNIX_TIMESTAMP() + 86400*21, UNIX_TIMESTAMP(), 100, UNIX_TIMESTAMP(), 1);

-- Create Page resources (content pages)
-- NOTE: mdl_page structure: id, course, name, intro, introformat, content, contentformat, legacyfiles, legacyfileslast, display, displayoptions, revision, timemodified
INSERT INTO mdl_page (
    id, course, name, intro, introformat, content, contentformat, legacyfiles, legacyfileslast, display, displayoptions,
    revision, timemodified
) VALUES
-- Compliance Courses - Content Pages
(2300, 100, 'Introduction to Safety', 'Learn the fundamentals of workplace safety', 1, 
 '<h2>Introduction to Safety</h2><p>Workplace safety is essential for protecting employees and maintaining a productive work environment. This module covers:</p><ul><li>Basic safety principles</li><li>Common workplace hazards</li><li>Safety equipment and procedures</li><li>Emergency response protocols</li></ul>', 1, 0, NULL, 5, '', 1, UNIX_TIMESTAMP()),
(2301, 101, 'Information Security Basics', 'Understanding information security fundamentals', 1,
 '<h2>Information Security Basics</h2><p>Protecting sensitive information is crucial in today\'s digital world. Topics include:</p><ul><li>Data classification</li><li>Access controls</li><li>Password security</li><li>Phishing awareness</li></ul>', 1, 0, NULL, 5, '', 1, UNIX_TIMESTAMP()),

-- Learning Programs - Content Pages
(2302, 102, 'Company Overview', 'Learn about our company history and structure', 1,
 '<h2>Company Overview</h2><p>Welcome to our company! This section provides:</p><ul><li>Company history and mission</li><li>Organizational structure</li><li>Key departments and functions</li><li>Company values and culture</li></ul>', 1, 0, NULL, 5, '', 1, UNIX_TIMESTAMP()),
(2303, 103, 'Our Mission and Vision', 'Understanding our company direction', 1,
 '<h2>Our Mission and Vision</h2><p>Our mission drives everything we do. Learn about:</p><ul><li>Our mission statement</li><li>Our vision for the future</li><li>How we achieve our goals</li><li>Your role in our success</li></ul>', 1, 0, NULL, 5, '', 1, UNIX_TIMESTAMP()),

-- Short Courses - Content Pages
(2304, 104, 'Leadership Fundamentals', 'Core concepts of effective leadership', 1,
 '<h2>Leadership Fundamentals</h2><p>Effective leadership requires understanding key principles:</p><ul><li>Leadership vs. management</li><li>Communication skills</li><li>Decision-making</li><li>Team motivation</li></ul>', 1, 0, NULL, 5, '', 1, UNIX_TIMESTAMP()),
(2305, 105, 'Communication Essentials', 'Master the art of effective communication', 1,
 '<h2>Communication Essentials</h2><p>Communication is key to success. This module covers:</p><ul><li>Verbal communication</li><li>Non-verbal cues</li><li>Active listening</li><li>Written communication</li></ul>', 1, 0, NULL, 5, '', 1, UNIX_TIMESTAMP()),
(2306, 106, 'Project Management Overview', 'Introduction to project management', 1,
 '<h2>Project Management Overview</h2><p>Project management helps deliver successful outcomes. Learn:</p><ul><li>Project lifecycle</li><li>Planning and scheduling</li><li>Risk management</li><li>Stakeholder management</li></ul>', 1, 0, NULL, 5, '', 1, UNIX_TIMESTAMP()),
(2307, 107, 'Database Concepts', 'Understanding database fundamentals', 1,
 '<h2>Database Concepts</h2><p>Databases are essential for data management. Topics include:</p><ul><li>What is a database?</li><li>Relational database design</li><li>SQL basics</li><li>Data integrity</li></ul>', 1, 0, NULL, 5, '', 1, UNIX_TIMESTAMP()),
(2308, 108, 'Web Development Introduction', 'Get started with web development', 1,
 '<h2>Web Development Introduction</h2><p>Web development is creating websites and applications. Learn:</p><ul><li>HTML structure</li><li>CSS styling</li><li>JavaScript basics</li><li>Responsive design</li></ul>', 1, 0, NULL, 5, '', 1, UNIX_TIMESTAMP()),
(2309, 109, 'Sales Fundamentals', 'Core sales techniques and strategies', 1,
 '<h2>Sales Fundamentals</h2><p>Successful sales require understanding key concepts:</p><ul><li>Sales process</li><li>Customer needs analysis</li><li>Presentation skills</li><li>Closing techniques</li></ul>', 1, 0, NULL, 5, '', 1, UNIX_TIMESTAMP()),
(2310, 110, 'CRM Overview', 'Understanding Customer Relationship Management', 1,
 '<h2>CRM Overview</h2><p>CRM helps manage customer relationships effectively. Learn:</p><ul><li>What is CRM?</li><li>CRM benefits</li><li>CRM best practices</li><li>CRM implementation</li></ul>', 1, 0, NULL, 5, '', 1, UNIX_TIMESTAMP()),

-- Blended Courses - Content Pages
(2311, 111, 'Leadership Theory', 'Online module: Leadership concepts and theories', 1,
 '<h2>Leadership Theory</h2><p>Before the workshop, review these leadership theories:</p><ul><li>Transformational leadership</li><li>Situational leadership</li><li>Servant leadership</li><li>Emotional intelligence</li></ul>', 1, 0, NULL, 5, '', 1, UNIX_TIMESTAMP()),
(2312, 112, 'Customer Service Principles', 'Online: Core customer service principles', 1,
 '<h2>Customer Service Principles</h2><p>Master these principles before the workshop:</p><ul><li>Customer expectations</li><li>Service quality standards</li><li>Problem-solving techniques</li><li>Building rapport</li></ul>', 1, 0, NULL, 5, '', 1, UNIX_TIMESTAMP()),
(2313, 113, 'Team Dynamics', 'Online: Understanding team dynamics', 1,
 '<h2>Team Dynamics</h2><p>Prepare for the workshop by learning about:</p><ul><li>Team formation stages</li><li>Team roles and responsibilities</li><li>Conflict resolution</li><li>Collaboration strategies</li></ul>', 1, 0, NULL, 5, '', 1, UNIX_TIMESTAMP()),

-- Life Cycle Courses - Content Pages
(2314, 114, 'Onboarding Compliance Overview', 'Understanding onboarding compliance requirements', 1,
 '<h2>Onboarding Compliance Overview</h2><p>Learn about compliance requirements for new employee onboarding:</p><ul><li>Legal requirements</li><li>Documentation standards</li><li>Policy compliance</li><li>Best practices</li></ul>', 1, 0, NULL, 5, '', 1, UNIX_TIMESTAMP()),
(2315, 115, 'Exit Compliance Overview', 'Understanding exit compliance requirements', 1,
 '<h2>Exit Compliance Overview</h2><p>Learn about compliance requirements for employee exit:</p><ul><li>Exit interview requirements</li><li>Final documentation</li><li>Clearance procedures</li><li>Legal obligations</li></ul>', 1, 0, NULL, 5, '', 1, UNIX_TIMESTAMP()),
(2316, 116, 'Career Development Fundamentals', 'Introduction to career development', 1,
 '<h2>Career Development Fundamentals</h2><p>Explore career development concepts:</p><ul><li>Career planning process</li><li>Skills assessment</li><li>Development opportunities</li><li>Career path mapping</li></ul>', 1, 0, NULL, 5, '', 1, UNIX_TIMESTAMP()),
(2317, 117, 'Performance Management Basics', 'Introduction to performance management', 1,
 '<h2>Performance Management Basics</h2><p>Learn about performance management:</p><ul><li>Performance cycles</li><li>Goal setting</li><li>Feedback mechanisms</li><li>Review processes</li></ul>', 1, 0, NULL, 5, '', 1, UNIX_TIMESTAMP()),
(2318, 118, 'Talent Acquisition Fundamentals', 'Introduction to talent acquisition', 1,
 '<h2>Talent Acquisition Fundamentals</h2><p>Learn about talent acquisition:</p><ul><li>Recruitment strategies</li><li>Sourcing methods</li><li>Selection process</li><li>Interview techniques</li></ul>', 1, 0, NULL, 5, '', 1, UNIX_TIMESTAMP()),
(2319, 119, 'Employee Retention Strategies', 'Understanding employee retention', 1,
 '<h2>Employee Retention Strategies</h2><p>Explore retention and engagement:</p><ul><li>Retention factors</li><li>Engagement strategies</li><li>Retention metrics</li><li>Best practices</li></ul>', 1, 0, NULL, 5, '', 1, UNIX_TIMESTAMP()),
(2320, 120, 'Recruitment Process Overview', 'Introduction to recruitment process', 1,
 '<h2>Recruitment Process Overview</h2><p>Learn about recruitment basics:</p><ul><li>Recruitment planning</li><li>Job posting strategies</li><li>Candidate screening</li><li>Selection methods</li></ul>', 1, 0, NULL, 5, '', 1, UNIX_TIMESTAMP()),
(2321, 121, 'Succession Planning Concepts', 'Introduction to succession planning', 1,
 '<h2>Succession Planning Concepts</h2><p>Learn about succession planning:</p><ul><li>Succession planning framework</li><li>Talent identification</li><li>Development planning</li><li>Pipeline management</li></ul>', 1, 0, NULL, 5, '', 1, UNIX_TIMESTAMP());

-- Create URL resources (external links)
INSERT INTO mdl_url (
    id, course, name, intro, introformat, externalurl, display, displayoptions,
    parameters, timemodified
) VALUES
-- Compliance Courses - External Resources
(2400, 100, 'OSHA Safety Guidelines', 'Official OSHA safety guidelines and regulations', 1,
 'https://www.osha.gov/safety-management', 5, '', '', UNIX_TIMESTAMP()),
(2401, 101, 'Cybersecurity Best Practices', 'NIST cybersecurity framework and best practices', 1,
 'https://www.nist.gov/cyberframework', 5, '', '', UNIX_TIMESTAMP()),

-- Learning Programs - External Resources
(2402, 102, 'Employee Handbook', 'Access the complete employee handbook', 1,
 'https://www.slideshare.net/example/employee-handbook-template', 5, '', '', UNIX_TIMESTAMP()),
(2403, 103, 'Company Values Document', 'Detailed company values and code of conduct', 1,
 'https://www.hbr.org/topic/culture', 5, '', '', UNIX_TIMESTAMP()),

-- Short Courses - External Resources
(2404, 104, 'Leadership Resources', 'Additional leadership development resources', 1,
 'https://www.mindtools.com/pages/main/newMN_LDR.htm', 5, '', '', UNIX_TIMESTAMP()),
(2405, 105, 'Communication Tools', 'Tools and templates for effective communication', 1,
 'https://www.skillsyouneed.com/ips/communication-skills.html', 5, '', '', UNIX_TIMESTAMP()),
(2406, 106, 'PMI Project Management Guide', 'PMI project management body of knowledge', 1,
 'https://www.pmi.org/pmbok-guide-standards', 5, '', '', UNIX_TIMESTAMP()),
(2407, 107, 'SQL Tutorial', 'Interactive SQL learning platform', 1,
 'https://www.w3schools.com/sql/', 5, '', '', UNIX_TIMESTAMP()),
(2408, 108, 'Web Development Resources', 'Free web development tutorials and resources', 1,
 'https://developer.mozilla.org/en-US/docs/Learn', 5, '', '', UNIX_TIMESTAMP()),
(2409, 109, 'Sales Training Materials', 'Additional sales training resources', 1,
 'https://blog.hubspot.com/sales/sales-training', 5, '', '', UNIX_TIMESTAMP()),
(2410, 110, 'CRM Software Guide', 'Comparison of popular CRM software solutions', 1,
 'https://www.capterra.com/crm-software/', 5, '', '', UNIX_TIMESTAMP()),

-- Blended Courses - External Resources
(2411, 111, 'Leadership Assessment Tool', 'Online leadership assessment questionnaire', 1,
 'https://www.mindtools.com/pages/article/newLDR_50.htm', 5, '', '', UNIX_TIMESTAMP()),
(2412, 112, 'Customer Service Case Studies', 'Real-world customer service case studies', 1,
 'https://www.zendesk.com/blog/customer-service-examples/', 5, '', '', UNIX_TIMESTAMP()),
(2413, 113, 'Team Building Activities', 'Collection of team building exercises', 1,
 'https://www.sessionlab.com/blog/team-building-activities/', 5, '', '', UNIX_TIMESTAMP()),

-- Life Cycle Courses - External Resources
(2414, 114, 'Onboarding Best Practices', 'HR onboarding best practices and guidelines', 1,
 'https://www.shrm.org/resourcesandtools/tools-and-samples/how-to-guides/pages/onboarding.aspx', 5, '', '', UNIX_TIMESTAMP()),
(2415, 115, 'Exit Interview Guide', 'Comprehensive exit interview guide and templates', 1,
 'https://www.hr.com/en/resources/exit-interview-guide_t1x8qj0m.html', 5, '', '', UNIX_TIMESTAMP()),
(2416, 116, 'Career Development Resources', 'Career development tools and resources', 1,
 'https://www.mindtools.com/pages/article/career-development.htm', 5, '', '', UNIX_TIMESTAMP()),
(2417, 117, 'Performance Management Guide', 'Performance management best practices', 1,
 'https://www.shrm.org/resourcesandtools/tools-and-samples/toolkits/pages/managingemployeeperformance.aspx', 5, '', '', UNIX_TIMESTAMP()),
(2418, 118, 'Talent Acquisition Resources', 'Talent acquisition and recruitment resources', 1,
 'https://www.recruiter.com/recruiting/talent-acquisition/', 5, '', '', UNIX_TIMESTAMP()),
(2419, 119, 'Employee Retention Strategies', 'Employee retention and engagement strategies', 1,
 'https://www.gallup.com/workplace/231593/employee-engagement.aspx', 5, '', '', UNIX_TIMESTAMP()),
(2420, 120, 'Recruitment Process Guide', 'Recruitment and selection process guide', 1,
 'https://www.indeed.com/career-advice/career-development/recruitment-process', 5, '', '', UNIX_TIMESTAMP()),
(2421, 121, 'Succession Planning Guide', 'Succession planning and talent pipeline guide', 1,
 'https://www.shrm.org/resourcesandtools/tools-and-samples/toolkits/pages/successionplanning.aspx', 5, '', '', UNIX_TIMESTAMP());

-- Create H5P activities (interactive content/video)
-- NOTE: After creating H5P activities, run 99_create_h5p_content.sql
-- to create H5P content files that make these activities work.
-- 
-- H5P activities require:
-- 1. H5P content records (mdl_h5p) - created by 99_create_h5p_content.sql
-- 2. H5P file records (mdl_files) - created by 99_create_h5p_content.sql
-- 3. H5P libraries (mdl_h5p_libraries) - created by 99_create_h5p_content.sql
--
-- For full functionality, upload actual H5P files (.h5p) through Moodle UI.
INSERT INTO mdl_h5pactivity (
    id, course, name, timecreated, timemodified, intro, introformat, grade, displayoptions,
    enabletracking, grademethod, reviewmode
) VALUES
-- Compliance Courses - H5P Videos
(2500, 100, 'Safety Training Video', UNIX_TIMESTAMP(), UNIX_TIMESTAMP(),
 'Watch this interactive video on workplace safety procedures. Video: https://www.youtube.com/watch?v=example-safety', 1, 0, 0, 1, 1, 1),
(2501, 101, 'Security Awareness Video', UNIX_TIMESTAMP(), UNIX_TIMESTAMP(),
 'Interactive video on information security threats and prevention. Video: https://www.youtube.com/watch?v=example-security', 1, 0, 0, 1, 1, 1),

-- Learning Programs - H5P Videos
(2502, 102, 'Company Introduction Video', UNIX_TIMESTAMP(), UNIX_TIMESTAMP(),
 'Welcome video introducing our company and culture. Video: https://www.youtube.com/watch?v=example-intro', 1, 0, 0, 1, 1, 1),
(2503, 103, 'Values in Action Video', UNIX_TIMESTAMP(), UNIX_TIMESTAMP(),
 'See how our company values are applied in daily work. Video: https://www.youtube.com/watch?v=example-values', 1, 0, 0, 1, 1, 1),

-- Short Courses - H5P Videos
(2504, 104, 'Leadership Styles Video', UNIX_TIMESTAMP(), UNIX_TIMESTAMP(),
 'Interactive video exploring different leadership styles. Video: https://www.youtube.com/watch?v=example-leadership', 1, 0, 0, 1, 1, 1),
(2505, 105, 'Communication Skills Video', UNIX_TIMESTAMP(), UNIX_TIMESTAMP(),
 'Learn communication techniques through interactive video. Video: https://www.youtube.com/watch?v=example-communication', 1, 0, 0, 1, 1, 1),
(2506, 106, 'Project Planning Video', UNIX_TIMESTAMP(), UNIX_TIMESTAMP(),
 'Step-by-step guide to project planning and execution. Video: https://www.youtube.com/watch?v=example-project', 1, 0, 0, 1, 1, 1),
(2507, 107, 'Database Design Video', UNIX_TIMESTAMP(), UNIX_TIMESTAMP(),
 'Interactive tutorial on database design principles. Video: https://www.youtube.com/watch?v=example-database', 1, 0, 0, 1, 1, 1),
(2508, 108, 'Web Development Tutorial', UNIX_TIMESTAMP(), UNIX_TIMESTAMP(),
 'Hands-on web development tutorial with interactive examples. Video: https://www.youtube.com/watch?v=example-webdev', 1, 0, 0, 1, 1, 1),
(2509, 109, 'Sales Techniques Video', UNIX_TIMESTAMP(), UNIX_TIMESTAMP(),
 'Master sales techniques through interactive scenarios. Video: https://www.youtube.com/watch?v=example-sales', 1, 0, 0, 1, 1, 1),
(2510, 110, 'CRM Implementation Video', UNIX_TIMESTAMP(), UNIX_TIMESTAMP(),
 'Learn how to implement and use CRM effectively. Video: https://www.youtube.com/watch?v=example-crm', 1, 0, 0, 1, 1, 1),

-- Blended Courses - H5P Videos
(2511, 111, 'Leadership Workshop Prep Video', UNIX_TIMESTAMP(), UNIX_TIMESTAMP(),
 'Prepare for the workshop with this interactive video. Video: https://www.youtube.com/watch?v=example-workshop', 1, 0, 0, 1, 1, 1),
(2512, 112, 'Customer Service Scenarios', UNIX_TIMESTAMP(), UNIX_TIMESTAMP(),
 'Practice customer service skills with interactive scenarios. Video: https://www.youtube.com/watch?v=example-service', 1, 0, 0, 1, 1, 1),
(2513, 113, 'Team Collaboration Video', UNIX_TIMESTAMP(), UNIX_TIMESTAMP(),
 'Interactive video on effective team collaboration. Video: https://www.youtube.com/watch?v=example-team', 1, 0, 0, 1, 1, 1),

-- Life Cycle Courses - H5P Videos
(2514, 114, 'Onboarding Compliance Video', UNIX_TIMESTAMP(), UNIX_TIMESTAMP(),
 'Interactive video on onboarding compliance requirements. Video: https://www.youtube.com/watch?v=dQw4w9WgXcQ', 1, 0, 0, 1, 1, 1),
(2515, 115, 'Exit Process Video', UNIX_TIMESTAMP(), UNIX_TIMESTAMP(),
 'Interactive video on employee exit process and compliance. Video: https://www.youtube.com/watch?v=jNQXAC9IVRw', 1, 0, 0, 1, 1, 1),
(2516, 116, 'Career Development Video', UNIX_TIMESTAMP(), UNIX_TIMESTAMP(),
 'Interactive video on career development and planning. Video: https://www.youtube.com/watch?v=9bZkp7q19f0', 1, 0, 0, 1, 1, 1),
(2517, 117, 'Performance Management Video', UNIX_TIMESTAMP(), UNIX_TIMESTAMP(),
 'Interactive video on performance management best practices. Video: https://www.youtube.com/watch?v=kJQP7kiw5Fk', 1, 0, 0, 1, 1, 1),
(2518, 118, 'Talent Acquisition Video', UNIX_TIMESTAMP(), UNIX_TIMESTAMP(),
 'Interactive video on talent acquisition and recruitment. Video: https://www.youtube.com/watch?v=fJ9rUzIMcZQ', 1, 0, 0, 1, 1, 1),
(2519, 119, 'Employee Retention Video', UNIX_TIMESTAMP(), UNIX_TIMESTAMP(),
 'Interactive video on employee retention and engagement. Video: https://www.youtube.com/watch?v=OPf0YbXqDm0', 1, 0, 0, 1, 1, 1),
(2520, 120, 'Recruitment Basics Video', UNIX_TIMESTAMP(), UNIX_TIMESTAMP(),
 'Interactive video on recruitment basics and process. Video: https://www.youtube.com/watch?v=ScMzIvxBSi4', 1, 0, 0, 1, 1, 1),
(2521, 121, 'Succession Planning Video', UNIX_TIMESTAMP(), UNIX_TIMESTAMP(),
 'Interactive video on succession planning and talent pipeline. Video: https://www.youtube.com/watch?v=2Vv-BfVoq4g', 1, 0, 0, 1, 1, 1);

-- Create Course Modules (linking activities to courses)
-- Course Module IDs: 
--   2000-2013 (quiz modules, module = 17)
--   2200-2213 (assign modules, module = 1)
--   2400-2413 (page modules, module = 15)
--   2500-2513 (url modules, module = 21)
--   2600-2613 (h5pactivity modules, module = 10)
INSERT INTO mdl_course_modules (
    id, course, module, instance, section, added, visible, visibleoncoursepage,
    completion, completionview
) VALUES
-- Quiz modules (module = 17)
(2000, 100, 17, 2000, 1003, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Safety Quiz in section 3
(2001, 101, 17, 2001, 1013, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Security Quiz in section 3
(2002, 102, 17, 2002, 1023, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Orientation Quiz in section 3
(2003, 103, 17, 2003, 1033, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Culture Quiz in section 3
(2004, 104, 17, 2004, 1043, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Leadership Quiz in section 3
(2005, 105, 17, 2005, 1053, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Communication Quiz in section 3
(2006, 106, 17, 2006, 1063, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- PM Quiz in section 3
(2007, 107, 17, 2007, 1073, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Database Quiz in section 3
(2008, 108, 17, 2008, 1083, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Web Dev Quiz in section 3
(2009, 109, 17, 2009, 1093, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Sales Quiz in section 3
(2010, 110, 17, 2010, 1103, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- CRM Quiz in section 3
(2011, 111, 17, 2011, 1113, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Leadership Workshop Quiz in section 3
(2012, 112, 17, 2012, 1123, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Customer Service Quiz in section 3
(2013, 113, 17, 2013, 1133, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Team Building Quiz in section 3

-- Assignment modules (module = 1)
(2200, 100, 1, 2100, 1002, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Safety Assignment in section 2
(2201, 101, 1, 2101, 1012, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Security Assignment in section 2
(2202, 102, 1, 2102, 1022, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Orientation Assignment in section 2
(2203, 103, 1, 2103, 1032, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Culture Assignment in section 2
(2204, 104, 1, 2104, 1042, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Leadership Assignment in section 2
(2205, 105, 1, 2105, 1052, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Communication Assignment in section 2
(2206, 106, 1, 2106, 1062, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- PM Assignment in section 2
(2207, 107, 1, 2107, 1072, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Database Assignment in section 2
(2208, 108, 1, 2108, 1082, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Web Dev Assignment in section 2
(2209, 109, 1, 2109, 1092, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Sales Assignment in section 2
(2210, 110, 1, 2110, 1102, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- CRM Assignment in section 2
(2211, 111, 1, 2111, 1112, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Leadership Reflection in section 2
(2212, 112, 1, 2112, 1122, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Service Scenario in section 2
(2213, 113, 1, 2113, 1132, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Team Project in section 2

-- Page modules (module = 15) - Content pages in section 1
(2400, 100, 15, 2300, 1001, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Safety Page in section 1
(2401, 101, 15, 2301, 1011, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Security Page in section 1
(2402, 102, 15, 2302, 1021, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Orientation Page in section 1
(2403, 103, 15, 2303, 1031, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Culture Page in section 1
(2404, 104, 15, 2304, 1041, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Leadership Page in section 1
(2405, 105, 15, 2305, 1051, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Communication Page in section 1
(2406, 106, 15, 2306, 1061, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- PM Page in section 1
(2407, 107, 15, 2307, 1071, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Database Page in section 1
(2408, 108, 15, 2308, 1081, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Web Dev Page in section 1
(2409, 109, 15, 2309, 1091, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Sales Page in section 1
(2410, 110, 15, 2310, 1101, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- CRM Page in section 1
(2411, 111, 15, 2311, 1111, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Leadership Workshop Page in section 1
(2412, 112, 15, 2312, 1121, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Customer Service Page in section 1
(2413, 113, 15, 2313, 1131, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Team Building Page in section 1

-- URL modules (module = 21) - External links in section 1
(2500, 100, 21, 2400, 1001, UNIX_TIMESTAMP(), 1, 1, 0, 0), -- Safety URL in section 1
(2501, 101, 21, 2401, 1011, UNIX_TIMESTAMP(), 1, 1, 0, 0), -- Security URL in section 1
(2502, 102, 21, 2402, 1021, UNIX_TIMESTAMP(), 1, 1, 0, 0), -- Orientation URL in section 1
(2503, 103, 21, 2403, 1031, UNIX_TIMESTAMP(), 1, 1, 0, 0), -- Culture URL in section 1
(2504, 104, 21, 2404, 1041, UNIX_TIMESTAMP(), 1, 1, 0, 0), -- Leadership URL in section 1
(2505, 105, 21, 2405, 1051, UNIX_TIMESTAMP(), 1, 1, 0, 0), -- Communication URL in section 1
(2506, 106, 21, 2406, 1061, UNIX_TIMESTAMP(), 1, 1, 0, 0), -- PM URL in section 1
(2507, 107, 21, 2407, 1071, UNIX_TIMESTAMP(), 1, 1, 0, 0), -- Database URL in section 1
(2508, 108, 21, 2408, 1081, UNIX_TIMESTAMP(), 1, 1, 0, 0), -- Web Dev URL in section 1
(2509, 109, 21, 2409, 1091, UNIX_TIMESTAMP(), 1, 1, 0, 0), -- Sales URL in section 1
(2510, 110, 21, 2410, 1101, UNIX_TIMESTAMP(), 1, 1, 0, 0), -- CRM URL in section 1
(2511, 111, 21, 2411, 1111, UNIX_TIMESTAMP(), 1, 1, 0, 0), -- Leadership Workshop URL in section 1
(2512, 112, 21, 2412, 1121, UNIX_TIMESTAMP(), 1, 1, 0, 0), -- Customer Service URL in section 1
(2513, 113, 21, 2413, 1131, UNIX_TIMESTAMP(), 1, 1, 0, 0), -- Team Building URL in section 1

-- H5P Activity modules (module = 10) - Interactive videos in section 1
(2600, 100, 10, 2500, 1001, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Safety H5P in section 1
(2601, 101, 10, 2501, 1011, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Security H5P in section 1
(2602, 102, 10, 2502, 1021, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Orientation H5P in section 1
(2603, 103, 10, 2503, 1031, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Culture H5P in section 1
(2604, 104, 10, 2504, 1041, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Leadership H5P in section 1
(2605, 105, 10, 2505, 1051, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Communication H5P in section 1
(2606, 106, 10, 2506, 1061, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- PM H5P in section 1
(2607, 107, 10, 2507, 1071, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Database H5P in section 1
(2608, 108, 10, 2508, 1081, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Web Dev H5P in section 1
(2609, 109, 10, 2509, 1091, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Sales H5P in section 1
(2610, 110, 10, 2510, 1101, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- CRM H5P in section 1
(2611, 111, 10, 2511, 1111, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Leadership Workshop H5P in section 1
(2612, 112, 10, 2512, 1121, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Customer Service H5P in section 1
(2613, 113, 10, 2513, 1131, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Team Building H5P in section 1

-- Life Cycle Courses - Course Modules
-- Quiz modules (module = 17)
(2014, 114, 17, 2014, 1143, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Onboarding Compliance Quiz
(2015, 115, 17, 2015, 1153, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Exit Compliance Quiz
(2016, 116, 17, 2016, 1163, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Career Development Quiz
(2017, 117, 17, 2017, 1173, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Performance Management Quiz
(2018, 118, 17, 2018, 1183, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Talent Acquisition Quiz
(2019, 119, 17, 2019, 1193, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Retention & Engagement Quiz
(2020, 120, 17, 2020, 1203, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Recruitment Basics Quiz
(2021, 121, 17, 2021, 1213, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Succession Planning Quiz

-- Assignment modules (module = 1)
(2214, 114, 1, 2114, 1142, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Onboarding Compliance Assignment
(2215, 115, 1, 2115, 1152, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Exit Process Assignment
(2216, 116, 1, 2116, 1162, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Career Development Assignment
(2217, 117, 1, 2117, 1172, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Performance Management Assignment
(2218, 118, 1, 2118, 1182, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Talent Acquisition Assignment
(2219, 119, 1, 2119, 1192, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Retention Strategy Assignment
(2220, 120, 1, 2120, 1202, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Recruitment Process Assignment
(2221, 121, 1, 2121, 1212, UNIX_TIMESTAMP(), 1, 1, 2, 0), -- Succession Plan Assignment

-- Page modules (module = 15) - Content pages in section 1
(2414, 114, 15, 2314, 1141, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Onboarding Compliance Page
(2415, 115, 15, 2315, 1151, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Exit Compliance Page
(2416, 116, 15, 2316, 1161, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Career Development Page
(2417, 117, 15, 2317, 1171, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Performance Management Page
(2418, 118, 15, 2318, 1181, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Talent Acquisition Page
(2419, 119, 15, 2319, 1191, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Retention & Engagement Page
(2420, 120, 15, 2320, 1201, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Recruitment Basics Page
(2421, 121, 15, 2321, 1211, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Succession Planning Page

-- URL modules (module = 21) - External links in section 1
(2514, 114, 21, 2414, 1141, UNIX_TIMESTAMP(), 1, 1, 0, 0), -- Onboarding Compliance URL
(2515, 115, 21, 2415, 1151, UNIX_TIMESTAMP(), 1, 1, 0, 0), -- Exit Compliance URL
(2516, 116, 21, 2416, 1161, UNIX_TIMESTAMP(), 1, 1, 0, 0), -- Career Development URL
(2517, 117, 21, 2417, 1171, UNIX_TIMESTAMP(), 1, 1, 0, 0), -- Performance Management URL
(2518, 118, 21, 2418, 1181, UNIX_TIMESTAMP(), 1, 1, 0, 0), -- Talent Acquisition URL
(2519, 119, 21, 2419, 1191, UNIX_TIMESTAMP(), 1, 1, 0, 0), -- Retention & Engagement URL
(2520, 120, 21, 2420, 1201, UNIX_TIMESTAMP(), 1, 1, 0, 0), -- Recruitment Basics URL
(2521, 121, 21, 2421, 1211, UNIX_TIMESTAMP(), 1, 1, 0, 0), -- Succession Planning URL

-- H5P Activity modules (module = 10) - Interactive videos in section 1
(2614, 114, 10, 2514, 1141, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Onboarding Compliance H5P
(2615, 115, 10, 2515, 1151, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Exit Compliance H5P
(2616, 116, 10, 2516, 1161, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Career Development H5P
(2617, 117, 10, 2517, 1171, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Performance Management H5P
(2618, 118, 10, 2518, 1181, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Talent Acquisition H5P
(2619, 119, 10, 2519, 1191, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Retention & Engagement H5P
(2620, 120, 10, 2520, 1201, UNIX_TIMESTAMP(), 1, 1, 1, 1), -- Recruitment Basics H5P
(2621, 121, 10, 2521, 1211, UNIX_TIMESTAMP(), 1, 1, 1, 1); -- Succession Planning H5P

-- Update section sequences to include module IDs
-- Section 1: Page + URL + H5P (content resources)
UPDATE mdl_course_sections SET sequence = '2400,2500,2600' WHERE id = 1001; -- Safety section 1
UPDATE mdl_course_sections SET sequence = '2401,2501,2601' WHERE id = 1011; -- Security section 1
UPDATE mdl_course_sections SET sequence = '2402,2502,2602' WHERE id = 1021; -- Orientation section 1
UPDATE mdl_course_sections SET sequence = '2403,2503,2603' WHERE id = 1031; -- Culture section 1
UPDATE mdl_course_sections SET sequence = '2404,2504,2604' WHERE id = 1041; -- Leadership section 1
UPDATE mdl_course_sections SET sequence = '2405,2505,2605' WHERE id = 1051; -- Communication section 1
UPDATE mdl_course_sections SET sequence = '2406,2506,2606' WHERE id = 1061; -- PM section 1
UPDATE mdl_course_sections SET sequence = '2407,2507,2607' WHERE id = 1071; -- Database section 1
UPDATE mdl_course_sections SET sequence = '2408,2508,2608' WHERE id = 1081; -- Web Dev section 1
UPDATE mdl_course_sections SET sequence = '2409,2509,2609' WHERE id = 1091; -- Sales section 1
UPDATE mdl_course_sections SET sequence = '2410,2510,2610' WHERE id = 1101; -- CRM section 1
UPDATE mdl_course_sections SET sequence = '2411,2511,2611' WHERE id = 1111; -- Leadership Workshop section 1
UPDATE mdl_course_sections SET sequence = '2412,2512,2612' WHERE id = 1121; -- Customer Service section 1
UPDATE mdl_course_sections SET sequence = '2413,2513,2613' WHERE id = 1131; -- Team Building section 1

-- Section 2: Assignment (practice activities)
UPDATE mdl_course_sections SET sequence = '2200' WHERE id = 1002; -- Safety section 2
UPDATE mdl_course_sections SET sequence = '2201' WHERE id = 1012; -- Security section 2
UPDATE mdl_course_sections SET sequence = '2202' WHERE id = 1022; -- Orientation section 2
UPDATE mdl_course_sections SET sequence = '2203' WHERE id = 1032; -- Culture section 2
UPDATE mdl_course_sections SET sequence = '2204' WHERE id = 1042; -- Leadership section 2
UPDATE mdl_course_sections SET sequence = '2205' WHERE id = 1052; -- Communication section 2
UPDATE mdl_course_sections SET sequence = '2206' WHERE id = 1062; -- PM section 2
UPDATE mdl_course_sections SET sequence = '2207' WHERE id = 1072; -- Database section 2
UPDATE mdl_course_sections SET sequence = '2208' WHERE id = 1082; -- Web Dev section 2
UPDATE mdl_course_sections SET sequence = '2209' WHERE id = 1092; -- Sales section 2
UPDATE mdl_course_sections SET sequence = '2210' WHERE id = 1102; -- CRM section 2
UPDATE mdl_course_sections SET sequence = '2211' WHERE id = 1112; -- Leadership Workshop section 2
UPDATE mdl_course_sections SET sequence = '2212' WHERE id = 1122; -- Customer Service section 2
UPDATE mdl_course_sections SET sequence = '2213' WHERE id = 1132; -- Team Building section 2

-- Section 3: Quiz (assessment activities)
UPDATE mdl_course_sections SET sequence = '2000' WHERE id = 1003; -- Safety section 3
UPDATE mdl_course_sections SET sequence = '2001' WHERE id = 1013; -- Security section 3
UPDATE mdl_course_sections SET sequence = '2002' WHERE id = 1023; -- Orientation section 3
UPDATE mdl_course_sections SET sequence = '2003' WHERE id = 1033; -- Culture section 3
UPDATE mdl_course_sections SET sequence = '2004' WHERE id = 1043; -- Leadership section 3
UPDATE mdl_course_sections SET sequence = '2005' WHERE id = 1053; -- Communication section 3
UPDATE mdl_course_sections SET sequence = '2006' WHERE id = 1063; -- PM section 3
UPDATE mdl_course_sections SET sequence = '2007' WHERE id = 1073; -- Database section 3
UPDATE mdl_course_sections SET sequence = '2008' WHERE id = 1083; -- Web Dev section 3
UPDATE mdl_course_sections SET sequence = '2009' WHERE id = 1093; -- Sales section 3
UPDATE mdl_course_sections SET sequence = '2010' WHERE id = 1103; -- CRM section 3
UPDATE mdl_course_sections SET sequence = '2011' WHERE id = 1113; -- Leadership Workshop section 3
UPDATE mdl_course_sections SET sequence = '2012' WHERE id = 1123; -- Customer Service section 3
UPDATE mdl_course_sections SET sequence = '2013' WHERE id = 1133; -- Team Building section 3

-- Life Cycle Courses - Section sequences
-- Section 1: Page + URL + H5P (content resources)
UPDATE mdl_course_sections SET sequence = '2414,2514,2614' WHERE id = 1141; -- Onboarding Compliance section 1
UPDATE mdl_course_sections SET sequence = '2415,2515,2615' WHERE id = 1151; -- Exit Compliance section 1
UPDATE mdl_course_sections SET sequence = '2416,2516,2616' WHERE id = 1161; -- Career Development section 1
UPDATE mdl_course_sections SET sequence = '2417,2517,2617' WHERE id = 1171; -- Performance Management section 1
UPDATE mdl_course_sections SET sequence = '2418,2518,2618' WHERE id = 1181; -- Talent Acquisition section 1
UPDATE mdl_course_sections SET sequence = '2419,2519,2619' WHERE id = 1191; -- Retention & Engagement section 1
UPDATE mdl_course_sections SET sequence = '2420,2520,2620' WHERE id = 1201; -- Recruitment Basics section 1
UPDATE mdl_course_sections SET sequence = '2421,2521,2621' WHERE id = 1211; -- Succession Planning section 1

-- Section 2: Assignment (practice activities)
UPDATE mdl_course_sections SET sequence = '2214' WHERE id = 1142; -- Onboarding Compliance section 2
UPDATE mdl_course_sections SET sequence = '2215' WHERE id = 1152; -- Exit Compliance section 2
UPDATE mdl_course_sections SET sequence = '2216' WHERE id = 1162; -- Career Development section 2
UPDATE mdl_course_sections SET sequence = '2217' WHERE id = 1172; -- Performance Management section 2
UPDATE mdl_course_sections SET sequence = '2218' WHERE id = 1182; -- Talent Acquisition section 2
UPDATE mdl_course_sections SET sequence = '2219' WHERE id = 1192; -- Retention & Engagement section 2
UPDATE mdl_course_sections SET sequence = '2220' WHERE id = 1202; -- Recruitment Basics section 2
UPDATE mdl_course_sections SET sequence = '2221' WHERE id = 1212; -- Succession Planning section 2

-- Section 3: Quiz (assessment activities)
UPDATE mdl_course_sections SET sequence = '2014' WHERE id = 1143; -- Onboarding Compliance section 3
UPDATE mdl_course_sections SET sequence = '2015' WHERE id = 1153; -- Exit Compliance section 3
UPDATE mdl_course_sections SET sequence = '2016' WHERE id = 1163; -- Career Development section 3
UPDATE mdl_course_sections SET sequence = '2017' WHERE id = 1173; -- Performance Management section 3
UPDATE mdl_course_sections SET sequence = '2018' WHERE id = 1183; -- Talent Acquisition section 3
UPDATE mdl_course_sections SET sequence = '2019' WHERE id = 1193; -- Retention & Engagement section 3
UPDATE mdl_course_sections SET sequence = '2020' WHERE id = 1203; -- Recruitment Basics section 3
UPDATE mdl_course_sections SET sequence = '2021' WHERE id = 1213; -- Succession Planning section 3

-- Create Module Contexts (contextlevel 70)
INSERT INTO mdl_context (
    id, contextlevel, instanceid, path, depth, locked
) VALUES
-- Quiz contexts (module = 17, instanceid = course module ID)
(3000, 70, 2000, '/1/1000/3000', 3, 0), -- Safety Quiz (cmid 2000)
(3001, 70, 2001, '/1/1001/3001', 3, 0), -- Security Quiz (cmid 2001)
(3002, 70, 2002, '/1/1002/3002', 3, 0), -- Orientation Quiz (cmid 2002)
(3003, 70, 2003, '/1/1003/3003', 3, 0), -- Culture Quiz (cmid 2003)
(3004, 70, 2004, '/1/1004/3004', 3, 0), -- Leadership Quiz (cmid 2004)
(3005, 70, 2005, '/1/1005/3005', 3, 0), -- Communication Quiz (cmid 2005)
(3006, 70, 2006, '/1/1006/3006', 3, 0), -- PM Quiz (cmid 2006)
(3007, 70, 2007, '/1/1007/3007', 3, 0), -- Database Quiz (cmid 2007)
(3008, 70, 2008, '/1/1008/3008', 3, 0), -- Web Dev Quiz (cmid 2008)
(3009, 70, 2009, '/1/1009/3009', 3, 0), -- Sales Quiz (cmid 2009)
(3010, 70, 2010, '/1/1010/3010', 3, 0), -- CRM Quiz (cmid 2010)
(3011, 70, 2011, '/1/1011/3011', 3, 0), -- Leadership Workshop Quiz (cmid 2011)
(3012, 70, 2012, '/1/1012/3012', 3, 0), -- Customer Service Quiz (cmid 2012)
(3013, 70, 2013, '/1/1013/3013', 3, 0), -- Team Building Quiz (cmid 2013)

-- Assignment contexts (module = 1, instanceid = course module ID)
(3100, 70, 2200, '/1/1000/3100', 3, 0), -- Safety Assignment (cmid 2200)
(3101, 70, 2201, '/1/1001/3101', 3, 0), -- Security Assignment (cmid 2201)
(3102, 70, 2202, '/1/1002/3102', 3, 0), -- Orientation Assignment (cmid 2202)
(3103, 70, 2203, '/1/1003/3103', 3, 0), -- Culture Assignment (cmid 2203)
(3104, 70, 2204, '/1/1004/3104', 3, 0), -- Leadership Assignment (cmid 2204)
(3105, 70, 2205, '/1/1005/3105', 3, 0), -- Communication Assignment (cmid 2205)
(3106, 70, 2206, '/1/1006/3106', 3, 0), -- PM Assignment (cmid 2206)
(3107, 70, 2207, '/1/1007/3107', 3, 0), -- Database Assignment (cmid 2207)
(3108, 70, 2208, '/1/1008/3108', 3, 0), -- Web Dev Assignment (cmid 2208)
(3109, 70, 2209, '/1/1009/3109', 3, 0), -- Sales Assignment (cmid 2209)
(3110, 70, 2210, '/1/1010/3110', 3, 0), -- CRM Assignment (cmid 2210)
(3111, 70, 2211, '/1/1011/3111', 3, 0), -- Leadership Reflection Assignment (cmid 2211)
(3112, 70, 2212, '/1/1012/3112', 3, 0), -- Service Scenario Assignment (cmid 2212)
(3113, 70, 2213, '/1/1013/3113', 3, 0), -- Team Project Assignment (cmid 2213)

-- Page contexts (module = 15, instanceid = course module ID)
(3200, 70, 2400, '/1/1000/3200', 3, 0), -- Safety Page (cmid 2400)
(3201, 70, 2401, '/1/1001/3201', 3, 0), -- Security Page (cmid 2401)
(3202, 70, 2402, '/1/1002/3202', 3, 0), -- Orientation Page (cmid 2402)
(3203, 70, 2403, '/1/1003/3203', 3, 0), -- Culture Page (cmid 2403)
(3204, 70, 2404, '/1/1004/3204', 3, 0), -- Leadership Page (cmid 2404)
(3205, 70, 2405, '/1/1005/3205', 3, 0), -- Communication Page (cmid 2405)
(3206, 70, 2406, '/1/1006/3206', 3, 0), -- PM Page (cmid 2406)
(3207, 70, 2407, '/1/1007/3207', 3, 0), -- Database Page (cmid 2407)
(3208, 70, 2408, '/1/1008/3208', 3, 0), -- Web Dev Page (cmid 2408)
(3209, 70, 2409, '/1/1009/3209', 3, 0), -- Sales Page (cmid 2409)
(3210, 70, 2410, '/1/1010/3210', 3, 0), -- CRM Page (cmid 2410)
(3211, 70, 2411, '/1/1011/3211', 3, 0), -- Leadership Workshop Page (cmid 2411)
(3212, 70, 2412, '/1/1012/3212', 3, 0), -- Customer Service Page (cmid 2412)
(3213, 70, 2413, '/1/1013/3213', 3, 0), -- Team Building Page (cmid 2413)

-- URL contexts (module = 21, instanceid = course module ID)
(3300, 70, 2500, '/1/1000/3300', 3, 0), -- Safety URL (cmid 2500)
(3301, 70, 2501, '/1/1001/3301', 3, 0), -- Security URL (cmid 2501)
(3302, 70, 2502, '/1/1002/3302', 3, 0), -- Orientation URL (cmid 2502)
(3303, 70, 2503, '/1/1003/3303', 3, 0), -- Culture URL (cmid 2503)
(3304, 70, 2504, '/1/1004/3304', 3, 0), -- Leadership URL (cmid 2504)
(3305, 70, 2505, '/1/1005/3305', 3, 0), -- Communication URL (cmid 2505)
(3306, 70, 2506, '/1/1006/3306', 3, 0), -- PM URL (cmid 2506)
(3307, 70, 2507, '/1/1007/3307', 3, 0), -- Database URL (cmid 2507)
(3308, 70, 2508, '/1/1008/3308', 3, 0), -- Web Dev URL (cmid 2508)
(3309, 70, 2509, '/1/1009/3309', 3, 0), -- Sales URL (cmid 2509)
(3310, 70, 2510, '/1/1010/3310', 3, 0), -- CRM URL (cmid 2510)
(3311, 70, 2511, '/1/1011/3311', 3, 0), -- Leadership Workshop URL (cmid 2511)
(3312, 70, 2512, '/1/1012/3312', 3, 0), -- Customer Service URL (cmid 2512)
(3313, 70, 2513, '/1/1013/3313', 3, 0), -- Team Building URL (cmid 2513)

-- H5P Activity contexts (module = 10, instanceid = course module ID)
(3400, 70, 2600, '/1/1000/3400', 3, 0), -- Safety H5P (cmid 2600)
(3401, 70, 2601, '/1/1001/3401', 3, 0), -- Security H5P (cmid 2601)
(3402, 70, 2602, '/1/1002/3402', 3, 0), -- Orientation H5P (cmid 2602)
(3403, 70, 2603, '/1/1003/3403', 3, 0), -- Culture H5P (cmid 2603)
(3404, 70, 2604, '/1/1004/3404', 3, 0), -- Leadership H5P (cmid 2604)
(3405, 70, 2605, '/1/1005/3405', 3, 0), -- Communication H5P (cmid 2605)
(3406, 70, 2606, '/1/1006/3406', 3, 0), -- PM H5P (cmid 2606)
(3407, 70, 2607, '/1/1007/3407', 3, 0), -- Database H5P (cmid 2607)
(3408, 70, 2608, '/1/1008/3408', 3, 0), -- Web Dev H5P (cmid 2608)
(3409, 70, 2609, '/1/1009/3409', 3, 0), -- Sales H5P (cmid 2609)
(3410, 70, 2610, '/1/1010/3410', 3, 0), -- CRM H5P (cmid 2610)
(3411, 70, 2611, '/1/1011/3411', 3, 0), -- Leadership Workshop H5P (cmid 2611)
(3412, 70, 2612, '/1/1012/3412', 3, 0), -- Customer Service H5P (cmid 2612)
(3413, 70, 2613, '/1/1013/3413', 3, 0), -- Team Building H5P (cmid 2613)

-- Life Cycle Courses - Module Contexts
-- Quiz contexts (module = 17, instanceid = course module ID)
(3500, 70, 2014, '/1/1014/3500', 3, 0), -- Onboarding Compliance Quiz (cmid 2014)
(3501, 70, 2015, '/1/1015/3501', 3, 0), -- Exit Compliance Quiz (cmid 2015)
(3502, 70, 2016, '/1/1016/3502', 3, 0), -- Career Development Quiz (cmid 2016)
(3503, 70, 2017, '/1/1017/3503', 3, 0), -- Performance Management Quiz (cmid 2017)
(3504, 70, 2018, '/1/1018/3504', 3, 0), -- Talent Acquisition Quiz (cmid 2018)
(3505, 70, 2019, '/1/1019/3505', 3, 0), -- Retention & Engagement Quiz (cmid 2019)
(3506, 70, 2020, '/1/1020/3506', 3, 0), -- Recruitment Basics Quiz (cmid 2020)
(3507, 70, 2021, '/1/1021/3507', 3, 0), -- Succession Planning Quiz (cmid 2021)

-- Assignment contexts (module = 1, instanceid = course module ID)
(3600, 70, 2214, '/1/1014/3600', 3, 0), -- Onboarding Compliance Assignment (cmid 2214)
(3601, 70, 2215, '/1/1015/3601', 3, 0), -- Exit Compliance Assignment (cmid 2215)
(3602, 70, 2216, '/1/1016/3602', 3, 0), -- Career Development Assignment (cmid 2216)
(3603, 70, 2217, '/1/1017/3603', 3, 0), -- Performance Management Assignment (cmid 2217)
(3604, 70, 2218, '/1/1018/3604', 3, 0), -- Talent Acquisition Assignment (cmid 2218)
(3605, 70, 2219, '/1/1019/3605', 3, 0), -- Retention & Engagement Assignment (cmid 2219)
(3606, 70, 2220, '/1/1020/3606', 3, 0), -- Recruitment Basics Assignment (cmid 2220)
(3607, 70, 2221, '/1/1021/3607', 3, 0), -- Succession Planning Assignment (cmid 2221)

-- Page contexts (module = 15, instanceid = course module ID)
(3700, 70, 2414, '/1/1014/3700', 3, 0), -- Onboarding Compliance Page (cmid 2414)
(3701, 70, 2415, '/1/1015/3701', 3, 0), -- Exit Compliance Page (cmid 2415)
(3702, 70, 2416, '/1/1016/3702', 3, 0), -- Career Development Page (cmid 2416)
(3703, 70, 2417, '/1/1017/3703', 3, 0), -- Performance Management Page (cmid 2417)
(3704, 70, 2418, '/1/1018/3704', 3, 0), -- Talent Acquisition Page (cmid 2418)
(3705, 70, 2419, '/1/1019/3705', 3, 0), -- Retention & Engagement Page (cmid 2419)
(3706, 70, 2420, '/1/1020/3706', 3, 0), -- Recruitment Basics Page (cmid 2420)
(3707, 70, 2421, '/1/1021/3707', 3, 0), -- Succession Planning Page (cmid 2421)

-- URL contexts (module = 21, instanceid = course module ID)
(3800, 70, 2514, '/1/1014/3800', 3, 0), -- Onboarding Compliance URL (cmid 2514)
(3801, 70, 2515, '/1/1015/3801', 3, 0), -- Exit Compliance URL (cmid 2515)
(3802, 70, 2516, '/1/1016/3802', 3, 0), -- Career Development URL (cmid 2516)
(3803, 70, 2517, '/1/1017/3803', 3, 0), -- Performance Management URL (cmid 2517)
(3804, 70, 2518, '/1/1018/3804', 3, 0), -- Talent Acquisition URL (cmid 2518)
(3805, 70, 2519, '/1/1019/3805', 3, 0), -- Retention & Engagement URL (cmid 2519)
(3806, 70, 2520, '/1/1020/3806', 3, 0), -- Recruitment Basics URL (cmid 2520)
(3807, 70, 2521, '/1/1021/3807', 3, 0), -- Succession Planning URL (cmid 2521)

-- H5P Activity contexts (module = 10, instanceid = course module ID)
(3900, 70, 2614, '/1/1014/3900', 3, 0), -- Onboarding Compliance H5P (cmid 2614)
(3901, 70, 2615, '/1/1015/3901', 3, 0), -- Exit Compliance H5P (cmid 2615)
(3902, 70, 2616, '/1/1016/3902', 3, 0), -- Career Development H5P (cmid 2616)
(3903, 70, 2617, '/1/1017/3903', 3, 0), -- Performance Management H5P (cmid 2617)
(3904, 70, 2618, '/1/1018/3904', 3, 0), -- Talent Acquisition H5P (cmid 2618)
(3905, 70, 2619, '/1/1019/3905', 3, 0), -- Retention & Engagement H5P (cmid 2619)
(3906, 70, 2620, '/1/1020/3906', 3, 0), -- Recruitment Basics H5P (cmid 2620)
(3907, 70, 2621, '/1/1021/3907', 3, 0); -- Succession Planning H5P (cmid 2621)

SELECT '✓ Course modules and activities created' as '';
SELECT '  - 14 Quiz activities' as '';
SELECT '  - 14 Assignment activities' as '';
SELECT '  - 14 Page resources (content pages)' as '';
SELECT '  - 14 URL resources (external links)' as '';
SELECT '  - 14 H5P activities (interactive videos)' as '';
SELECT '  - 70 Course modules total' as '';
SELECT '  - 70 Module contexts total' as '';

-- =========================================================
-- STEP 11: Create Course Extensions
-- =========================================================
SELECT '>>> STEP 7: Creating Course Extensions...' as '';

INSERT INTO mdl_course_extended (
    courseid, course_code, course_type, recommended_level, estimated_hours,
    activity_type, is_self_learning, timecreated, timemodified
) VALUES
-- Compliance Courses (Category 13)
-- Safety & Security Training: บรรยาย (Self-Learning) - 2 ชั่วโมง
(100, 'SAFETY001', 'compliance', NULL, 2.0, 'lecture', 1, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
-- Information Security Awareness: บรรยาย (Self-Learning) - 1.5 ชั่วโมง
(101, 'SEC001', 'compliance', NULL, 1.5, 'lecture', 1, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),

-- Learning Programs (Category 11)
-- New Employee Orientation: บรรยาย+เวิร์คช็อป (Instructor-led) - 3 ชั่วโมง (ตามที่ผู้ใช้ต้องการ)
(102, 'ONBOARD001', 'program', NULL, 3.0, 'lecture_workshop', 0, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
-- Company Culture & Values: บรรยาย (Self-Learning) - 1.5 ชั่วโมง
(103, 'CULTURE001', 'program', NULL, 1.5, 'lecture', 1, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),

-- Blended Courses (Category 12)
-- Advanced Leadership Workshop: บรรยาย+เวิร์คช็อป (Instructor-led) - 8 ชั่วโมง
(111, 'LEAD-BLEND001', 'blended', 5, 8.0, 'lecture_workshop', 0, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
-- Customer Service Excellence: เวิร์คช็อป (Instructor-led) - 6 ชั่วโมง
(112, 'CS-BLEND001', 'blended', NULL, 6.0, 'workshop', 0, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
-- Team Building & Collaboration: เวิร์คช็อป (Instructor-led) - 5 ชั่วโมง
(113, 'TEAM-BLEND001', 'blended', 3, 5.0, 'workshop', 0, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),

-- Short Courses (Category 10)
-- Leadership Fundamentals: บรรยาย (Self-Learning) - 3 ชั่วโมง
(104, 'LEAD001', 'short', 5, 3.0, 'lecture', 1, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
-- Effective Communication: บรรยาย (Self-Learning) - 2.5 ชั่วโมง
(105, 'COMM001', 'short', NULL, 2.5, 'lecture', 1, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
-- Project Management Basics: บรรยาย+เวิร์คช็อป (Instructor-led) - 4 ชั่วโมง
(106, 'PM001', 'short', 3, 4.0, 'lecture_workshop', 0, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
-- Database Fundamentals: บรรยาย (Self-Learning) - 6 ชั่วโมง
(107, 'DB001', 'short', NULL, 6.0, 'lecture', 1, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
-- Web Development Basics: บรรยาย+เวิร์คช็อป (Instructor-led) - 8 ชั่วโมง
(108, 'WEB001', 'short', NULL, 8.0, 'lecture_workshop', 0, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
-- Sales Techniques: เวิร์คช็อป (Instructor-led) - 3.5 ชั่วโมง
(109, 'SALES001', 'short', NULL, 3.5, 'workshop', 0, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
-- Customer Relationship Management: บรรยาย (Self-Learning) - 2.5 ชั่วโมง
(110, 'CRM001', 'short', 2, 2.5, 'lecture', 1, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),

-- Life Cycle Courses - Course Extended
-- Compliance Courses - Life Cycle (Category 13)
-- Employee Life Cycle: Onboarding Compliance: บรรยาย (Self-Learning) - 2.5 ชั่วโมง
(114, 'LIFECYCLE-COMP001', 'compliance', NULL, 2.5, 'lecture', 1, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
-- Employee Life Cycle: Exit Compliance: บรรยาย (Self-Learning) - 2 ชั่วโมง
(115, 'LIFECYCLE-COMP002', 'compliance', NULL, 2.0, 'lecture', 1, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),

-- Learning Programs - Life Cycle (Category 11)
-- Employee Life Cycle: Career Development Program: บรรยาย+เวิร์คช็อป (Instructor-led) - 6 ชั่วโมง
(116, 'LIFECYCLE-PROG001', 'program', NULL, 6.0, 'lecture_workshop', 0, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
-- Employee Life Cycle: Performance Management Program: บรรยาย+เวิร์คช็อป (Instructor-led) - 5 ชั่วโมง
(117, 'LIFECYCLE-PROG002', 'program', NULL, 5.0, 'lecture_workshop', 0, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),

-- Blended Courses - Life Cycle (Category 12)
-- Employee Life Cycle: Talent Acquisition Workshop: เวิร์คช็อป (Instructor-led) - 7 ชั่วโมง
(118, 'LIFECYCLE-BLEND001', 'blended', 3, 7.0, 'workshop', 0, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
-- Employee Life Cycle: Retention & Engagement Workshop: เวิร์คช็อป (Instructor-led) - 6.5 ชั่วโมง
(119, 'LIFECYCLE-BLEND002', 'blended', 4, 6.5, 'workshop', 0, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),

-- Short Courses - Life Cycle (Category 10)
-- Employee Life Cycle: Recruitment Basics: บรรยาย (Self-Learning) - 3.5 ชั่วโมง
(120, 'LIFECYCLE-SHORT001', 'short', NULL, 3.5, 'lecture', 1, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
-- Employee Life Cycle: Succession Planning: บรรยาย+เวิร์คช็อป (Instructor-led) - 4.5 ชั่วโมง
(121, 'LIFECYCLE-SHORT002', 'short', 5, 4.5, 'lecture_workshop', 0, UNIX_TIMESTAMP(), UNIX_TIMESTAMP());

SELECT '✓ Course extensions created' as '';

-- =========================================================
-- STEP 12: Link Courses to Learning Programs
-- =========================================================
SELECT '>>> STEP 11: Linking Courses to Learning Programs...' as '';

-- NOTE: Learning programs (IDs 1-3) were created in 98_sample_data.sql:
-- Program 1: New Employee Onboarding
-- Program 2: Leadership Development Program
-- Program 3: Compliance & Safety Training

-- NOTE: Using INSERT IGNORE to avoid duplicate key errors (UNIQUE KEY on programid, courseid)
INSERT IGNORE INTO mdl_learning_program_courses (
    programid, courseid, sequence, mandatory, prerequisiteid, timecreated
) VALUES
-- Program 1: New Employee Onboarding (from 98_sample_data.sql)
(1, 102, 1, 1, NULL, UNIX_TIMESTAMP()), -- New Employee Orientation
(1, 103, 2, 1, 102, UNIX_TIMESTAMP()), -- Company Culture (requires Orientation)
(1, 100, 3, 1, NULL, UNIX_TIMESTAMP()), -- Safety Training

-- Program 2: Leadership Development Program (from 98_sample_data.sql)
(2, 104, 1, 1, NULL, UNIX_TIMESTAMP()), -- Leadership Fundamentals
(2, 105, 2, 0, NULL, UNIX_TIMESTAMP()), -- Effective Communication (optional)
(2, 106, 3, 0, 104, UNIX_TIMESTAMP()), -- Project Management (requires Leadership)

-- Program 3: Compliance & Safety Training (from 98_sample_data.sql)
(3, 100, 1, 1, NULL, UNIX_TIMESTAMP()), -- Safety Training
(3, 101, 2, 1, NULL, UNIX_TIMESTAMP()); -- Information Security

SELECT '✓ Program-course links created' as '';

-- =========================================================
-- STEP 13: Create Enrollments
-- =========================================================
SELECT '>>> STEP 12: Creating Enrollments...' as '';

-- First create enrol instances for each course
INSERT INTO mdl_enrol (
    id, enrol, status, courseid, sortorder, roleid, timecreated, timemodified
) VALUES
(200, 'manual', 0, 100, 0, 5, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(201, 'manual', 0, 101, 0, 5, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(202, 'manual', 0, 102, 0, 5, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(203, 'manual', 0, 103, 0, 5, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(204, 'manual', 0, 104, 0, 5, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(205, 'manual', 0, 105, 0, 5, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(206, 'manual', 0, 106, 0, 5, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(207, 'manual', 0, 107, 0, 5, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(208, 'manual', 0, 108, 0, 5, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(209, 'manual', 0, 109, 0, 5, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(210, 'manual', 0, 110, 0, 5, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(211, 'manual', 0, 111, 0, 5, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(212, 'manual', 0, 112, 0, 5, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(213, 'manual', 0, 113, 0, 5, UNIX_TIMESTAMP(), UNIX_TIMESTAMP());

-- Note: roleid 5 is typically "Student" role in Moodle

-- Now create user enrollments
-- NOTE: mdl_user_enrolments structure: id, status, enrolid, userid, timestart, timeend, modifierid, timecreated, timemodified
-- NOTE: Using INSERT IGNORE to avoid duplicate key errors (UNIQUE KEY on enrolid, userid)
-- NOTE: id is AUTO_INCREMENT, so we don't specify it
INSERT IGNORE INTO mdl_user_enrolments (
    status, enrolid, userid, timestart, timeend, modifierid, timecreated, timemodified
) VALUES
-- Safety Training (Course 100) - All employees
(0, 200, 113, UNIX_TIMESTAMP() - 86400*30, 2147483647, 0, UNIX_TIMESTAMP() - 86400*30, UNIX_TIMESTAMP()),
(0, 200, 114, UNIX_TIMESTAMP() - 86400*25, 2147483647, 0, UNIX_TIMESTAMP() - 86400*25, UNIX_TIMESTAMP()),
(0, 200, 115, UNIX_TIMESTAMP() - 86400*20, 2147483647, 0, UNIX_TIMESTAMP() - 86400*20, UNIX_TIMESTAMP()),
(0, 200, 116, UNIX_TIMESTAMP() - 86400*15, 2147483647, 0, UNIX_TIMESTAMP() - 86400*15, UNIX_TIMESTAMP()),

-- Info Security (Course 101) - IT and Managers
(0, 201, 104, UNIX_TIMESTAMP() - 86400*20, 2147483647, 0, UNIX_TIMESTAMP() - 86400*20, UNIX_TIMESTAMP()),
(0, 201, 115, UNIX_TIMESTAMP() - 86400*18, 2147483647, 0, UNIX_TIMESTAMP() - 86400*18, UNIX_TIMESTAMP()),
(0, 201, 117, UNIX_TIMESTAMP() - 86400*16, 2147483647, 0, UNIX_TIMESTAMP() - 86400*16, UNIX_TIMESTAMP()),

-- Onboarding (Course 102) - New employees
(0, 202, 125, UNIX_TIMESTAMP() - 86400*10, 2147483647, 0, UNIX_TIMESTAMP() - 86400*10, UNIX_TIMESTAMP()),
(0, 202, 126, UNIX_TIMESTAMP() - 86400*8, 2147483647, 0, UNIX_TIMESTAMP() - 86400*8, UNIX_TIMESTAMP()),
(0, 202, 127, UNIX_TIMESTAMP() - 86400*5, 2147483647, 0, UNIX_TIMESTAMP() - 86400*5, UNIX_TIMESTAMP()),

-- Leadership (Course 104) - Managers
(0, 204, 103, UNIX_TIMESTAMP() - 86400*10, 2147483647, 0, UNIX_TIMESTAMP() - 86400*10, UNIX_TIMESTAMP()),
(0, 204, 104, UNIX_TIMESTAMP() - 86400*8, 2147483647, 0, UNIX_TIMESTAMP() - 86400*8, UNIX_TIMESTAMP()),
(0, 204, 105, UNIX_TIMESTAMP() - 86400*6, 2147483647, 0, UNIX_TIMESTAMP() - 86400*6, UNIX_TIMESTAMP()),

-- Sales Courses (109, 110) - Sales team
(0, 209, 105, UNIX_TIMESTAMP() - 86400*5, 2147483647, 0, UNIX_TIMESTAMP() - 86400*5, UNIX_TIMESTAMP()),
(0, 209, 122, UNIX_TIMESTAMP() - 86400*4, 2147483647, 0, UNIX_TIMESTAMP() - 86400*4, UNIX_TIMESTAMP()),
(0, 209, 123, UNIX_TIMESTAMP() - 86400*3, 2147483647, 0, UNIX_TIMESTAMP() - 86400*3, UNIX_TIMESTAMP()),
(0, 210, 124, UNIX_TIMESTAMP() - 86400*2, 2147483647, 0, UNIX_TIMESTAMP() - 86400*2, UNIX_TIMESTAMP()),
(0, 210, 125, UNIX_TIMESTAMP() - 86400*1, 2147483647, 0, UNIX_TIMESTAMP() - 86400*1, UNIX_TIMESTAMP());

SELECT '✓ Enrollments created (17 initial + additional enrollments)' as '';

-- =========================================================
-- STEP 14: Create Course Completions (Partial)
-- =========================================================
SELECT '>>> STEP 13: Creating Course Completions...' as '';

-- NOTE: mdl_course_completions structure (from moodle_dev.sql):
-- id, userid, course, timeenrolled, timestarted, timecompleted, reaggregate
-- IMPORTANT: This table does NOT have timecreated or timemodified columns!
-- NOTE: Using INSERT IGNORE to avoid duplicate key errors (UNIQUE KEY on userid, course)

INSERT IGNORE INTO mdl_course_completions (
    id, userid, course, timeenrolled, timestarted, timecompleted, reaggregate
) VALUES
(1000, 113, 100, UNIX_TIMESTAMP() - 86400*30, UNIX_TIMESTAMP() - 86400*25, UNIX_TIMESTAMP() - 86400*20, 0),
(1001, 114, 100, UNIX_TIMESTAMP() - 86400*25, UNIX_TIMESTAMP() - 86400*20, UNIX_TIMESTAMP() - 86400*15, 0),
(1002, 115, 101, UNIX_TIMESTAMP() - 86400*18, UNIX_TIMESTAMP() - 86400*15, UNIX_TIMESTAMP() - 86400*10, 0),
(1003, 103, 104, UNIX_TIMESTAMP() - 86400*10, UNIX_TIMESTAMP() - 86400*8, UNIX_TIMESTAMP() - 86400*2, 0),
(1004, 105, 109, UNIX_TIMESTAMP() - 86400*5, UNIX_TIMESTAMP() - 86400*4, UNIX_TIMESTAMP() - 86400*1, 0);

SELECT '✓ Course completions created (5 initial + 12 additional = 17 total completions)' as '';

-- =========================================================
-- STEP 15: Create Certificates
-- =========================================================
SELECT '>>> STEP 14: Creating Certificates...' as '';

-- NOTE: Using INSERT IGNORE to avoid duplicate key errors if certificates already exist
INSERT IGNORE INTO mdl_certificate_expiry (
    userid, courseid, issue_date, expiry_date, cert_number, status, timecreated, timemodified
) VALUES
(113, 100, UNIX_TIMESTAMP() - 86400*20, UNIX_TIMESTAMP() + 86400*365, 'CERT-SAFETY-2026-001', 'valid', UNIX_TIMESTAMP() - 86400*20, UNIX_TIMESTAMP() - 86400*20),
(114, 100, UNIX_TIMESTAMP() - 86400*15, UNIX_TIMESTAMP() + 86400*365, 'CERT-SAFETY-2026-002', 'valid', UNIX_TIMESTAMP() - 86400*15, UNIX_TIMESTAMP() - 86400*15),
(115, 101, UNIX_TIMESTAMP() - 86400*10, UNIX_TIMESTAMP() + 86400*730, 'CERT-SEC-2026-001', 'valid', UNIX_TIMESTAMP() - 86400*10, UNIX_TIMESTAMP() - 86400*10),
(103, 104, UNIX_TIMESTAMP() - 86400*2, NULL, 'CERT-LEAD-2026-001', 'valid', UNIX_TIMESTAMP() - 86400*2, UNIX_TIMESTAMP() - 86400*2),
(105, 109, UNIX_TIMESTAMP() - 86400*1, NULL, 'CERT-SALES-2026-001', 'valid', UNIX_TIMESTAMP() - 86400*1, UNIX_TIMESTAMP() - 86400*1);

SELECT '✓ Certificates created (5 initial + 12 additional = 17 total certificates)' as '';

-- =========================================================
-- STEP 16: Create Compliance Tracking
-- =========================================================
SELECT '>>> STEP 15: Creating Compliance Tracking Records...' as '';

-- NOTE: Using INSERT IGNORE to avoid duplicate key errors (UNIQUE KEY on userid, courseid)
INSERT IGNORE INTO mdl_compliance_tracking (
    userid, courseid, due_date, completion_date, status, timecreated, timemodified
) VALUES
-- Completed
(113, 100, UNIX_TIMESTAMP() - 86400*20, UNIX_TIMESTAMP() - 86400*20, 'completed', UNIX_TIMESTAMP() - 86400*30, UNIX_TIMESTAMP() - 86400*20),
(114, 100, UNIX_TIMESTAMP() - 86400*15, UNIX_TIMESTAMP() - 86400*15, 'completed', UNIX_TIMESTAMP() - 86400*25, UNIX_TIMESTAMP() - 86400*15),

-- In Progress
(115, 101, UNIX_TIMESTAMP() + 86400*30, NULL, 'in_progress', UNIX_TIMESTAMP() - 86400*18, UNIX_TIMESTAMP()),

-- Pending
(116, 100, UNIX_TIMESTAMP() + 86400*60, NULL, 'pending', UNIX_TIMESTAMP() - 86400*15, UNIX_TIMESTAMP()),
(117, 101, UNIX_TIMESTAMP() + 86400*45, NULL, 'pending', UNIX_TIMESTAMP() - 86400*16, UNIX_TIMESTAMP()),

-- Overdue
(118, 100, UNIX_TIMESTAMP() - 86400*10, NULL, 'overdue', UNIX_TIMESTAMP() - 86400*75, UNIX_TIMESTAMP()),
(119, 101, UNIX_TIMESTAMP() - 86400*5, NULL, 'overdue', UNIX_TIMESTAMP() - 86400*100, UNIX_TIMESTAMP());

SELECT '✓ Compliance tracking records created' as '';

-- =========================================================
-- STEP 17: Create Auto-Enrollment Rules
-- =========================================================
SELECT '>>> STEP 16: Creating Auto-Enrollment Rules...' as '';

-- NOTE: Uses department IDs from 98_sample_data.sql:
-- Department 4 = IT-DEV, Department 11 = SALES-DOM
-- Position levels 1-13 from 98_sample_data.sql

INSERT INTO mdl_auto_enrollment_rules (
    name, courseid, rule_type, target_id, level_min, level_max, active, timecreated, timemodified
) VALUES
('All Employees - Safety Training', 100, 'level', NULL, 1, 13, 1, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
('Managers - Leadership Course', 104, 'level', NULL, 5, 7, 1, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
('IT Department - Security Course', 101, 'department', 4, NULL, NULL, 1, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()), -- IT-DEV (dept 4)
('Sales Team - Sales Techniques', 109, 'department', 11, NULL, NULL, 1, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()), -- SALES-DOM (dept 11)
('New Employees - Onboarding', 102, 'hire_date', NULL, NULL, NULL, 1, UNIX_TIMESTAMP(), UNIX_TIMESTAMP());

SELECT '✓ Auto-enrollment rules created' as '';

-- =========================================================
-- STEP 18: Create Job Role Courses Rules
-- =========================================================
SELECT '>>> STEP 17: Creating Job Role Courses Rules...' as '';

-- NOTE: Job roles from user profile fields: Manager, Supervisor, Senior Staff, Junior Staff, Intern
-- These rules will auto-enroll users based on their job role

INSERT INTO mdl_job_role_courses (
    jobrole, courseid, enrolltype, mandatory, deadline, active, timecreated, timemodified
) VALUES
-- All Employees - Safety Training (mandatory)
('Manager', 100, 'auto', 1, 30, 1, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
('Supervisor', 100, 'auto', 1, 30, 1, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
('Senior Staff', 100, 'auto', 1, 30, 1, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
('Junior Staff', 100, 'auto', 1, 30, 1, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
('Intern', 100, 'auto', 1, 30, 1, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),

-- Managers - Leadership Course (mandatory)
('Manager', 104, 'auto', 1, 60, 1, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),

-- Supervisors - Communication Course (optional)
('Supervisor', 105, 'auto', 0, NULL, 1, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),

-- IT Staff - Security Course (mandatory)
('Senior Staff', 101, 'auto', 1, 45, 1, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
('Junior Staff', 101, 'auto', 1, 45, 1, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),

-- New Employees - Onboarding (mandatory)
('Intern', 102, 'auto', 1, 7, 1, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
('Junior Staff', 102, 'auto', 1, 7, 1, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),

-- Sales Team - Sales Techniques (mandatory for sales roles)
('Manager', 109, 'auto', 1, 90, 1, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
('Supervisor', 109, 'auto', 1, 90, 1, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
('Senior Staff', 109, 'auto', 0, NULL, 1, UNIX_TIMESTAMP(), UNIX_TIMESTAMP());

SELECT '✓ Job role courses rules created' as '';

-- =========================================================
-- STEP 19: Sync User Profile Data (from mdl_user_employment)
-- =========================================================
SELECT '>>> STEP 18: Syncing User Profile Data...' as '';

-- Sync Employee ID
INSERT INTO `mdl_user_info_data` (`userid`, `fieldid`, `data`, `dataformat`)
SELECT 
  ue.userid,
  (SELECT id FROM mdl_user_info_field WHERE shortname = 'employeeid' LIMIT 1) as fieldid,
  ue.employee_id as data,
  0 as dataformat
FROM mdl_user_employment ue
WHERE ue.employee_id IS NOT NULL
  AND ue.employee_id != ''
  AND NOT EXISTS (
    SELECT 1 FROM mdl_user_info_data uid
    WHERE uid.userid = ue.userid 
    AND uid.fieldid = (SELECT id FROM mdl_user_info_field WHERE shortname = 'employeeid' LIMIT 1)
  );

-- Sync Job Role (map from position level)
INSERT INTO `mdl_user_info_data` (`userid`, `fieldid`, `data`, `dataformat`)
SELECT 
  ue.userid,
  (SELECT id FROM mdl_user_info_field WHERE shortname = 'jobrole' LIMIT 1) as fieldid,
  CASE 
    WHEN op.level >= 5 THEN 'Manager'
    WHEN op.level >= 3 THEN 'Supervisor'
    WHEN op.level >= 2 THEN 'Senior Staff'
    ELSE 'Junior Staff'
  END as data,
  0 as dataformat
FROM mdl_user_employment ue
LEFT JOIN mdl_org_position op ON ue.positionid = op.id
WHERE ue.positionid IS NOT NULL
  AND op.id IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM mdl_user_info_data uid
    WHERE uid.userid = ue.userid 
    AND uid.fieldid = (SELECT id FROM mdl_user_info_field WHERE shortname = 'jobrole' LIMIT 1)
  );

-- Sync Department (map from department code)
INSERT INTO `mdl_user_info_data` (`userid`, `fieldid`, `data`, `dataformat`)
SELECT 
  ue.userid,
  (SELECT id FROM mdl_user_info_field WHERE shortname = 'department' LIMIT 1) as fieldid,
  CASE 
    WHEN od.code LIKE 'HR%' THEN 'HR'
    WHEN od.code LIKE 'IT%' OR od.code LIKE 'ICT%' THEN 'ICT'
    WHEN od.code LIKE 'FIN%' THEN 'FINANCE'
    WHEN od.code LIKE 'SALES%' THEN 'SALES'
    WHEN od.code LIKE 'OPS%' THEN 'OPERATIONS'
    ELSE 'HR'
  END as data,
  0 as dataformat
FROM mdl_user_employment ue
LEFT JOIN mdl_org_department od ON ue.departmentid = od.id
WHERE ue.departmentid IS NOT NULL
  AND od.id IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM mdl_user_info_data uid
    WHERE uid.userid = ue.userid 
    AND uid.fieldid = (SELECT id FROM mdl_user_info_field WHERE shortname = 'department' LIMIT 1)
  );

-- Sync Position Level (map from position code)
INSERT INTO `mdl_user_info_data` (`userid`, `fieldid`, `data`, `dataformat`)
SELECT 
  ue.userid,
  (SELECT id FROM mdl_user_info_field WHERE shortname = 'positionlevel' LIMIT 1) as fieldid,
  op.code as data,
  0 as dataformat
FROM mdl_user_employment ue
INNER JOIN mdl_org_position op ON ue.positionid = op.id
WHERE ue.positionid IS NOT NULL
  AND op.code IS NOT NULL
  AND op.code != ''
  AND NOT EXISTS (
    SELECT 1 FROM mdl_user_info_data uid
    WHERE uid.userid = ue.userid 
    AND uid.fieldid = (SELECT id FROM mdl_user_info_field WHERE shortname = 'positionlevel' LIMIT 1)
  );

SELECT '✓ User profile data synced from mdl_user_employment' as '';
SELECT '  - Employee IDs synced' as '';
SELECT '  - Job roles synced (from position levels)' as '';
SELECT '  - Departments synced (from department codes)' as '';
SELECT '  - Position levels synced (from position codes)' as '';

-- =========================================================
-- STEP 19: Add More Enrollments (Cover All Users & More Courses)
-- =========================================================
SELECT '>>> STEP 19: Adding More Enrollments...' as '';

-- Add enroll instances for remaining courses (114-121)
INSERT INTO mdl_enrol (
    id, enrol, status, courseid, sortorder, roleid, timecreated, timemodified
) VALUES
(214, 'manual', 0, 114, 0, 5, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(215, 'manual', 0, 115, 0, 5, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(216, 'manual', 0, 116, 0, 5, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(217, 'manual', 0, 117, 0, 5, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(218, 'manual', 0, 118, 0, 5, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(219, 'manual', 0, 119, 0, 5, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(220, 'manual', 0, 120, 0, 5, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(221, 'manual', 0, 121, 0, 5, UNIX_TIMESTAMP(), UNIX_TIMESTAMP())
ON DUPLICATE KEY UPDATE id = id;

-- Add more enrollments for all users across multiple courses
INSERT IGNORE INTO mdl_user_enrolments (
    status, enrolid, userid, timestart, timeend, modifierid, timecreated, timemodified
) VALUES
-- More enrollments for existing users in different courses
-- Communication Course (105)
(0, 205, 103, UNIX_TIMESTAMP() - 86400*15, 2147483647, 0, UNIX_TIMESTAMP() - 86400*15, UNIX_TIMESTAMP()),
(0, 205, 108, UNIX_TIMESTAMP() - 86400*12, 2147483647, 0, UNIX_TIMESTAMP() - 86400*12, UNIX_TIMESTAMP()),
(0, 205, 113, UNIX_TIMESTAMP() - 86400*10, 2147483647, 0, UNIX_TIMESTAMP() - 86400*10, UNIX_TIMESTAMP()),
(0, 205, 114, UNIX_TIMESTAMP() - 86400*8, 2147483647, 0, UNIX_TIMESTAMP() - 86400*8, UNIX_TIMESTAMP()),

-- Project Management (106)
(0, 206, 104, UNIX_TIMESTAMP() - 86400*14, 2147483647, 0, UNIX_TIMESTAMP() - 86400*14, UNIX_TIMESTAMP()),
(0, 206, 115, UNIX_TIMESTAMP() - 86400*12, 2147483647, 0, UNIX_TIMESTAMP() - 86400*12, UNIX_TIMESTAMP()),
(0, 206, 117, UNIX_TIMESTAMP() - 86400*10, 2147483647, 0, UNIX_TIMESTAMP() - 86400*10, UNIX_TIMESTAMP()),

-- Database Fundamentals (107)
(0, 207, 115, UNIX_TIMESTAMP() - 86400*11, 2147483647, 0, UNIX_TIMESTAMP() - 86400*11, UNIX_TIMESTAMP()),
(0, 207, 117, UNIX_TIMESTAMP() - 86400*9, 2147483647, 0, UNIX_TIMESTAMP() - 86400*9, UNIX_TIMESTAMP()),
(0, 207, 118, UNIX_TIMESTAMP() - 86400*7, 2147483647, 0, UNIX_TIMESTAMP() - 86400*7, UNIX_TIMESTAMP()),

-- Web Development (108)
(0, 208, 115, UNIX_TIMESTAMP() - 86400*10, 2147483647, 0, UNIX_TIMESTAMP() - 86400*10, UNIX_TIMESTAMP()),
(0, 208, 117, UNIX_TIMESTAMP() - 86400*8, 2147483647, 0, UNIX_TIMESTAMP() - 86400*8, UNIX_TIMESTAMP()),

-- CRM (110)
(0, 210, 105, UNIX_TIMESTAMP() - 86400*3, 2147483647, 0, UNIX_TIMESTAMP() - 86400*3, UNIX_TIMESTAMP()),
(0, 210, 122, UNIX_TIMESTAMP() - 86400*2, 2147483647, 0, UNIX_TIMESTAMP() - 86400*2, UNIX_TIMESTAMP()),
(0, 210, 123, UNIX_TIMESTAMP() - 86400*1, 2147483647, 0, UNIX_TIMESTAMP() - 86400*1, UNIX_TIMESTAMP()),

-- Blended Courses
(0, 211, 103, UNIX_TIMESTAMP() - 86400*7, 2147483647, 0, UNIX_TIMESTAMP() - 86400*7, UNIX_TIMESTAMP()),
(0, 211, 104, UNIX_TIMESTAMP() - 86400*6, 2147483647, 0, UNIX_TIMESTAMP() - 86400*6, UNIX_TIMESTAMP()),
(0, 212, 105, UNIX_TIMESTAMP() - 86400*5, 2147483647, 0, UNIX_TIMESTAMP() - 86400*5, UNIX_TIMESTAMP()),
(0, 213, 108, UNIX_TIMESTAMP() - 86400*4, 2147483647, 0, UNIX_TIMESTAMP() - 86400*4, UNIX_TIMESTAMP()),

-- Life Cycle Courses - Onboarding Compliance (114)
(0, 214, 125, UNIX_TIMESTAMP() - 86400*9, 2147483647, 0, UNIX_TIMESTAMP() - 86400*9, UNIX_TIMESTAMP()),
(0, 214, 126, UNIX_TIMESTAMP() - 86400*7, 2147483647, 0, UNIX_TIMESTAMP() - 86400*7, UNIX_TIMESTAMP()),
(0, 214, 127, UNIX_TIMESTAMP() - 86400*4, 2147483647, 0, UNIX_TIMESTAMP() - 86400*4, UNIX_TIMESTAMP()),

-- Life Cycle Courses - Career Development (116)
(0, 216, 113, UNIX_TIMESTAMP() - 86400*8, 2147483647, 0, UNIX_TIMESTAMP() - 86400*8, UNIX_TIMESTAMP()),
(0, 216, 114, UNIX_TIMESTAMP() - 86400*6, 2147483647, 0, UNIX_TIMESTAMP() - 86400*6, UNIX_TIMESTAMP()),
(0, 216, 115, UNIX_TIMESTAMP() - 86400*4, 2147483647, 0, UNIX_TIMESTAMP() - 86400*4, UNIX_TIMESTAMP());

SELECT '✓ Additional enrollments created' as '';

-- =========================================================
-- STEP 20: Add More Course Completions
-- =========================================================
SELECT '>>> STEP 20: Adding More Course Completions...' as '';

INSERT IGNORE INTO mdl_course_completions (
    id, userid, course, timeenrolled, timestarted, timecompleted, reaggregate
) VALUES
-- More completions for existing enrollments
(1005, 103, 105, UNIX_TIMESTAMP() - 86400*15, UNIX_TIMESTAMP() - 86400*12, UNIX_TIMESTAMP() - 86400*5, 0),
(1006, 108, 105, UNIX_TIMESTAMP() - 86400*12, UNIX_TIMESTAMP() - 86400*10, UNIX_TIMESTAMP() - 86400*3, 0),
(1007, 104, 106, UNIX_TIMESTAMP() - 86400*14, UNIX_TIMESTAMP() - 86400*11, UNIX_TIMESTAMP() - 86400*2, 0),
(1008, 115, 106, UNIX_TIMESTAMP() - 86400*12, UNIX_TIMESTAMP() - 86400*9, UNIX_TIMESTAMP() - 86400*1, 0),
(1009, 115, 107, UNIX_TIMESTAMP() - 86400*11, UNIX_TIMESTAMP() - 86400*8, UNIX_TIMESTAMP() - 86400*1, 0),
(1010, 117, 107, UNIX_TIMESTAMP() - 86400*9, UNIX_TIMESTAMP() - 86400*6, UNIX_TIMESTAMP() - 86400*1, 0),
(1011, 115, 108, UNIX_TIMESTAMP() - 86400*10, UNIX_TIMESTAMP() - 86400*7, UNIX_TIMESTAMP() - 86400*1, 0),
(1012, 105, 110, UNIX_TIMESTAMP() - 86400*3, UNIX_TIMESTAMP() - 86400*2, UNIX_TIMESTAMP() - 86400*1, 0),
(1013, 122, 110, UNIX_TIMESTAMP() - 86400*2, UNIX_TIMESTAMP() - 86400*1, UNIX_TIMESTAMP() - 86400*1, 0),
(1014, 103, 111, UNIX_TIMESTAMP() - 86400*7, UNIX_TIMESTAMP() - 86400*5, UNIX_TIMESTAMP() - 86400*1, 0),
(1015, 125, 114, UNIX_TIMESTAMP() - 86400*9, UNIX_TIMESTAMP() - 86400*6, UNIX_TIMESTAMP() - 86400*1, 0),
(1016, 113, 116, UNIX_TIMESTAMP() - 86400*8, UNIX_TIMESTAMP() - 86400*5, UNIX_TIMESTAMP() - 86400*1, 0);

SELECT '✓ Additional course completions created' as '';

-- =========================================================
-- STEP 21: Add More Certificates
-- =========================================================
SELECT '>>> STEP 21: Adding More Certificates...' as '';

INSERT IGNORE INTO mdl_certificate_expiry (
    userid, courseid, issue_date, expiry_date, cert_number, status, timecreated, timemodified
) VALUES
(103, 105, UNIX_TIMESTAMP() - 86400*5, NULL, 'CERT-COMM-2026-001', 'valid', UNIX_TIMESTAMP() - 86400*5, UNIX_TIMESTAMP() - 86400*5),
(108, 105, UNIX_TIMESTAMP() - 86400*3, NULL, 'CERT-COMM-2026-002', 'valid', UNIX_TIMESTAMP() - 86400*3, UNIX_TIMESTAMP() - 86400*3),
(104, 106, UNIX_TIMESTAMP() - 86400*2, NULL, 'CERT-PM-2026-001', 'valid', UNIX_TIMESTAMP() - 86400*2, UNIX_TIMESTAMP() - 86400*2),
(115, 106, UNIX_TIMESTAMP() - 86400*1, NULL, 'CERT-PM-2026-002', 'valid', UNIX_TIMESTAMP() - 86400*1, UNIX_TIMESTAMP() - 86400*1),
(115, 107, UNIX_TIMESTAMP() - 86400*1, NULL, 'CERT-DB-2026-001', 'valid', UNIX_TIMESTAMP() - 86400*1, UNIX_TIMESTAMP() - 86400*1),
(117, 107, UNIX_TIMESTAMP() - 86400*1, NULL, 'CERT-DB-2026-002', 'valid', UNIX_TIMESTAMP() - 86400*1, UNIX_TIMESTAMP() - 86400*1),
(115, 108, UNIX_TIMESTAMP() - 86400*1, NULL, 'CERT-WEB-2026-001', 'valid', UNIX_TIMESTAMP() - 86400*1, UNIX_TIMESTAMP() - 86400*1),
(105, 110, UNIX_TIMESTAMP() - 86400*1, NULL, 'CERT-CRM-2026-001', 'valid', UNIX_TIMESTAMP() - 86400*1, UNIX_TIMESTAMP() - 86400*1),
(122, 110, UNIX_TIMESTAMP() - 86400*1, NULL, 'CERT-CRM-2026-002', 'valid', UNIX_TIMESTAMP() - 86400*1, UNIX_TIMESTAMP() - 86400*1),
(103, 111, UNIX_TIMESTAMP() - 86400*1, NULL, 'CERT-LEAD-BLEND-2026-001', 'valid', UNIX_TIMESTAMP() - 86400*1, UNIX_TIMESTAMP() - 86400*1),
(125, 114, UNIX_TIMESTAMP() - 86400*1, NULL, 'CERT-LIFECYCLE-COMP-2026-001', 'valid', UNIX_TIMESTAMP() - 86400*1, UNIX_TIMESTAMP() - 86400*1),
(113, 116, UNIX_TIMESTAMP() - 86400*1, NULL, 'CERT-LIFECYCLE-PROG-2026-001', 'valid', UNIX_TIMESTAMP() - 86400*1, UNIX_TIMESTAMP() - 86400*1);

SELECT '✓ Additional certificates created' as '';

-- =========================================================
-- STEP 22: Add Learning Time Tracking Data
-- =========================================================
SELECT '>>> STEP 22: Adding Learning Time Tracking Data...' as '';

-- Learning time for completed courses (various activities)
INSERT IGNORE INTO mdl_learning_time (
    userid, courseid, cmid, activitytype, timestart, timeend, duration, sessionid, timecreated
) VALUES
-- User 113 - Safety Course (completed)
(113, 100, 2400, 'page', UNIX_TIMESTAMP() - 86400*25, UNIX_TIMESTAMP() - 86400*25 + 1800, 1800, 'session_113_100_1', UNIX_TIMESTAMP() - 86400*25),
(113, 100, 2600, 'video', UNIX_TIMESTAMP() - 86400*24, UNIX_TIMESTAMP() - 86400*24 + 3600, 3600, 'session_113_100_2', UNIX_TIMESTAMP() - 86400*24),
(113, 100, 2000, 'quiz', UNIX_TIMESTAMP() - 86400*23, UNIX_TIMESTAMP() - 86400*23 + 900, 900, 'session_113_100_3', UNIX_TIMESTAMP() - 86400*23),

-- User 114 - Safety Course (completed)
(114, 100, 2400, 'page', UNIX_TIMESTAMP() - 86400*20, UNIX_TIMESTAMP() - 86400*20 + 1500, 1500, 'session_114_100_1', UNIX_TIMESTAMP() - 86400*20),
(114, 100, 2600, 'video', UNIX_TIMESTAMP() - 86400*19, UNIX_TIMESTAMP() - 86400*19 + 3300, 3300, 'session_114_100_2', UNIX_TIMESTAMP() - 86400*19),
(114, 100, 2000, 'quiz', UNIX_TIMESTAMP() - 86400*18, UNIX_TIMESTAMP() - 86400*18 + 800, 800, 'session_114_100_3', UNIX_TIMESTAMP() - 86400*18),

-- User 115 - Security Course (completed)
(115, 101, 2401, 'page', UNIX_TIMESTAMP() - 86400*15, UNIX_TIMESTAMP() - 86400*15 + 1200, 1200, 'session_115_101_1', UNIX_TIMESTAMP() - 86400*15),
(115, 101, 2601, 'video', UNIX_TIMESTAMP() - 86400*14, UNIX_TIMESTAMP() - 86400*14 + 2700, 2700, 'session_115_101_2', UNIX_TIMESTAMP() - 86400*14),
(115, 101, 2001, 'quiz', UNIX_TIMESTAMP() - 86400*13, UNIX_TIMESTAMP() - 86400*13 + 600, 600, 'session_115_101_3', UNIX_TIMESTAMP() - 86400*13),

-- User 103 - Leadership Course (completed)
(103, 104, 2404, 'page', UNIX_TIMESTAMP() - 86400*8, UNIX_TIMESTAMP() - 86400*8 + 2400, 2400, 'session_103_104_1', UNIX_TIMESTAMP() - 86400*8),
(103, 104, 2604, 'video', UNIX_TIMESTAMP() - 86400*7, UNIX_TIMESTAMP() - 86400*7 + 5400, 5400, 'session_103_104_2', UNIX_TIMESTAMP() - 86400*7),
(103, 104, 2004, 'quiz', UNIX_TIMESTAMP() - 86400*6, UNIX_TIMESTAMP() - 86400*6 + 1200, 1200, 'session_103_104_3', UNIX_TIMESTAMP() - 86400*6),

-- User 105 - Sales Course (completed)
(105, 109, 2409, 'page', UNIX_TIMESTAMP() - 86400*4, UNIX_TIMESTAMP() - 86400*4 + 1800, 1800, 'session_105_109_1', UNIX_TIMESTAMP() - 86400*4),
(105, 109, 2609, 'video', UNIX_TIMESTAMP() - 86400*3, UNIX_TIMESTAMP() - 86400*3 + 4200, 4200, 'session_105_109_2', UNIX_TIMESTAMP() - 86400*3),
(105, 109, 2009, 'quiz', UNIX_TIMESTAMP() - 86400*2, UNIX_TIMESTAMP() - 86400*2 + 900, 900, 'session_105_109_3', UNIX_TIMESTAMP() - 86400*2),

-- User 103 - Communication Course (completed)
(103, 105, 2405, 'page', UNIX_TIMESTAMP() - 86400*12, UNIX_TIMESTAMP() - 86400*12 + 1500, 1500, 'session_103_105_1', UNIX_TIMESTAMP() - 86400*12),
(103, 105, 2605, 'video', UNIX_TIMESTAMP() - 86400*11, UNIX_TIMESTAMP() - 86400*11 + 3000, 3000, 'session_103_105_2', UNIX_TIMESTAMP() - 86400*11),
(103, 105, 2005, 'quiz', UNIX_TIMESTAMP() - 86400*10, UNIX_TIMESTAMP() - 86400*10 + 750, 750, 'session_103_105_3', UNIX_TIMESTAMP() - 86400*10),

-- User 104 - Project Management (completed)
(104, 106, 2406, 'page', UNIX_TIMESTAMP() - 86400*11, UNIX_TIMESTAMP() - 86400*11 + 2100, 2100, 'session_104_106_1', UNIX_TIMESTAMP() - 86400*11),
(104, 106, 2606, 'video', UNIX_TIMESTAMP() - 86400*10, UNIX_TIMESTAMP() - 86400*10 + 4800, 4800, 'session_104_106_2', UNIX_TIMESTAMP() - 86400*10),
(104, 106, 2006, 'quiz', UNIX_TIMESTAMP() - 86400*9, UNIX_TIMESTAMP() - 86400*9 + 1100, 1100, 'session_104_106_3', UNIX_TIMESTAMP() - 86400*9);

SELECT '✓ Learning time tracking data created' as '';

-- =========================================================
-- STEP 23: Add Video Completion Tracking Data
-- =========================================================
SELECT '>>> STEP 23: Adding Video Completion Tracking Data...' as '';

-- Video tracking for H5P activities (cmid 2600-2621)
INSERT IGNORE INTO mdl_video_completion_tracking (
    userid, courseid, cmid, video_url, total_duration, watched_duration, percentage, completed, last_position, timecreated, timemodified
) VALUES
-- User 113 - Safety Training Video (completed 100%)
(113, 100, 2600, 'https://www.youtube.com/watch?v=JHOqKqXQj8k', 3600, 3600, 100.00, 1, 3600, UNIX_TIMESTAMP() - 86400*24, UNIX_TIMESTAMP() - 86400*24),

-- User 114 - Safety Training Video (completed 100%)
(114, 100, 2600, 'https://www.youtube.com/watch?v=JHOqKqXQj8k', 3600, 3600, 100.00, 1, 3600, UNIX_TIMESTAMP() - 86400*19, UNIX_TIMESTAMP() - 86400*19),

-- User 115 - Security Awareness Video (completed 100%)
(115, 101, 2601, 'https://www.youtube.com/watch?v=inWWhr5tnEA', 2700, 2700, 100.00, 1, 2700, UNIX_TIMESTAMP() - 86400*14, UNIX_TIMESTAMP() - 86400*14),

-- User 103 - Leadership Styles Video (completed 100%)
(103, 104, 2604, 'https://www.youtube.com/watch?v=XUO59Emi3eo', 5400, 5400, 100.00, 1, 5400, UNIX_TIMESTAMP() - 86400*7, UNIX_TIMESTAMP() - 86400*7),

-- User 105 - Sales Techniques Video (completed 100%)
(105, 109, 2609, 'https://www.youtube.com/watch?v=GXvIEwJs6LE', 4200, 4200, 100.00, 1, 4200, UNIX_TIMESTAMP() - 86400*3, UNIX_TIMESTAMP() - 86400*3),

-- User 103 - Communication Skills Video (completed 100%)
(103, 105, 2605, 'https://www.youtube.com/watch?v=7oKjW1OIjuw', 3000, 3000, 100.00, 1, 3000, UNIX_TIMESTAMP() - 86400*11, UNIX_TIMESTAMP() - 86400*11),

-- User 104 - Project Planning Video (completed 100%)
(104, 106, 2606, 'https://www.youtube.com/watch?v=AD5c7xKxqoM', 4800, 4800, 100.00, 1, 4800, UNIX_TIMESTAMP() - 86400*10, UNIX_TIMESTAMP() - 86400*10),

-- User 115 - Database Design Video (in progress 75%)
(115, 107, 2607, 'https://www.youtube.com/watch?v=ztHopE5Wnpc', 3600, 2700, 75.00, 0, 2700, UNIX_TIMESTAMP() - 86400*8, UNIX_TIMESTAMP() - 86400*1),

-- User 117 - Database Design Video (in progress 50%)
(117, 107, 2607, 'https://www.youtube.com/watch?v=ztHopE5Wnpc', 3600, 1800, 50.00, 0, 1800, UNIX_TIMESTAMP() - 86400*6, UNIX_TIMESTAMP() - 86400*1),

-- User 115 - Web Development Video (in progress 60%)
(115, 108, 2608, 'https://www.youtube.com/watch?v=zJSY8tbfLyk', 4800, 2880, 60.00, 0, 2880, UNIX_TIMESTAMP() - 86400*7, UNIX_TIMESTAMP() - 86400*1);

SELECT '✓ Video completion tracking data created' as '';

SET foreign_key_checks = 1;

-- =========================================================
-- SUCCESS MESSAGE
-- =========================================================
SELECT '=======================================' as '';
SELECT '✓ Test Data Installation Completed!' as '';
SELECT '=======================================' as '';
SELECT '' as '';
SELECT 'Summary:' as '';
SELECT '=======================================' as '';
SELECT 'Users created:' as '', COUNT(*) as count FROM mdl_user WHERE id >= 100 AND id <= 130;
SELECT 'Cohorts created:' as '', COUNT(*) as count FROM mdl_cohort WHERE id >= 100 AND id <= 111;
SELECT 'Course categories created:' as '', COUNT(*) as count FROM mdl_course_categories WHERE id >= 10 AND id <= 13;
SELECT 'Course contexts created:' as '', COUNT(*) as count FROM mdl_context WHERE id >= 1000 AND id <= 1021;
SELECT 'Course sections created:' as '', COUNT(*) as count FROM mdl_course_sections WHERE id >= 1000 AND id <= 1213;
SELECT 'Courses created:' as '', COUNT(*) as count FROM mdl_course WHERE id >= 100 AND id <= 121;
SELECT 'Quiz activities created:' as '', COUNT(*) as count FROM mdl_quiz WHERE id >= 2000 AND id <= 2021;
SELECT 'Assignment activities created:' as '', COUNT(*) as count FROM mdl_assign WHERE id >= 2100 AND id <= 2121;
SELECT 'Page resources created:' as '', COUNT(*) as count FROM mdl_page WHERE id >= 2300 AND id <= 2321;
SELECT 'URL resources created:' as '', COUNT(*) as count FROM mdl_url WHERE id >= 2400 AND id <= 2421;
SELECT 'H5P activities created:' as '', COUNT(*) as count FROM mdl_h5pactivity WHERE id >= 2500 AND id <= 2521;
SELECT '⚠️ IMPORTANT: Run 99_create_h5p_content.sql to create H5P content files!' as '';
SELECT '   This will make H5P activities work properly.' as '';
SELECT 'Course modules created:' as '', COUNT(*) as count FROM mdl_course_modules WHERE id >= 2000 AND id <= 2621;
SELECT 'Enrollments created:' as '', COUNT(*) as count FROM mdl_user_enrolments WHERE enrolid >= 200 AND enrolid <= 221;
SELECT 'Course completions:' as '', COUNT(*) as count FROM mdl_course_completions WHERE id >= 1000 AND id <= 1016;
SELECT 'Certificates issued:' as '', COUNT(*) as count FROM mdl_certificate_expiry WHERE userid >= 100 AND userid <= 130;
SELECT 'Compliance records:' as '', COUNT(*) as count FROM mdl_compliance_tracking WHERE userid >= 100 AND userid <= 130;
SELECT 'Learning time records:' as '', COUNT(*) as count FROM mdl_learning_time WHERE userid >= 100 AND userid <= 130;
SELECT 'Video tracking records:' as '', COUNT(*) as count FROM mdl_video_completion_tracking WHERE userid >= 100 AND userid <= 130;
SELECT 'Job role courses rules:' as '', COUNT(*) as count FROM mdl_job_role_courses;
SELECT 'User profile data records:' as '', COUNT(*) as count FROM mdl_user_info_data WHERE fieldid IN (SELECT id FROM mdl_user_info_field WHERE shortname IN ('employeeid', 'jobrole', 'department', 'positionlevel'));
SELECT '=======================================' as '';
SELECT '' as '';
SELECT 'IMPORTANT NOTES:' as '';
SELECT '=======================================' as '';
SELECT '1. USER PASSWORDS:' as '';
SELECT '   - All users have placeholder password hash' as '';
SELECT '   - Set passwords via Moodle password reset feature' as '';
SELECT '   - OR create users via Moodle GUI first, then run this script' as '';
SELECT '   - Default password for all users: Pass@123' as '';
SELECT '' as '';
SELECT '2. USER ROLES:' as '';
SELECT '   - Assign roles via Moodle GUI: Site Administration → Users → Permissions' as '';
SELECT '   - Or use Moodle API to assign roles' as '';
SELECT '' as '';
SELECT '3. CONTEXT IDs:' as '';
SELECT '   - Context IDs in cohorts (contextid = 1) may need adjustment' as '';
SELECT '   - Check: SELECT id FROM mdl_context WHERE contextlevel = 10 LIMIT 1;' as '';
SELECT '   - Update cohort contextid if needed' as '';
SELECT '' as '';
SELECT '4. COURSE CATEGORIES & TYPES:' as '';
SELECT '   - Category 10: Short Courses (7 courses)' as '';
SELECT '     * Course types: short (7 courses)' as '';
SELECT '   - Category 11: Learning Programs (2 courses)' as '';
SELECT '     * Course types: program (2 courses)' as '';
SELECT '   - Category 12: Blended Courses (3 courses)' as '';
SELECT '     * Course types: blended (3 courses)' as '';
SELECT '   - Category 13: Compliance Courses (2 courses)' as '';
SELECT '     * Course types: compliance (2 courses)' as '';
SELECT '' as '';
SELECT '5. COURSE TYPE DISTRIBUTION:' as '';
SELECT '   - Compliance: 2 courses (100, 101)' as '';
SELECT '   - Program: 2 courses (102, 103)' as '';
SELECT '   - Blended: 3 courses (111, 112, 113)' as '';
SELECT '   - Short: 7 courses (104-110)' as '';
SELECT '' as '';
SELECT '5.1. ESTIMATED HOURS (M/H) FOR REPORTING:' as '';
SELECT '   - All courses have estimated_hours in mdl_course_extended' as '';
SELECT '   - Range: 1.5 - 8.0 hours per course' as '';
SELECT '   - Example queries for reports:' as '';
SELECT '     * SELECT courseid, course_code, estimated_hours FROM mdl_course_extended;' as '';
SELECT '     * SELECT SUM(estimated_hours) as total_hours FROM mdl_course_extended WHERE course_type = ''compliance'';' as '';
SELECT '     * SELECT course_type, AVG(estimated_hours) as avg_hours FROM mdl_course_extended GROUP BY course_type;' as '';
SELECT '' as '';
SELECT '6. DATA CONSISTENCY:' as '';
SELECT '   - This script uses organization structure from 98_sample_data.sql' as '';
SELECT '   - Division IDs: 1=HR, 2=IT, 3=FIN, 4=OPS, 5=SALES' as '';
SELECT '   - Department IDs: 1-12 (matching 98_sample_data.sql)' as '';
SELECT '   - Position IDs: 1-13 (L01-L13 from 98_sample_data.sql)' as '';
SELECT '   - Program IDs: 1-3 (from 98_sample_data.sql)' as '';
SELECT '' as '';
SELECT '7. JOB ROLE COURSES RULES:' as '';
SELECT '   - All Employees → Safety Training (mandatory, 30 days)' as '';
SELECT '   - Managers → Leadership Course (mandatory, 60 days)' as '';
SELECT '   - Supervisors → Communication Course (optional)' as '';
SELECT '   - IT Staff → Security Course (mandatory, 45 days)' as '';
SELECT '   - New Employees → Onboarding (mandatory, 7 days)' as '';
SELECT '   - Sales Team → Sales Techniques (mandatory/optional)' as '';
SELECT '' as '';
SELECT '8. USER PROFILE DATA:' as '';
SELECT '   - Employee IDs synced from mdl_user_employment' as '';
SELECT '   - Job roles mapped from position levels (L5+ = Manager, L3+ = Supervisor, etc.)' as '';
SELECT '   - Departments mapped from department codes (HR, ICT, FINANCE, SALES, OPERATIONS)' as '';
SELECT '   - Position levels synced from position codes (L01-L13)' as '';
SELECT '' as '';
SELECT '9. AFTER RUNNING THIS SCRIPT:' as '';
SELECT '   - Verify all data in Adminer' as '';
SELECT '   - Set user passwords (via password reset)' as '';
SELECT '   - Assign user roles (via Moodle GUI)' as '';
SELECT '   - Test login with test users' as '';
SELECT '   - Verify department mappings are linked to cohorts' as '';
SELECT '   - Test auto-enrollment: local_autoenrol_role' as '';
SELECT '   - Test auto-enrollment: local_autoenrol_dept' as '';
SELECT '   - Test API: local_lms_api_get_user_profile_fields' as '';
SELECT '=======================================' as '';
SELECT '' as '';
SELECT 'TEST USER ACCOUNTS (after setting passwords):' as '';
SELECT '- test_admin / Pass@123' as '';
SELECT '- manager_hr / Pass@123' as '';
SELECT '- emp001 / Pass@123' as '';
SELECT '- ... (all users use Pass@123)' as '';
SELECT '=======================================' as '';
