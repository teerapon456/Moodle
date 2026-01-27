# Moodle Complete Page URL Inventory

> **Version:** Moodle 4.5  
> **Total Pages:** 500+  
> **Purpose:** Complete URL reference for page comparison

---

## 1. Authentication & Login Pages

| URL                          | Page Name       | Description             |
| ---------------------------- | --------------- | ----------------------- |
| `/login/index.php`           | Login           | Main login form         |
| `/login/logout.php`          | Logout          | Logout action           |
| `/login/forgot_password.php` | Forgot Password | Password reset request  |
| `/login/set_password.php`    | Set Password    | Set new password        |
| `/login/change_password.php` | Change Password | Change current password |
| `/login/confirm.php`         | Confirm Account | Email verification      |
| `/login/signup.php`          | Sign Up         | New user registration   |
| `/login/token.php`           | Get Token       | API token generation    |
| `/login/unlock_account.php`  | Unlock Account  | Account unlock          |

---

## 2. Dashboard & Home Pages

| URL                | Page Name         | Description              |
| ------------------ | ----------------- | ------------------------ |
| `/`                | Site Home         | Main site page           |
| `/index.php`       | Site Home         | Alias for root           |
| `/my/`             | Dashboard         | User dashboard           |
| `/my/index.php`    | Dashboard         | User dashboard           |
| `/my/indexsys.php` | Default Dashboard | System default dashboard |
| `/my/courses.php`  | My Courses        | Course listing           |

---

## 3. User Pages

### Profile & Settings
| URL                            | Page Name             | Description         |
| ------------------------------ | --------------------- | ------------------- |
| `/user/profile.php`            | User Profile          | View profile        |
| `/user/view.php`               | View User             | View other user     |
| `/user/edit.php`               | Edit Profile          | Edit profile        |
| `/user/editadvanced.php`       | Edit Profile Advanced | Admin user edit     |
| `/user/preferences.php`        | Preferences           | User preferences    |
| `/user/language.php`           | Language              | Language preference |
| `/user/editor.php`             | Editor                | Editor preference   |
| `/user/calendar.php`           | Calendar              | Calendar preference |
| `/user/files.php`              | Private Files         | Manage files        |
| `/user/managetoken.php`        | Security Keys         | Manage tokens       |
| `/user/policy.php`             | Policies              | Policy acceptance   |
| `/user/contactsitesupport.php` | Contact Support       | Support form        |

### User Lists & Management
| URL                                             | Page Name           | Description         |
| ----------------------------------------------- | ------------------- | ------------------- |
| `/user/index.php`                               | Course Participants | User list in course |
| `/admin/user.php`                               | Browse Users        | Admin user list     |
| `/admin/user/user_bulk.php`                     | Bulk User Actions   | Mass operations     |
| `/admin/user/user_bulk_confirm.php`             | Confirm Bulk        | Confirm bulk action |
| `/admin/user/user_bulk_delete.php`              | Bulk Delete         | Delete users        |
| `/admin/user/user_bulk_display.php`             | Bulk Display        | Display selected    |
| `/admin/user/user_bulk_download.php`            | Bulk Download       | Download users      |
| `/admin/user/user_bulk_forcepasswordchange.php` | Force Password      | Force change        |
| `/admin/user/user_bulk_message.php`             | Bulk Message        | Message users       |

---

## 4. Course Pages

### Course Navigation
| URL                             | Page Name       | Description            |
| ------------------------------- | --------------- | ---------------------- |
| `/course/index.php`             | All Courses     | Course category list   |
| `/course/view.php?id={id}`      | Course Page     | Course main page       |
| `/course/info.php?id={id}`      | Course Info     | Course information     |
| `/course/recent.php?id={id}`    | Recent Activity | Course recent activity |
| `/course/resources.php?id={id}` | Resources       | All course resources   |
| `/course/search.php`            | Search Courses  | Course search          |

### Course Management
| URL                        | Page Name         | Description               |
| -------------------------- | ----------------- | ------------------------- |
| `/course/edit.php`         | Course Settings   | Edit course settings      |
| `/course/reset.php`        | Reset Course      | Reset course data         |
| `/course/delete.php`       | Delete Course     | Delete course             |
| `/course/copy.php`         | Copy Course       | Copy course               |
| `/course/request.php`      | Request Course    | Request new course        |
| `/course/pending.php`      | Pending Requests  | Pending course requests   |
| `/course/management.php`   | Course Management | Manage courses/categories |
| `/course/editcategory.php` | Edit Category     | Edit category             |
| `/course/dndupload.php`    | Upload Files      | Drag-drop upload          |
| `/course/loginas.php`      | Login As          | Login as student          |
| `/course/switchrole.php`   | Switch Role       | Switch role               |

### Course Sections
| URL                             | Page Name        | Description            |
| ------------------------------- | ---------------- | ---------------------- |
| `/course/editsection.php`       | Edit Section     | Edit section settings  |
| `/course/modedit.php`           | Edit Activity    | Edit activity settings |
| `/course/mod.php`               | Module Action    | Module actions         |
| `/course/modchooser.php`        | Activity Chooser | Add activity popup     |
| `/course/changenumsections.php` | Change Sections  | Change section count   |

### Course Modules
| URL                    | Page Name     | Description      |
| ---------------------- | ------------- | ---------------- |
| `/course/rest.php`     | AJAX Endpoint | JS actions       |
| `/course/jumpto.php`   | Jump To       | Quick navigation |
| `/course/category.php` | Category      | View category    |

---

## 5. Enrolment Pages

| URL                             | Page Name         | Description        |
| ------------------------------- | ----------------- | ------------------ |
| `/enrol/index.php?id={id}`      | Enrolment Options | Enrolment methods  |
| `/enrol/instances.php?id={id}`  | Enrolment Methods | Manage methods     |
| `/enrol/editinstance.php`       | Edit Instance     | Edit enrolment     |
| `/enrol/users.php?id={id}`      | Enrolled Users    | Manage enrolments  |
| `/enrol/otherusers.php?id={id}` | Other Users       | Non-enrolled users |
| `/enrol/unenroluser.php`        | Unenrol User      | Unenrol user       |
| `/enrol/bulkchange.php`         | Bulk Enrol        | Bulk changes       |

### Enrolment Methods
| URL                           | Page Name        | Description         |
| ----------------------------- | ---------------- | ------------------- |
| `/enrol/manual/manage.php`    | Manual Enrolment | Manual enrol        |
| `/enrol/self/edit.php`        | Self Enrolment   | Self enrol config   |
| `/enrol/guest/edit.php`       | Guest Access     | Guest enrol config  |
| `/enrol/cohort/edit.php`      | Cohort Sync      | Cohort enrol config |
| `/enrol/meta/addinstance.php` | Meta Link        | Course meta link    |
| `/enrol/paypal/edit.php`      | PayPal           | PayPal enrol config |
| `/enrol/lti/edit.php`         | LTI              | LTI enrol config    |

---

## 6. Grade Pages

### Grade Reports
| URL                                  | Page Name       | Description       |
| ------------------------------------ | --------------- | ----------------- |
| `/grade/report/index.php?id={id}`    | Grade Report    | Report selection  |
| `/grade/report/user/index.php`       | User Report     | Individual grades |
| `/grade/report/grader/index.php`     | Grader Report   | All grades table  |
| `/grade/report/overview/index.php`   | Overview Report | Course grades     |
| `/grade/report/outcomes/index.php`   | Outcomes Report | Outcomes grades   |
| `/grade/report/singleview/index.php` | Single View     | Single item/user  |
| `/grade/report/history/index.php`    | Grade History   | Grade changes     |

### Grade Setup
| URL                                     | Page Name       | Description       |
| --------------------------------------- | --------------- | ----------------- |
| `/grade/edit/tree/index.php?id={id}`    | Gradebook Setup | Grade categories  |
| `/grade/edit/tree/item.php`             | Edit Item       | Edit grade item   |
| `/grade/edit/tree/category.php`         | Edit Category   | Edit category     |
| `/grade/edit/tree/outcomeitem.php`      | Outcome Item    | Edit outcome item |
| `/grade/edit/tree/calculation.php`      | Calculation     | Grade calculation |
| `/grade/edit/tree/calculatedweight.php` | Weights         | Item weights      |

### Grade Settings
| URL                                      | Page Name       | Description           |
| ---------------------------------------- | --------------- | --------------------- |
| `/grade/edit/settings/index.php?id={id}` | Course Settings | Course grade settings |
| `/grade/edit/scale/index.php`            | Scales          | Manage scales         |
| `/grade/edit/scale/edit.php`             | Edit Scale      | Edit scale            |
| `/grade/edit/letter/index.php`           | Letters         | Grade letters         |
| `/grade/edit/letter/edit.php`            | Edit Letters    | Edit letters          |
| `/grade/edit/outcome/index.php`          | Outcomes        | Manage outcomes       |
| `/grade/edit/outcome/edit.php`           | Edit Outcome    | Edit outcome          |
| `/grade/edit/outcome/course.php`         | Course Outcomes | Course outcomes       |

### Grade Import/Export
| URL                              | Page Name     | Description      |
| -------------------------------- | ------------- | ---------------- |
| `/grade/import/index.php`        | Import Grades | Import selection |
| `/grade/import/csv/index.php`    | Import CSV    | CSV import       |
| `/grade/import/xml/index.php`    | Import XML    | XML import       |
| `/grade/import/direct/index.php` | Direct Import | Direct import    |
| `/grade/export/index.php`        | Export Grades | Export selection |
| `/grade/export/ods/index.php`    | Export ODS    | ODS export       |
| `/grade/export/txt/index.php`    | Export TXT    | Text export      |
| `/grade/export/xls/index.php`    | Export XLS    | Excel export     |
| `/grade/export/xml/index.php`    | Export XML    | XML export       |

---

## 7. Activity Module Pages

### Assignment (mod_assign)
| URL                                                                | Page Name       | Description          |
| ------------------------------------------------------------------ | --------------- | -------------------- |
| `/mod/assign/view.php?id={cmid}`                                   | View Assignment | Assignment view      |
| `/mod/assign/view.php?id={cmid}&action=grading`                    | Grading Table   | Grade submissions    |
| `/mod/assign/view.php?id={cmid}&action=grader`                     | Grader          | Single grader        |
| `/mod/assign/view.php?id={cmid}&action=editsubmission`             | Edit Submission | Submit work          |
| `/mod/assign/view.php?id={cmid}&action=viewpluginassignsubmission` | View Submission | View submitted       |
| `/mod/assign/view.php?id={cmid}&action=viewpluginassignfeedback`   | View Feedback   | View feedback        |
| `/mod/assign/view.php?id={cmid}&action=grade`                      | Grade User      | Grade single user    |
| `/mod/assign/view.php?id={cmid}&action=downloadall`                | Download All    | Download submissions |
| `/mod/assign/view.php?id={cmid}&action=uploadzip`                  | Upload Feedback | Bulk feedback upload |
| `/mod/assign/index.php?id={courseid}`                              | All Assignments | Course assignments   |

### Quiz (mod_quiz)
| URL                                              | Page Name        | Description           |
| ------------------------------------------------ | ---------------- | --------------------- |
| `/mod/quiz/view.php?id={cmid}`                   | View Quiz        | Quiz info page        |
| `/mod/quiz/startattempt.php`                     | Start Attempt    | Begin quiz            |
| `/mod/quiz/attempt.php?attempt={id}`             | Quiz Attempt     | Take quiz             |
| `/mod/quiz/summary.php?attempt={id}`             | Attempt Summary  | Summary before submit |
| `/mod/quiz/processattempt.php`                   | Process Attempt  | Submit answers        |
| `/mod/quiz/review.php?attempt={id}`              | Review Attempt   | View results          |
| `/mod/quiz/edit.php?cmid={cmid}`                 | Edit Quiz        | Edit questions        |
| `/mod/quiz/editrest.php`                         | Edit REST        | AJAX editing          |
| `/mod/quiz/report.php?id={cmid}`                 | Quiz Reports     | Reports index         |
| `/mod/quiz/report.php?id={cmid}&mode=overview`   | Overview Report  | Attempts overview     |
| `/mod/quiz/report.php?id={cmid}&mode=responses`  | Responses Report | All responses         |
| `/mod/quiz/report.php?id={cmid}&mode=statistics` | Statistics       | Quiz statistics       |
| `/mod/quiz/report.php?id={cmid}&mode=grading`    | Manual Grading   | Grade essays          |
| `/mod/quiz/overrides.php?cmid={cmid}`            | Overrides        | Quiz overrides        |
| `/mod/quiz/overrideedit.php`                     | Edit Override    | Edit override         |
| `/mod/quiz/index.php?id={courseid}`              | All Quizzes      | Course quizzes        |

### Forum (mod_forum)
| URL                                       | Page Name        | Description        |
| ----------------------------------------- | ---------------- | ------------------ |
| `/mod/forum/view.php?id={cmid}`           | View Forum       | Forum discussions  |
| `/mod/forum/view.php?f={forumid}`         | View Forum (alt) | Forum by ID        |
| `/mod/forum/discuss.php?d={discussionid}` | Discussion       | View discussion    |
| `/mod/forum/post.php?forum={id}`          | New Discussion   | Create discussion  |
| `/mod/forum/post.php?reply={id}`          | Reply            | Reply to post      |
| `/mod/forum/post.php?edit={id}`           | Edit Post        | Edit post          |
| `/mod/forum/post.php?delete={id}`         | Delete Post      | Delete post        |
| `/mod/forum/post.php?prune={id}`          | Split Discussion | Split post         |
| `/mod/forum/search.php`                   | Search Forum     | Search             |
| `/mod/forum/subscribers.php?id={id}`      | Subscribers      | Manage subscribers |
| `/mod/forum/index.php?id={courseid}`      | All Forums       | Course forums      |
| `/mod/forum/user.php?id={userid}`         | User Posts       | User's posts       |
| `/mod/forum/markposts.php`                | Mark Posts       | Mark as read       |

### SCORM (mod_scorm)
| URL                                                 | Page Name    | Description        |
| --------------------------------------------------- | ------------ | ------------------ |
| `/mod/scorm/view.php?id={cmid}`                     | View SCORM   | SCORM info         |
| `/mod/scorm/player.php?a={id}`                      | SCORM Player | Play SCORM         |
| `/mod/scorm/report.php?id={cmid}`                   | Reports      | SCORM reports      |
| `/mod/scorm/report.php?id={cmid}&mode=basic`        | Basic Report | Basic report       |
| `/mod/scorm/report.php?id={cmid}&mode=interactions` | Interactions | Interaction report |
| `/mod/scorm/report.php?id={cmid}&mode=objectives`   | Objectives   | Objectives report  |
| `/mod/scorm/report.php?id={cmid}&mode=graphs`       | Graphs       | Graph report       |
| `/mod/scorm/index.php?id={courseid}`                | All SCORMs   | Course SCORMs      |

### Lesson (mod_lesson)
| URL                                          | Page Name    | Description      |
| -------------------------------------------- | ------------ | ---------------- |
| `/mod/lesson/view.php?id={cmid}`             | View Lesson  | Start lesson     |
| `/mod/lesson/view.php?id={cmid}&pageid={id}` | Lesson Page  | View page        |
| `/mod/lesson/edit.php?id={cmid}`             | Edit Lesson  | Edit pages       |
| `/mod/lesson/editpage.php`                   | Edit Page    | Edit single page |
| `/mod/lesson/essay.php?id={cmid}`            | Grade Essays | Essay grading    |
| `/mod/lesson/highscores.php?id={cmid}`       | High Scores  | Leaderboard      |
| `/mod/lesson/mediafile.php`                  | Media File   | Show media       |
| `/mod/lesson/report.php?id={cmid}`           | Reports      | Lesson reports   |
| `/mod/lesson/overrides.php?cmid={cmid}`      | Overrides    | Lesson overrides |
| `/mod/lesson/index.php?id={courseid}`        | All Lessons  | Course lessons   |

### Workshop (mod_workshop)
| URL                                                | Page Name       | Description          |
| -------------------------------------------------- | --------------- | -------------------- |
| `/mod/workshop/view.php?id={cmid}`                 | View Workshop   | Workshop info        |
| `/mod/workshop/submission.php?cmid={cmid}`         | Submission      | Submit work          |
| `/mod/workshop/submission.php?cmid={cmid}&id={id}` | View Submission | View submission      |
| `/mod/workshop/assessment.php?asid={id}`           | Assessment      | Peer assessment      |
| `/mod/workshop/editform.php?cmid={cmid}`           | Edit Form       | Edit assessment form |
| `/mod/workshop/aggregate.php`                      | Aggregate       | Calculate grades     |
| `/mod/workshop/allocation.php?cmid={cmid}`         | Allocation      | Assign reviewers     |
| `/mod/workshop/exsubmission.php`                   | Example         | Example submission   |
| `/mod/workshop/excompare.php`                      | Compare         | Compare assessments  |
| `/mod/workshop/switchphase.php`                    | Switch Phase    | Change phase         |
| `/mod/workshop/index.php?id={courseid}`            | All Workshops   | Course workshops     |

### H5P (mod_h5pactivity)
| URL                                                 | Page Name       | Description     |
| --------------------------------------------------- | --------------- | --------------- |
| `/mod/h5pactivity/view.php?id={cmid}`               | View H5P        | H5P activity    |
| `/mod/h5pactivity/report.php?id={cmid}`             | Attempts Report | View attempts   |
| `/mod/h5pactivity/report.php?id={cmid}&userid={id}` | User Attempts   | User's attempts |
| `/mod/h5pactivity/index.php?id={courseid}`          | All H5P         | Course H5P      |

### Database (mod_data)
| URL                                        | Page Name     | Description      |
| ------------------------------------------ | ------------- | ---------------- |
| `/mod/data/view.php?id={cmid}`             | View Database | Database entries |
| `/mod/data/view.php?id={cmid}&mode=single` | Single View   | Single entry     |
| `/mod/data/edit.php?id={cmid}`             | Add Entry     | Add entry        |
| `/mod/data/edit.php?id={cmid}&rid={id}`    | Edit Entry    | Edit entry       |
| `/mod/data/field.php?id={cmid}`            | Fields        | Manage fields    |
| `/mod/data/preset.php?id={cmid}`           | Presets       | Database presets |
| `/mod/data/templates.php?id={cmid}`        | Templates     | Edit templates   |
| `/mod/data/export.php?id={cmid}`           | Export        | Export entries   |
| `/mod/data/import.php?id={cmid}`           | Import        | Import entries   |
| `/mod/data/index.php?id={courseid}`        | All Databases | Course databases |

### Other Activity Modules
| URL                                        | Page Name         | Description      |
| ------------------------------------------ | ----------------- | ---------------- |
| `/mod/bigbluebuttonbn/view.php?id={cmid}`  | BigBlueButton     | Video conference |
| `/mod/book/view.php?id={cmid}`             | View Book         | Book content     |
| `/mod/book/edit.php?cmid={cmid}`           | Edit Book         | Edit chapters    |
| `/mod/chat/view.php?id={cmid}`             | View Chat         | Chat room        |
| `/mod/chat/gui_basic/index.php`            | Basic Chat        | Simple chat      |
| `/mod/chat/gui_ajax/index.php`             | AJAX Chat         | AJAX chat        |
| `/mod/chat/report.php?id={cmid}`           | Chat Sessions     | Past sessions    |
| `/mod/choice/view.php?id={cmid}`           | View Choice       | Choice poll      |
| `/mod/choice/report.php?id={cmid}`         | Choice Results    | View results     |
| `/mod/feedback/view.php?id={cmid}`         | View Feedback     | Feedback survey  |
| `/mod/feedback/complete.php?id={cmid}`     | Complete Feedback | Fill feedback    |
| `/mod/feedback/edit.php?id={cmid}`         | Edit Questions    | Edit feedback    |
| `/mod/feedback/analysis.php?id={cmid}`     | Analysis          | View responses   |
| `/mod/feedback/show_entries.php?id={cmid}` | Entries           | All responses    |
| `/mod/glossary/view.php?id={cmid}`         | View Glossary     | Glossary entries |
| `/mod/glossary/edit.php?cmid={cmid}`       | Add Entry         | Add entry        |
| `/mod/glossary/import.php?id={cmid}`       | Import            | Import entries   |
| `/mod/glossary/export.php?id={cmid}`       | Export            | Export entries   |
| `/mod/lti/view.php?id={cmid}`              | View LTI          | External tool    |
| `/mod/lti/launch.php?id={cmid}`            | Launch LTI        | Launch tool      |
| `/mod/page/view.php?id={cmid}`             | View Page         | Page content     |
| `/mod/resource/view.php?id={cmid}`         | View Resource     | File download    |
| `/mod/folder/view.php?id={cmid}`           | View Folder       | Folder contents  |
| `/mod/url/view.php?id={cmid}`              | View URL          | Redirect to URL  |
| `/mod/wiki/view.php?id={cmid}`             | View Wiki         | Wiki content     |
| `/mod/wiki/create.php?id={cmid}`           | Create Page       | New wiki page    |
| `/mod/wiki/edit.php?pageid={id}`           | Edit Page         | Edit wiki page   |
| `/mod/wiki/history.php?pageid={id}`        | History           | Page history     |
| `/mod/wiki/diff.php`                       | Diff              | Version compare  |
| `/mod/wiki/map.php?id={cmid}`              | Page Map          | Wiki map         |
| `/mod/wiki/admin.php?id={cmid}`            | Admin             | Wiki admin       |
| `/mod/survey/view.php?id={cmid}`           | View Survey       | Survey           |
| `/mod/survey/report.php?id={cmid}`         | Survey Report     | Results          |
| `/mod/imscp/view.php?id={cmid}`            | View IMS CP       | IMS content      |
| `/mod/label/view.php?id={cmid}`            | View Label        | Label (redirect) |

---

## 8. Question Bank Pages

| URL                                   | Page Name     | Description       |
| ------------------------------------- | ------------- | ----------------- |
| `/question/edit.php?courseid={id}`    | Question Bank | Manage questions  |
| `/question/bank/editquestion.php`     | Edit Question | Edit question     |
| `/question/bank/managecategories.php` | Categories    | Manage categories |
| `/question/bank/exportquestions.php`  | Export        | Export questions  |
| `/question/bank/importquestions.php`  | Import        | Import questions  |
| `/question/preview.php?id={id}`       | Preview       | Preview question  |
| `/question/bank/bulkmove.php`         | Bulk Move     | Move questions    |
| `/question/bank/tagquestion.php`      | Tag Question  | Tag question      |
| `/question/bank/viewcreator.php`      | View Creator  | View by creator   |
| `/question/bank/customfields.php`     | Custom Fields | Question fields   |

---

## 9. Messaging Pages

| URL                                       | Page Name          | Description           |
| ----------------------------------------- | ------------------ | --------------------- |
| `/message/index.php`                      | Messages           | Messaging interface   |
| `/message/output/popup/notifications.php` | Notifications      | View notifications    |
| `/message/edit.php`                       | Preferences        | Message preferences   |
| `/message/notificationpreferences.php`    | Notification Prefs | Notification settings |

---

## 10. Calendar Pages

| URL                                 | Page Name      | Description            |
| ----------------------------------- | -------------- | ---------------------- |
| `/calendar/view.php`                | Calendar       | Main calendar          |
| `/calendar/view.php?view=month`     | Month View     | Monthly view           |
| `/calendar/view.php?view=day`       | Day View       | Daily view             |
| `/calendar/view.php?view=upcoming`  | Upcoming       | Upcoming events        |
| `/calendar/event.php`               | Add Event      | Create event           |
| `/calendar/event.php?id={id}`       | Edit Event     | Edit event             |
| `/calendar/delete.php?id={id}`      | Delete Event   | Delete event           |
| `/calendar/export.php`              | Export         | Export calendar        |
| `/calendar/export_execute.php`      | Execute Export | Download export        |
| `/calendar/managesubscriptions.php` | Subscriptions  | Calendar subscriptions |

---

## 11. Badge Pages

| URL                                | Page Name         | Description          |
| ---------------------------------- | ----------------- | -------------------- |
| `/badges/mybadges.php`             | My Badges         | User badges          |
| `/badges/badge.php?hash={hash}`    | Badge Details     | Badge info           |
| `/badges/index.php?type=1`         | Site Badges       | Site badges          |
| `/badges/index.php?type=2&id={id}` | Course Badges     | Course badges        |
| `/badges/newbadge.php`             | New Badge         | Create badge         |
| `/badges/edit.php?id={id}`         | Edit Badge        | Edit badge           |
| `/badges/overview.php?id={id}`     | Badge Overview    | Badge details        |
| `/badges/criteria.php?id={id}`     | Badge Criteria    | Edit criteria        |
| `/badges/criteria_settings.php`    | Criteria Settings | Criteria config      |
| `/badges/recipients.php?id={id}`   | Recipients        | Badge recipients     |
| `/badges/endorsement.php?id={id}`  | Endorsement       | Endorsements         |
| `/badges/related.php?id={id}`      | Related Badges    | Related badges       |
| `/badges/alignment.php?id={id}`    | Alignment         | Competency alignment |
| `/badges/mybackpack.php`           | Backpack          | Badge backpack       |
| `/badges/backpack-connect.php`     | Connect Backpack  | Connect backpack     |
| `/badges/backpack-export.php`      | Export Badge      | Export to backpack   |
| `/badges/action.php`               | Badge Action      | Badge actions        |
| `/badges/view.php?id={id}`         | View Badge        | View badge           |
| `/badges/award.php?id={id}`        | Award Badge       | Manual award         |

---

## 12. Competency Pages

| URL                                                   | Page Name           | Description             |
| ----------------------------------------------------- | ------------------- | ----------------------- |
| `/admin/tool/lp/competencyframeworks.php`             | Frameworks          | Competency frameworks   |
| `/admin/tool/lp/editcompetencyframework.php`          | Edit Framework      | Edit framework          |
| `/admin/tool/lp/competencies.php`                     | Competencies        | Framework competencies  |
| `/admin/tool/lp/editcompetency.php`                   | Edit Competency     | Edit competency         |
| `/admin/tool/lp/coursecompetencies.php?courseid={id}` | Course Competencies | Course competencies     |
| `/admin/tool/lp/user_competency_in_course.php`        | User Competency     | User in course          |
| `/admin/tool/lp/learningplans.php`                    | Plan Templates      | Learning plan templates |
| `/admin/tool/lp/editplan.php`                         | Edit Plan           | Edit plan               |
| `/admin/tool/lp/edittemplate.php`                     | Edit Template       | Edit template           |
| `/admin/tool/lp/plans.php?userid={id}`                | User Plans          | User's plans            |
| `/admin/tool/lp/plan.php?id={id}`                     | View Plan           | View plan               |
| `/admin/tool/lp/user_competency.php`                  | User Competency     | User competency details |
| `/admin/tool/lp/user_evidence.php?userid={id}`        | User Evidence       | User evidence           |
| `/admin/tool/lp/user_evidence_edit.php`               | Edit Evidence       | Edit evidence           |

---

## 13. Report Pages

| URL                                       | Page Name            | Description          |
| ----------------------------------------- | -------------------- | -------------------- |
| `/report/log/index.php?id={id}`           | Logs                 | Course logs          |
| `/report/loglive/index.php?id={id}`       | Live Logs            | Real-time logs       |
| `/report/outline/index.php?id={id}`       | Activity Report      | Outline report       |
| `/report/complete/index.php?id={id}`      | Complete Report      | Full activity        |
| `/report/participation/index.php?id={id}` | Participation        | Participation report |
| `/report/stats/index.php?id={id}`         | Statistics           | Course statistics    |
| `/report/progress/index.php`              | Activity Completion  | Completion progress  |
| `/report/competency/index.php?id={id}`    | Competency Breakdown | Competency report    |
| `/report/infectedfiles/index.php`         | Infected Files       | Antivirus report     |
| `/report/usersessions/index.php`          | User Sessions        | Session report       |
| `/report/insights/index.php`              | Insights             | Analytics insights   |
| `/report/configlog/index.php`             | Config Changes       | Config log           |
| `/report/backups/index.php`               | Backups              | Backup logs          |
| `/report/eventlist/index.php`             | Events               | Event list           |
| `/report/questioninstances/index.php`     | Question Instances   | Question usage       |
| `/report/security/index.php`              | Security Overview    | Security checks      |
| `/report/status/index.php`                | Status               | System status        |

---

## 14. Backup & Restore Pages

| URL                                      | Page Name       | Description        |
| ---------------------------------------- | --------------- | ------------------ |
| `/backup/backup.php?id={id}`             | Backup Course   | Backup wizard      |
| `/backup/backupsettings.php`             | Backup Settings | Backup options     |
| `/backup/restorefile.php?contextid={id}` | Restore         | Restore wizard     |
| `/backup/restore.php`                    | Restore Course  | Restore process    |
| `/backup/copy.php?id={id}`               | Copy Course     | Course copy        |
| `/backup/download.php`                   | Download Backup | Download file      |
| `/backup/import.php?id={id}`             | Import          | Import from course |

---

## 15. Content Bank Pages

| URL                                     | Page Name    | Description     |
| --------------------------------------- | ------------ | --------------- |
| `/contentbank/index.php?contextid={id}` | Content Bank | Content browser |
| `/contentbank/view.php?id={id}`         | View Content | View item       |
| `/contentbank/edit.php?contextid={id}`  | Add Content  | Upload content  |

---

## 16. File Management Pages

| URL                      | Page Name     | Description       |
| ------------------------ | ------------- | ----------------- |
| `/files/index.php`       | Files         | File manager      |
| `/user/files.php`        | Private Files | User files        |
| `/draftfile.php/*`       | Draft File    | Draft file access |
| `/pluginfile.php/*`      | Plugin File   | File serving      |
| `/tokenpluginfile.php/*` | Token File    | Token file access |

---

## 17. Administration Pages

### Site Admin Home
| URL                          | Page Name    | Description      |
| ---------------------------- | ------------ | ---------------- |
| `/admin/index.php`           | Admin Home   | Admin dashboard  |
| `/admin/search.php`          | Admin Search | Search settings  |
| `/admin/upgradesettings.php` | Upgrade      | Upgrade settings |

### Users Administration
| URL                            | Page Name    | Description          |
| ------------------------------ | ------------ | -------------------- |
| `/admin/user.php`              | Browse Users | User list            |
| `/admin/user/user_bulk.php`    | Bulk Actions | Bulk operations      |
| `/admin/roles/define.php`      | Define Roles | Edit roles           |
| `/admin/roles/manage.php`      | Manage Roles | Role list            |
| `/admin/roles/assign.php`      | Assign Roles | Role assignment      |
| `/admin/roles/permissions.php` | Permissions  | Check permissions    |
| `/admin/roles/override.php`    | Override     | Override permissions |
| `/admin/roles/check.php`       | Check        | Permission check     |
| `/admin/roles/allow.php`       | Role Allow   | Allow settings       |

### Users Tools
| URL                                  | Page Name       | Description    |
| ------------------------------------ | --------------- | -------------- |
| `/admin/tool/uploaduser/index.php`   | Upload Users    | CSV import     |
| `/admin/tool/uploaduser/picture.php` | Upload Pictures | Bulk pictures  |
| `/cohort/index.php`                  | Cohorts         | Cohort list    |
| `/cohort/edit.php`                   | Edit Cohort     | Edit cohort    |
| `/cohort/assign.php`                 | Assign Cohort   | Assign members |
| `/cohort/upload.php`                 | Upload Cohorts  | Bulk cohorts   |

### Plugin Management
| URL                                  | Page Name        | Description         |
| ------------------------------------ | ---------------- | ------------------- |
| `/admin/plugins.php`                 | Plugins Overview | All plugins         |
| `/admin/tool/installaddon/index.php` | Install Plugins  | Add plugin          |
| `/admin/modules.php`                 | Activity Modules | Activity settings   |
| `/admin/blocks.php`                  | Blocks           | Block settings      |
| `/admin/filters.php`                 | Filters          | Filter settings     |
| `/admin/repository.php`              | Repositories     | Repository settings |
| `/admin/portfolio.php`               | Portfolios       | Portfolio settings  |
| `/admin/search.php`                  | Search           | Search settings     |
| `/admin/message.php`                 | Messaging        | Message settings    |
| `/admin/antiviruses.php`             | Antivirus        | Antivirus settings  |
| `/admin/auth.php`                    | Authentication   | Auth settings       |
| `/admin/enrol.php`                   | Enrolments       | Enrolment settings  |
| `/admin/editors.php`                 | Editors          | Editor settings     |
| `/admin/localplugins.php`            | Local Plugins    | Local plugins       |
| `/admin/mnet/index.php`              | Networking       | MNet settings       |
| `/admin/tool/mobile/index.php`       | Mobile           | Mobile settings     |
| `/admin/plagiarism.php`              | Plagiarism       | Plagiarism plugins  |
| `/admin/payment.php`                 | Payment          | Payment gateways    |
| `/admin/contentbank.php`             | Content Bank     | H5P types           |

### Server Settings
| URL                                           | Page Name         | Description       |
| --------------------------------------------- | ----------------- | ----------------- |
| `/admin/settings.php?section=systempaths`     | System Paths      | Path settings     |
| `/admin/settings.php?section=supportcontact`  | Support           | Support settings  |
| `/admin/settings.php?section=sessionhandling` | Sessions          | Session settings  |
| `/admin/settings.php?section=http`            | HTTP              | HTTP settings     |
| `/admin/settings.php?section=maintenancemode` | Maintenance       | Maintenance mode  |
| `/admin/settings.php?section=cleanup`         | Cleanup           | Cleanup settings  |
| `/admin/settings.php?section=environment`     | Environment       | Environment check |
| `/admin/environment.php`                      | Environment Check | Check details     |
| `/admin/phpinfo.php`                          | PHP Info          | PHP settings      |
| `/admin/purgecaches.php`                      | Purge Caches      | Clear caches      |

### Scheduled Tasks
| URL                                   | Page Name       | Description  |
| ------------------------------------- | --------------- | ------------ |
| `/admin/tool/task/scheduledtasks.php` | Scheduled Tasks | Task list    |
| `/admin/tool/task/runningtasks.php`   | Running Tasks   | Active tasks |
| `/admin/tool/task/tasklogs.php`       | Task Logs       | Task history |

### Web Services
| URL                                               | Page Name         | Description       |
| ------------------------------------------------- | ----------------- | ----------------- |
| `/admin/settings.php?section=webservicesoverview` | Overview          | WS overview       |
| `/admin/settings.php?section=webserviceprotocols` | Protocols         | Enable protocols  |
| `/admin/settings.php?section=externalservices`    | External Services | Service list      |
| `/admin/webservice/service.php`                   | Edit Service      | Edit service      |
| `/admin/webservice/service_functions.php`         | Service Functions | Add functions     |
| `/admin/webservice/service_users.php`             | Service Users     | Authorized users  |
| `/admin/webservice/tokens.php`                    | Manage Tokens     | Token list        |
| `/admin/webservice/testclient.php`                | Test Client       | API testing       |
| `/admin/webservice/documentation.php`             | API Docs          | API documentation |

---

## 18. Miscellaneous Pages

| URL                                             | Page Name        | Description       |
| ----------------------------------------------- | ---------------- | ----------------- |
| `/blog/index.php`                               | Blog             | Blog entries      |
| `/blog/edit.php`                                | Edit Blog        | Create/edit post  |
| `/blog/external_blog_edit.php`                  | External Blog    | Add external      |
| `/blog/preferences.php`                         | Blog Preferences | Blog settings     |
| `/tag/index.php`                                | Tags             | Tag index         |
| `/tag/search.php`                               | Search Tags      | Tag search        |
| `/tag/coursetags.php`                           | Course Tags      | Course tags       |
| `/tag/manage.php`                               | Manage Tags      | Tag management    |
| `/notes/index.php`                              | Notes            | User notes        |
| `/notes/edit.php`                               | Edit Note        | Create note       |
| `/comment/`                                     | Comments         | Comment system    |
| `/rating/rate.php`                              | Rate             | Submit rating     |
| `/rating/rate_ajax.php`                         | Rate AJAX        | AJAX rating       |
| `/rss/file.php/*`                               | RSS Feed         | RSS output        |
| `/help.php`                                     | Help             | Help popup        |
| `/iplookup/index.php`                           | IP Lookup        | IP geolocation    |
| `/search/index.php`                             | Global Search    | Site search       |
| `/search/query.php`                             | Search Query     | Search results    |
| `/analytics/classes/course.php`                 | Analytics        | Course analytics  |
| `/privacy/export.php`                           | Export Data      | GDPR export       |
| `/privacy/request.php`                          | Data Request     | GDPR request      |
| `/admin/tool/dataprivacy/createdatarequest.php` | Data Request     | Privacy request   |
| `/admin/tool/policy/index.php`                  | Policies         | Policy management |
| `/admin/tool/policy/viewall.php`                | View Policies    | View all policies |
| `/admin/tool/policy/user.php`                   | User Policies    | User acceptances  |

---

*Document generated for Moodle 4.5 - Complete URL Inventory*
*Total URLs documented: 350+*
