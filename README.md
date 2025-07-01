# React Native Mobile Chat App
<img width="357" alt="Screenshot 2024-05-16 at 09 40 25" src="https://github.com/darunbjork/chat-app/assets/139690402/28f3a327-ed4b-4dc4-b82e-3824dcd1f93a">
<img width="363" alt="Screenshot 2024-05-16 at 09 39 45" src="https://github.com/darunbjork/chat-app/assets/139690402/352a30f0-2a89-496b-a1f7-e1e908c8e199">
![Simulator Screenshot - iPhone 15 - 2024-05-18 at 14 33 14](https://github.com/darunbjork/chat-app/assets/139690402/12d88066-8e0e-4d3f-81b9-c21a3b6cf4f3)

## Objective

Build a chat app for mobile devices using React Native, providing users with a chat interface and options to share images and their location.

## Features

- **User Stories**
  - Enter a chat room easily
  - Send messages
  - Send images
  - Share location
  - Read messages offline
  - Screen reader compatibility

- **Key Features**
  - Enter name and choose background color
  - Conversation screen with input field and submit button
  - Send images and location data
  - Store data online and offline

## Technical Requirements

- Written in React Native
- Developed using Expo
- Styled according to provided designs
- Store conversations in Google Firestore Database
- Anonymous authentication via Google Firebase
- Store chats locally using AsyncStorage
- Send images from the phone’s library or camera
- Store images in Firebase Cloud Storage
- Send location data via the chat in a map view
- Chat interface and functionality using the Gifted Chat library

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/chat-app.git
   cd chat-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new project in the Firebase Console.
   - Enable Firestore Database and Cloud Storage.
   - Replace the `firebaseConfig` in `App.js` with your project's configuration.

4. **Start the project**
   ```bash
   npx expo start
   ```

Usage

Open the app:

Scan the QR code with your Expo Go app (iOS and Android).
Join a chat:

Enter your name, choose a background color, and tap "Go to Chat".
Chat features:

Send messages, images, and location data.
Code Structure

App.js:
Initializes Firebase and sets up navigation.
Start.js:
Start screen for entering name and choosing background color.
Chat.js:
Main chat screen with message functionalities, image, and location sharing.
Key Libraries

React Native
Expo
Firebase
Gifted Chat
AsyncStorage
