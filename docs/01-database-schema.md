# Moodle Database Schema Documentation

> **Moodle Version:** 4.5  
> **Total Tables:** 496  
> **Total Columns:** 4,491  
> **Database:** MariaDB 10.11 / MySQL 8.4+

---

## Table Naming Conventions

| Rule                                                       | Example                        |
| ---------------------------------------------------------- | ------------------------------ |
| Every table has auto-increment `id` (INT10) as primary key | `id`                           |
| Main module tables named after module                      | `assignment`, `quiz`, `forum`  |
| Related tables use `modulename_things` pattern             | `quiz_attempts`, `forum_posts` |
| Foreign key columns end with `id`                          | `userid`, `courseid`, `cmid`   |
| Boolean fields use INT4 (0 or 1)                           | `visible`, `deleted`           |
| All tables have `timemodified` (INT10)                     | Unix timestamp                 |
| Table prefix: `mdl_` (configurable)                        | `mdl_user`                     |

---

## Database Table Groups

### 1. Core System Tables (50+ tables)

#### User Management
| Table Name              | Description                          | Key Columns                                                                        |
| ----------------------- | ------------------------------------ | ---------------------------------------------------------------------------------- |
| `user`                  | All user accounts                    | `id`, `username`, `email`, `firstname`, `lastname`, `auth`, `confirmed`, `deleted` |
| `user_preferences`      | User preference settings             | `id`, `userid`, `name`, `value`                                                    |
| `user_info_field`       | Custom profile field definitions     | `id`, `name`, `datatype`, `categoryid`                                             |
| `user_info_data`        | Custom profile field values          | `id`, `userid`, `fieldid`, `data`                                                  |
| `user_info_category`    | Categories for custom profile fields | `id`, `name`, `sortorder`                                                          |
| `user_enrolments`       | User enrolment records               | `id`, `enrolid`, `userid`, `status`, `timestart`, `timeend`                        |
| `user_lastaccess`       | Last access time per course          | `id`, `userid`, `courseid`, `timeaccess`                                           |
| `user_devices`          | Registered mobile devices            | `id`, `userid`, `appid`, `pushid`                                                  |
| `user_password_history` | Password change history              | `id`, `userid`, `hash`, `timecreated`                                              |
| `user_password_resets`  | Password reset tokens                | `id`, `userid`, `token`, `timerequested`                                           |

#### Role & Permission Management
| Table Name            | Description                           | Key Columns                                             |
| --------------------- | ------------------------------------- | ------------------------------------------------------- |
| `role`                | Role definitions                      | `id`, `name`, `shortname`, `description`, `archetype`   |
| `role_capabilities`   | Capability assignments to roles       | `id`, `roleid`, `capability`, `permission`, `contextid` |
| `role_assignments`    | User role assignments                 | `id`, `roleid`, `contextid`, `userid`, `component`      |
| `role_context_levels` | Where roles can be assigned           | `id`, `roleid`, `contextlevel`                          |
| `role_allow_assign`   | Which roles can assign other roles    | `id`, `roleid`, `allowassign`                           |
| `role_allow_override` | Which roles can override other roles  | `id`, `roleid`, `allowoverride`                         |
| `role_allow_switch`   | Which roles can switch to other roles | `id`, `roleid`, `allowswitch`                           |
| `role_allow_view`     | Which roles can view other roles      | `id`, `roleid`, `allowview`                             |
| `capabilities`        | All system capabilities               | `id`, `name`, `captype`, `contextlevel`, `component`    |

#### Context System
| Table Name     | Description               | Key Columns                                         |
| -------------- | ------------------------- | --------------------------------------------------- |
| `context`      | Context hierarchy         | `id`, `contextlevel`, `instanceid`, `path`, `depth` |
| `context_temp` | Temporary context storage | `id`, `path`, `depth`                               |

---

### 2. Course Management Tables (40+ tables)

#### Course Core
| Table Name                   | Description                   | Key Columns                                                                                       |
| ---------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------- |
| `course`                     | Course records                | `id`, `category`, `fullname`, `shortname`, `summary`, `format`, `startdate`, `enddate`, `visible` |
| `course_categories`          | Course category hierarchy     | `id`, `name`, `parent`, `sortorder`, `coursecount`, `visible`, `depth`, `path`                    |
| `course_sections`            | Course sections/topics        | `id`, `course`, `section`, `name`, `summary`, `visible`, `availability`                           |
| `course_modules`             | Activity instances in courses | `id`, `course`, `module`, `instance`, `section`, `visible`, `visibleold`, `availability`          |
| `course_modules_completion`  | Activity completion tracking  | `id`, `coursemoduleid`, `userid`, `completionstate`, `timemodified`                               |
| `course_completion_criteria` | Course completion rules       | `id`, `course`, `criteriatype`, `module`, `moduleinstance`                                        |
| `course_completions`         | Course completion records     | `id`, `userid`, `course`, `timeenrolled`, `timestarted`, `timecompleted`                          |
| `course_format_options`      | Course format settings        | `id`, `courseid`, `format`, `sectionid`, `name`, `value`                                          |
| `course_request`             | Course creation requests      | `id`, `fullname`, `shortname`, `summary`, `category`, `requester`                                 |
| `course_published`           | Published courses for sharing | `id`, `huburl`, `courseid`, `timepublished`                                                       |

#### Enrolment Methods
| Table Name        | Description                | Key Columns                                                                |
| ----------------- | -------------------------- | -------------------------------------------------------------------------- |
| `enrol`           | Enrolment method instances | `id`, `enrol`, `courseid`, `status`, `roleid`, `password`                  |
| `enrol_lti_tools` | LTI tool configurations    | `id`, `enrolid`, `contextid`, `secret`                                     |
| `enrol_lti_users` | LTI user mappings          | `id`, `toolid`, `userid`, `lastaccess`                                     |
| `enrol_paypal`    | PayPal transaction records | `id`, `business`, `receiver_email`, `courseid`, `userid`, `payment_status` |

---

### 3. Activity Module Tables (150+ tables)

#### Assignment Module (mod_assign)
| Table Name                    | Description                   | Key Columns                                                                                            |
| ----------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------ |
| `assign`                      | Assignment instances          | `id`, `course`, `name`, `intro`, `duedate`, `cutoffdate`, `gradingduedate`, `allowsubmissionsfromdate` |
| `assign_submission`           | Student submissions           | `id`, `assignment`, `userid`, `groupid`, `status`, `attemptnumber`, `timecreated`, `timemodified`      |
| `assign_grades`               | Assignment grades             | `id`, `assignment`, `userid`, `grader`, `grade`, `attemptnumber`, `timecreated`, `timemodified`        |
| `assign_user_flags`           | Per-user assignment settings  | `id`, `userid`, `assignment`, `locked`, `extensionduedate`                                             |
| `assign_user_mapping`         | Anonymous grading mappings    | `id`, `assignment`, `userid`                                                                           |
| `assign_overrides`            | Assignment overrides          | `id`, `assignid`, `userid`, `groupid`, `duedate`, `cutoffdate`                                         |
| `assignsubmission_file`       | File submission plugin data   | `id`, `assignment`, `submission`, `numfiles`                                                           |
| `assignsubmission_onlinetext` | Online text submission plugin | `id`, `assignment`, `submission`, `onlinetext`, `onlineformat`                                         |
| `assignfeedback_comments`     | Feedback comments plugin      | `id`, `assignment`, `grade`, `commenttext`, `commentformat`                                            |
| `assignfeedback_file`         | Feedback files plugin         | `id`, `assignment`, `grade`, `numfiles`                                                                |

#### Quiz Module (mod_quiz)
| Table Name         | Description               | Key Columns                                                                                               |
| ------------------ | ------------------------- | --------------------------------------------------------------------------------------------------------- |
| `quiz`             | Quiz instances            | `id`, `course`, `name`, `intro`, `timeopen`, `timeclose`, `timelimit`, `attempts`, `grademethod`, `grade` |
| `quiz_attempts`    | Quiz attempts             | `id`, `quiz`, `userid`, `attempt`, `state`, `timestart`, `timefinish`, `sumgrades`, `layout`              |
| `quiz_grades`      | Final quiz grades         | `id`, `quiz`, `userid`, `grade`, `timemodified`                                                           |
| `quiz_slots`       | Questions in quiz         | `id`, `quizid`, `slot`, `page`, `questionid`, `maxmark`                                                   |
| `quiz_sections`    | Quiz sections/pages       | `id`, `quizid`, `firstslot`, `heading`, `shufflequestions`                                                |
| `quiz_overrides`   | Quiz overrides            | `id`, `quiz`, `userid`, `groupid`, `timeopen`, `timeclose`, `timelimit`, `attempts`, `password`           |
| `quiz_feedback`    | Overall feedback by grade | `id`, `quizid`, `feedbacktext`, `mingrade`, `maxgrade`                                                    |
| `quiz_reports`     | Quiz report settings      | `id`, `name`, `displayorder`                                                                              |
| `quiz_statistics`  | Cached quiz statistics    | `id`, `hashcode`, `quizid`, `groupid`, `allattempts`                                                      |
| `quiz_grade_items` | Multiple grade items      | `id`, `quizid`, `sortorder`, `name`                                                                       |

#### Forum Module (mod_forum)
| Table Name              | Description                | Key Columns                                                                            |
| ----------------------- | -------------------------- | -------------------------------------------------------------------------------------- |
| `forum`                 | Forum instances            | `id`, `course`, `type`, `name`, `intro`, `forcesubscribe`, `trackingtype`              |
| `forum_discussions`     | Forum discussions          | `id`, `course`, `forum`, `name`, `userid`, `groupid`, `timestart`, `timeend`, `pinned` |
| `forum_posts`           | Forum posts                | `id`, `discussion`, `parent`, `userid`, `subject`, `message`, `attachment`             |
| `forum_subscriptions`   | Forum subscriptions        | `id`, `userid`, `forum`                                                                |
| `forum_discussion_subs` | Discussion subscriptions   | `id`, `forum`, `discussion`, `userid`, `preference`                                    |
| `forum_read`            | Read post tracking         | `id`, `userid`, `forumid`, `discussionid`, `postid`, `firstread`                       |
| `forum_track_prefs`     | Forum tracking preferences | `id`, `userid`, `forumid`                                                              |
| `forum_queue`           | Email digest queue         | `id`, `userid`, `discussionid`, `postid`, `timemodified`                               |
| `forum_digests`         | Digest settings            | `id`, `userid`, `forum`, `maildigest`                                                  |
| `forum_grades`          | Forum grades               | `id`, `forum`, `itemnumber`, `userid`, `grade`, `timecreated`                          |

#### SCORM Module (mod_scorm)
| Table Name           | Description             | Key Columns                                                                              |
| -------------------- | ----------------------- | ---------------------------------------------------------------------------------------- |
| `scorm`              | SCORM package instances | `id`, `course`, `name`, `reference`, `version`, `maxgrade`, `grademethod`                |
| `scorm_scoes`        | SCO elements            | `id`, `scorm`, `manifest`, `organization`, `parent`, `identifier`, `launch`, `scormtype` |
| `scorm_scoes_data`   | SCO data elements       | `id`, `scoid`, `name`, `value`                                                           |
| `scorm_scoes_track`  | User tracking data      | `id`, `userid`, `scormid`, `scoid`, `attempt`, `element`, `value`, `timemodified`        |
| `scorm_attempt`      | SCORM attempts          | `id`, `userid`, `scormid`, `attempt`                                                     |
| `scorm_aicc_session` | AICC session data       | `id`, `userid`, `scormid`, `scoid`, `session_time`, `lesson_status`                      |

#### Other Activity Modules
| Table Name             | Description          | Key Columns                                                             |
| ---------------------- | -------------------- | ----------------------------------------------------------------------- |
| `book`                 | Book resource        | `id`, `course`, `name`, `intro`, `numbering`, `navstyle`                |
| `book_chapters`        | Book chapters        | `id`, `bookid`, `pagenum`, `subchapter`, `title`, `content`             |
| `chat`                 | Chat activity        | `id`, `course`, `name`, `intro`, `chattime`, `schedule`                 |
| `chat_messages`        | Chat messages        | `id`, `chatid`, `userid`, `message`, `timestamp`                        |
| `choice`               | Choice activity      | `id`, `course`, `name`, `intro`, `timeopen`, `timeclose`                |
| `choice_options`       | Choice options       | `id`, `choiceid`, `text`, `maxanswers`                                  |
| `choice_answers`       | User choices         | `id`, `choiceid`, `userid`, `optionid`, `timemodified`                  |
| `data`                 | Database activity    | `id`, `course`, `name`, `intro`, `approval`, `manageapproved`           |
| `data_fields`          | Database fields      | `id`, `dataid`, `type`, `name`, `description`                           |
| `data_content`         | Database content     | `id`, `fieldid`, `recordid`, `content`                                  |
| `data_records`         | Database records     | `id`, `dataid`, `userid`, `groupid`, `timecreated`, `approved`          |
| `feedback`             | Feedback activity    | `id`, `course`, `name`, `intro`, `anonymous`, `multiple_submit`         |
| `feedback_item`        | Feedback questions   | `id`, `feedback`, `typ`, `name`, `label`, `options`                     |
| `feedback_value`       | Feedback responses   | `id`, `item`, `completed`, `value`                                      |
| `glossary`             | Glossary activity    | `id`, `course`, `name`, `intro`, `entbypage`, `allowduplicatedentries`  |
| `glossary_entries`     | Glossary entries     | `id`, `glossaryid`, `userid`, `concept`, `definition`                   |
| `h5pactivity`          | H5P activity         | `id`, `course`, `name`, `intro`, `grade`, `grademethod`                 |
| `h5pactivity_attempts` | H5P attempts         | `id`, `h5pactivityid`, `userid`, `attempt`, `rawscore`, `maxscore`      |
| `label`                | Label resource       | `id`, `course`, `name`, `intro`                                         |
| `lesson`               | Lesson activity      | `id`, `course`, `name`, `intro`, `practice`, `maxanswers`               |
| `lesson_pages`         | Lesson pages         | `id`, `lessonid`, `prevpageid`, `nextpageid`, `qtype`, `contents`       |
| `lesson_answers`       | Lesson answers       | `id`, `lessonid`, `pageid`, `answer`, `response`, `jumpto`, `score`     |
| `lti`                  | LTI activity         | `id`, `course`, `name`, `typeid`, `toolurl`, `instructorchoicesendname` |
| `page`                 | Page resource        | `id`, `course`, `name`, `intro`, `content`, `contentformat`             |
| `resource`             | File resource        | `id`, `course`, `name`, `intro`, `display`, `filterfiles`               |
| `url`                  | URL resource         | `id`, `course`, `name`, `intro`, `externalurl`, `display`               |
| `wiki`                 | Wiki activity        | `id`, `course`, `name`, `intro`, `wikimode`, `defaultformat`            |
| `wiki_pages`           | Wiki pages           | `id`, `subwikiid`, `title`, `cachedcontent`, `userid`                   |
| `wiki_versions`        | Wiki page versions   | `id`, `pageid`, `content`, `userid`, `version`, `timecreated`           |
| `workshop`             | Workshop activity    | `id`, `course`, `name`, `intro`, `phase`, `grade`, `gradinggrade`       |
| `workshop_submissions` | Workshop submissions | `id`, `workshopid`, `authorid`, `title`, `content`, `grade`             |
| `workshop_assessments` | Workshop assessments | `id`, `submissionid`, `reviewerid`, `grade`, `feedbackauthor`           |

---

### 4. Gradebook Tables (30+ tables)

| Table Name                    | Description                  | Key Columns                                                                                                     |
| ----------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `grade_items`                 | Gradeable items              | `id`, `courseid`, `categoryid`, `itemname`, `itemtype`, `itemmodule`, `grademax`, `grademin`, `gradepass`       |
| `grade_categories`            | Grade categories             | `id`, `courseid`, `parent`, `fullname`, `aggregation`, `keephigh`, `droplow`                                    |
| `grade_grades`                | User grades                  | `id`, `itemid`, `userid`, `rawgrade`, `rawgrademax`, `rawgrademin`, `finalgrade`, `timecreated`, `timemodified` |
| `grade_grades_history`        | Grade change history         | `id`, `itemid`, `userid`, `oldid`, `action`, `source`, `loggeduser`, `timemodified`                             |
| `grade_outcomes`              | Learning outcomes            | `id`, `courseid`, `shortname`, `fullname`, `scaleid`                                                            |
| `grade_outcomes_courses`      | Outcome-course links         | `id`, `courseid`, `outcomeid`                                                                                   |
| `grade_outcomes_history`      | Outcome change history       | `id`, `outcomeid`, `loggeduser`, `action`, `source`, `timemodified`                                             |
| `grade_letters`               | Grade letters                | `id`, `contextid`, `lowerboundary`, `letter`                                                                    |
| `grade_settings`              | Grade settings               | `id`, `courseid`, `name`, `value`                                                                               |
| `grade_import_newitem`        | Grade import staging         | `id`, `itemname`, `importcode`, `importer`                                                                      |
| `grade_import_values`         | Grade import values          | `id`, `itemid`, `newgradeitem`, `userid`, `finalgrade`, `importer`                                              |
| `gradingform_rubric_criteria` | Rubric criteria              | `id`, `definitionid`, `sortorder`, `description`                                                                |
| `gradingform_rubric_levels`   | Rubric levels                | `id`, `criterionid`, `score`, `definition`                                                                      |
| `gradingform_guide_criteria`  | Marking guide criteria       | `id`, `definitionid`, `sortorder`, `shortname`, `maxscore`                                                      |
| `grading_definitions`         | Advanced grading definitions | `id`, `areaid`, `method`, `name`, `description`, `status`                                                       |
| `grading_areas`               | Grading areas                | `id`, `contextid`, `component`, `areaname`, `activemethod`                                                      |
| `grading_instances`           | Grading instances            | `id`, `definitionid`, `raterid`, `itemid`, `status`                                                             |

---

### 5. Question Bank Tables (40+ tables)

| Table Name                    | Description               | Key Columns                                                                                            |
| ----------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------ |
| `question`                    | Questions                 | `id`, `category`, `parent`, `name`, `questiontext`, `qtype`, `defaultmark`, `penalty`                  |
| `question_categories`         | Question categories       | `id`, `name`, `contextid`, `parent`, `sortorder`, `idnumber`                                           |
| `question_bank_entries`       | Question bank entries     | `id`, `questioncategoryid`, `idnumber`, `ownerid`                                                      |
| `question_versions`           | Question versions         | `id`, `questionbankentryid`, `version`, `questionid`, `status`                                         |
| `question_references`         | Question references       | `id`, `usingcontextid`, `component`, `questionarea`, `itemid`, `questionbankentryid`, `version`        |
| `question_set_references`     | Random question sets      | `id`, `usingcontextid`, `component`, `questionarea`, `itemid`, `questionscontextid`, `filtercondition` |
| `question_answers`            | Question answers          | `id`, `question`, `answer`, `answerformat`, `fraction`, `feedback`                                     |
| `question_hints`              | Question hints            | `id`, `questionid`, `hint`, `hintformat`, `shownumcorrect`, `clearwrong`                               |
| `question_attempts`           | Question attempts         | `id`, `questionusageid`, `slot`, `questionid`, `variant`, `maxmark`, `minfraction`, `maxfraction`      |
| `question_attempt_steps`      | Question attempt steps    | `id`, `questionattemptid`, `sequencenumber`, `state`, `fraction`, `timecreated`, `userid`              |
| `question_attempt_step_data`  | Step data                 | `id`, `attemptstepid`, `name`, `value`                                                                 |
| `question_usages`             | Question usage contexts   | `id`, `contextid`, `component`, `preferredbehaviour`                                                   |
| `question_statistics`         | Question statistics cache | `id`, `hashcode`, `questionid`, `slot`, `s`, `effectiveweight`                                         |
| `question_response_analysis`  | Response analysis cache   | `id`, `hashcode`, `questionid`, `variant`, `subqid`, `response`                                        |
| `question_response_count`     | Response count cache      | `id`, `analysisid`, `try`, `rcount`                                                                    |
| `qtype_ddimageortext`         | Drag & drop image/text    | `id`, `questionid`, `shuffleanswers`                                                                   |
| `qtype_ddmarker`              | Drag & drop markers       | `id`, `questionid`, `shuffleanswers`, `showmisplaced`                                                  |
| `qtype_essay_options`         | Essay options             | `id`, `questionid`, `responseformat`, `responserequired`, `responsefieldlines`                         |
| `qtype_match_options`         | Matching options          | `id`, `questionid`, `shuffleanswers`                                                                   |
| `qtype_match_subquestions`    | Matching pairs            | `id`, `questionid`, `questiontext`, `answertext`                                                       |
| `qtype_multichoice_options`   | Multiple choice options   | `id`, `questionid`, `layout`, `single`, `shuffleanswers`, `correctfeedback`                            |
| `qtype_randomsamatch_options` | Random match options      | `id`, `questionid`, `choose`                                                                           |
| `qtype_shortanswer_options`   | Short answer options      | `id`, `questionid`, `usecase`                                                                          |
| `qtype_ordering_options`      | Ordering options          | `id`, `questionid`, `layouttype`, `selecttype`, `selectcount`                                          |

---

### 6. Messaging & Notification Tables (20+ tables)

| Table Name                     | Description               | Key Columns                                                                                                                   |
| ------------------------------ | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `message`                      | Messages (deprecated)     | `id`, `useridfrom`, `useridto`, `subject`, `fullmessage`, `smallmessage`, `timecreated`                                       |
| `message_conversations`        | Conversation records      | `id`, `type`, `name`, `convhash`, `contextid`, `enabled`, `timecreated`                                                       |
| `message_conversation_members` | Conversation participants | `id`, `conversationid`, `userid`, `timecreated`                                                                               |
| `message_conversation_actions` | Conversation actions      | `id`, `userid`, `conversationid`, `action`, `timecreated`                                                                     |
| `messages`                     | New message storage       | `id`, `useridfrom`, `conversationid`, `subject`, `fullmessage`, `smallmessage`, `timecreated`                                 |
| `message_user_actions`         | User message actions      | `id`, `userid`, `messageid`, `action`, `timecreated`                                                                          |
| `message_contacts`             | User contacts             | `id`, `userid`, `contactid`, `timecreated`                                                                                    |
| `message_contact_requests`     | Contact requests          | `id`, `userid`, `requesteduserid`, `timecreated`                                                                              |
| `message_users_blocked`        | Blocked users             | `id`, `userid`, `blockeduserid`, `timecreated`                                                                                |
| `message_providers`            | Message providers         | `id`, `component`, `name`, `capability`                                                                                       |
| `message_processors`           | Message processors        | `id`, `name`, `enabled`                                                                                                       |
| `notifications`                | User notifications        | `id`, `useridfrom`, `useridto`, `subject`, `fullmessage`, `smallmessage`, `component`, `eventtype`, `timecreated`, `timeread` |
| `message_popup_notifications`  | Popup notification list   | `id`, `notificationid`                                                                                                        |
| `message_email_messages`       | Email message queue       | `id`, `useridto`, `conversationid`, `messageid`                                                                               |

---

### 7. File Storage Tables (10+ tables)

| Table Name                   | Description              | Key Columns                                                                                                                                  |
| ---------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `files`                      | All file records         | `id`, `contenthash`, `contextid`, `component`, `filearea`, `itemid`, `filepath`, `filename`, `filesize`, `mimetype`, `userid`, `timecreated` |
| `files_reference`            | External file references | `id`, `repositoryid`, `lastsync`, `reference`, `referencehash`                                                                               |
| `repository`                 | Repository plugin config | `id`, `type`, `visible`, `sortorder`                                                                                                         |
| `repository_instances`       | Repository instances     | `id`, `name`, `typeid`, `userid`, `contextid`                                                                                                |
| `repository_instance_config` | Instance config values   | `id`, `instanceid`, `name`, `value`                                                                                                          |
| `repository_onedrive_access` | OneDrive access tokens   | `id`, `usermodified`, `timecreated`, `timemodified`, `permissionid`, `itemid`                                                                |

---

### 8. Calendar & Events Tables (10+ tables)

| Table Name            | Description            | Key Columns                                                                                                                                 |
| --------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `event`               | Calendar events        | `id`, `name`, `description`, `courseid`, `groupid`, `userid`, `modulename`, `instance`, `eventtype`, `timestart`, `timeduration`, `visible` |
| `event_subscriptions` | Calendar subscriptions | `id`, `url`, `courseid`, `groupid`, `userid`, `eventtype`, `pollinterval`, `lastupdated`                                                    |

---

### 9. Badge & Competency Tables (30+ tables)

#### Badges
| Table Name                | Description              | Key Columns                                                                                       |
| ------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------- |
| `badge`                   | Badge definitions        | `id`, `name`, `description`, `image`, `courseid`, `status`, `type`, `usercreated`, `usermodified` |
| `badge_issued`            | Issued badges            | `id`, `badgeid`, `userid`, `uniquehash`, `dateissued`, `dateexpire`                               |
| `badge_criteria`          | Badge criteria           | `id`, `badgeid`, `criteriatype`, `method`, `descriptionformat`                                    |
| `badge_criteria_met`      | Criteria completion      | `id`, `issuedid`, `critid`, `userid`, `datemet`                                                   |
| `badge_criteria_param`    | Criteria parameters      | `id`, `critid`, `name`, `value`                                                                   |
| `badge_backpack`          | Backpack connections     | `id`, `userid`, `email`, `backpackuid`, `autosync`                                                |
| `badge_external`          | External badge hashes    | `id`, `backpackid`, `collectionid`                                                                |
| `badge_external_backpack` | External backpack config | `id`, `backpackapiurl`, `backpackweburl`, `apiversion`                                            |
| `badge_related`           | Related badges           | `id`, `badgeid`, `relatedbadgeid`                                                                 |
| `badge_alignment`         | Badge alignments         | `id`, `badgeid`, `targetname`, `targeturl`, `targetdescription`                                   |

#### Competencies
| Table Name                     | Description                | Key Columns                                                                               |
| ------------------------------ | -------------------------- | ----------------------------------------------------------------------------------------- |
| `competency`                   | Competency definitions     | `id`, `shortname`, `description`, `idnumber`, `competencyframeworkid`, `parentid`, `path` |
| `competency_framework`         | Competency frameworks      | `id`, `shortname`, `idnumber`, `description`, `scaleid`, `contextid`                      |
| `competency_coursecomp`        | Course competencies        | `id`, `courseid`, `competencyid`, `sortorder`                                             |
| `competency_coursecompsetting` | Course competency settings | `id`, `courseid`, `pushratingstouserplans`                                                |
| `competency_usercomp`          | User competencies          | `id`, `userid`, `competencyid`, `proficiency`, `grade`, `usermodified`                    |
| `competency_usercompcourse`    | User course competencies   | `id`, `userid`, `courseid`, `competencyid`, `proficiency`, `grade`                        |
| `competency_usercompplan`      | User plan competencies     | `id`, `userid`, `competencyid`, `planid`, `proficiency`, `grade`                          |
| `competency_plan`              | Learning plans             | `id`, `name`, `description`, `userid`, `templateid`, `status`, `reviewerid`               |
| `competency_template`          | Learning plan templates    | `id`, `shortname`, `description`, `contextid`, `visible`                                  |
| `competency_templatecomp`      | Template competencies      | `id`, `templateid`, `competencyid`, `sortorder`                                           |
| `competency_templatecohort`    | Template cohort links      | `id`, `templateid`, `cohortid`                                                            |
| `competency_evidence`          | Competency evidence        | `id`, `usercompetencyid`, `contextid`, `action`, `actionuserid`, `grade`, `note`          |

---

### 10. Analytics & Reports Tables (20+ tables)

| Table Name                     | Description            | Key Columns                                                                                            |
| ------------------------------ | ---------------------- | ------------------------------------------------------------------------------------------------------ |
| `analytics_models`             | Analytic models        | `id`, `enabled`, `trained`, `target`, `indicators`, `timesplitting`, `contextids`                      |
| `analytics_models_log`         | Model logs             | `id`, `modelid`, `version`, `evaluationmode`, `target`, `score`                                        |
| `analytics_predictions`        | Predictions            | `id`, `modelid`, `contextid`, `sampleid`, `rangeindex`, `prediction`, `predictionscore`, `timecreated` |
| `analytics_prediction_actions` | Prediction actions     | `id`, `predictionid`, `userid`, `actionname`, `timecreated`                                            |
| `analytics_indicator_calc`     | Indicator calculations | `id`, `starttime`, `endtime`, `contextid`, `sampleorigin`, `sampleid`, `indicator`, `value`            |
| `analytics_used_files`         | Used file tracking     | `id`, `modelid`, `fileid`, `action`, `time`                                                            |
| `analytics_used_analysables`   | Used analysables       | `id`, `modelid`, `action`, `analysableid`, `firstanalysis`, `timeanalysed`                             |
| `analytics_train_samples`      | Training samples       | `id`, `modelid`, `analysableid`, `timesplitting`, `fileid`, `sampleids`, `timecreated`                 |
| `reportbuilder_report`         | Custom reports         | `id`, `source`, `type`, `contextid`, `component`, `area`, `itemid`, `name`                             |
| `reportbuilder_column`         | Report columns         | `id`, `reportid`, `uniqueidentifier`, `aggregation`, `heading`, `columnorder`, `sortdirection`         |
| `reportbuilder_filter`         | Report filters         | `id`, `reportid`, `uniqueidentifier`, `heading`, `filterorder`                                         |
| `reportbuilder_audience`       | Report audiences       | `id`, `reportid`, `heading`, `classname`, `configdata`                                                 |
| `reportbuilder_schedule`       | Report schedules       | `id`, `reportid`, `name`, `enabled`, `audiences`, `format`, `subject`, `message`, `timecreated`        |

---

### 11. Log & Cache Tables (15+ tables)

| Table Name              | Description                | Key Columns                                                                                                                               |
| ----------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `logstore_standard_log` | Standard event logs        | `id`, `eventname`, `component`, `action`, `target`, `crud`, `edulevel`, `contextid`, `userid`, `relateduserid`, `courseid`, `timecreated` |
| `log`                   | Legacy logs (deprecated)   | `id`, `time`, `userid`, `course`, `module`, `cmid`, `action`, `url`, `info`                                                               |
| `config_log`            | Configuration change logs  | `id`, `userid`, `timemodified`, `plugin`, `name`, `value`, `oldvalue`                                                                     |
| `upgrade_log`           | Upgrade process logs       | `id`, `type`, `plugin`, `version`, `targetversion`, `info`, `details`, `backtrace`, `timemodified`                                        |
| `task_log`              | Task execution logs        | `id`, `type`, `component`, `classname`, `userid`, `timestart`, `timeend`, `result`, `output`                                              |
| `cache_flags`           | Time-sensitive cache flags | `id`, `flagtype`, `name`, `timemodified`, `value`, `expiry`                                                                               |
| `cache_filters`         | Filter cache               | `id`, `filter`, `version`, `md5key`, `rawtext`, `timemodified`                                                                            |
| `sessions`              | User sessions              | `id`, `state`, `sid`, `userid`, `sessdata`, `timecreated`, `timemodified`, `firstip`, `lastip`                                            |

---

### 12. Plugin & Configuration Tables (20+ tables)

| Table Name                 | Description                | Key Columns                                                                                                                                    |
| -------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `config`                   | Global configuration       | `id`, `name`, `value`                                                                                                                          |
| `config_plugins`           | Plugin configuration       | `id`, `plugin`, `name`, `value`                                                                                                                |
| `modules`                  | Installed activity modules | `id`, `name`, `version`, `visible`                                                                                                             |
| `block`                    | Installed blocks           | `id`, `name`, `version`, `visible`                                                                                                             |
| `block_instances`          | Block instances            | `id`, `blockname`, `parentcontextid`, `showinsubcontexts`, `pagetypepattern`, `subpagepattern`, `defaultregion`, `defaultweight`, `configdata` |
| `block_positions`          | Block positions            | `id`, `blockinstanceid`, `contextid`, `pagetype`, `subpage`, `visible`, `region`, `weight`                                                     |
| `filter_active`            | Active filters             | `id`, `filter`, `contextid`, `active`, `sortorder`                                                                                             |
| `filter_config`            | Filter configuration       | `id`, `filter`, `contextid`, `name`, `value`                                                                                                   |
| `tool_recyclebin_course`   | Course recycle bin         | `id`, `courseid`, `section`, `module`, `name`, `timecreated`                                                                                   |
| `tool_recyclebin_category` | Category recycle bin       | `id`, `categoryid`, `shortname`, `fullname`, `timecreated`                                                                                     |
| `tool_policy`              | Policy management          | `id`, `name`, `revision`, `summary`, `content`, `type`, `audience`, `archived`                                                                 |
| `tool_policy_acceptances`  | Policy acceptances         | `id`, `policyversionid`, `userid`, `status`, `lang`, `usermodified`, `timecreated`, `timemodified`                                             |
| `scale`                    | Grade scales               | `id`, `courseid`, `userid`, `name`, `scale`, `description`                                                                                     |
| `tag`                      | Tags                       | `id`, `userid`, `tagcollid`, `name`, `rawname`, `description`, `flag`, `isstandard`                                                            |
| `tag_instance`             | Tag uses                   | `id`, `tagid`, `component`, `itemtype`, `itemid`, `contextid`, `tiuserid`, `ordering`, `timecreated`, `timemodified`                           |
| `tag_coll`                 | Tag collections            | `id`, `name`, `isdefault`, `component`, `sortorder`, `searchable`, `customurl`                                                                 |
| `tag_area`                 | Tag areas                  | `id`, `component`, `itemtype`, `enabled`, `tagcollid`, `callback`, `callbackfile`                                                              |
| `tag_correlation`          | Tag correlations           | `id`, `tagid`, `correlatedtags`                                                                                                                |

---

### 13. Groups & Cohorts Tables (10+ tables)

| Table Name         | Description          | Key Columns                                                                                 |
| ------------------ | -------------------- | ------------------------------------------------------------------------------------------- |
| `groups`           | Group definitions    | `id`, `courseid`, `name`, `description`, `enrolmentkey`, `picture`, `timecreated`           |
| `groups_members`   | Group membership     | `id`, `groupid`, `userid`, `timeadded`, `component`, `itemid`                               |
| `groupings`        | Grouping definitions | `id`, `courseid`, `name`, `idnumber`, `description`, `timecreated`                          |
| `groupings_groups` | Grouping-group links | `id`, `groupingid`, `groupid`, `timeadded`                                                  |
| `cohort`           | Cohort definitions   | `id`, `contextid`, `name`, `idnumber`, `description`, `visible`, `component`, `timecreated` |
| `cohort_members`   | Cohort membership    | `id`, `cohortid`, `userid`, `timeadded`                                                     |

---

### 14. Web Services Tables (15+ tables)

| Table Name                    | Description                   | Key Columns                                                                                                                                      |
| ----------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `external_services`           | Web service definitions       | `id`, `name`, `enabled`, `requiredcapability`, `restrictedusers`, `component`, `downloadfiles`, `uploadfiles`                                    |
| `external_services_functions` | Service functions             | `id`, `externalserviceid`, `functionname`                                                                                                        |
| `external_services_users`     | Authorized users              | `id`, `externalserviceid`, `userid`, `iprestriction`, `validuntil`, `timecreated`                                                                |
| `external_functions`          | External function definitions | `id`, `name`, `classname`, `methodname`, `classpath`, `component`, `capabilities`, `services`                                                    |
| `external_tokens`             | API tokens                    | `id`, `token`, `tokentype`, `userid`, `externalserviceid`, `contextid`, `creatorid`, `iprestriction`, `validuntil`, `timecreated`, `lastaccess`  |
| `oauth2_issuer`               | OAuth2 issuers                | `id`, `timecreated`, `timemodified`, `usermodified`, `name`, `image`, `baseurl`, `clientid`, `clientsecret`, `loginscopes`, `loginscopesoffline` |
| `oauth2_endpoint`             | OAuth2 endpoints              | `id`, `timecreated`, `timemodified`, `usermodified`, `name`, `url`, `issuerid`                                                                   |
| `oauth2_user_field_mapping`   | OAuth2 field mappings         | `id`, `timecreated`, `timemodified`, `usermodified`, `issuerid`, `externalfield`, `internalfield`                                                |
| `oauth2_system_account`       | OAuth2 system accounts        | `id`, `timecreated`, `timemodified`, `usermodified`, `issuerid`, `refreshtoken`, `grantedscopes`, `email`, `username`                            |
| `oauth2_access_token`         | OAuth2 access tokens          | `id`, `timecreated`, `timemodified`, `usermodified`, `issuerid`, `token`, `expires`, `scope`                                                     |
| `oauth2_refresh_token`        | OAuth2 refresh tokens         | `id`, `timecreated`, `timemodified`, `userid`, `issuerid`, `token`, `scopehash`                                                                  |

---

## Entity Relationship Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                          CONTEXT SYSTEM                             │
│  (context → contextlevel, instanceid, path, depth)                 │
└─────────────────────────────────────────────────────────────────────┘
                                    │
          ┌─────────────────────────┼─────────────────────────┐
          ▼                         ▼                         ▼
   ┌─────────────┐          ┌─────────────┐          ┌─────────────┐
   │    USER     │          │   COURSE    │          │   SYSTEM    │
   │ contextlevel│          │ contextlevel│          │ contextlevel│
   │     = 30    │          │     = 50    │          │     = 10    │
   └─────────────┘          └─────────────┘          └─────────────┘
          │                         │
          ▼                         ▼
   ┌─────────────┐          ┌─────────────────────┐
   │role_assign  │          │   course_modules    │
   │  ments      │          │   (activities)      │
   └─────────────┘          └─────────────────────┘
                                    │
          ┌─────────────────────────┼─────────────────────────┐
          ▼                         ▼                         ▼
   ┌─────────────┐          ┌─────────────┐          ┌─────────────┐
   │   ASSIGN    │          │    QUIZ     │          │   FORUM     │
   │assign_grades│          │quiz_attempts│          │forum_posts  │
   └─────────────┘          └─────────────┘          └─────────────┘
                                    │
                                    ▼
                            ┌─────────────┐
                            │ GRADEBOOK   │
                            │grade_grades │
                            └─────────────┘
```

---

## Quick Reference - Most Used Tables

| Purpose             | Tables                                               |
| ------------------- | ---------------------------------------------------- |
| User authentication | `user`, `user_preferences`                           |
| Course management   | `course`, `course_categories`, `course_modules`      |
| Enrolments          | `enrol`, `user_enrolments`                           |
| Roles & permissions | `role`, `role_assignments`, `role_capabilities`      |
| Grades              | `grade_items`, `grade_grades`, `grade_categories`    |
| Activity completion | `course_modules_completion`, `course_completions`    |
| Files               | `files`, `files_reference`                           |
| Messages            | `messages`, `message_conversations`, `notifications` |
| Logs                | `logstore_standard_log`                              |
| Configuration       | `config`, `config_plugins`                           |

---

## Database Indexes

Most tables include indexes on:
- `id` (Primary Key)
- Foreign key columns (`userid`, `courseid`, `contextid`)
- Frequently queried columns
- `timemodified` for sorting

---

*Document generated for Moodle 4.5 - LMS Docker Complete Project*
