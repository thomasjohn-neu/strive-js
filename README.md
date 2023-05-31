
# Challenge Portal
 A platform designed to help you accomplish your study goals, maintain a healthy lifestyle, and stay motivated among your circle of friends or in private.

The idea behind the "Develop an Online Challenge Board" is to create a virtual platform where individuals can set and track their personal challenges and progress towards them, as well as invite friends to join and compete with each other. The platform would allow users to create and participate in a variety of challenges, such as fitness challenges, reading challenges, mindfulness challenges, or any other type of challenge that interests them.

The platform would work by allowing users to create their own challenges, set the rules and parameters, and invite friends to join in. Once the challenge is created, users can track their progress, update their status, and view the progress of others on a leaderboard. The platform could also incorporate social features like rewards as well.
This platform would provide a fun and motivating way for individuals to work towards their personal goals, while also fostering a sense of community and healthy competition with friends. Similar to fitness tracking apps.


# Setup instructions
Clone the project 
## backend
* `cd backend`
* `npm install`
* `npm start`
## frontend
* `cd frontend/strive`
* `npm install`
* `npm start`

## extension
* `cd react-chrome-app`
* `npm install`
* `npm run build`
* Open the chrome, open `manage extension`
* enable developer mode
* load unpacked, select the folder `extension` 


##  Team
* [Anirudh Voruganti](voruganti.a@northeastern.edu) - 001092732
* [Jayesh Khattar](khattar.j@northeastern.edu) - 001568947
* [Naina Rajan](rajan.nai@northeastern.edu) - 002922398
* [Thomas John](john.th@northeastern.edu) - 002933800

## Project Features(User Stories)
*  ### 1. User Authentication
    * 1.1 Login
    * 1.2 Signup
    * 1.3 Social Auth
*  ###  2. Splash Screen 
    * 2.1 About
    * 2.2 Features
*  ### 3. User Profile
    * 3.1 Edit Profile
    * 3.2 Password Recovery Mechanisms
    * 3.3 Notifications Preferences
*  ### 4. User Groups
    * 4.1 creating user Groups
    * 4.2 Group Rules/Limits 

*  ### 5. Static Template Design
    * 5.1 Creating HTML/SCSS for pages 
    * 5.2 Mock Screens 
 
*  ### 6. Challenges
    * 6.1 Challenge Creation(Study/Lifestyle/Health)
    * 6.2 Challenge Delete(Study/Lifestyle/Health)
    * 6.3 Challenge Update(Study/Lifestyle/Health)
    * 6.4 Challenge Group Mapping
    * 6.5 Challenge Privacy
 
*  ### 7. Challenge Activity Logging
    * 7.1 Challenge Log Addition(Study/Lifestyle/Health)
    * 7.2 Challenge Log Deletion(Study/Lifestyle/Health)
    * 7.3 Challenge Log Updation(Study/Lifestyle/Health)
    * 7.4 Challenge Log Listing(Study/Lifestyle/Health)

*  ### 8. Challenge Notification & Reminders
    * 8.1 Personal Reminders
    * 8.2 Group Reminders
    * 8.3 Notification Listing
    * 8.4 Email/SMS integrations
    * 8.5 Web Sockets

*  ### 9. Challenge Broadcast
    * 9.1 Creating broadcast posts
    * 9.2 Broadcasting posts

*  ### 10. Dashboard 
    * 10.1 Personal widgets (Graphs, Progress, Ongoing challenges)
    * 10.2 Community/Group widgets (Graphs, Progress, Ongoing challenges)
    * 10.3 Public Posts Widgets

*  ### 11. LeaderBoard / Rewards / Recognitions (Optional)
    * 11.1 LeaderBoard Computations and Listing
    * 11.2 Reward Points to Awards Computations

*  ### 12. Custom/ Extra Features (optional)
    *  12.1 Theme Preferences
    * 12.2 Voice to Text
    * 12.3 Real time health monitoring
    * 12.4 Chrome Extension

*  ### 13. Testing & Bug Fixes



## Milestones

* ### Milestone 1 - User Onboarding / Groups / Template Development
* #### Story 1 -  User Authentication - Naina & Anirudh
    * 1.1 Login
    * 1.2 Signup
    * 1.3 Social Auth
* #### Story 2 - Splash Screen  - Jayesh & Thomas
     * 2.1 About
     * 2.2 Features
* #### Story 3 - User Profile - Naina & Anirudh
    * 3.1 Edit Profile
    * 3.2 Password Recovery Mechanisms
    * 3.3 Notifications Preferences 
* #### Story 4 - User Groups - Thomas & Jayesh
     * 4.1 Creating user Groups
     * 4.2 Group Rules/Limits 
* #### Story 5 - Static Template Design - All
    * 5.1 Creating HTML/SCSS for pages 
    * 5.2 Mock Screens 
 

* ### Milestone 2 - Challenges / Challenge Activity
* #### Story 6 -  Challenges - Naina & Anirudh
    * 6.1 Challenge Creation(Study/Lifestyle/Health)
    * 6.2 Challenge Delete(Study/Lifestyle/Health)
    * 6.3 Challenge Update(Study/Lifestyle/Health)
    * 6.4 Challenge Group Mapping
    * 6.5 Challenge Privacy

* #### Story 7 - Challenge Activity Logging  - Jayesh & Thomas
    * 7.1 Challenge Log Addition(Study/Lifestyle/Health)
    * 7.2 Challenge Log Deletion(Study/Lifestyle/Health)
    * 7.3 Challenge Log Updation(Study/Lifestyle/Health)
    * 7.4 Challenge Log Listing(Study/Lifestyle/Health)

*  #### Story 10 - Dashboard - All  
    * 10.1 Personal widgets (Graphs, Progress, Ongoing challenges)
    * 10.2 Community/Group widgets (Graphs, Progress, Ongoing challenges)
    * 10.3 Public Posts Widgets


* ### Milestone 3 - Notifications / Reminders / Broadcast
* #### Story 8 - Challenge Notification & Reminders - Anirudh & Thomas
    * 8.1 Personal Reminders
    * 8.2 Group Reminders
    * 8.3 Notification Listing
    * 8.4 Email/SMS integrations
    * 8.5 Web Sockets
* #### Story 9 - Challenge Broadcast - Naina & Jayesh
    * 9.1 Creating broadcast posts
    * 9.2 Broadcasting posts

* ### Milestone 4 -  Testing / Optional Features
* #### Story 11 LeaderBoard / Rewards / Recognitions - Jayesh & Anirduh
    * 11.1 LeaderBoard Computations and Listing
    * 11.2 Reward Points to Awards Computations
* #### Story 12 - Challenge Broadcast - Thomas & Naina
    *  12.1 Theme Preferences
    * 12.2 Voice to Text
    * 12.3 Real time health monitoring
    * 12.4 Chrome Extension
* #### Story 13 - Testing & Bug Fixes - All


## Object Model
![object model](https://github.com/neu-mis-info-6150-spring-2023/final-project-group-team-ant/blob/main/Challenge%20-%20Object%20Model%20.jpg)

## Rest API Resources
* Social Auth - [Passport ](https://www.passportjs.org/docs/)
* Auth Token - [JWT](https://www.npmjs.com/package/jsonwebtoken)
* Speech to Text - [react-speech-recognition](https://www.npmjs.com/package/react-speech-recognition)
* Email/SMS Integrations - [Twilio](https://www.twilio.com/)
* Fitness Tracking - [Google Fit, ](https://www.google.com/fit/) [Apple](https://developer.apple.com/health-fitness/)
* Error Monitoring - [Sentry](https://docs.sentry.io/platforms/node/)


## OpenAPI Specification
[OpenAPI Yaml](https://github.com/neu-mis-info-6150-spring-2023/final-project-group-team-ant/blob/main/challengifyMe.yaml)


