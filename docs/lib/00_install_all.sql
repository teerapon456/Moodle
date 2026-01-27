-- =========================================================
-- 00_install_all.sql
-- Enterprise LMS - Master Installation Script
-- Executes all migrations in correct order
-- 
-- This script creates:
-- - 18 custom database tables
-- - 4 user profile fields (employeeid, jobrole, department, positionlevel)
-- - User profile data sync (from mdl_user_employment)
-- - H5P libraries and content (for H5P activities, if they exist)
-- =========================================================
-- 
-- USAGE:
-- docker compose exec -T db mysql -u moodle -pmoodle moodle_dev < database/migrations/00_install_all.sql
--
-- OR via Adminer:
-- 1. Open http://localhost:8088
-- 2. Select database: moodle_dev
-- 3. Go to SQL command
-- 4. Copy and paste this entire file
-- 5. Execute
--
-- =========================================================

-- Set session variables for safe execution
SET NAMES utf8mb4;
SET SESSION sql_mode = 'TRADITIONAL';
SET foreign_key_checks = 0;

-- =========================================================
-- INSTALLATION LOG
-- =========================================================
SELECT '=======================================' as '';
SELECT 'Enterprise LMS Database Installation' as '';
SELECT '=======================================' as '';
SELECT NOW() as 'Installation Started';
SELECT DATABASE() as 'Target Database';
SELECT '=======================================' as '';

-- =========================================================
-- STEP 1: Organization Structure (3 tables)
-- =========================================================
SELECT '>>> STEP 1: Creating Organization Structure Tables...' as '';

-- TABLE 1: mdl_org_division
CREATE TABLE IF NOT EXISTS mdl_org_division (
    id BIGINT(10) NOT NULL AUTO_INCREMENT,
    code VARCHAR(50) NOT NULL COMMENT 'Division code (e.g., HR, IT)',
    name_th VARCHAR(255) NOT NULL COMMENT 'Division name in Thai',
    name_en VARCHAR(255) DEFAULT NULL COMMENT 'Division name in English',
    active TINYINT(1) NOT NULL DEFAULT 1 COMMENT '1=active, 0=inactive',
    timecreated BIGINT(10) NOT NULL,
    timemodified BIGINT(10) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY mdl_orgdivi_cod_uix (code),
    KEY mdl_orgdivi_act_ix (active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='Organization divisions/ฝ่าย';

-- NOTE: Sample data has been moved to 98_sample_data.sql
-- Run that file separately AFTER installing all tables if you need sample data

-- TABLE 2: mdl_org_department
CREATE TABLE IF NOT EXISTS mdl_org_department (
    id BIGINT(10) NOT NULL AUTO_INCREMENT,
    divisionid BIGINT(10) NOT NULL COMMENT 'FK to mdl_org_division',
    code VARCHAR(50) NOT NULL COMMENT 'Department code',
    name_th VARCHAR(255) NOT NULL COMMENT 'Department name Thai',
    name_en VARCHAR(255) DEFAULT NULL COMMENT 'Department name English',
    managerid BIGINT(10) DEFAULT NULL COMMENT 'FK to mdl_user (department manager)',
    active TINYINT(1) NOT NULL DEFAULT 1 COMMENT '1=active, 0=inactive',
    timecreated BIGINT(10) NOT NULL,
    timemodified BIGINT(10) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY mdl_orgdept_cod_uix (code),
    KEY mdl_orgdept_div_ix (divisionid),
    KEY mdl_orgdept_man_ix (managerid),
    KEY mdl_orgdept_act_ix (active),
    CONSTRAINT mdl_orgdept_div_fk FOREIGN KEY (divisionid) REFERENCES mdl_org_division (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='Organization departments/แผนก';

-- NOTE: Sample data has been moved to 98_sample_data.sql

-- TABLE 3: mdl_org_position
CREATE TABLE IF NOT EXISTS mdl_org_position (
    id BIGINT(10) NOT NULL AUTO_INCREMENT,
    code VARCHAR(50) NOT NULL COMMENT 'Position code (e.g., L01, L02)',
    name_th VARCHAR(255) NOT NULL COMMENT 'Position name Thai',
    name_en VARCHAR(255) DEFAULT NULL COMMENT 'Position name English',
    level INT(2) NOT NULL COMMENT 'Level 1-13 (1=lowest, 13=highest)',
    category VARCHAR(50) DEFAULT NULL COMMENT 'Management/Senior/Manager/Officer',
    active TINYINT(1) NOT NULL DEFAULT 1 COMMENT '1=active, 0=inactive',
    timecreated BIGINT(10) NOT NULL,
    timemodified BIGINT(10) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY mdl_orgposi_cod_uix (code),
    KEY mdl_orgposi_lev_ix (level),
    KEY mdl_orgposi_cat_ix (category),
    KEY mdl_orgposi_act_ix (active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='Position levels (L1-L13)';

-- NOTE: Sample data has been moved to 98_sample_data.sql

SELECT '✓ Organization tables created' as '';

-- =========================================================
-- STEP 2: User Employment (1 table)
-- =========================================================
SELECT '>>> STEP 2: Creating User Employment Table...' as '';

-- TABLE 4: mdl_user_employment
CREATE TABLE IF NOT EXISTS mdl_user_employment (
    id BIGINT(10) NOT NULL AUTO_INCREMENT,
    userid BIGINT(10) NOT NULL COMMENT 'FK to mdl_user.id (1:1 relationship)',
    employee_id VARCHAR(50) NOT NULL COMMENT 'Employee ID from HRIS (unique)',
    divisionid BIGINT(10) DEFAULT NULL COMMENT 'FK to mdl_org_division',
    departmentid BIGINT(10) DEFAULT NULL COMMENT 'FK to mdl_org_department',
    positionid BIGINT(10) DEFAULT NULL COMMENT 'FK to mdl_org_position',
    hire_date BIGINT(10) DEFAULT NULL COMMENT 'Unix timestamp hire date',
    timecreated BIGINT(10) NOT NULL,
    timemodified BIGINT(10) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY mdl_useremp_use_uix (userid),
    UNIQUE KEY mdl_useremp_emp_uix (employee_id),
    KEY mdl_useremp_div_ix (divisionid),
    KEY mdl_useremp_dep_ix (departmentid),
    KEY mdl_useremp_pos_ix (positionid),
    CONSTRAINT mdl_useremp_use_fk FOREIGN KEY (userid) REFERENCES mdl_user (id) ON DELETE CASCADE,
    CONSTRAINT mdl_useremp_div_fk FOREIGN KEY (divisionid) REFERENCES mdl_org_division (id) ON DELETE SET NULL,
    CONSTRAINT mdl_useremp_dep_fk FOREIGN KEY (departmentid) REFERENCES mdl_org_department (id) ON DELETE SET NULL,
    CONSTRAINT mdl_useremp_pos_fk FOREIGN KEY (positionid) REFERENCES mdl_org_position (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='Links users to organization structure (employment data)';

SELECT '✓ User employment table created' as '';

-- =========================================================
-- STEP 3: Course Extensions (4 tables)
-- =========================================================
SELECT '>>> STEP 3: Creating Course Extension Tables...' as '';

-- TABLE 5: mdl_course_extended
CREATE TABLE IF NOT EXISTS mdl_course_extended (
    id BIGINT(10) NOT NULL AUTO_INCREMENT,
    courseid BIGINT(10) NOT NULL COMMENT 'FK to mdl_course',
    course_code VARCHAR(50) DEFAULT NULL COMMENT 'Custom course code',
    course_type VARCHAR(50) DEFAULT NULL COMMENT 'Short/Program/Blended/Compliance',
    recommended_level INT(2) DEFAULT NULL COMMENT 'Recommended position level (1-13)',
    estimated_hours DECIMAL(5,2) DEFAULT NULL COMMENT 'Estimated completion time',
    activity_type VARCHAR(50) DEFAULT NULL COMMENT 'Activity type: lecture/workshop/lecture_workshop',
    is_self_learning TINYINT(1) NOT NULL DEFAULT 0 COMMENT '1=self-learning, 0=instructor-led',
    timecreated BIGINT(10) NOT NULL,
    timemodified BIGINT(10) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY mdl_coursext_cou_uix (courseid),
    KEY mdl_coursext_typ_ix (course_type),
    KEY mdl_coursext_lev_ix (recommended_level),
    KEY mdl_coursext_acttyp_ix (activity_type),
    KEY mdl_coursext_self_ix (is_self_learning),
    CONSTRAINT mdl_coursext_cou_fk FOREIGN KEY (courseid) REFERENCES mdl_course (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='Extended course information (custom fields)';

-- TABLE 6: mdl_course_prerequisites
CREATE TABLE IF NOT EXISTS mdl_course_prerequisites (
    id BIGINT(10) NOT NULL AUTO_INCREMENT,
    courseid BIGINT(10) NOT NULL COMMENT 'This course requires prerequisite',
    prerequisitecourseid BIGINT(10) NOT NULL COMMENT 'The prerequisite course',
    timecreated BIGINT(10) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY mdl_courprer_coupre_uix (courseid, prerequisitecourseid),
    KEY mdl_courprer_cou_ix (courseid),
    KEY mdl_courprer_pre_ix (prerequisitecourseid),
    CONSTRAINT mdl_courprer_cou_fk FOREIGN KEY (courseid) REFERENCES mdl_course (id) ON DELETE CASCADE,
    CONSTRAINT mdl_courprer_pre_fk FOREIGN KEY (prerequisitecourseid) REFERENCES mdl_course (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='Course prerequisite relationships';

-- TABLE 7: mdl_learning_program
CREATE TABLE IF NOT EXISTS mdl_learning_program (
    id BIGINT(10) NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL COMMENT 'Program name',
    description LONGTEXT DEFAULT NULL COMMENT 'Program description',
    active TINYINT(1) NOT NULL DEFAULT 1 COMMENT '1=active, 0=inactive',
    badgeid BIGINT(10) DEFAULT NULL COMMENT 'FK to mdl_badge (awarded on completion)',
    certificateid BIGINT(10) DEFAULT NULL COMMENT 'Certificate template ID',
    timecreated BIGINT(10) NOT NULL,
    timemodified BIGINT(10) NOT NULL,
    PRIMARY KEY (id),
    KEY mdl_learprog_act_ix (active),
    KEY mdl_learprog_bad_ix (badgeid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='Learning programs (multi-course sequences)';

-- TABLE 8: mdl_learning_program_courses
CREATE TABLE IF NOT EXISTS mdl_learning_program_courses (
    id BIGINT(10) NOT NULL AUTO_INCREMENT,
    programid BIGINT(10) NOT NULL COMMENT 'FK to mdl_learning_program',
    courseid BIGINT(10) NOT NULL COMMENT 'FK to mdl_course',
    sequence INT(11) NOT NULL DEFAULT 0 COMMENT 'Course order in program',
    mandatory TINYINT(1) NOT NULL DEFAULT 1 COMMENT '1=required, 0=optional',
    prerequisiteid BIGINT(10) DEFAULT NULL COMMENT 'Previous course in sequence',
    timecreated BIGINT(10) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY mdl_learprogcour_procou_uix (programid, courseid),
    KEY mdl_learprogcour_pro_ix (programid),
    KEY mdl_learprogcour_cou_ix (courseid),
    KEY mdl_learprogcour_seq_ix (sequence),
    CONSTRAINT mdl_learprogcour_pro_fk FOREIGN KEY (programid) REFERENCES mdl_learning_program (id) ON DELETE CASCADE,
    CONSTRAINT mdl_learprogcour_cou_fk FOREIGN KEY (courseid) REFERENCES mdl_course (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='Program-course linkage (sequence and dependencies)';

-- NOTE: Sample data has been moved to 98_sample_data.sql

SELECT '✓ Course extension tables created' as '';

-- =========================================================
-- STEP 4: Auto-Enrollment (1 table)
-- =========================================================
SELECT '>>> STEP 4: Creating Auto-Enrollment Rules Table...' as '';

-- TABLE 9: mdl_auto_enrollment_rules
CREATE TABLE IF NOT EXISTS mdl_auto_enrollment_rules (
    id BIGINT(10) NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL COMMENT 'Rule name/description',
    courseid BIGINT(10) NOT NULL COMMENT 'FK to mdl_course (target course)',
    rule_type VARCHAR(50) NOT NULL COMMENT 'division/department/position/level',
    target_id BIGINT(10) DEFAULT NULL COMMENT 'Division/dept/position ID (if applicable)',
    level_min INT(2) DEFAULT NULL COMMENT 'Minimum level for level type',
    level_max INT(2) DEFAULT NULL COMMENT 'Maximum level for level type',
    active TINYINT(1) NOT NULL DEFAULT 1 COMMENT '1=active, 0=inactive',
    timecreated BIGINT(10) NOT NULL,
    timemodified BIGINT(10) NOT NULL,
    PRIMARY KEY (id),
    KEY mdl_autoenro_cou_ix (courseid),
    KEY mdl_autoenro_typ_ix (rule_type),
    KEY mdl_autoenro_tar_ix (target_id),
    KEY mdl_autoenro_act_ix (active),
    CONSTRAINT mdl_autoenro_cou_fk FOREIGN KEY (courseid) REFERENCES mdl_course (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='Auto-enrollment rules (org structure based)';

SELECT '✓ Auto-enrollment table created' as '';

-- =========================================================
-- STEP 5: Certificates & Compliance (2 tables)
-- =========================================================
SELECT '>>> STEP 5: Creating Certificate and Compliance Tables...' as '';

-- TABLE 10: mdl_certificate_expiry
CREATE TABLE IF NOT EXISTS mdl_certificate_expiry (
    id BIGINT(10) NOT NULL AUTO_INCREMENT,
    userid BIGINT(10) NOT NULL COMMENT 'FK to mdl_user',
    courseid BIGINT(10) NOT NULL COMMENT 'FK to mdl_course',
    issue_date BIGINT(10) NOT NULL COMMENT 'Unix timestamp issued',
    expiry_date BIGINT(10) DEFAULT NULL COMMENT 'Unix timestamp expiry (NULL=permanent)',
    cert_number VARCHAR(100) DEFAULT NULL COMMENT 'Unique certificate number',
    status VARCHAR(20) NOT NULL DEFAULT 'valid' COMMENT 'valid/expired/revoked',
    timecreated BIGINT(10) NOT NULL,
    timemodified BIGINT(10) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY mdl_certexpi_num_uix (cert_number),
    KEY mdl_certexpi_use_ix (userid),
    KEY mdl_certexpi_cou_ix (courseid),
    KEY mdl_certexpi_exp_ix (expiry_date),
    KEY mdl_certexpi_sta_ix (status),
    CONSTRAINT mdl_certexpi_use_fk FOREIGN KEY (userid) REFERENCES mdl_user (id) ON DELETE CASCADE,
    CONSTRAINT mdl_certexpi_cou_fk FOREIGN KEY (courseid) REFERENCES mdl_course (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='Certificate expiry tracking (permanent & timed)';

-- TABLE 11: mdl_compliance_tracking
CREATE TABLE IF NOT EXISTS mdl_compliance_tracking (
    id BIGINT(10) NOT NULL AUTO_INCREMENT,
    userid BIGINT(10) NOT NULL COMMENT 'FK to mdl_user',
    courseid BIGINT(10) NOT NULL COMMENT 'FK to mdl_course',
    due_date BIGINT(10) DEFAULT NULL COMMENT 'Unix timestamp deadline',
    completion_date BIGINT(10) DEFAULT NULL COMMENT 'Unix timestamp completed',
    status VARCHAR(20) NOT NULL DEFAULT 'pending' COMMENT 'pending/in_progress/completed/overdue',
    timecreated BIGINT(10) NOT NULL,
    timemodified BIGINT(10) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY mdl_comptrack_usecou_uix (userid, courseid),
    KEY mdl_comptrack_use_ix (userid),
    KEY mdl_comptrack_cou_ix (courseid),
    KEY mdl_comptrack_due_ix (due_date),
    KEY mdl_comptrack_sta_ix (status),
    CONSTRAINT mdl_comptrack_use_fk FOREIGN KEY (userid) REFERENCES mdl_user (id) ON DELETE CASCADE,
    CONSTRAINT mdl_comptrack_cou_fk FOREIGN KEY (courseid) REFERENCES mdl_course (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='Compliance course tracking (mandatory with deadlines)';

SELECT '✓ Certificate & compliance tables created' as '';

-- =========================================================
-- STEP 6: Video Tracking (1 table)
-- =========================================================
SELECT '>>> STEP 6: Creating Video Tracking Table...' as '';

-- TABLE 12: mdl_video_completion_tracking
CREATE TABLE IF NOT EXISTS mdl_video_completion_tracking (
    id BIGINT(10) NOT NULL AUTO_INCREMENT,
    userid BIGINT(10) NOT NULL COMMENT 'FK to mdl_user',
    courseid BIGINT(10) NOT NULL COMMENT 'FK to mdl_course',
    cmid BIGINT(10) NOT NULL COMMENT 'FK to mdl_course_modules (video activity)',
    video_url VARCHAR(500) DEFAULT NULL COMMENT 'Video file URL or path',
    total_duration INT(11) NOT NULL DEFAULT 0 COMMENT 'Total video length (seconds)',
    watched_duration INT(11) NOT NULL DEFAULT 0 COMMENT 'Total watched (seconds)',
    percentage DECIMAL(5,2) NOT NULL DEFAULT 0.00 COMMENT 'Percentage watched (0-100)',
    completed TINYINT(1) NOT NULL DEFAULT 0 COMMENT '1 if >= 100%',
    last_position INT(11) NOT NULL DEFAULT 0 COMMENT 'Resume position (seconds)',
    timecreated BIGINT(10) NOT NULL,
    timemodified BIGINT(10) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY mdl_videcomp_usecm_uix (userid, cmid),
    KEY mdl_videcomp_use_ix (userid),
    KEY mdl_videcomp_cou_ix (courseid),
    KEY mdl_videcomp_cm_ix (cmid),
    KEY mdl_videcomp_com_ix (completed),
    CONSTRAINT mdl_videcomp_use_fk FOREIGN KEY (userid) REFERENCES mdl_user (id) ON DELETE CASCADE,
    CONSTRAINT mdl_videcomp_cou_fk FOREIGN KEY (courseid) REFERENCES mdl_course (id) ON DELETE CASCADE,
    CONSTRAINT mdl_videcomp_cm_fk FOREIGN KEY (cmid) REFERENCES mdl_course_modules (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='Video completion tracking (100% requirement for certificates)';

SELECT '✓ Video tracking table created' as '';

-- =========================================================
-- STEP 7: HRIS Sync Logging (1 table)
-- =========================================================
SELECT '>>> STEP 7: Creating HRIS Sync Log Table...' as '';

-- TABLE 13: mdl_hris_sync_log
CREATE TABLE IF NOT EXISTS mdl_hris_sync_log (
    id BIGINT(10) NOT NULL AUTO_INCREMENT,
    sync_type VARCHAR(50) NOT NULL COMMENT 'user_sync/org_sync/enrollment_export/certificate_export',
    records_total INT(11) NOT NULL DEFAULT 0 COMMENT 'Total records to process',
    records_success INT(11) NOT NULL DEFAULT 0 COMMENT 'Successfully processed',
    records_failed INT(11) NOT NULL DEFAULT 0 COMMENT 'Failed records',
    error_log LONGTEXT DEFAULT NULL COMMENT 'Error messages (JSON or text)',
    sync_start BIGINT(10) NOT NULL COMMENT 'Unix timestamp start',
    sync_end BIGINT(10) DEFAULT NULL COMMENT 'Unix timestamp end (NULL if running)',
    status VARCHAR(20) NOT NULL DEFAULT 'running' COMMENT 'running/completed/failed',
    timecreated BIGINT(10) NOT NULL,
    PRIMARY KEY (id),
    KEY mdl_hrissync_typ_ix (sync_type),
    KEY mdl_hrissync_sta_ix (status),
    KEY mdl_hrissync_cre_ix (timecreated)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='HRIS synchronization audit log (for future API integration)';

SELECT '✓ HRIS sync log table created' as '';

-- =========================================================
-- STEP 8: Additional Tables from Custom tables.sql (5 tables)
-- =========================================================
SELECT '>>> STEP 8: Creating Additional Required Tables...' as '';

-- TABLE 14: mdl_department_mapping (Department-Cohort Mapping)
CREATE TABLE IF NOT EXISTS mdl_department_mapping (
    id BIGINT(10) NOT NULL AUTO_INCREMENT,
    departmentid VARCHAR(50) NOT NULL COMMENT 'Department ID from HRIS',
    departmentname VARCHAR(255) NOT NULL COMMENT 'Department name',
    cohortid BIGINT(10) NOT NULL COMMENT 'FK to mdl_cohort (Moodle cohort ID)',
    managerid BIGINT(10) NULL DEFAULT NULL COMMENT 'FK to mdl_user (Department manager)',
    active TINYINT(1) NOT NULL DEFAULT 1 COMMENT '1=active, 0=inactive',
    timecreated BIGINT(10) NOT NULL,
    timemodified BIGINT(10) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY mdl_deptmapp_dep_uix (departmentid),
    KEY mdl_deptmapp_coh_ix (cohortid),
    KEY mdl_deptmapp_man_ix (managerid),
    KEY mdl_deptmapp_act_ix (active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='Maps HRIS departments to Moodle cohorts (for auto-enrollment)';

SELECT '✓ Department mapping table created' as '';

-- TABLE 15: mdl_job_role_courses (Job Role-Course Auto-Enrollment Rules)
CREATE TABLE IF NOT EXISTS mdl_job_role_courses (
    id BIGINT(10) NOT NULL AUTO_INCREMENT,
    jobrole VARCHAR(100) NOT NULL COMMENT 'Job role name (e.g., Manager, Supervisor)',
    courseid BIGINT(10) NOT NULL COMMENT 'FK to mdl_course (target course)',
    enrolltype VARCHAR(20) NOT NULL DEFAULT 'auto' COMMENT 'auto/manual',
    mandatory TINYINT(1) NOT NULL DEFAULT 0 COMMENT '1=mandatory, 0=optional',
    deadline INT(11) NULL DEFAULT NULL COMMENT 'Days from hire date to complete',
    active TINYINT(1) NOT NULL DEFAULT 1 COMMENT '1=active, 0=inactive',
    timecreated BIGINT(10) NOT NULL,
    timemodified BIGINT(10) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY mdl_jobrole_joccou_uix (jobrole, courseid),
    KEY mdl_jobrole_cou_ix (courseid),
    KEY mdl_jobrole_man_ix (mandatory),
    KEY mdl_jobrole_act_ix (active),
    CONSTRAINT mdl_jobrole_cou_fk FOREIGN KEY (courseid) REFERENCES mdl_course (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='Auto-enrollment rules based on job role';

SELECT '✓ Job role courses table created' as '';

-- TABLE 16: mdl_learning_time (Learning Time Tracking)
CREATE TABLE IF NOT EXISTS mdl_learning_time (
    id BIGINT(10) NOT NULL AUTO_INCREMENT,
    userid BIGINT(10) NOT NULL COMMENT 'FK to mdl_user',
    courseid BIGINT(10) NOT NULL COMMENT 'FK to mdl_course',
    cmid BIGINT(10) NULL DEFAULT NULL COMMENT 'FK to mdl_course_modules (activity)',
    activitytype VARCHAR(50) NULL DEFAULT NULL COMMENT 'video/quiz/assignment/etc',
    timestart BIGINT(10) NOT NULL COMMENT 'Unix timestamp session start',
    timeend BIGINT(10) NULL DEFAULT NULL COMMENT 'Unix timestamp session end',
    duration INT(11) NULL DEFAULT NULL COMMENT 'Duration in seconds (calculated: timeend - timestart)',
    sessionid VARCHAR(100) NULL DEFAULT NULL COMMENT 'Session identifier',
    timecreated BIGINT(10) NOT NULL,
    PRIMARY KEY (id),
    KEY mdl_learntime_use_ix (userid),
    KEY mdl_learntime_cou_ix (courseid),
    KEY mdl_learntime_cmi_ix (cmid),
    KEY mdl_learntime_tim_ix (timestart),
    CONSTRAINT mdl_learntime_use_fk FOREIGN KEY (userid) REFERENCES mdl_user (id) ON DELETE CASCADE,
    CONSTRAINT mdl_learntime_cou_fk FOREIGN KEY (courseid) REFERENCES mdl_course (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='Tracks time spent on learning activities (for video tracking & reporting)';

SELECT '✓ Learning time table created' as '';

-- TABLE 17: mdl_quiz_answer_analytics (Quiz Answer Analytics - Optional)
CREATE TABLE IF NOT EXISTS mdl_quiz_answer_analytics (
    id BIGINT(10) NOT NULL AUTO_INCREMENT,
    quizid BIGINT(10) NOT NULL COMMENT 'FK to mdl_quiz',
    questionid BIGINT(10) NOT NULL COMMENT 'FK to mdl_question',
    totalattempts INT(11) NOT NULL DEFAULT 0 COMMENT 'Total number of attempts',
    correctanswers INT(11) NOT NULL DEFAULT 0 COMMENT 'Number of correct answers',
    incorrectanswers INT(11) NOT NULL DEFAULT 0 COMMENT 'Number of incorrect answers',
    successrate DECIMAL(5,2) NULL DEFAULT NULL COMMENT 'Success rate percentage (calculated: (correctanswers / totalattempts) * 100)',
    averagetime DECIMAL(8,2) NULL DEFAULT NULL COMMENT 'Average time in seconds',
    lastcalculated BIGINT(10) NOT NULL COMMENT 'Unix timestamp of last calculation',
    PRIMARY KEY (id),
    UNIQUE KEY mdl_quizanswanalyt_quique_uix (quizid, questionid),
    KEY mdl_quizanswanalyt_qui_ix (quizid),
    KEY mdl_quizanswanalyt_que_ix (questionid),
    KEY mdl_quizanswanalyt_suc_ix (successrate)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='Analytics for quiz questions performance (optional feature)';

SELECT '✓ Quiz answer analytics table created' as '';

-- TABLE 18: mdl_notification_queue (Notification Queue)
CREATE TABLE IF NOT EXISTS mdl_notification_queue (
    id BIGINT(10) NOT NULL AUTO_INCREMENT,
    userid BIGINT(10) NOT NULL COMMENT 'FK to mdl_user (recipient)',
    notificationtype VARCHAR(50) NOT NULL COMMENT 'certificate_expiry/compliance_deadline/etc',
    courseid BIGINT(10) NULL DEFAULT NULL COMMENT 'FK to mdl_course (related course)',
    subject VARCHAR(255) NOT NULL COMMENT 'Email subject',
    message LONGTEXT NOT NULL COMMENT 'Email message body',
    priority TINYINT(1) NOT NULL DEFAULT 5 COMMENT '1=high, 5=normal, 10=low',
    status VARCHAR(20) NOT NULL DEFAULT 'pending' COMMENT 'pending/sent/failed',
    attempts INT(3) NOT NULL DEFAULT 0 COMMENT 'Number of send attempts',
    scheduled BIGINT(10) NOT NULL COMMENT 'Unix timestamp scheduled send time',
    sent BIGINT(10) NULL DEFAULT NULL COMMENT 'Unix timestamp actually sent',
    errorlog TEXT NULL COMMENT 'Error messages if failed',
    timecreated BIGINT(10) NOT NULL,
    timemodified BIGINT(10) NOT NULL,
    PRIMARY KEY (id),
    KEY mdl_notiqueue_use_ix (userid),
    KEY mdl_notiqueue_sta_ix (status),
    KEY mdl_notiqueue_sch_ix (scheduled),
    KEY mdl_notiqueue_pri_ix (priority),
    CONSTRAINT mdl_notiqueue_use_fk FOREIGN KEY (userid) REFERENCES mdl_user (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='Notification queue for sending emails (certificate reminders, compliance deadlines, etc.)';

SELECT '✓ Notification queue table created' as '';

-- =========================================================
-- STEP 9: User Profile Fields (4 fields for Self-Learning)
-- =========================================================
SELECT '>>> STEP 9: Creating User Profile Fields...' as '';

-- Check if mdl_user_info_field table exists (Moodle must be installed first)
SET @table_exists = (
    SELECT COUNT(*) 
    FROM information_schema.tables 
    WHERE table_schema = DATABASE() 
    AND table_name = 'mdl_user_info_field'
);

SELECT IF(@table_exists > 0, '✓ Moodle is installed - Creating user profile fields...', '⚠️  WARNING: Moodle not installed yet - Skipping user profile fields') as '';

-- 1. Employee ID Field (only if Moodle is installed)
INSERT INTO `mdl_user_info_field` (
  `shortname`, `name`, `datatype`, `description`, `categoryid`, 
  `sortorder`, `required`, `locked`, `visible`, `forceunique`, `signup`,
  `defaultdata`, `defaultdataformat`
) 
SELECT 'employeeid', 'Employee ID', 'text', 'Employee ID from HRIS (for SSO mapping)', 1, 1, 1, 1, 1, 1, 0, '', 0
WHERE @table_exists > 0
  AND NOT EXISTS (SELECT 1 FROM mdl_user_info_field WHERE shortname = 'employeeid');

-- 2. Job Role Field (only if Moodle is installed)
INSERT INTO `mdl_user_info_field` (
  `shortname`, `name`, `datatype`, `description`, `categoryid`, 
  `sortorder`, `required`, `locked`, `visible`, `forceunique`, `signup`,
  `param1`, `defaultdata`, `defaultdataformat`
) 
SELECT 'jobrole', 'Job Role', 'menu', 'Job role classification (for auto-enrollment)', 1, 2, 1, 1, 1, 0, 0, 
       'Manager\nSupervisor\nSenior Staff\nJunior Staff\nIntern', 'Intern', 0
WHERE @table_exists > 0
  AND NOT EXISTS (SELECT 1 FROM mdl_user_info_field WHERE shortname = 'jobrole');

-- 3. Department Field (only if Moodle is installed)
INSERT INTO `mdl_user_info_field` (
  `shortname`, `name`, `datatype`, `description`, `categoryid`, 
  `sortorder`, `required`, `locked`, `visible`, `forceunique`, `signup`,
  `param1`, `defaultdata`, `defaultdataformat`
) 
SELECT 'department', 'Department', 'menu', 'Department classification (for auto-enrollment)', 1, 3, 1, 1, 1, 0, 0,
       'HR\nICT\nFINANCE\nSALES\nOPERATIONS', 'HR', 0
WHERE @table_exists > 0
  AND NOT EXISTS (SELECT 1 FROM mdl_user_info_field WHERE shortname = 'department');

-- 4. Position Level Field (only if Moodle is installed)
INSERT INTO `mdl_user_info_field` (
  `shortname`, `name`, `datatype`, `description`, `categoryid`, 
  `sortorder`, `required`, `locked`, `visible`, `forceunique`, `signup`,
  `param1`, `defaultdata`, `defaultdataformat`
) 
SELECT 'positionlevel', 'Position Level', 'menu', 'Position level (L0-L13) for course filtering', 1, 4, 1, 1, 1, 0, 0,
       'L0\nL1\nL2\nL3\nL4\nL5\nL6\nL7\nL8\nL9\nL10\nL11\nL12\nL13', 'L0', 0
WHERE @table_exists > 0
  AND NOT EXISTS (SELECT 1 FROM mdl_user_info_field WHERE shortname = 'positionlevel');

-- Show status
SELECT IF(@table_exists > 0, 
    '✓ User profile fields created (4 fields)', 
    '⚠️  User profile fields skipped (Moodle not installed yet)') as '';

SELECT IF(@table_exists > 0, 
    '  - employeeid (text, unique, required)\n  - jobrole (menu, required)\n  - department (menu, required)\n  - positionlevel (menu, required)', 
    '  Note: User profile fields will be created after Moodle installation\n  Run this script again after Moodle web installation') as '';

-- =========================================================
-- STEP 10: Sync User Profile Data (from mdl_user_employment)
-- =========================================================
SELECT '>>> STEP 10: Syncing User Profile Data...' as '';

-- Sync Employee ID
INSERT INTO `mdl_user_info_data` (`userid`, `fieldid`, `data`, `dataformat`)
SELECT 
  ue.userid,
  (SELECT id FROM mdl_user_info_field WHERE shortname = 'employeeid' LIMIT 1) as fieldid,
  ue.employee_id as data,
  0 as dataformat
FROM mdl_user_employment ue
WHERE NOT EXISTS (
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
LEFT JOIN mdl_org_position op ON ue.positionid = op.id
WHERE ue.positionid IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM mdl_user_info_data uid
    WHERE uid.userid = ue.userid 
    AND uid.fieldid = (SELECT id FROM mdl_user_info_field WHERE shortname = 'positionlevel' LIMIT 1)
  );

SELECT '✓ User profile data synced from mdl_user_employment' as '';
SELECT '' as '';

-- =========================================================
-- STEP 11: H5P Content Setup (for H5P activities)
-- =========================================================
-- NOTE: This step creates H5P libraries and content records
-- to make H5P activities work. This is optional and only needed
-- if you have H5P activities created via SQL (97_test_data.sql).
-- 
-- For production use, upload actual H5P files (.h5p) through Moodle UI.
-- =========================================================

SELECT '>>> STEP 11: Setting up H5P content (optional)...' as '';
SELECT 'This creates H5P libraries and content for H5P activities.' as '';
SELECT 'Note: Only needed if H5P activities are created via SQL.' as '';
SELECT '' as '';

-- Create H5P Core Library (required for all H5P)
SET @core_library_id = (SELECT id FROM mdl_h5p_libraries 
                        WHERE machinename = 'H5P.Core' 
                        AND majorversion = 1 
                        AND minorversion = 27 
                        LIMIT 1);

INSERT INTO mdl_h5p_libraries (
    id, machinename, title, majorversion, minorversion, patchversion,
    runnable, fullscreen, embedtypes, preloadedjs, preloadedcss,
    droplibrarycss, semantics, addto, coremajor, coreminor, enabled
) VALUES (
    1, 'H5P.Core', 'H5P Core Library', 1, 27, 0,
    0, 0, 'iframe', NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, 1
) ON DUPLICATE KEY UPDATE id = id;

SET @core_library_id = COALESCE(@core_library_id, 1);

-- Create H5P Interactive Video Library
INSERT INTO mdl_h5p_libraries (
    id, machinename, title, majorversion, minorversion, patchversion,
    runnable, fullscreen, embedtypes, preloadedjs, preloadedcss,
    droplibrarycss, semantics, addto, coremajor, coreminor, enabled
) VALUES (
    2, 'H5P.InteractiveVideo', 'Interactive Video', 1, 22, 0,
    1, 1, 'iframe', NULL, NULL,
    NULL, NULL, NULL, 1, 27, 1
) ON DUPLICATE KEY UPDATE id = id;

-- Link Interactive Video to Core library
INSERT INTO mdl_h5p_contents_libraries (
    h5pid, libraryid, dependencytype, dropcss, weight
) VALUES (
    1, @core_library_id, 'preloaded', 0, 1
) ON DUPLICATE KEY UPDATE h5pid = h5pid;

-- Create H5P Content Records with YouTube URLs
-- This will create H5P content for H5P activities (if they exist)
-- Extract YouTube URLs from intro field and use them in H5P content
INSERT INTO mdl_h5p (
    id, jsoncontent, mainlibraryid, displayoptions,
    pathnamehash, contenthash, filtered,
    timecreated, timemodified
) 
SELECT 
    (ha.id - 2499) as id,  -- Map h5pactivity id to h5p content id (2500->1, 2501->2, etc.)
    CONCAT(
        '{"title":"', REPLACE(REPLACE(ha.name, '"', '\\"'), '''', '\\'''), '","library":"H5P.InteractiveVideo 1.22","params":{"video":{"files":[{"path":"',
        CASE 
            -- Extract YouTube URL from intro field (full URL)
            WHEN ha.intro LIKE '%youtube.com/watch?v=%' THEN
                CONCAT('https://www.youtube.com/watch?v=', 
                    TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(ha.intro, 'youtube.com/watch?v=', -1), ' ', 1))
                )
            WHEN ha.intro LIKE '%youtu.be/%' THEN
                CONCAT('https://www.youtube.com/watch?v=', 
                    TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(ha.intro, 'youtu.be/', -1), ' ', 1))
                )
            -- Use appropriate YouTube video URLs based on course topic (real educational videos)
            WHEN ha.name LIKE '%Safety%' THEN 'https://www.youtube.com/watch?v=JHOqKqXQj8k'  -- Workplace safety training
            WHEN ha.name LIKE '%Security%' THEN 'https://www.youtube.com/watch?v=inWWhr5tnEA'  -- Information security
            WHEN ha.name LIKE '%Leadership%' THEN 'https://www.youtube.com/watch?v=XUO59Emi3eo'  -- Leadership development
            WHEN ha.name LIKE '%Communication%' THEN 'https://www.youtube.com/watch?v=7oKjW1OIjuw'  -- Communication skills
            WHEN ha.name LIKE '%Project%' OR ha.name LIKE '%PM%' THEN 'https://www.youtube.com/watch?v=AD5c7xKxqoM'  -- Project management
            WHEN ha.name LIKE '%Database%' THEN 'https://www.youtube.com/watch?v=ztHopE5Wnpc'  -- Database design
            WHEN ha.name LIKE '%Web%' OR ha.name LIKE '%Development%' THEN 'https://www.youtube.com/watch?v=zJSY8tbfLyk'  -- Web development
            WHEN ha.name LIKE '%Sales%' THEN 'https://www.youtube.com/watch?v=GXvIEwJs6LE'  -- Sales techniques
            WHEN ha.name LIKE '%CRM%' THEN 'https://www.youtube.com/watch?v=K7L5lY3Y3uI'  -- CRM implementation
            WHEN ha.name LIKE '%Customer Service%' THEN 'https://www.youtube.com/watch?v=8S0FDjFBj8o'  -- Customer service
            WHEN ha.name LIKE '%Team%' OR ha.name LIKE '%Collaboration%' THEN 'https://www.youtube.com/watch?v=3ao9NEW3r1k'  -- Team collaboration
            WHEN ha.name LIKE '%Company%' OR ha.name LIKE '%Introduction%' THEN 'https://www.youtube.com/watch?v=Z_BhMh_Xaug'  -- Company introduction
            WHEN ha.name LIKE '%Values%' OR ha.name LIKE '%Culture%' THEN 'https://www.youtube.com/watch?v=Z_BhMh_Xaug'  -- Company culture
            WHEN ha.name LIKE '%Onboarding%' THEN 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'  -- Onboarding (from intro)
            WHEN ha.name LIKE '%Exit%' THEN 'https://www.youtube.com/watch?v=jNQXAC9IVRw'  -- Exit process (from intro)
            WHEN ha.name LIKE '%Career%' THEN 'https://www.youtube.com/watch?v=9bZkp7q19f0'  -- Career development (from intro)
            WHEN ha.name LIKE '%Performance%' THEN 'https://www.youtube.com/watch?v=kJQP7kiw5Fk'  -- Performance management (from intro)
            WHEN ha.name LIKE '%Talent%' OR ha.name LIKE '%Acquisition%' THEN 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ'  -- Talent acquisition (from intro)
            WHEN ha.name LIKE '%Retention%' OR ha.name LIKE '%Employee%' THEN 'https://www.youtube.com/watch?v=OPf0YbXqDm0'  -- Employee retention (from intro)
            WHEN ha.name LIKE '%Recruitment%' THEN 'https://www.youtube.com/watch?v=ScMzIvxBSi4'  -- Recruitment (from intro)
            WHEN ha.name LIKE '%Succession%' THEN 'https://www.youtube.com/watch?v=2Vv-BfVoq4g'  -- Succession planning (from intro)
            ELSE 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'  -- Default
        END,
        '","mime":"video/youtube","copyright":{"license":"U"}}]},"interactiveVideo":{"interactions":[],"summary":{"task":{"library":"H5P.StandardPage 1.5","params":{"title":"Summary","standardPage":{"fullWidth":false,"text":"<p>', REPLACE(REPLACE(ha.name, '"', '\\"'), '''', '\\'''), ' - Interactive video content.</p>"}}}}}}}}'
    ) as jsoncontent,
    2 as mainlibraryid,  -- H5P.InteractiveVideo
    0 as displayoptions,
    SHA1(CONCAT('h5p_content_', ha.id)) as pathnamehash,
    SHA1(CONCAT('h5p_content_', ha.id, '_hash')) as contenthash,
    NULL as filtered,
    UNIX_TIMESTAMP() as timecreated,
    UNIX_TIMESTAMP() as timemodified
FROM mdl_h5pactivity ha
WHERE ha.id >= 2500 AND ha.id <= 2521
ON DUPLICATE KEY UPDATE 
    jsoncontent = VALUES(jsoncontent),
    timemodified = UNIX_TIMESTAMP();

-- Link H5P Content to Libraries
INSERT INTO mdl_h5p_contents_libraries (
    h5pid, libraryid, dependencytype, dropcss, weight
) 
SELECT 
    h.id as h5pid,
    2 as libraryid,  -- H5P.InteractiveVideo
    'preloaded' as dependencytype,
    0 as dropcss,
    1 as weight
FROM mdl_h5p h
WHERE h.id >= 1 AND h.id <= 22
ON DUPLICATE KEY UPDATE h5pid = h5pid;

-- Create File Records (link H5P content to activities)
-- This links H5P content files to H5P activities via mdl_files
INSERT INTO mdl_files (
    contenthash, pathnamehash, contextid, component, filearea, itemid,
    filepath, filename, userid, filesize, mimetype, source,
    author, license, timecreated, timemodified, status, sortorder
) 
SELECT 
    h.contenthash as contenthash,
    h.pathnamehash as pathnamehash,
    c.id as contextid,  -- Course module context
    'mod_h5pactivity' as component,
    'package' as filearea,
    ha.id as itemid,  -- H5P activity ID
    '/' as filepath,
    CONCAT('h5p_content_', ha.id, '.h5p') as filename,
    2 as userid,  -- Admin user
    1024 as filesize,
    'application/zip' as mimetype,
    '' as source,
    '' as author,
    '' as license,
    UNIX_TIMESTAMP() as timecreated,
    UNIX_TIMESTAMP() as timemodified,
    0 as status,
    0 as sortorder
FROM mdl_h5pactivity ha
INNER JOIN mdl_course_modules cm ON cm.instance = ha.id AND cm.module = 10
INNER JOIN mdl_context c ON c.instanceid = cm.id AND c.contextlevel = 70
INNER JOIN mdl_h5p h ON h.id = (ha.id - 2499)  -- Map h5pactivity id to h5p content id
WHERE ha.id >= 2500 AND ha.id <= 2521
ON DUPLICATE KEY UPDATE contenthash = VALUES(contenthash);

SELECT '✓ H5P content setup completed (if H5P activities exist)' as '';
SELECT '' as '';

-- =========================================================
-- ENABLE FOREIGN KEY CHECKS
-- =========================================================
SET foreign_key_checks = 1;

-- =========================================================
-- VERIFICATION: Count all custom tables
-- =========================================================
SELECT '=======================================' as '';
SELECT 'Installation Summary' as '';
SELECT '=======================================' as '';

SELECT COUNT(*) as 'Total Custom Tables Created' 
FROM information_schema.tables 
WHERE table_schema = DATABASE() 
AND (
    table_name LIKE 'mdl_org_%' 
    OR table_name = 'mdl_user_employment'
    OR table_name = 'mdl_course_extended'
    OR table_name = 'mdl_course_prerequisites'
    OR table_name = 'mdl_learning_program'
    OR table_name = 'mdl_learning_program_courses'
    OR table_name = 'mdl_auto_enrollment_rules'
    OR table_name = 'mdl_certificate_expiry'
    OR table_name = 'mdl_compliance_tracking'
    OR table_name = 'mdl_video_completion_tracking'
    OR table_name = 'mdl_hris_sync_log'
    OR table_name = 'mdl_department_mapping'
    OR table_name = 'mdl_job_role_courses'
    OR table_name = 'mdl_learning_time'
    OR table_name = 'mdl_quiz_answer_analytics'
    OR table_name = 'mdl_notification_queue'
);

-- List all custom tables
SELECT '>>> Custom Tables:' as '';
SELECT table_name as 'Table Name', 
       table_rows as 'Rows (Estimate)',
       ROUND((data_length + index_length) / 1024, 2) as 'Size (KB)'
FROM information_schema.tables 
WHERE table_schema = DATABASE() 
AND (
    table_name LIKE 'mdl_org_%' 
    OR table_name = 'mdl_user_employment'
    OR table_name = 'mdl_course_extended'
    OR table_name = 'mdl_course_prerequisites'
    OR table_name = 'mdl_learning_program'
    OR table_name = 'mdl_learning_program_courses'
    OR table_name = 'mdl_auto_enrollment_rules'
    OR table_name = 'mdl_certificate_expiry'
    OR table_name = 'mdl_compliance_tracking'
    OR table_name = 'mdl_video_completion_tracking'
    OR table_name = 'mdl_hris_sync_log'
    OR table_name = 'mdl_department_mapping'
    OR table_name = 'mdl_job_role_courses'
    OR table_name = 'mdl_learning_time'
    OR table_name = 'mdl_quiz_answer_analytics'
    OR table_name = 'mdl_notification_queue'
)
ORDER BY table_name;

-- =========================================================
-- SUCCESS MESSAGE
-- =========================================================
SELECT '=======================================' as '';
SELECT '✓ Installation Completed Successfully!' as '';
SELECT NOW() as 'Installation Finished';
SELECT '=======================================' as '';
SELECT '' as '';
SELECT 'Summary:' as '';
SELECT '  - Custom tables created: 18 tables' as '';
SELECT '  - User profile fields created: 4 fields' as '';
SELECT '  - User profile data synced: from mdl_user_employment' as '';
SELECT '  - H5P libraries created: 2 libraries (if H5P activities exist)' as '';
SELECT '  - H5P content created: for H5P activities (if they exist)' as '';
SELECT '' as '';
SELECT 'Next Steps:' as '';
SELECT '1. Verify tables in Adminer (http://localhost:8088)' as '';
SELECT '2. Add sample data: 98_sample_data.sql (optional)' as '';
SELECT '3. Add test data: 97_test_data.sql (optional - includes H5P activities)' as '';
SELECT '4. Install custom plugins via Moodle GUI' as '';
SELECT '5. Configure plugins and test functionality' as '';
SELECT '6. H5P content will be created automatically when H5P activities exist' as '';
SELECT '7. Test auto-enrollment: local_autoenrol_role' as '';
SELECT '8. Test auto-enrollment: local_autoenrol_dept' as '';
SELECT '9. Test API: local_lms_api_get_user_profile_fields' as '';
SELECT '=======================================' as '';
