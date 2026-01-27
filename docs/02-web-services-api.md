# Moodle Web Services API Documentation

> **Moodle Version:** 4.5  
> **Total API Functions:** 400+  
> **Protocols:** REST, XML-RPC, SOAP (deprecated)  
> **Authentication:** Token-based

---

## Overview

Moodle Web Services allow external applications to interact with Moodle. The API is organized by components and provides CRUD operations for most Moodle entities.

### API Endpoint Format

```
{wwwroot}/webservice/rest/server.php
```

### Request Parameters

| Parameter            | Description                       | Required                |
| -------------------- | --------------------------------- | ----------------------- |
| `wstoken`            | API authentication token          | Yes                     |
| `wsfunction`         | Function name to call             | Yes                     |
| `moodlewsrestformat` | Response format (`json` or `xml`) | Optional (default: xml) |

### Example API Call

```bash
curl -X POST "http://localhost:8080/webservice/rest/server.php" \
  -d "wstoken=YOUR_TOKEN" \
  -d "wsfunction=core_user_get_users_by_field" \
  -d "field=username" \
  -d "values[0]=admin" \
  -d "moodlewsrestformat=json"
```

---

## API Functions by Component

### 1. Core User Functions (core_user_*)

| Function                             | Description                    | Parameters                                                        |
| ------------------------------------ | ------------------------------ | ----------------------------------------------------------------- |
| `core_user_create_users`             | Create new users               | `users[]` (array of user data)                                    |
| `core_user_update_users`             | Update existing users          | `users[]` (array of user updates)                                 |
| `core_user_delete_users`             | Delete users                   | `userids[]` (array of user IDs)                                   |
| `core_user_get_users`                | Get users by criteria          | `criteria[]` (search criteria)                                    |
| `core_user_get_users_by_field`       | Get users by field value       | `field`, `values[]`                                               |
| `core_user_get_course_user_profiles` | Get user profiles for course   | `userlist[]` (userid, courseid pairs)                             |
| `core_user_get_user_preferences`     | Get user preferences           | `name`, `userid`                                                  |
| `core_user_set_user_preferences`     | Set user preferences           | `preferences[]`                                                   |
| `core_user_update_user_preferences`  | Update user preferences        | `userid`, `preferences[]`                                         |
| `core_user_get_private_files_info`   | Get private files info         | `userid`                                                          |
| `core_user_add_user_device`          | Register mobile device         | `appid`, `name`, `model`, `platform`, `version`, `pushid`, `uuid` |
| `core_user_remove_user_device`       | Unregister mobile device       | `uuid`, `appid`                                                   |
| `core_user_view_user_profile`        | Trigger profile viewed event   | `userid`, `courseid`                                              |
| `core_user_view_user_list`           | Trigger user list viewed event | `courseid`                                                        |
| `core_user_update_picture`           | Update user picture            | `draftitemid`, `userid`, `delete`                                 |
| `core_user_agree_site_policy`        | Accept site policy             | -                                                                 |

#### User Data Structure
```json
{
  "username": "string",
  "password": "string",
  "firstname": "string",
  "lastname": "string",
  "email": "string",
  "auth": "manual|ldap|oauth2|...",
  "idnumber": "string",
  "lang": "en",
  "timezone": "99",
  "city": "string",
  "country": "AU",
  "department": "string",
  "institution": "string",
  "customfields": [
    {"type": "string", "name": "string", "value": "string"}
  ]
}
```

---

### 2. Core Course Functions (core_course_*)

| Function                                                      | Description                   | Parameters                                                                |
| ------------------------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------- |
| `core_course_create_courses`                                  | Create new courses            | `courses[]`                                                               |
| `core_course_update_courses`                                  | Update existing courses       | `courses[]`                                                               |
| `core_course_delete_courses`                                  | Delete courses                | `courseids[]`                                                             |
| `core_course_get_courses`                                     | Get courses by IDs            | `options` (ids array)                                                     |
| `core_course_get_courses_by_field`                            | Get courses by field          | `field`, `value`                                                          |
| `core_course_search_courses`                                  | Search courses                | `criterianame`, `criteriavalue`, `page`, `perpage`                        |
| `core_course_get_categories`                                  | Get course categories         | `criteria[]`, `addsubcategories`                                          |
| `core_course_create_categories`                               | Create categories             | `categories[]`                                                            |
| `core_course_update_categories`                               | Update categories             | `categories[]`                                                            |
| `core_course_delete_categories`                               | Delete categories             | `categories[]`                                                            |
| `core_course_get_contents`                                    | Get course contents           | `courseid`, `options[]`                                                   |
| `core_course_duplicate_course`                                | Duplicate a course            | `courseid`, `fullname`, `shortname`, `categoryid`, `visible`, `options[]` |
| `core_course_import_course`                                   | Import course content         | `importfrom`, `importto`, `deletecontent`, `options[]`                    |
| `core_course_get_user_navigation_options`                     | Get navigation options        | `courseids[]`                                                             |
| `core_course_get_user_administration_options`                 | Get admin options             | `courseids[]`                                                             |
| `core_course_view_course`                                     | Trigger course viewed         | `courseid`, `sectionnumber`                                               |
| `core_course_get_recent_courses`                              | Get recently accessed courses | `userid`, `limit`, `offset`, `sort`                                       |
| `core_course_set_favourite_courses`                           | Mark courses as favorites     | `courses[]`                                                               |
| `core_course_get_enrolled_courses_by_timeline_classification` | Get timeline courses          | `classification`, `limit`, `offset`, `sort`                               |
| `core_course_get_course_module`                               | Get course module info        | `cmid`                                                                    |
| `core_course_get_course_module_by_instance`                   | Get module by instance        | `module`, `instance`                                                      |
| `core_course_get_module`                                      | Get module details            | `id`, `sectionreturn`                                                     |
| `core_course_edit_module`                                     | Edit module                   | `action`, `id`, `sectionreturn`                                           |
| `core_course_edit_section`                                    | Edit section                  | `action`, `id`, `sectionreturn`                                           |
| `core_course_check_updates`                                   | Check for course updates      | `courseid`, `tocheck[]`, `since[]`                                        |
| `core_course_get_updates_since`                               | Get updates since time        | `courseid`, `since`, `filter[]`                                           |

#### Course Data Structure
```json
{
  "fullname": "string",
  "shortname": "string",
  "categoryid": 1,
  "idnumber": "string",
  "summary": "string",
  "summaryformat": 1,
  "format": "topics|weeks|social|single",
  "showgrades": 1,
  "newsitems": 5,
  "startdate": 1609459200,
  "enddate": 1640995200,
  "numsections": 10,
  "maxbytes": 0,
  "showreports": 0,
  "visible": 1,
  "groupmode": 0,
  "groupmodeforce": 0,
  "defaultgroupingid": 0,
  "enablecompletion": 1,
  "lang": "",
  "forcetheme": ""
}
```

---

### 3. Enrolment Functions (core_enrol_* / enrol_*)

| Function                                        | Description                | Parameters                                                |
| ----------------------------------------------- | -------------------------- | --------------------------------------------------------- |
| `core_enrol_get_enrolled_users`                 | Get enrolled users         | `courseid`, `options[]`                                   |
| `core_enrol_get_enrolled_users_with_capability` | Get users with capability  | `coursecapabilities[]`, `options[]`                       |
| `core_enrol_get_users_courses`                  | Get user's courses         | `userid`, `returnusercount`                               |
| `core_enrol_get_course_enrolment_methods`       | Get enrolment methods      | `courseid`                                                |
| `core_enrol_search_users`                       | Search users for enrolment | `courseid`, `search`, `searchanywhere`, `page`, `perpage` |
| `core_enrol_submit_user_enrolment_form`         | Submit enrolment form      | `formdata`                                                |
| `core_enrol_unenrol_user_enrolment`             | Unenrol user               | `ueid`                                                    |
| `enrol_guest_get_instance_info`                 | Get guest enrolment info   | `instanceid`                                              |
| `enrol_self_get_instance_info`                  | Get self enrolment info    | `instanceid`                                              |
| `enrol_self_enrol_user`                         | Self-enrol user            | `courseid`, `password`, `instanceid`                      |
| `enrol_manual_enrol_users`                      | Manually enrol users       | `enrolments[]`                                            |
| `enrol_manual_unenrol_users`                    | Manually unenrol users     | `enrolments[]`                                            |

#### Enrolment Data Structure
```json
{
  "roleid": 5,
  "userid": 123,
  "courseid": 456,
  "timestart": 0,
  "timeend": 0,
  "suspend": 0
}
```

---

### 4. Assignment Functions (mod_assign_*)

| Function                                 | Description                 | Parameters                                                                                                                           |
| ---------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `mod_assign_get_assignments`             | Get assignments             | `courseids[]`, `capabilities[]`, `includenotenrolledcourses`                                                                         |
| `mod_assign_get_submission_status`       | Get submission status       | `assignid`, `userid`, `groupid`                                                                                                      |
| `mod_assign_get_user_mappings`           | Get anonymous mappings      | `assignmentids[]`                                                                                                                    |
| `mod_assign_get_user_flags`              | Get user flags              | `assignmentids[]`                                                                                                                    |
| `mod_assign_get_grades`                  | Get grades                  | `assignmentids[]`, `since`                                                                                                           |
| `mod_assign_get_submissions`             | Get submissions             | `assignmentids[]`, `status`, `since`, `before`                                                                                       |
| `mod_assign_save_submission`             | Save submission data        | `assignmentid`, `plugindata`                                                                                                         |
| `mod_assign_submit_for_grading`          | Submit for grading          | `assignmentid`, `acceptsubmissionstatement`                                                                                          |
| `mod_assign_save_grade`                  | Save a grade                | `assignmentid`, `userid`, `grade`, `attemptnumber`, `addattempt`, `workflowstate`, `applytoall`, `plugindata`, `advancedgradingdata` |
| `mod_assign_save_grades`                 | Save multiple grades        | `assignmentid`, `applytoall`, `grades[]`                                                                                             |
| `mod_assign_set_user_flags`              | Set user flags              | `assignmentid`, `userflags[]`                                                                                                        |
| `mod_assign_copy_previous_attempt`       | Copy previous attempt       | `assignmentid`                                                                                                                       |
| `mod_assign_reveal_identities`           | Reveal anonymous identities | `assignmentid`                                                                                                                       |
| `mod_assign_save_user_extensions`        | Grant extensions            | `assignmentid`, `userids[]`, `dates[]`                                                                                               |
| `mod_assign_start_submission`            | Start new submission        | `assignid`                                                                                                                           |
| `mod_assign_view_grading_table`          | Trigger grading view        | `assignid`                                                                                                                           |
| `mod_assign_view_submission_status`      | Trigger status view         | `assignid`                                                                                                                           |
| `mod_assign_view_assign`                 | Trigger assignment view     | `assignid`                                                                                                                           |
| `mod_assign_list_participants`           | List participants           | `assignid`, `groupid`, `filter`, `skip`, `limit`, `onlyids`, `includeenrolments`, `tablesort`                                        |
| `mod_assign_lock_submissions`            | Lock submissions            | `assignmentid`, `userids[]`                                                                                                          |
| `mod_assign_unlock_submissions`          | Unlock submissions          | `assignmentid`, `userids[]`                                                                                                          |
| `mod_assign_revert_submissions_to_draft` | Revert to draft             | `assignmentid`, `userids[]`                                                                                                          |

---

### 5. Quiz Functions (mod_quiz_*)

| Function                                   | Description             | Parameters                                                          |
| ------------------------------------------ | ----------------------- | ------------------------------------------------------------------- |
| `mod_quiz_get_quizzes_by_courses`          | Get quizzes             | `courseids[]`                                                       |
| `mod_quiz_get_user_attempts`               | Get user attempts       | `quizid`, `userid`, `status`, `includepreviews`                     |
| `mod_quiz_get_user_best_grade`             | Get best grade          | `quizid`, `userid`                                                  |
| `mod_quiz_get_combined_review_options`     | Get review options      | `quizid`, `userid`                                                  |
| `mod_quiz_get_attempt_data`                | Get attempt page data   | `attemptid`, `page`, `preflightdata[]`                              |
| `mod_quiz_get_attempt_summary`             | Get attempt summary     | `attemptid`, `preflightdata[]`                                      |
| `mod_quiz_get_attempt_review`              | Get attempt review      | `attemptid`, `page`                                                 |
| `mod_quiz_get_attempt_access_information`  | Get access info         | `quizid`, `attemptid`                                               |
| `mod_quiz_start_attempt`                   | Start new attempt       | `quizid`, `preflightdata[]`, `forcenew`                             |
| `mod_quiz_save_attempt`                    | Save attempt data       | `attemptid`, `data[]`, `preflightdata[]`                            |
| `mod_quiz_process_attempt`                 | Process attempt         | `attemptid`, `data[]`, `finishattempt`, `timeup`, `preflightdata[]` |
| `mod_quiz_view_quiz`                       | Trigger quiz view       | `quizid`                                                            |
| `mod_quiz_view_attempt`                    | Trigger attempt view    | `attemptid`, `page`, `preflightdata[]`                              |
| `mod_quiz_view_attempt_summary`            | Trigger summary view    | `attemptid`, `preflightdata[]`                                      |
| `mod_quiz_view_attempt_review`             | Trigger review view     | `attemptid`                                                         |
| `mod_quiz_get_quiz_feedback_for_grade`     | Get feedback for grade  | `quizid`, `grade`                                                   |
| `mod_quiz_set_question_version`            | Set question version    | `slotid`, `newversion`                                              |
| `mod_quiz_reopen_attempt`                  | Reopen attempt          | `attemptid`                                                         |
| `mod_quiz_get_reopen_attempt_confirmation` | Get reopen confirmation | `attemptid`                                                         |

---

### 6. Forum Functions (mod_forum_*)

| Function                                    | Description               | Parameters                                                            |
| ------------------------------------------- | ------------------------- | --------------------------------------------------------------------- |
| `mod_forum_get_forums_by_courses`           | Get forums                | `courseids[]`                                                         |
| `mod_forum_get_forum_discussion_posts`      | Get discussion posts      | `discussionid`, `sortby`, `sortdirection`, `includeinlineattachments` |
| `mod_forum_get_forum_discussions`           | Get discussions           | `forumid`, `sortorder`, `page`, `perpage`, `groupid`                  |
| `mod_forum_get_forum_discussions_paginated` | Get paginated discussions | `forumid`, `sortby`, `sortdirection`, `page`, `perpage`               |
| `mod_forum_get_discussion_post`             | Get single post           | `postid`                                                              |
| `mod_forum_get_discussion_posts_by_userid`  | Get posts by user         | `discussionid`, `userid`, `sortby`, `sortdirection`                   |
| `mod_forum_add_discussion`                  | Create discussion         | `forumid`, `subject`, `message`, `groupid`, `options[]`               |
| `mod_forum_add_discussion_post`             | Add reply                 | `postid`, `subject`, `message`, `options[]`                           |
| `mod_forum_update_discussion_post`          | Update post               | `postid`, `subject`, `message`, `options[]`                           |
| `mod_forum_delete_post`                     | Delete post               | `postid`                                                              |
| `mod_forum_toggle_favourite_state`          | Toggle favorite           | `discussionid`, `targetstate`                                         |
| `mod_forum_set_subscription_state`          | Set subscription          | `forumid`, `discussionid`, `targetstate`                              |
| `mod_forum_set_lock_state`                  | Lock discussion           | `forumid`, `discussionid`, `targetstate`                              |
| `mod_forum_set_pin_state`                   | Pin discussion            | `discussionid`, `targetstate`                                         |
| `mod_forum_view_forum`                      | Trigger forum view        | `forumid`                                                             |
| `mod_forum_view_forum_discussion`           | Trigger discussion view   | `discussionid`                                                        |
| `mod_forum_prepare_draft_area_for_post`     | Prepare draft area        | `postid`, `area`, `draftitemid`, `filestokeep[]`                      |
| `mod_forum_can_add_discussion`              | Check add permission      | `forumid`, `groupid`                                                  |

---

### 7. Gradebook Functions (core_grades_* / gradereport_*)

| Function                                                   | Description               | Parameters                                                                               |
| ---------------------------------------------------------- | ------------------------- | ---------------------------------------------------------------------------------------- |
| `core_grades_get_grades`                                   | Get grades                | `courseid`, `component`, `activityid`, `userids[]`                                       |
| `core_grades_update_grades`                                | Update grades             | `source`, `courseid`, `component`, `activityid`, `itemnumber`, `grades[]`, `itemdetails` |
| `core_grades_grader_gradingpanel_point_fetch`              | Fetch point grading panel | `component`, `contextid`, `itemname`, `gradeduserid`                                     |
| `core_grades_grader_gradingpanel_point_store`              | Store point grade         | `component`, `contextid`, `itemname`, `gradeduserid`, `formdata`                         |
| `core_grades_grader_gradingpanel_scale_fetch`              | Fetch scale grading panel | `component`, `contextid`, `itemname`, `gradeduserid`                                     |
| `core_grades_grader_gradingpanel_scale_store`              | Store scale grade         | `component`, `contextid`, `itemname`, `gradeduserid`, `formdata`                         |
| `core_grades_get_gradeitems`                               | Get grade items           | `courseid`                                                                               |
| `core_grades_create_gradecategories`                       | Create categories         | `courseid`, `categories[]`                                                               |
| `gradereport_user_get_grade_items`                         | Get user grade items      | `courseid`, `userid`, `groupid`                                                          |
| `gradereport_user_get_grades_table`                        | Get grades table          | `courseid`, `userid`, `groupid`                                                          |
| `gradereport_user_view_grade_report`                       | Trigger report view       | `courseid`, `userid`                                                                     |
| `gradereport_overview_get_course_grades`                   | Get course grades         | `userid`                                                                                 |
| `gradereport_overview_view_grade_report`                   | Trigger overview view     | `courseid`, `userid`                                                                     |
| `gradereport_singleview_get_grade_items_for_search_widget` | Search grade items        | `courseid`                                                                               |

---

### 8. Messaging Functions (core_message_*)

| Function                                         | Description                    | Parameters                                                                                                                                                     |
| ------------------------------------------------ | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `core_message_send_instant_messages`             | Send messages                  | `messages[]`                                                                                                                                                   |
| `core_message_send_messages_to_conversation`     | Send to conversation           | `conversationid`, `messages[]`                                                                                                                                 |
| `core_message_get_conversations`                 | Get conversations              | `userid`, `limitfrom`, `limitnum`, `type`, `favourites`, `mergeself`                                                                                           |
| `core_message_get_conversation`                  | Get single conversation        | `userid`, `conversationid`, `includecontactrequests`, `includeprivacyinfo`, `memberlimit`, `memberoffset`, `messagelimit`, `messageoffset`, `newest first`     |
| `core_message_get_conversation_between_users`    | Get conversation between users | `userid`, `otheruserid`, `includecontactrequests`, `includeprivacyinfo`, `memberlimit`, `memberoffset`, `messagelimit`, `messageoffset`, `newestmessagesfirst` |
| `core_message_get_conversation_members`          | Get conversation members       | `userid`, `conversationid`, `includecontactrequests`, `includeprivacyinfo`, `limitfrom`, `limitnum`                                                            |
| `core_message_get_conversation_messages`         | Get messages                   | `userid`, `conversationid`, `limitfrom`, `limitnum`, `newest`, `timefrom`                                                                                      |
| `core_message_get_messages`                      | Get messages (deprecated)      | `useridto`, `useridfrom`, `type`, `read`, `newestfirst`, `limitfrom`, `limitnum`                                                                               |
| `core_message_get_user_notification_preferences` | Get notification prefs         | `userid`                                                                                                                                                       |
| `core_message_get_user_message_preferences`      | Get message prefs              | `userid`                                                                                                                                                       |
| `core_message_set_favourite_conversations`       | Set favorites                  | `userid`, `conversations[]`                                                                                                                                    |
| `core_message_unset_favourite_conversations`     | Unset favorites                | `userid`, `conversations[]`                                                                                                                                    |
| `core_message_get_unread_conversations_count`    | Get unread count               | `userid`                                                                                                                                                       |
| `core_message_get_unread_notification_count`     | Get notification count         | `useridto`                                                                                                                                                     |
| `core_message_mark_all_notifications_as_read`    | Mark all read                  | `useridto`, `useridfrom`, `timecreatedto`                                                                                                                      |
| `core_message_mark_notification_read`            | Mark notification read         | `notificationid`, `timeread`                                                                                                                                   |
| `core_message_delete_message`                    | Delete message                 | `messageid`, `userid`, `read`                                                                                                                                  |
| `core_message_delete_conversations_by_id`        | Delete conversations           | `userid`, `conversationids[]`                                                                                                                                  |
| `core_message_block_user`                        | Block user                     | `userid`, `blockeduserid`                                                                                                                                      |
| `core_message_unblock_user`                      | Unblock user                   | `userid`, `unblockeduserid`                                                                                                                                    |
| `core_message_get_blocked_users`                 | Get blocked users              | `userid`                                                                                                                                                       |
| `core_message_create_contact_request`            | Send contact request           | `userid`, `requesteduserid`                                                                                                                                    |
| `core_message_confirm_contact_request`           | Accept contact                 | `userid`, `requesteduserid`                                                                                                                                    |
| `core_message_decline_contact_request`           | Decline contact                | `userid`, `requesteduserid`                                                                                                                                    |
| `core_message_get_contact_requests`              | Get contact requests           | `userid`, `limitfrom`, `limitnum`                                                                                                                              |
| `core_message_search_contacts`                   | Search contacts                | `searchtext`, `onlymycourses`                                                                                                                                  |
| `core_message_message_search_users`              | Search users                   | `userid`, `search`, `limitfrom`, `limitnum`                                                                                                                    |
| `core_message_delete_message_for_all_users`      | Delete for all                 | `messageid`, `userid`                                                                                                                                          |
| `core_message_mute_conversations`                | Mute conversations             | `userid`, `conversationids[]`                                                                                                                                  |
| `core_message_unmute_conversations`              | Unmute conversations           | `userid`, `conversationids[]`                                                                                                                                  |

---

### 9. File Functions (core_files_*)

| Function                        | Description        | Parameters                                                                                                          |
| ------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `core_files_get_files`          | Get files info     | `contextid`, `component`, `filearea`, `itemid`, `filepath`, `filename`, `modified`, `contextlevel`, `instanceid`    |
| `core_files_upload`             | Upload file        | `component`, `filearea`, `itemid`, `filepath`, `filename`, `filecontent`, `contextid`, `contextlevel`, `instanceid` |
| `core_files_delete_draft_files` | Delete draft files | `draftitemid`, `files[]`                                                                                            |

---

### 10. Calendar Functions (core_calendar_*)

| Function                                        | Description        | Parameters                                                                                                                  |
| ----------------------------------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| `core_calendar_get_calendar_events`             | Get events         | `events` (eventids, courseids, groupids, categoryids), `options` (userevents, siteevents, timestart, timeend, ignorehidden) |
| `core_calendar_create_calendar_events`          | Create events      | `events[]`                                                                                                                  |
| `core_calendar_delete_calendar_events`          | Delete events      | `events[]` (eventid, repeat)                                                                                                |
| `core_calendar_update_event_start_day`          | Update start day   | `eventid`, `daytimestamp`                                                                                                   |
| `core_calendar_get_calendar_monthly_view`       | Get month view     | `year`, `month`, `courseid`, `categoryid`, `includenavigation`, `mini`, `day`                                               |
| `core_calendar_get_calendar_day_view`           | Get day view       | `year`, `month`, `day`, `courseid`, `categoryid`                                                                            |
| `core_calendar_get_calendar_upcoming_view`      | Get upcoming view  | `courseid`, `categoryid`                                                                                                    |
| `core_calendar_get_action_events_by_timesort`   | Get action events  | `timesortfrom`, `timesortto`, `aftereventid`, `limitnum`, `limittononsuspendedevents`, `userid`, `searchvalue`              |
| `core_calendar_get_action_events_by_course`     | Get course events  | `courseid`, `timesortfrom`, `timesortto`, `aftereventid`, `limitnum`, `searchvalue`                                         |
| `core_calendar_get_action_events_by_courses`    | Get courses events | `courseids[]`, `timesortfrom`, `timesortto`, `limitnum`, `searchvalue`                                                      |
| `core_calendar_get_calendar_event_by_id`        | Get event          | `eventid`                                                                                                                   |
| `core_calendar_get_calendar_access_information` | Get access info    | `courseid`                                                                                                                  |
| `core_calendar_get_allowed_event_types`         | Get allowed types  | `courseid`                                                                                                                  |
| `core_calendar_get_timestamps`                  | Get timestamps     | `data[]` (year, month, day, hour, minute)                                                                                   |
| `core_calendar_submit_create_update_form`       | Submit event form  | `formdata`                                                                                                                  |

---

### 11. Competency Functions (core_competency_*)

| Function                                                | Description                | Parameters                                                                      |
| ------------------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------- |
| `core_competency_create_competency_framework`           | Create framework           | `competencyframework`                                                           |
| `core_competency_read_competency_framework`             | Get framework              | `id`                                                                            |
| `core_competency_update_competency_framework`           | Update framework           | `competencyframework`                                                           |
| `core_competency_delete_competency_framework`           | Delete framework           | `id`                                                                            |
| `core_competency_list_competency_frameworks`            | List frameworks            | `sort`, `order`, `skip`, `limit`, `context`, `includes`, `onlyvisible`, `query` |
| `core_competency_create_competency`                     | Create competency          | `competency`                                                                    |
| `core_competency_read_competency`                       | Get competency             | `id`                                                                            |
| `core_competency_update_competency`                     | Update competency          | `competency`                                                                    |
| `core_competency_delete_competency`                     | Delete competency          | `id`                                                                            |
| `core_competency_list_competencies`                     | List competencies          | `filters[]`, `sort`, `order`, `skip`, `limit`                                   |
| `core_competency_list_competencies_in_template`         | List template competencies | `id`                                                                            |
| `core_competency_add_competency_to_course`              | Add to course              | `courseid`, `competencyid`                                                      |
| `core_competency_remove_competency_from_course`         | Remove from course         | `courseid`, `competencyid`                                                      |
| `core_competency_list_course_competencies`              | List course competencies   | `id`                                                                            |
| `core_competency_grade_competency`                      | Grade competency           | `userid`, `competencyid`, `grade`, `note`                                       |
| `core_competency_grade_competency_in_course`            | Grade in course context    | `courseid`, `userid`, `competencyid`, `grade`, `note`                           |
| `core_competency_set_course_competency_ruleoutcome`     | Set rule outcome           | `coursecompetencyid`, `ruleoutcome`                                             |
| `core_competency_create_template`                       | Create template            | `template`                                                                      |
| `core_competency_read_template`                         | Get template               | `id`                                                                            |
| `core_competency_update_template`                       | Update template            | `template`                                                                      |
| `core_competency_delete_template`                       | Delete template            | `id`, `deleteplans`                                                             |
| `core_competency_list_templates`                        | List templates             | `sort`, `order`, `skip`, `limit`, `context`, `includes`, `onlyvisible`          |
| `core_competency_create_plan`                           | Create plan                | `plan`                                                                          |
| `core_competency_read_plan`                             | Get plan                   | `id`                                                                            |
| `core_competency_update_plan`                           | Update plan                | `plan`                                                                          |
| `core_competency_delete_plan`                           | Delete plan                | `id`                                                                            |
| `core_competency_list_plans_for_user`                   | List user plans            | `userid`                                                                        |
| `core_competency_complete_plan`                         | Complete plan              | `planid`                                                                        |
| `core_competency_reopen_plan`                           | Reopen plan                | `planid`                                                                        |
| `core_competency_request_review_of_plan`                | Request review             | `planid`                                                                        |
| `core_competency_start_review_of_plan`                  | Start review               | `planid`                                                                        |
| `core_competency_stop_review_of_plan`                   | Stop review                | `planid`                                                                        |
| `core_competency_approve_plan`                          | Approve plan               | `planid`                                                                        |
| `core_competency_unapprove_plan`                        | Unapprove plan             | `planid`                                                                        |
| `core_competency_plan_request_review`                   | Plan request review        | `id`                                                                            |
| `core_competency_plan_start_review`                     | Plan start review          | `id`                                                                            |
| `core_competency_plan_stop_review`                      | Plan stop review           | `id`                                                                            |
| `core_competency_plan_cancel_review_request`            | Cancel request             | `id`                                                                            |
| `core_competency_read_user_evidence`                    | Get user evidence          | `id`                                                                            |
| `core_competency_list_user_evidence`                    | List user evidence         | `userid`                                                                        |
| `core_competency_create_user_evidence`                  | Create evidence            | `evidence`                                                                      |
| `core_competency_delete_user_evidence`                  | Delete evidence            | `id`                                                                            |
| `core_competency_user_competency_start_review`          | Start user review          | `userid`, `competencyid`                                                        |
| `core_competency_user_competency_stop_review`           | Stop user review           | `userid`, `competencyid`                                                        |
| `core_competency_user_competency_request_review`        | Request user review        | `userid`, `competencyid`                                                        |
| `core_competency_user_competency_cancel_review_request` | Cancel user review         | `userid`, `competencyid`                                                        |

---

### 12. Badge Functions (core_badges_*)

| Function                             | Description         | Parameters                                                      |
| ------------------------------------ | ------------------- | --------------------------------------------------------------- |
| `core_badges_get_user_badges`        | Get user badges     | `userid`, `courseid`, `page`, `perpage`, `search`, `onlypublic` |
| `core_badges_view_user_badges`       | Trigger badges view | `userid`, `courseid`, `hash`                                    |
| `core_badges_get_user_badge_by_hash` | Get badge by hash   | `hash`                                                          |

---

### 13. Blog Functions (core_blog_*)

| Function                 | Description          | Parameters                     |
| ------------------------ | -------------------- | ------------------------------ |
| `core_blog_get_entries`  | Get blog entries     | `filters[]`, `page`, `perpage` |
| `core_blog_view_entries` | Trigger entries view | `filters[]`                    |

---

### 14. Group Functions (core_group_*)

| Function                                 | Description              | Parameters                         |
| ---------------------------------------- | ------------------------ | ---------------------------------- |
| `core_group_create_groups`               | Create groups            | `groups[]`                         |
| `core_group_get_groups`                  | Get groups               | `groupids[]`                       |
| `core_group_delete_groups`               | Delete groups            | `groupids[]`                       |
| `core_group_update_groups`               | Update groups            | `groups[]`                         |
| `core_group_get_course_groups`           | Get course groups        | `courseid`                         |
| `core_group_get_course_groupings`        | Get groupings            | `courseid`                         |
| `core_group_get_course_user_groups`      | Get user groups          | `courseid`, `userid`, `groupingid` |
| `core_group_get_activity_allowed_groups` | Get allowed groups       | `cmid`, `userid`                   |
| `core_group_get_activity_groupmode`      | Get group mode           | `cmid`                             |
| `core_group_get_group_members`           | Get group members        | `groupids[]`                       |
| `core_group_add_group_members`           | Add members              | `members[]`                        |
| `core_group_delete_group_members`        | Remove members           | `members[]`                        |
| `core_group_create_groupings`            | Create groupings         | `groupings[]`                      |
| `core_group_update_groupings`            | Update groupings         | `groupings[]`                      |
| `core_group_delete_groupings`            | Delete groupings         | `groupingids[]`                    |
| `core_group_assign_grouping`             | Assign group to grouping | `assignments[]`                    |
| `core_group_unassign_grouping`           | Unassign from grouping   | `unassignments[]`                  |

---

### 15. Cohort Functions (core_cohort_*)

| Function                            | Description    | Parameters                                              |
| ----------------------------------- | -------------- | ------------------------------------------------------- |
| `core_cohort_create_cohorts`        | Create cohorts | `cohorts[]`                                             |
| `core_cohort_get_cohorts`           | Get cohorts    | `cohortids[]`                                           |
| `core_cohort_update_cohorts`        | Update cohorts | `cohorts[]`                                             |
| `core_cohort_delete_cohorts`        | Delete cohorts | `cohortids[]`                                           |
| `core_cohort_get_cohort_members`    | Get members    | `cohortids[]`                                           |
| `core_cohort_add_cohort_members`    | Add members    | `members[]`                                             |
| `core_cohort_delete_cohort_members` | Remove members | `members[]`                                             |
| `core_cohort_search_cohorts`        | Search cohorts | `query`, `context`, `includes`, `limitfrom`, `limitnum` |

---

### 16. Role & Capability Functions (core_role_*)

| Function                   | Description    | Parameters        |
| -------------------------- | -------------- | ----------------- |
| `core_role_assign_roles`   | Assign roles   | `assignments[]`   |
| `core_role_unassign_roles` | Unassign roles | `unassignments[]` |

---

### 17. Webservice Functions (core_webservice_*)

| Function                        | Description          | Parameters            |
| ------------------------------- | -------------------- | --------------------- |
| `core_webservice_get_site_info` | Get site information | `serviceshortnames[]` |

#### Site Info Response Structure
```json
{
  "sitename": "My Moodle Site",
  "username": "admin",
  "firstname": "Admin",
  "lastname": "User",
  "fullname": "Admin User",
  "lang": "en",
  "userid": 2,
  "siteurl": "http://localhost:8080",
  "userpictureurl": "...",
  "functions": [...],
  "downloadfiles": 1,
  "uploadfiles": 1,
  "release": "4.5 (Build: 20241111)",
  "version": "2024111100",
  "mobilecssurl": "",
  "advancedfeatures": [...],
  "usercanmanageownfiles": true,
  "userquota": 0,
  "usermaxuploadfilesize": 104857600,
  "userhomepage": 0,
  "userprivateaccesskey": "...",
  "siteid": 1,
  "sitecalendartype": "gregorian",
  "usercalendartype": "gregorian",
  "userissiteadmin": true,
  "theme": "boost"
}
```

---

### 18. Completion Functions (core_completion_*)

| Function                                                     | Description             | Parameters                   |
| ------------------------------------------------------------ | ----------------------- | ---------------------------- |
| `core_completion_get_activities_completion_status`           | Get activity completion | `courseid`, `userid`         |
| `core_completion_get_course_completion_status`               | Get course completion   | `courseid`, `userid`         |
| `core_completion_update_activity_completion_status_manually` | Manual completion       | `cmid`, `completed`          |
| `core_completion_mark_course_self_completed`                 | Self complete course    | `courseid`                   |
| `core_completion_override_activity_completion_status`        | Override completion     | `userid`, `cmid`, `newstate` |

---

### 19. Tag Functions (core_tag_*)

| Function                       | Description     | Parameters                                                                    |
| ------------------------------ | --------------- | ----------------------------------------------------------------------------- |
| `core_tag_get_tagindex`        | Get tag index   | `tagindex` (tag, tc, ta, excl, from, ctx, rec, page)                          |
| `core_tag_get_tag_areas`       | Get tag areas   | -                                                                             |
| `core_tag_get_tag_cloud`       | Get tag cloud   | `tagcollid`, `isstandard`, `limit`, `sort`, `search`, `fromctx`, `ctx`, `rec` |
| `core_tag_get_tag_collections` | Get collections | -                                                                             |
| `core_tag_update_tags`         | Update tags     | `tags[]`                                                                      |
| `core_tag_get_tags`            | Get tags        | `tags[]`                                                                      |

---

### 20. Content Bank Functions (core_contentbank_*)

| Function                                  | Description    | Parameters                |
| ----------------------------------------- | -------------- | ------------------------- |
| `core_contentbank_delete_content`         | Delete content | `contentids[]`            |
| `core_contentbank_rename_content`         | Rename content | `contentid`, `name`       |
| `core_contentbank_set_content_visibility` | Set visibility | `contentid`, `visibility` |

---

### 21. SCORM Functions (mod_scorm_*)

| Function                                 | Description        | Parameters                     |
| ---------------------------------------- | ------------------ | ------------------------------ |
| `mod_scorm_get_scorm_access_information` | Get access info    | `scormid`                      |
| `mod_scorm_get_scorm_scoes`              | Get SCORM SCOs     | `scormid`, `organization`      |
| `mod_scorm_get_scorm_user_data`          | Get user data      | `scormid`, `attempt`           |
| `mod_scorm_insert_scorm_tracks`          | Insert tracks      | `scoid`, `attempt`, `tracks[]` |
| `mod_scorm_get_scorm_sco_tracks`         | Get SCO tracks     | `scoid`, `userid`, `attempt`   |
| `mod_scorm_get_scorms_by_courses`        | Get SCORMs         | `courseids[]`                  |
| `mod_scorm_launch_sco`                   | Launch SCO         | `scormid`, `scoid`             |
| `mod_scorm_view_scorm`                   | Trigger SCORM view | `scormid`                      |

---

### 22. Lesson Functions (mod_lesson_*)

| Function                                   | Description         | Parameters                                           |
| ------------------------------------------ | ------------------- | ---------------------------------------------------- |
| `mod_lesson_get_lessons_by_courses`        | Get lessons         | `courseids[]`                                        |
| `mod_lesson_get_lesson_access_information` | Get access info     | `lessonid`                                           |
| `mod_lesson_get_lesson`                    | Get lesson          | `lessonid`, `password`                               |
| `mod_lesson_get_questions_attempts`        | Get attempts        | `lessonid`, `attempt`, `correct`, `pageid`, `userid` |
| `mod_lesson_get_user_attempt`              | Get user attempt    | `lessonid`, `userid`, `attempt`                      |
| `mod_lesson_get_user_attempt_grade`        | Get attempt grade   | `lessonid`, `userid`, `attempt`                      |
| `mod_lesson_get_user_grade`                | Get user grade      | `lessonid`, `userid`                                 |
| `mod_lesson_get_user_timers`               | Get user timers     | `lessonid`, `userid`                                 |
| `mod_lesson_get_pages`                     | Get pages           | `lessonid`, `password`                               |
| `mod_lesson_get_page_data`                 | Get page data       | `lessonid`, `pageid`, `password`, `review`           |
| `mod_lesson_launch_attempt`                | Launch attempt      | `lessonid`, `password`, `pageid`, `review`           |
| `mod_lesson_process_page`                  | Process page        | `lessonid`, `pageid`, `data[]`, `password`, `review` |
| `mod_lesson_finish_attempt`                | Finish attempt      | `lessonid`, `password`, `outoftime`, `review`        |
| `mod_lesson_get_attempts_overview`         | Get overview        | `lessonid`, `groupid`                                |
| `mod_lesson_view_lesson`                   | Trigger lesson view | `lessonid`, `password`                               |

---

### 23. H5P Functions (mod_h5pactivity_*)

| Function                                             | Description        | Parameters                                      |
| ---------------------------------------------------- | ------------------ | ----------------------------------------------- |
| `mod_h5pactivity_get_h5pactivities_by_courses`       | Get H5P activities | `courseids[]`                                   |
| `mod_h5pactivity_get_h5pactivity_access_information` | Get access info    | `h5pactivityid`                                 |
| `mod_h5pactivity_get_results`                        | Get results        | `h5pactivityid`, `attemptids[]`                 |
| `mod_h5pactivity_get_attempts`                       | Get attempts       | `h5pactivityid`, `userids[]`                    |
| `mod_h5pactivity_view_h5pactivity`                   | Trigger view       | `h5pactivityid`                                 |
| `mod_h5pactivity_get_user_attempts`                  | Get user attempts  | `h5pactivityid`, `sortorder`, `page`, `perpage` |
| `mod_h5pactivity_log_report_viewed`                  | Log report view    | `h5pactivityid`, `userid`, `attemptid`          |

---

### 24. Workshop Functions (mod_workshop_*)

| Function                                       | Description              | Parameters                                                                                  |
| ---------------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------- |
| `mod_workshop_get_workshops_by_courses`        | Get workshops            | `courseids[]`                                                                               |
| `mod_workshop_get_workshop_access_information` | Get access info          | `workshopid`                                                                                |
| `mod_workshop_get_user_plan`                   | Get user plan            | `workshopid`, `userid`                                                                      |
| `mod_workshop_get_submissions`                 | Get submissions          | `workshopid`, `userid`, `groupid`, `page`, `perpage`                                        |
| `mod_workshop_get_submission`                  | Get submission           | `submissionid`                                                                              |
| `mod_workshop_get_submission_assessments`      | Get assessments          | `submissionid`                                                                              |
| `mod_workshop_get_assessment`                  | Get assessment           | `assessmentid`                                                                              |
| `mod_workshop_get_assessment_form_definition`  | Get form                 | `assessmentid`, `mode`                                                                      |
| `mod_workshop_get_reviewer_assessments`        | Get reviewer assessments | `workshopid`, `userid`                                                                      |
| `mod_workshop_update_assessment`               | Update assessment        | `assessmentid`, `data[]`                                                                    |
| `mod_workshop_add_submission`                  | Add submission           | `workshopid`, `title`, `content`, `contentformat`, `inlineattachmentsid`, `attachmentsid`   |
| `mod_workshop_update_submission`               | Update submission        | `submissionid`, `title`, `content`, `contentformat`, `inlineattachmentsid`, `attachmentsid` |
| `mod_workshop_delete_submission`               | Delete submission        | `submissionid`                                                                              |
| `mod_workshop_view_workshop`                   | Trigger workshop view    | `workshopid`                                                                                |
| `mod_workshop_view_submission`                 | Trigger submission view  | `submissionid`                                                                              |
| `mod_workshop_evaluate_assessment`             | Evaluate assessment      | `assessmentid`, `feedbacktext`, `feedbackformat`, `weight`, `gradinggradeover`              |
| `mod_workshop_evaluate_submission`             | Evaluate submission      | `submissionid`, `feedbacktext`, `feedbackformat`, `published`, `gradeover`                  |

---

### 25. Data (Database) Functions (mod_data_*)

| Function                               | Description     | Parameters                                                                                             |
| -------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------ |
| `mod_data_get_databases_by_courses`    | Get databases   | `courseids[]`                                                                                          |
| `mod_data_get_data_access_information` | Get access info | `databaseid`, `groupid`                                                                                |
| `mod_data_get_entries`                 | Get entries     | `databaseid`, `groupid`, `returncontents`, `sort`, `order`, `page`, `perpage`                          |
| `mod_data_get_entry`                   | Get entry       | `entryid`, `returncontents`                                                                            |
| `mod_data_get_fields`                  | Get fields      | `databaseid`                                                                                           |
| `mod_data_search_entries`              | Search entries  | `databaseid`, `groupid`, `returncontents`, `search`, `advsearch[]`, `sort`, `order`, `page`, `perpage` |
| `mod_data_approve_entry`               | Approve entry   | `entryid`, `approve`                                                                                   |
| `mod_data_delete_entry`                | Delete entry    | `entryid`                                                                                              |
| `mod_data_add_entry`                   | Add entry       | `databaseid`, `groupid`, `data[]`                                                                      |
| `mod_data_update_entry`                | Update entry    | `entryid`, `data[]`                                                                                    |
| `mod_data_view_database`               | Trigger view    | `databaseid`                                                                                           |

---

## Authentication & Token Management

### Getting a Token

```bash
curl -X POST "http://localhost:8080/login/token.php" \
  -d "username=admin" \
  -d "password=yourpassword" \
  -d "service=moodle_mobile_app"
```

### Response
```json
{
  "token": "a1b2c3d4e5f6g7h8i9j0...",
  "privatetoken": "optional_private_token_if_enabled"
}
```

### Token Types

| Type                     | Value | Description                    |
| ------------------------ | ----- | ------------------------------ |
| EXTERNAL_TOKEN_PERMANENT | 0     | Never expires                  |
| EXTERNAL_TOKEN_EMBEDDED  | 1     | Embedded in page (short-lived) |

---

## Error Handling

### Error Response Format

```json
{
  "exception": "moodle_exception",
  "errorcode": "invalidtoken",
  "message": "Invalid token - token not found"
}
```

### Common Error Codes

| Code                 | Description                   |
| -------------------- | ----------------------------- |
| `invalidtoken`       | Token not found or expired    |
| `accessexception`    | User does not have permission |
| `invalidparameter`   | Invalid parameter value       |
| `invalidrecord`      | Record not found              |
| `dmlwriteexception`  | Database write error          |
| `requireloginerror`  | User not logged in            |
| `foraboredexception` | Form aborted                  |
| `nopermissions`      | No permission for operation   |

---

## Rate Limiting & Best Practices

1. **Batch Operations**: Use batch functions when available (e.g., `create_users` instead of multiple `create_user` calls)
2. **Caching**: Cache responses when data doesn't change frequently
3. **Pagination**: Use `page` and `perpage` parameters for large datasets
4. **Error Handling**: Always handle errors gracefully
5. **Token Security**: 
   - Store tokens securely
   - Use HTTPS in production
   - Set token expiration when possible
   - Restrict tokens by IP if applicable

---

## Enabling Web Services

### Via Site Administration

1. **Enable Web Services**: Site Administration → Advanced features → Enable web services ✓
2. **Enable Protocols**: Site Administration → Plugins → Web services → Manage protocols → Enable REST protocol
3. **Create External Service**: Site Administration → Plugins → Web services → External services
4. **Create Token**: Site Administration → Plugins → Web services → Manage tokens

### Via config.php

```php
// Force enable web services
$CFG->enablewebservices = true;
```

---

*Document generated for Moodle 4.5 - LMS Docker Complete Project*
