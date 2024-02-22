# Chat App

Welcome to the README file for your Chat App project developed using React Native and Expo.

## Project Overview

This project involves building a native mobile chat application with two screens: a start screen and a chat screen. The user enters their name on the start screen, selects a background color, and navigates to the chat screen. The chat screen displays the chosen background color and the user's name in the navigation bar.

## Prerequisites

Before you start, ensure that you have the following:

- Node.js installed (with a version not newer than 16.19.0). You can use nvm to manage Node.js versions.
- Expo CLI installed globally on your machine.
- Android Emulator set up (optional but recommended).

## Project Setup

1. Clone this repository to your local machine.

2. Navigate to the project directory in the terminal.

3. Install dependencies using:

   ```bash
   npm install
   ```

4. Create a new project using Expo:

   ```bash
   expo init Chat-App
   ```

5. Choose the "blank" template when prompted.

6. Move into the newly created project directory:

   ```bash
   cd Chat-App
   ```

7. Create a "components" folder in the project's root:

   ```bash
   mkdir components
   ```

8. Create two files inside the "components" folder: `Start.js` and `Chat.js`.

## Start Screen Implementation

1. Open `Start.js` and implement the start screen UI. Add a text input field and a button for entering the chat room. Use Flexbox for layout and apply the specified stylings. Utilize `ImageBackground` to set the background using the provided image.

2. Use `TouchableOpacity` components for color selection, creating circles with `borderRadius`. Implement fixed widths and heights for color display.

3. Install React Navigation:

   ```bash
   npm install @react-navigation/native @react-navigation/stack
   ```

4. Add the navigator to `App.js`.

5. Configure the button on the start screen to navigate to the chat screen.

## Chat Screen Implementation

1. Open `Chat.js` and create the chat screen layout. Display the user's name in the navigation bar.

2. Set the chat screen's background color based on the user's choice from the start screen.

3. Add navigation to the color selection, similar to the user's name.

## Testing

1. Set up an Android Emulator using Android Studio.

2. Run your app on the emulator:

   ```bash
   expo start --android
   ```

3. Test the functionality and UI on the Android Emulator.

4. Optionally, test your app on iOS Simulator using:

   ```bash
   expo start --ios
   ```

## Conclusion

Congratulations! You've successfully set up, developed, and tested the start screen of your Chat App using React Native and Expo.
