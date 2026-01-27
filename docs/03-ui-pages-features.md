# Moodle UI Pages & Features Documentation

> **Moodle Version:** 4.5  
> **Theme:** Boost (Default)  
> **UI Framework:** Bootstrap 4 + RequireJS + Mustache Templates

---

## Overview

Moodle's user interface is organized into several main areas:

1. **Public Pages** - Accessible without login
2. **Dashboard** - User's personalized homepage
3. **Course Pages** - Teaching and learning interface
4. **Administration** - System and course management
5. **User Profile** - Personal settings and information

---

## Navigation Structure

```
┌─────────────────────────────────────────────────────────────────────┐
│                           NAVBAR                                    │
│  [☰ Side Menu] [Site Logo] [Search] [Notifications] [Messages] [→]  │
└─────────────────────────────────────────────────────────────────────┘
┌──────────────┐ ┌────────────────────────────────────────────────────┐
│              │ │                                                    │
│   SIDE       │ │              MAIN CONTENT AREA                     │
│   NAVIGATION │ │                                                    │
│              │ │  ┌──────────────────────────────────────────────┐ │
│  - Dashboard │ │  │                                              │ │
│  - Site home │ │  │              PAGE CONTENT                    │ │
│  - Calendar  │ │  │                                              │ │
│  - Private   │ │  │                                              │ │
│    files     │ │  │                                              │ │
│  - My courses│ │  └──────────────────────────────────────────────┘ │
│              │ │                                                    │
│  [Course 1]  │ │  ┌─────────────────────┐ ┌─────────────────────┐  │
│  [Course 2]  │ │  │    BLOCK LEFT       │ │    BLOCK RIGHT      │  │
│  [Course 3]  │ │  │                     │ │                     │  │
│              │ │  └─────────────────────┘ └─────────────────────┘  │
│              │ │                                                    │
└──────────────┘ └────────────────────────────────────────────────────┘
```

---

## 1. Public Pages (No Authentication Required)

### 1.1 Site Home Page
**URL:** `/`

| Element        | Description                       |
| -------------- | --------------------------------- |
| Site name/logo | Links to homepage                 |
| Login button   | Access to login form              |
| Site summary   | Description from site settings    |
| Course list    | Available courses (if enabled)    |
| Categories     | Course category navigation        |
| Self signup    | If enabled, new user registration |

### 1.2 Login Page
**URL:** `/login/index.php`

| Element            | Description                                       |
| ------------------ | ------------------------------------------------- |
| Username field     | User identification                               |
| Password field     | User credential                                   |
| Remember username  | Cookie-based username storage                     |
| Login button       | Submit credentials                                |
| Forgot password    | Password reset link                               |
| Guest login        | If enabled                                        |
| Create new account | If self-registration enabled                      |
| OAuth2 buttons     | External authentication (Google, Microsoft, etc.) |

### 1.3 Registration Page
**URL:** `/login/signup.php`

| Element               | Description                |
| --------------------- | -------------------------- |
| Username              | Unique username            |
| Password              | With policy requirements   |
| Email                 | For verification           |
| First/Last name       | Full name                  |
| City/Country          | Location information       |
| Custom profile fields | Additional required fields |
| CAPTCHA               | Anti-bot verification      |
| Privacy policy        | Acceptance checkbox        |

### 1.4 Password Reset
**URL:** `/login/forgot_password.php`

| Element            | Description             |
| ------------------ | ----------------------- |
| Username or email  | Identification          |
| Search button      | Find matching account   |
| Reset instructions | Email sent confirmation |

---

## 2. Dashboard (User Homepage)

### 2.1 Main Dashboard
**URL:** `/my/`

| Block/Section             | Description                        |
| ------------------------- | ---------------------------------- |
| Timeline                  | Upcoming activities and deadlines  |
| Recently accessed courses | Quick course access                |
| Starred courses           | User's favorite courses            |
| Course overview           | All enrolled courses with progress |
| Calendar                  | Upcoming events                    |
| Private files             | Personal file storage              |
| Online users              | Currently online (if enabled)      |
| Latest badges             | Recently earned badges             |
| Learning plans            | Competency-based plans             |

### 2.2 Dashboard Customization
**URL:** `/my/indexsys.php` (admin), `/my/index.php?edit=1` (user)

| Feature          | Description                 |
| ---------------- | --------------------------- |
| Add block        | Add new blocks to dashboard |
| Move blocks      | Drag and drop positioning   |
| Configure blocks | Block-specific settings     |
| Hide blocks      | Temporary block hiding      |
| Reset dashboard  | Return to default layout    |

---

## 3. Course Pages

### 3.1 Course Home/Main Page
**URL:** `/course/view.php?id={courseid}`

| Section               | Description                             |
| --------------------- | --------------------------------------- |
| Course header         | Course name, image, navigation          |
| Course index          | Section/topic navigation                |
| Section/Topics        | Content organized by week/topic         |
| Activities            | Links to course activities              |
| Resources             | Files, URLs, labels                     |
| Completion indicators | Activity completion status              |
| Editing controls      | Add activities/resources (editing mode) |

### 3.2 Course Enrolment Page
**URL:** `/enrol/index.php?id={courseid}`

| Element           | Description                   |
| ----------------- | ----------------------------- |
| Enrolment options | Available enrolment methods   |
| Self enrolment    | Direct enrollment             |
| Enrolment key     | Password-protected enrollment |
| Payment options   | PayPal, Stripe if configured  |
| Guest access      | View only access              |
| Wait list         | If capacity limited           |

### 3.3 Course Participants
**URL:** `/user/index.php?id={courseid}`

| Column          | Description                 |
| --------------- | --------------------------- |
| Profile picture | User avatar                 |
| Name            | Full name with profile link |
| Roles           | Student, Teacher, etc.      |
| Groups          | Group membership            |
| Last access     | Last course visit           |
| Status          | Active, suspended           |
| Actions         | Message, enrol/unenrol      |

### 3.4 Course Gradebook
**URL:** `/grade/report/index.php?id={courseid}`

#### User Report (`/grade/report/user/index.php`)
| Column       | Description           |
| ------------ | --------------------- |
| Grade item   | Activity or category  |
| Weight       | Percentage weight     |
| Grade        | Achieved grade        |
| Range        | Min-Max possible      |
| Percentage   | Percentage achieved   |
| Feedback     | Teacher comments      |
| Contribution | Weighted contribution |

#### Grader Report (`/grade/report/grader/index.php`)
| Feature         | Description                |
| --------------- | -------------------------- |
| Student rows    | One row per student        |
| Grade columns   | One column per grade item  |
| Category totals | Aggregated category grades |
| Course total    | Final course grade         |
| Quick grading   | Inline grade editing       |
| Single view     | Focus on one student/item  |

### 3.5 Competencies
**URL:** `/admin/tool/lp/coursecompetencies.php?courseid={id}`

| Section         | Description                   |
| --------------- | ----------------------------- |
| Competency list | Assigned competencies         |
| Student ratings | Competency ratings by student |
| Evidence        | Evidence of competency        |
| Learning plans  | Associated learning plans     |

---

## 4. Activity Modules

### 4.1 Assignment (mod_assign)
**URLs:**
- View: `/mod/assign/view.php?id={cmid}`
- Submit: `/mod/assign/view.php?id={cmid}&action=editsubmission`
- Grade: `/mod/assign/view.php?id={cmid}&action=grading`

#### Student View
| Section                | Description                  |
| ---------------------- | ---------------------------- |
| Assignment description | Instructions and details     |
| Submission status      | Draft, Submitted, Graded     |
| Due date               | Deadline information         |
| Time remaining         | Countdown to deadline        |
| File attachments       | Attached files               |
| Online text            | Text submission area         |
| Submit button          | Final submission action      |
| Feedback               | Teacher feedback when graded |

#### Teacher View
| Tab                  | Description             |
| -------------------- | ----------------------- |
| Grading summary      | Overview statistics     |
| View all submissions | List of all submissions |
| Grade actions        | Quick grading options   |
| Download submissions | Bulk download           |
| Upload feedback      | Bulk feedback files     |
| Extension management | Grant extensions        |
| Reveal identities    | For anonymous grading   |

### 4.2 Quiz (mod_quiz)
**URLs:**
- View: `/mod/quiz/view.php?id={cmid}`
- Attempt: `/mod/quiz/attempt.php?attempt={attemptid}`
- Review: `/mod/quiz/review.php?attempt={attemptid}`

#### Student View
| Section          | Description                 |
| ---------------- | --------------------------- |
| Quiz description | Instructions                |
| Attempts summary | Previous attempt grades     |
| Grade            | Best/average grade achieved |
| Open/Close dates | Availability window         |
| Time limit       | Maximum duration            |
| Attempts allowed | Number of tries             |
| Grading method   | Best, average, first, last  |
| Start attempt    | Begin new attempt           |

#### Attempt Page
| Element             | Description         |
| ------------------- | ------------------- |
| Question navigation | Jump to questions   |
| Timer               | Remaining time      |
| Question            | Question content    |
| Answer options      | Response area       |
| Flag question       | Mark for review     |
| Save/Next           | Navigation controls |
| Submit all          | Finish attempt      |

### 4.3 Forum (mod_forum)
**URLs:**
- View: `/mod/forum/view.php?id={cmid}`
- Discussion: `/mod/forum/discuss.php?d={discussionid}`
- Post: `/mod/forum/post.php?forum={forumid}`

| Element            | Description                 |
| ------------------ | --------------------------- |
| Forum description  | Purpose and rules           |
| Add discussion     | Start new thread            |
| Discussion list    | All discussions             |
| Subscription       | Email notification settings |
| Search             | Find discussions/posts      |
| Display options    | Sort, filter options        |
| Pinned discussions | Important topics at top     |

#### Discussion View
| Element          | Description        |
| ---------------- | ------------------ |
| Original post    | First post content |
| Reply hierarchy  | Nested replies     |
| Reply button     | Add response       |
| Star/Favorite    | Mark important     |
| Pin (teacher)    | Pin to top         |
| Lock (teacher)   | Prevent replies    |
| Delete (teacher) | Remove post        |
| Edit             | Modify own post    |

### 4.4 SCORM Package (mod_scorm)
**URLs:**
- View: `/mod/scorm/view.php?id={cmid}`
- Player: `/mod/scorm/player.php?a={scormid}&currentorg=&scoid={scoid}`

| Element             | Description               |
| ------------------- | ------------------------- |
| Package description | SCORM description         |
| Attempts            | Previous attempt list     |
| Enter button        | Launch SCORM player       |
| Grade               | Achieved score            |
| Prerequisites       | Required prior activities |
| SCO tree            | Navigation structure      |

### 4.5 Lesson (mod_lesson)
**URLs:**
- View: `/mod/lesson/view.php?id={cmid}`
- Page: `/mod/lesson/view.php?id={cmid}&pageid={pageid}`

| Element        | Description           |
| -------------- | --------------------- |
| Lesson outline | Content structure     |
| Content pages  | Information pages     |
| Question pages | Assessment questions  |
| Branch tables  | Navigation choices    |
| Cluster        | Random question pools |
| End of lesson  | Summary and grade     |

### 4.6 Workshop (mod_workshop)
**URLs:**
- View: `/mod/workshop/view.php?id={cmid}`
- Submission: `/mod/workshop/submission.php?cmid={cmid}`
- Assessment: `/mod/workshop/assessment.php?asid={assessmentid}`

| Phase              | Description                   |
| ------------------ | ----------------------------- |
| Setup              | Teacher configures workshop   |
| Submission         | Students submit work          |
| Assessment         | Peer review period            |
| Grading evaluation | Teacher evaluates assessments |
| Closed             | Final grades calculated       |

### 4.7 H5P (mod_h5pactivity)
**URL:** `/mod/h5pactivity/view.php?id={cmid}`

| Element         | Description          |
| --------------- | -------------------- |
| H5P content     | Interactive element  |
| Attempt history | Previous attempts    |
| Grade           | Best/average score   |
| Full screen     | Expanded view option |

### 4.8 Other Activity Types

| Activity            | URL Pattern                               | Description              |
| ------------------- | ----------------------------------------- | ------------------------ |
| Chat                | `/mod/chat/view.php?id={cmid}`            | Real-time text chat      |
| Choice              | `/mod/choice/view.php?id={cmid}`          | Single question poll     |
| Database            | `/mod/data/view.php?id={cmid}`            | Student-created database |
| Feedback            | `/mod/feedback/view.php?id={cmid}`        | Survey/feedback form     |
| Glossary            | `/mod/glossary/view.php?id={cmid}`        | Term definitions         |
| Survey              | `/mod/survey/view.php?id={cmid}`          | Pre-built surveys        |
| Wiki                | `/mod/wiki/view.php?id={cmid}`            | Collaborative pages      |
| External tool (LTI) | `/mod/lti/view.php?id={cmid}`             | External applications    |
| BigBlueButton       | `/mod/bigbluebuttonbn/view.php?id={cmid}` | Video conferencing       |

---

## 5. Resource Types

| Resource            | URL Pattern                        | Description               |
| ------------------- | ---------------------------------- | ------------------------- |
| File                | `/mod/resource/view.php?id={cmid}` | Uploaded file             |
| Folder              | `/mod/folder/view.php?id={cmid}`   | File collection           |
| URL                 | `/mod/url/view.php?id={cmid}`      | External link             |
| Page                | `/mod/page/view.php?id={cmid}`     | HTML content              |
| Book                | `/mod/book/view.php?id={cmid}`     | Multi-page book           |
| Label               | (inline in course)                 | Text/media in course page |
| IMS content package | `/mod/imscp/view.php?id={cmid}`    | IMS package               |

---

## 6. User Profile Pages

### 6.1 User Profile
**URL:** `/user/profile.php?id={userid}`

| Section         | Description                |
| --------------- | -------------------------- |
| Profile picture | User avatar                |
| Full name       | Display name               |
| Email           | Contact email (if visible) |
| Description     | Bio/about me               |
| Interests       | Tagged interests           |
| Course details  | Enrolled courses           |
| Blog entries    | User's blog posts          |
| Reports         | Activity reports           |
| Forum posts     | User's forum activity      |
| Login activity  | Access information         |

### 6.2 Profile Edit
**URL:** `/user/edit.php?id={userid}`

| Section          | Description                |
| ---------------- | -------------------------- |
| General          | Name, email, city, country |
| User picture     | Upload/change avatar       |
| Additional names | Alternative names          |
| Interests        | Tag-based interests        |
| Optional         | Phone, address, etc.       |
| Custom fields    | Site-specific fields       |

### 6.3 Preferences
**URL:** `/user/preferences.php`

| Category                 | Description           |
| ------------------------ | --------------------- |
| Edit profile             | Profile information   |
| Change password          | Password update       |
| Preferred language       | Interface language    |
| Forum preferences        | Email digest settings |
| Editor preferences       | Text editor choice    |
| Calendar preferences     | Calendar settings     |
| Message preferences      | Notification settings |
| Notification preferences | Channel preferences   |
| Blog preferences         | Blog settings         |
| Badge preferences        | Badge display         |
| Content bank             | H5P content settings  |

---

## 7. Messaging System

### 7.1 Messages Page
**URL:** `/message/index.php`

| Section                  | Description           |
| ------------------------ | --------------------- |
| Conversation list        | All conversations     |
| Search                   | Find messages/users   |
| Starred conversations    | Favorites             |
| Group conversations      | Multi-user chats      |
| Individual conversations | One-on-one messages   |
| Settings                 | Messaging preferences |

### 7.2 Message Panel
| Element         | Description           |
| --------------- | --------------------- |
| Contact info    | User details          |
| Message history | Conversation thread   |
| Message input   | Text area             |
| Send button     | Send message          |
| Emoji picker    | Emoji insertion       |
| Delete          | Remove messages       |
| Star/Unstar     | Favorite conversation |

---

## 8. Calendar

### 8.1 Calendar View
**URL:** `/calendar/view.php`

| View          | Description             |
| ------------- | ----------------------- |
| Month view    | Monthly calendar grid   |
| Day view      | Single day details      |
| Upcoming view | List of upcoming events |

### 8.2 Event Types

| Type            | Color  | Description            |
| --------------- | ------ | ---------------------- |
| Site events     | Gray   | Site-wide events       |
| Course events   | Orange | Course-specific events |
| Group events    | Yellow | Group-specific events  |
| User events     | Blue   | Personal events        |
| Category events | Purple | Category events        |

### 8.3 Event Creation
**URL:** `/calendar/event.php`

| Field       | Description               |
| ----------- | ------------------------- |
| Event title | Event name                |
| Date/Time   | When the event occurs     |
| Duration    | Event length              |
| Description | Event details             |
| Event type  | Course, user, site, group |
| Repeat      | Recurring event settings  |

---

## 9. Badges

### 9.1 Badges Page
**URL:** `/badges/mybadges.php`

| Section         | Description         |
| --------------- | ------------------- |
| Earned badges   | All awarded badges  |
| Badge criteria  | How to earn         |
| Badge details   | Description, issuer |
| Badge sharing   | Export to backpack  |
| External badges | Imported badges     |

### 9.2 Badge Details
**URL:** `/badges/badge.php?hash={hash}`

| Element     | Description        |
| ----------- | ------------------ |
| Badge image | Badge graphic      |
| Name        | Badge title        |
| Description | What it represents |
| Criteria    | Requirements met   |
| Issue date  | When awarded       |
| Expiry      | If applicable      |
| Issuer      | Who issued         |
| Download    | Export badge       |

---

## 10. Reports

### 10.1 Activity Reports
**URL:** `/report/outline/index.php?id={courseid}`

| Report          | Description            |
| --------------- | ---------------------- |
| Outline report  | Activity views by item |
| Complete report | Detailed activity data |
| Statistics      | Site-wide statistics   |

### 10.2 Participation Reports
**URL:** `/report/participation/index.php?id={courseid}`

| Data      | Description           |
| --------- | --------------------- |
| Activity  | Selected activity     |
| Role      | Selected role         |
| Actions   | View/Post actions     |
| User list | Filtered participants |

### 10.3 Log Reports
**URL:** `/report/log/index.php?id={courseid}`

| Filter       | Description           |
| ------------ | --------------------- |
| Course       | Filter by course      |
| Participants | Filter by user        |
| Days         | Filter by date        |
| Activities   | Filter by activity    |
| Actions      | Filter by action type |

### 10.4 Live Logs
**URL:** `/report/loglive/index.php?id={courseid}`

| Column        | Description          |
| ------------- | -------------------- |
| Time          | Event timestamp      |
| User          | Who performed action |
| Affected user | Target user          |
| Context       | Where it happened    |
| Component     | System component     |
| Event name    | What happened        |
| Description   | Event details        |
| Origin        | Web, CLI, WS         |
| IP address    | Source IP            |

### 10.5 Competency Breakdown
**URL:** `/report/competency/index.php?id={courseid}`

| Data       | Description         |
| ---------- | ------------------- |
| Competency | Competency name     |
| Rating     | Student rating      |
| Rated by   | Who rated           |
| Evidence   | Supporting evidence |

---

## 11. Site Administration

### 11.1 Admin Dashboard
**URL:** `/admin/index.php`

| Section           | Description             |
| ----------------- | ----------------------- |
| Site registration | Moodle.org registration |
| Notifications     | Important updates       |
| Security issues   | Security warnings       |
| Environment       | System requirements     |
| Available updates | Plugin updates          |

### 11.2 Admin Navigation Categories

#### General
| Page             | URL                      | Description           |
| ---------------- | ------------------------ | --------------------- |
| Site information | `/admin/index.php`       | Version, registration |
| Notifications    | `/admin/index.php`       | Update notifications  |
| Environment      | `/admin/environment.php` | System requirements   |
| PHP info         | `/admin/phpinfo.php`     | PHP configuration     |

#### Users
| Page                 | URL                                        | Description       |
| -------------------- | ------------------------------------------ | ----------------- |
| Browse list of users | `/admin/user.php`                          | User management   |
| Add new user         | `/admin/user/editadvanced.php`             | Create user       |
| Bulk user actions    | `/admin/user/user_bulk.php`                | Mass operations   |
| User policies        | `/admin/settings.php?section=userpolicies` | User settings     |
| Cohorts              | `/cohort/index.php`                        | Cohort management |
| Upload users         | `/admin/tool/uploaduser/index.php`         | CSV import        |
| Upload user pictures | `/admin/tool/uploaduser/picture.php`       | Bulk pictures     |

#### Courses
| Page                    | URL                                          | Description           |
| ----------------------- | -------------------------------------------- | --------------------- |
| Manage courses          | `/course/management.php`                     | Course/category admin |
| Add category            | `/course/editcategory.php`                   | Create category       |
| Add course              | `/course/edit.php`                           | Create course         |
| Restore course          | `/backup/restorefile.php`                    | Restore backup        |
| Course default settings | `/admin/settings.php?section=coursesettings` | Defaults              |

#### Grades
| Page             | URL                                          | Description       |
| ---------------- | -------------------------------------------- | ----------------- |
| Grade settings   | `/admin/settings.php?section=gradessettings` | Grade config      |
| Grade letters    | `/admin/settings.php?section=gradeletters`   | Letter grades     |
| Grade categories | `/grade/edit/tree/index.php`                 | Category setup    |
| Scales           | `/grade/edit/scale/index.php`                | Custom scales     |
| Outcomes         | `/grade/edit/outcome/index.php`              | Learning outcomes |

#### Badges
| Page           | URL                                         | Description  |
| -------------- | ------------------------------------------- | ------------ |
| Badge settings | `/admin/settings.php?section=badgesettings` | Badge config |
| Manage badges  | `/badges/index.php?type=1`                  | Site badges  |
| Add badge      | `/badges/newbadge.php?type=1`               | Create badge |

#### Competencies
| Page                    | URL                                       | Description    |
| ----------------------- | ----------------------------------------- | -------------- |
| Competency frameworks   | `/admin/tool/lp/competencyframeworks.php` | Frameworks     |
| Learning plan templates | `/admin/tool/lp/learningplans.php`        | Plan templates |

#### H5P
| Page                 | URL                                       | Description   |
| -------------------- | ----------------------------------------- | ------------- |
| H5P settings         | `/admin/settings.php?section=h5psettings` | H5P config    |
| Manage content types | `/h5p/typesettings.php`                   | Content types |

#### Analytics
| Page               | URL                                             | Description |
| ------------------ | ----------------------------------------------- | ----------- |
| Analytics models   | `/admin/tool/analytics/index.php`               | ML models   |
| Analytics settings | `/admin/settings.php?section=analyticssettings` | Config      |

#### Location
| Page              | URL                                            | Description  |
| ----------------- | ---------------------------------------------- | ------------ |
| Location settings | `/admin/settings.php?section=locationsettings` | Timezone, IP |

#### Language
| Page                   | URL                                        | Description       |
| ---------------------- | ------------------------------------------ | ----------------- |
| Language settings      | `/admin/settings.php?section=langsettings` | Language config   |
| Language packs         | `/admin/tool/langimport/index.php`         | Install languages |
| Language customization | `/admin/tool/customlang/index.php`         | String editing    |

#### Plugins
| Page                | URL                                               | Description         |
| ------------------- | ------------------------------------------------- | ------------------- |
| Plugin overview     | `/admin/plugins.php`                              | All plugins         |
| Install plugins     | `/admin/tool/installaddon/index.php`              | Add plugins         |
| Web services        | `/admin/settings.php?section=webservicesoverview` | API config          |
| Manage protocols    | `/admin/settings.php?section=webserviceprotocols` | REST, XML-RPC       |
| External services   | `/admin/settings.php?section=externalservices`    | Service definitions |
| Manage tokens       | `/admin/webservice/tokens.php`                    | API tokens          |
| Activity modules    | `/admin/modules.php`                              | Module settings     |
| Blocks              | `/admin/blocks.php`                               | Block settings      |
| Text editors        | `/admin/settings.php?section=editorsettings`      | Editor config       |
| Question behaviours | `/admin/qbehaviours.php`                          | Behaviours          |
| Question types      | `/admin/qtypes.php`                               | Question types      |

#### Security
| Page          | URL                                                 | Description       |
| ------------- | --------------------------------------------------- | ----------------- |
| IP blocker    | `/admin/settings.php?section=ipblocker`             | IP restrictions   |
| Site policies | `/admin/settings.php?section=sitepolicies`          | Security policies |
| HTTP security | `/admin/settings.php?section=httpsecurity`          | HTTPS config      |
| Notifications | `/admin/settings.php?section=securitynotifications` | Security alerts   |

#### Appearance
| Page                | URL                                             | Description       |
| ------------------- | ----------------------------------------------- | ----------------- |
| Theme selector      | `/theme/index.php`                              | Choose theme      |
| Theme settings      | `/admin/settings.php?section=themesettingboost` | Theme config      |
| Calendar            | `/admin/settings.php?section=calendar`          | Calendar settings |
| Blog                | `/admin/settings.php?section=blogsettings`      | Blog config       |
| Navigation          | `/admin/settings.php?section=navigation`        | Navigation config |
| Courses             | `/admin/settings.php?section=coursecontact`     | Course display    |
| Ajax and Javascript | `/admin/settings.php?section=ajax`              | JS settings       |
| Manage tags         | `/admin/settings.php?section=tagsettings`       | Tag config        |

#### Server
| Page                 | URL                                               | Description  |
| -------------------- | ------------------------------------------------- | ------------ |
| System paths         | `/admin/settings.php?section=systempaths`         | File paths   |
| Support contact      | `/admin/settings.php?section=supportcontact`      | Support info |
| Session handling     | `/admin/settings.php?section=sessionhandling`     | Sessions     |
| Performance          | `/admin/settings.php?section=performance`         | Performance  |
| Update notifications | `/admin/settings.php?section=updatenotifications` | Updates      |
| Outgoing mail        | `/admin/settings.php?section=outgoingmailconfig`  | Email (SMTP) |
| Environment          | `/admin/environment.php`                          | Requirements |
| PHP info             | `/admin/phpinfo.php`                              | PHP details  |
| Test outgoing mail   | `/admin/testoutgoingmailconf.php`                 | Email test   |
| Scheduled tasks      | `/admin/tool/task/scheduledtasks.php`             | Cron tasks   |
| Task logs            | `/admin/tool/task/tasklogs.php`                   | Task history |

#### Reports
| Page           | URL                                 | Description    |
| -------------- | ----------------------------------- | -------------- |
| Comments       | `/admin/comments.php`               | All comments   |
| Backups        | `/report/backups/index.php`         | Backup logs    |
| Config changes | `/report/configlog/index.php`       | Config history |
| Logs           | `/report/log/index.php`             | System logs    |
| Live logs      | `/report/loglive/index.php`         | Real-time logs |
| Spam cleaner   | `/admin/tool/spamcleaner/index.php` | Spam removal   |
| Events list    | `/report/eventlist/index.php`       | All events     |

#### Development
| Page                    | URL                                     | Description  |
| ----------------------- | --------------------------------------- | ------------ |
| Debugging               | `/admin/settings.php?section=debugging` | Debug mode   |
| Web service test client | `/admin/webservice/testclient.php`      | API testing  |
| Purge caches            | `/admin/purgecaches.php`                | Clear cache  |
| Make test course        | `/admin/tool/generator/index.php`       | Test content |

---

## 12. Mobile App Pages

### 12.1 Mobile App Features

| Feature        | Description                |
| -------------- | -------------------------- |
| Dashboard      | Mobile dashboard view      |
| Courses        | Course list and navigation |
| Calendar       | Event viewing              |
| Messages       | Messaging interface        |
| Notifications  | Push notifications         |
| Offline access | Downloaded content         |
| File upload    | Camera/file upload         |
| QR login       | Login via QR code          |

### 12.2 Mobile-Specific Settings
**URL:** `/admin/settings.php?section=mabortilesettings`

| Setting              | Description         |
| -------------------- | ------------------- |
| Enable web services  | Required for mobile |
| Enable mobile access | Allow mobile app    |
| Force language       | Mobile language     |
| Type of login        | Username, QR, etc.  |
| Disabled features    | Features to hide    |

---

## 13. Block Types

| Block Name               | Description          |
| ------------------------ | -------------------- |
| Activities               | Course activity menu |
| Activity results         | Quiz results display |
| Admin bookmarks          | Admin page shortcuts |
| Blog menu                | Blog navigation      |
| Blog tags                | Blog tag cloud       |
| Calendar                 | Calendar block       |
| Comments                 | Allow comments       |
| Course completion status | Track completion     |
| Course/Site summary      | Description          |
| Courses                  | Course list          |
| Flickr                   | Flickr images        |
| Global search            | Site-wide search     |
| Glossary random          | Random entry         |
| HTML                     | Custom HTML          |
| Latest announcements     | Recent news          |
| Latest badges            | Recent badges        |
| Learning plans           | Competency plans     |
| Logged in user           | Current user info    |
| Login                    | Login form           |
| Main menu                | Site navigation      |
| Mentees                  | Mentee list          |
| My latest badges         | User's badges        |
| Navigation               | Site navigation      |
| Network servers          | MNet servers         |
| Online users             | Who's online         |
| Private files            | User files           |
| Quiz results             | Quiz statistics      |
| Recent activity          | Course changes       |
| Recent blog entries      | Blog posts           |
| Remote RSS feeds         | RSS display          |
| Search forums            | Forum search         |
| Section links            | Course sections      |
| Self completion          | Self mark complete   |
| Site pages               | Site navigation      |
| Social activities        | Social features      |
| Tags                     | Tag cloud            |
| Text                     | Text/media           |
| Timeline                 | Activity timeline    |
| Upcoming events          | Calendar events      |
| YouTube                  | YouTube video        |

---

## 14. URL Patterns Reference

### Core URLs

| Pattern                                    | Description      |
| ------------------------------------------ | ---------------- |
| `/`                                        | Site home        |
| `/my/`                                     | User dashboard   |
| `/login/`                                  | Login page       |
| `/user/profile.php?id={id}`                | User profile     |
| `/user/preferences.php`                    | User preferences |
| `/course/view.php?id={id}`                 | Course page      |
| `/mod/{modname}/view.php?id={cmid}`        | Activity view    |
| `/grade/report/{report}/index.php?id={id}` | Grade report     |
| `/message/index.php`                       | Messages         |
| `/calendar/view.php`                       | Calendar         |
| `/badges/mybadges.php`                     | My badges        |

### Admin URLs

| Pattern                                 | Description     |
| --------------------------------------- | --------------- |
| `/admin/index.php`                      | Admin dashboard |
| `/admin/settings.php?section={section}` | Settings page   |
| `/admin/user.php`                       | User management |
| `/admin/tool/{tool}/index.php`          | Admin tools     |
| `/report/{report}/index.php`            | Reports         |

### API URLs

| Pattern                         | Description       |
| ------------------------------- | ----------------- |
| `/webservice/rest/server.php`   | REST API endpoint |
| `/login/token.php`              | Token generation  |
| `/webservice/xmlrpc/server.php` | XML-RPC endpoint  |
| `/lib/ajax/service.php`         | AJAX service      |

---

## 15. Keyboard Shortcuts

### Navigation (Boost Theme)
| Shortcut  | Action              |
| --------- | ------------------- |
| `Alt + 1` | Site home           |
| `Alt + 2` | Dashboard           |
| `Alt + 3` | My courses          |
| `Alt + 6` | Administration      |
| `Alt + /` | Open course index   |
| `Esc`     | Close dialogs/menus |

### Text Editor (Atto)
| Shortcut           | Action         |
| ------------------ | -------------- |
| `Ctrl + B`         | Bold           |
| `Ctrl + I`         | Italic         |
| `Ctrl + U`         | Underline      |
| `Ctrl + Shift + 7` | Ordered list   |
| `Ctrl + Shift + 8` | Unordered list |
| `Ctrl + L`         | Insert link    |
| `Ctrl + Z`         | Undo           |
| `Ctrl + Y`         | Redo           |

---

## 16. Accessibility Features

| Feature             | Description             |
| ------------------- | ----------------------- |
| Skip links          | Skip to main content    |
| ARIA landmarks      | Page region labels      |
| Keyboard navigation | Full keyboard support   |
| Focus indicators    | Visible focus state     |
| Screen reader text  | Hidden descriptive text |
| High contrast       | Theme options           |
| Resizable text      | Text size controls      |
| Alt text            | Image descriptions      |
| Captions            | Video subtitles         |

---

## 17. Theme Customization Points

### Boost Theme Settings
**URL:** `/admin/settings.php?section=themesettingboost`

| Setting                | Description              |
| ---------------------- | ------------------------ |
| Brand color            | Primary accent color     |
| Preset                 | Color preset selection   |
| Raw initial SCSS       | Custom SCSS before theme |
| Raw SCSS               | Custom SCSS after theme  |
| Background image       | Login background         |
| Login background image | Login page background    |

### Custom CSS Injection
```php
// In theme settings or config.php
$THEME->csspostprocess = 'theme_boost_css_postprocess';
```

---

*Document generated for Moodle 4.5 - LMS Docker Complete Project*
