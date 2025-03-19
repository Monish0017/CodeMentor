# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.



// Project - CodeMentor

# CodeMentor Mobile Application

## Overview
CodeMentor is an AI-powered coding interview preparation platform designed to help users simulate real interview scenarios. The application provides a comprehensive suite of features, including coding problems, mock interviews, and performance tracking, to assist students and professionals in acing their coding interviews.

## Features
- **AI-Generated Coding Problems**: Access a variety of coding challenges focused on algorithms and data structures.
- **Real-Time Feedback**: Receive instant feedback on code quality, efficiency, and correctness.
- **Mock Interviews**: Engage in simulated interviews with voice and text interaction.
- **Performance Tracking**: Monitor progress through detailed analytics and leaderboards.
- **Job Notifications**: Stay updated with job alerts from LinkedIn and other sources.

## Project Structure
The project is structured as follows:

```
codementor-mobile
├── app.json
├── App.js
├── babel.config.js
├── assets
│   ├── fonts
│   └── images
│       ├── logo.svg
│       ├── avatar-placeholder.png
│       └── icons
├── src
│   ├── api
│   │   ├── auth.js
│   │   ├── problems.js
│   │   ├── interviews.js
│   │   ├── stats.js
│   │   ├── news.js
│   │   └── index.js
│   ├── components
│   │   ├── common
│   │   │   ├── Button.js
│   │   │   ├── Card.js
│   │   │   ├── CodeEditor.js
│   │   │   ├── Loading.js
│   │   │   └── Header.js
│   │   ├── dashboard
│   │   │   ├── PerformanceChart.js
│   │   │   ├── ProblemStats.js
│   │   │   └── ProfileCard.js
│   │   ├── problems
│   │   │   ├── ProblemCard.js
│   │   │   ├── TestCaseRunner.js
│   │   │   └── CodeSubmission.js
│   │   ├── interview
│   │   │   ├── InterviewChat.js
│   │   │   ├── VoiceRecorder.js
│   │   │   └── FeedbackCard.js
│   │   └── notifications
│   │       ├── JobAlert.js
│   │       └── NotificationItem.js
│   ├── context
│   │   ├── AuthContext.js
│   │   └── ThemeContext.js
│   ├── hooks
│   │   ├── useAuth.js
│   │   └── useProblemSubmit.js
│   ├── navigation
│   │   ├── AppNavigator.js
│   │   ├── AuthNavigator.js
│   │   └── DrawerNavigator.js
│   ├── screens
│   │   ├── auth
│   │   │   ├── LoginScreen.js
│   │   │   └── RegisterScreen.js
│   │   ├── dashboard
│   │   │   └── DashboardScreen.js
│   │   ├── problems
│   │   │   ├── ProblemsListScreen.js
│   │   │   └── ProblemDetailScreen.js
│   │   ├── interview
│   │   │   ├── InterviewListScreen.js
│   │   │   └── InterviewSessionScreen.js
│   │   ├── leaderboard
│   │   │   └── LeaderboardScreen.js
│   │   └── notifications
│   │       └── NotificationScreen.js
│   ├── theme
│   │   ├── colors.js
│   │   ├── fonts.js
│   │   └── metrics.js
│   └── utils
│       ├── storage.js
│       └── formatters.js
├── package.json
└── README.md
```

## Getting Started
To get started with the CodeMentor mobile application, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/codementor-mobile.git
   cd codementor-mobile
   ```

2. **Install Dependencies**:
   Make sure you have Node.js installed, then run:
   ```bash
   npm install
   ```

3. **Run the Application**:
   Use Expo to run the application:
   ```bash
   expo start
   ```

4. **Open in Expo Go**:
   Scan the QR code with the Expo Go app on your mobile device to view the application.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Thanks to the open-source community for their contributions and support.
- Special thanks to the developers of Expo for providing a powerful framework for building mobile applications.

# Codementor Mobile App

A React Native mobile application for Codementor with job notifications and other features.

## Features

- Job notifications dashboard
- Interactive job listings
- LinkedIn-style notifications

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Run the application:
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```

## Project Structure

- `/src`: Source code
  - `/components`: Reusable components
  - `/screens`: Application screens
  - `/navigation`: Navigation configurations
  - `/services`: API and service integrations

## Technologies Used

- React Native
- JavaScript