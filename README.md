# VibeList - Final Project Report

## Team Information
- **Bisman Sawhney**
  - Student Number: 1005730755
  - Email: bisman.sawhney@mail.utoronto.ca
- **Dhruvi Patel**
  - Student Number: 1006310939
  - Email: dhruviii.patel@mail.utoronto.ca

## Demo Video
Google Drive Link: https://drive.google.com/file/d/1EoYJAfA18894NgFDslMgdUwbJbcpLMkm/view?usp=sharing

## Motivation
Everyone has had that moment: finding out about an amazing concert, festival, pop-up market, or workshop only after it's already over and wishing they had known sooner. In cities like Toronto and Vancouver, incredible events take place every single day, yet most people discover them completely by chance, whether through a friend's Instagram story, a random poster on the street, or endless scrolling across scattered websites and apps. Too many listings are outdated, incomplete, or buried.

Even when someone does find an event they really want to attend, there is rarely an easy way to save it, get reminded as the date approaches, or quickly share it with friends. As a result, people constantly miss out or waste hours jumping between different platforms just to stay in the loop.

This frustration happened to us repeatedly, and we knew it affected many others as well. Our target audience includes students, young professionals, event enthusiasts, and anyone living in or visiting Toronto and Vancouver who wants to make the most of their city without the stress of constant searching.

That's why we built VibeList. Built with React Native, Expo, Firebase, and Expo Notifications, it is one clean, reliable app that solves the problem from start to finish: instantly see what's happening in your city, save the events you care about, get automatic reminders so you never forget, and share them with friends in a single tap, all in one place with no extra hassle.

## Objective
The objective of this project was to design and fully implement VibeList, a polished, production-ready, cross-platform mobile application that serves as a complete personal event discovery and management hub for users in Toronto and Vancouver. By combining Expo Router, Redux Toolkit with AsyncStorage, Firebase Authentication and Firestore, and Expo Notifications, all built on React Native, Expo, and TypeScript, our objective was to create a reliable, real-world-ready app. We aimed to ensure that it fully satisfies every core and advanced requirement of the course while giving users a simple, enjoyable, and seamless way to discover, save, get reminded about, book, and share the events they care about.

Through this implementation, we specifically aimed to:
- Deliver a secure, email-based authentication system using Google Firebase Authentication, including sign-up with email verification, login, password reset, full profile editing, and safe account deletion.
- Create a clean, modern, tab-based interface (Home, Favourites, and Profile) powered by Expo Router with file-based routing and fully typed routes for smooth, type-safe navigation.
- Enable persistent sessions to ensure the user remains logged in, and allow users to select from light/dark themes while retaining these preferences using Redux Toolkit combined with AsyncStorage.
- Enable seamless saving and unsaving of events, with all saved events instantly managed in the dedicated Favourites tab and persisted across app restarts using Redux Toolkit combined with AsyncStorage.
- Provide real-time, location-specific event listings by fetching dynamic data from Google Firebase Firestore, instantly refreshing the feed when the user switches between Toronto and Vancouver.
- Implement an intelligent local notification system with Expo Notifications that instantly confirms when an event is saved and automatically schedules three timed reminders (3 days, 1 day, and 1 hour before each saved event), cancelling them automatically when an event is removed from favourites.
- Offer rich, distraction-free event detail screens with one-tap links to official ticketing websites (ex. Ticketmaster.ca) and native social sharing that works perfectly for both app users and non-users.
- Deploy a fully testable, production-ready Android build using Expo EAS Build.

## Technical Stack
VibeList was developed using React Native with Expo and written entirely in TypeScript to ensure full type safety across the application. Navigation is handled by Expo Router, which provides a file-based routing system with typed routes, dynamic segments, and layout files for a clean and modern navigation experience.

Global state management and persistence are powered by Redux Toolkit combined with AsyncStorage. Redux Toolkit manages authentication state, user preferences, saved events, selected city, and theme choice, while AsyncStorage persists this data locally so that saved events, theme settings, and city selection remain intact across app restarts.

Authentication is implemented using Google Firebase Authentication with email/password sign-up, mandatory email verification, secure password resets, and persistent login sessions that keep users signed in until they explicitly log out. Dynamic, real-time event data for both Toronto and Vancouver is stored and delivered through Google Firebase Firestore, enabling instant updates whenever the data changes.

Local notifications are fully driven by Expo Notifications. An immediate "Event Saved" notification appears when the user bookmarks an event, and three scheduled reminders (3 days, 1 day, and 1 hour before each saved event) are automatically created and cancelled as needed.

Social sharing is implemented with Expo Sharing to open the native share sheet with pre-filled event details.

The app supports a light/dark theme toggle that is saved locally via Redux and AsyncStorage as well. Finally, the production build was created using Expo EAS Build, resulting in a fully testable Android APK ready for distribution.

This complete stack: React Native + Expo, TypeScript, Expo Router, Redux Toolkit + AsyncStorage, Firebase Authentication and Firestore, and Expo Notifications, enabled us to build a fast, reliable, and fully featured application.

## Features
VibeList delivers a complete, polished set of features that together provide a seamless event-discovery and personal-management experience while fully satisfying every core and advanced requirement of the course project.

Users begin by signing up with their first name, last name, gender, email address, and password. Right after completing the sign-up form, an email verification link is sent instantly. The account remains inactive until the user clicks that link and verifies their email; only then does the account become fully activated. Once verified, users can log in at any time with their chosen credentials. A "Forgot Password" option on the login screen sends a secure reset link, and after the password is changed the old one is no longer accepted. This entire authentication flow is powered by Firebase Authentication and fulfills the advanced User Authentication requirement.

After a successful login, users land directly in the main tab interface with three bottom tabs: Home, Favourites, and Profile. The whole navigation system is built with Expo Router using file-based routing and fully typed dynamic routes, which satisfies the core navigation requirement.

The Home tab presents a scrollable list of upcoming events fetched in real time from Firebase Firestore. A city selector at the very top lets users switch between Toronto and Vancouver with a single tap, instantly refreshing the entire list to show only events in the selected city. Each event card displays the event name, pricing, date and time, location, and a thumbnail image. Users can press the "Save" button directly from the Home tab. This live backend integration meets the core requirement of fetching and displaying dynamic data from an external source.

Every saved event is automatically added to the Favourites tab, which serves as the user's personal collection of events they care about. Users can unsave an event at any time by tapping the "Saved" button again on either the Home or Favourites tab, and the event is removed instantly. All saved events are persisted across app restarts using Redux Toolkit combined with AsyncStorage, fully satisfying the core state management and persistence requirements.

Tapping any event card, whether from the Home or Favourites tab and regardless of saved status, opens a full-screen Event Details view dedicated to that single event. This screen provides a rich, distraction-free experience with the complete description, exact date and time, venue address, ticket price breakdown, high-quality images, and any additional available information. Two prominent buttons appear: "Check Out Event" opens the official ticketing website (ex. Ticketmaster.ca) directly in the phone's browser so users can purchase tickets immediately, and the upward-arrow button triggers the device's native share sheet using Expo Sharing. When sharing, a clean, concise message is generated that includes the event title, date, time, location, and direct ticket link. The message is deliberately kept simple so recipients can understand the event at a glance without needing the app or an account. This satisfies the advanced Social Sharing requirement.

The moment a user saves an event, two things happen instantly: a local notification appears saying "Event Saved!" along with the event name for immediate confirmation, and three timed reminders are automatically scheduled using Expo Notifications: one 3 days before, one 1 day before, and one 1 hour before the event starts. Each reminder reads "Event Happening Soon!" followed by the event name and the exact countdown. When an event is unsaved, all three scheduled reminders are cancelled automatically. This fully satisfies the core Notifications requirement. Since this was not shown in the demo video, example screenshots have been provided below to show this feature in action.

| Notification Image 1 | Notification Image 2 |
|----------------|----------------|
| ![Notif 1](/report_Images/Notif_image_1.png) | ![Notif 2](/report_Images/Notif_image_2.png) |

The Profile tab gives users complete control over their personal information and preferences. They can view and edit their first name, last name, and gender. The email address cannot be changed because it is permanently tied to account verification and security. Users can toggle the entire app between Light and Dark themes; by default the app opens in Light Theme, but enabling the Dark Theme toggle instantly applies a sleek dark colour scheme throughout the application, and disabling it reverts everything to the original light appearance. This preference is saved and remembered across sessions using Redux + AsyncStorage. Users can also change their password at any time by entering their current password and confirming the new one twice, log out with a dedicated button, or permanently delete their account after confirming through a serious dialog that explains the action cannot be undone.

Throughout the entire time the user is logged in, their authenticated session (handled by Firebase Authentication) and all local preferences (theme, city choice, and saved events) are preserved. As long as they have not manually logged out, every time they open the app, even after fully closing it or restarting the phone, they are taken straight to the Home tab with their chosen city and full event list ready to go.

Finally, the application was built and deployed as a production-ready Android APK using Expo EAS Build, completing the last core deployment requirement.

All of these features together (secure Firebase Authentication as the advanced authentication feature, Expo Sharing as the advanced social-sharing feature, Expo Router navigation, Redux + AsyncStorage state management and persistence, real-time Firestore data, multi-stage Expo Notifications, and EAS deployment) fulfill every mandatory core technical requirement and both selected advanced features while fully achieving our original objective: a single, reliable, and enjoyable mobile app that lets users in Toronto and Vancouver effortlessly discover, save, get reminded about, book, and share the events they care about.

## User Guide

### 1. Launching the App
1. Open the VibeList app on your device.
2. On first launch, you will be prompted to create an account or log in.

### 2. Authentication

#### Sign Up
1. Tap **Sign Up**.
2. Enter:
   - First Name
   - Last Name
   - Gender
   - Email
   - Password
3. Tap **Sign Up** to create your account.
4. Verify your email using the link sent to your inbox.

#### Log In
1. Enter your registered email and password.
2. Tap **Log In** to access the app.

#### Forgot Password
1. On the login screen, tap **Forgot Password**.
2. Enter your email address.
3. Check your email for a password reset link.

### 3. Home Screen (Discover Events)
The Home screen displays all events available in the user's selected city.

**Key sections:**
- Location Selector – choose Toronto or Vancouver
- Discover Header
- Scrollable list of event cards

#### 3.1 Selecting a City
1. Tap the location box at the top.
2. A modal appears with two cities:
   - Toronto
   - Vancouver
3. Tap a city to switch the event feed instantly.
4. Your city preference is saved automatically for future sessions.

#### 3.2 Browsing Events
Each event is displayed as a card showing:
- Event image
- Title
- Venue
- Date
- Price
- Time
- "Save" button

Tap any card to open **Event Details**.

#### 3.3 Saving an Event
Every event has a Save button.

**To Save an Event:**
1. Tap **Save**.
2. The button changes to **Saved**.
3. The event is added to your Favourites.
4. A local "Event Saved!" notification appears.
5. Three reminder notifications are scheduled.

**To Unsave:**
1. Tap **Saved** again.
2. The event is removed from Favourites.
3. All scheduled reminders are cancelled.

### 4. Event Details Page
Tap any event to open its full details.

The Event Details screen shows:
- Large banner image
- Event title
- Venue and date
- Price and time
- Full description
- "Check Out Event" button (opens external link)
- Share button
- Floating Save Button (same functionality as the card)

#### 4.1 External Event Link
If an event includes an external link:
1. Tap **Check Out Event**
2. Your browser opens the event website (e.g., ticket page)

#### 4.2 Sharing an Event
1. Tap the share icon (⤴) to open the native share sheet.
2. The message includes:
   - Event name
   - Venue
   - Date/time
   - Ticket link

#### 4.3 Save to Favourites (Floating Button)
A floating button at the bottom allows saving/unsaving the event.

### 5. Favourites Screen
This screen shows all events the user has saved.

There are two states:

#### 5.1 Empty State
If no events are saved, users see:
- Empty illustration
- Encouraging text
- "Explore Events" button (redirects to Home)

#### 5.2 Saved Events
If events are saved:
- They appear in a scrollable list
- Each item uses the same card design as the Home screen
- Events update automatically when the user adds/removes favourites
- Tap any event to open Event Details

### 6. Profile Screen
The Profile screen lets users manage personal details and app preferences.

It contains:
- User avatar
- Display name
- Editable personal information
- Dark Mode toggle
- Password change section
- Logout
- Delete account

#### 6.1 Editing Profile Information
1. Tap **Edit Profile**.
2. Fields become editable:
   - First name
   - Last name
   - Gender
3. Tap **Save Changes**.

#### 6.2 Changing Password
1. Tap **Change Password**.
2. Enter:
   - Current password
   - New password
   - Confirm new password
3. Tap **Update Password**.

#### 6.3 Theme (Dark / Light Mode)
1. Toggle **Dark Theme** switch.
2. The entire app UI updates instantly.
3. Preference is saved for future launches.

#### 6.4 Logging Out
1. Tap **Logout**.
2. You are returned to the login screen.

#### 6.5 Delete Account
1. Tap **Delete Account**.
2. Read the confirmation dialog carefully.
3. Tap **Confirm** to permanently delete:
   - Firebase user account
   - Firestore profile document
   - All user data

**Warning:** This action cannot be undone.

### 7. Navigation Bar (Tabs)
The bottom tab bar provides access to:
- **Home** – Discover events
- **Favourites** – Saved events
- **Profile** – Account settings

The bar updates visually with theme changes.

### 8. Notifications (If Enabled)
1. When you save an event:
   - An immediate "Event Saved!" notification appears.
   - Three timed reminders are scheduled (3 days, 1 day, 1 hour before).
2. When you unsave an event:
   - All scheduled reminders are cancelled.
3. Permission is requested automatically when required.

## Development Guide

### 1. Prerequisites
Install the following tools:
- **Node.js** – Download from the official Node.js site
- **npm** – Comes with Node.js
- **Git**
- **Expo account** (for builds and device testing)
- At least one of:
  - Android Studio (Android emulator)
  - Or a physical device with Expo Go installed

### 2. Clone the project:
```bash
git clone <repo-url>
cd vibelist
```

### 3. Install Dependencies
```
npm install
```
You may encounter some dependencies not working, in which case you should use: ```npm install --legacy-peer-deps```.

**NOTE:** Ensure that the version of this dependency remains as this version exactly:
```json
"@react-native-async-storage/async-storage": "1.24.0"
```
This is due to a known Firebase and TypeScript issue, and upgrading it as Expo suggests tends to break functionality as some features are unsupported. **DO NOT UPGRADE THIS DEPENDENCY.**

### 4. Firebase Configuration
Make sure Firebase is configured correctly (only important if this needs to be changed). Update the Firebase configuration in the appropriate configuration files.

### 5. Start the app locally
```
npx expo start --go
```
(you can then press 'a' for opening the app on the android emulator or 'w' for opening it on your web browser)

### 6. Local Testing Notes

#### Auth & Profile:
- Sign up, log in, and forget password features work as expected (using Firebase Auth).
- Fields validation.
- Profile changes are synced via Firestore.

#### Events:
- Events are loaded from Firestore.

#### Location & Theme:
- City selection and dark theme preference are persisted via AsyncStorage.
- Changing location shows the correct location's events in the home page.
- Changing the theme should change the color theme for all pages (except the authentication pages).

#### Bookmarks & Notifications:
- Saving an event bookmarks it and will schedule local reminders via notifications (device permissions required).
- Saving an event will add the event to the 'Favorites' page.
- Favorite events are persisted.

## Deployment Information
**Expo EAS Build link (Android):** [https://expo.dev/accounts/bismanss/projects/vibelist/builds/e1533d5c-e5a6-40af-a123-63173d6badf6](https://expo.dev/accounts/bismanss/projects/vibelist/builds/e1533d5c-e5a6-40af-a123-63173d6badf6)

Feel free to access this via the 'Install' (QR) code method, or download the .APK directly.

## Individual Contributions
Bisman Sawhney and Dhruvi Patel worked as a team throughout the entire project, pairing on difficult problems, reviewing pull requests, and constantly supporting each other to deliver a polished, production-ready application.

**Bisman Sawhney** led the entire frontend architecture and user-experience design. He set up the React Native + Expo + TypeScript project from scratch, made the strategic decision to migrate to Expo Router (a significant upgrade from the originally planned React Navigation), and built the complete file-based routing system with fully typed dynamic routes and layouts. He designed and implemented the aesthetic, consistent UI for the Home, Event Details, Favourites, and Profile screens, created reusable components, added subtle animations and loading states, and crafted the light/dark theme system that is persisted across sessions. Bisman built the full Redux Toolkit store, integrated AsyncStorage persistence for saved events, theme preferences, and city selection, and implemented the smooth save/unsave logic with real-time updates across the app. He also took charge of the final production deployment, configuring and running Expo EAS Build multiple times to produce the polished, testable Android APK that is submitted with this project.

**Dhruvi Patel** led the entire backend architecture and all the advanced features, delivering implementations that form the backbone of the app. From scratch, she built the complete Google Firebase Authentication system, including email/password sign-up with mandatory field inputs, email verification, secure login/logout, password-reset flows via email links, persistent authenticated sessions across app restarts, in-app password changes, full profile editing, and irreversible account deletion with confirmation dialogs. She designed and secured the Google Firestore database (events and users collections) with proper rules, created and populated real-time collections for Toronto and Vancouver events, wrote optimized queries for city-specific feeds, and ensured instant updates whenever data changed. Dhruvi implemented the multi-stage Expo Notifications system. She implemented the local notification that is instant when an event is saved by the user ("Event Saved!" confirmation) and also the automatic scheduling, messaging, and cancellation of the three timed reminders, integrated native social sharing with Expo Sharing, and tied city switching directly to Firestore for seamless performance.

Despite these primary areas, collaboration was constant. GitHub history, commit volume, and pull-request activity show that both of us contributed a comparable, substantial amount of high-quality code and effort. The final application is the result of equal teamwork to meet the project requirements at a high standard.

## Lessons Learned and Concluding Remarks
This project taught us a great deal and gave us real confidence in building full mobile applications from scratch.

We learned that Firebase Authentication is flexible, but every flow (email verification, password reset, persistent sessions, account deletion) needs thorough testing across app restarts and edge cases. Getting all of it to work reliably took significant time and taught us a lot about secure user-state management.

Switching to Expo Router early was a good decision given the nature of our application. File-based routing with typed dynamic routes made navigation much cleaner and more maintainable than the original React Navigation plan, and it naturally enforced better folder structure.

Using Redux Toolkit with AsyncStorage persistence worked perfectly for our needs. It gave us predictable state, easy debugging, and reliable saving of events, theme choice, and city selection without adding unnecessary complexity.

Scheduling and cancelling multiple local notifications per event turned out to be more complex than expected. Handling date calculations, device restarts, background states, events that the user unsaved afterwards, and proper cleanup required careful attention, but the end result works exactly as intended.

We also discovered how valuable constant collaboration is. Pairing on tough problems and reviewing every pull request saved us hours and produced much higher-quality code.

In the end, VibeList turned out to be what we envisioned and will be an application that both of us will use. The combination of real-time events, dependable reminders, clean interface, and easy sharing genuinely solves the original problem of missing out on things happening in the city.

This was one of the most rewarding projects we have worked on, and we feel it gave us the strongest practical learning experience of the entire course. Thank you for the challenge.
