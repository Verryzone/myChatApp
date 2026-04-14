# myChatApp

A real-time mobile chat application built with React Native, Expo, Supabase, and Stream Chat.

## Overview

myChatApp is a cross-platform (iOS, Android, Web) messaging application that allows users to sign up, manage their profiles, browse other users, and engage in real-time one-on-one conversations. It leverages **Supabase** for authentication and user data, and **Stream Chat** for the real-time messaging infrastructure.

## Features

- **Email Authentication** — Sign up and sign in with email and password via Supabase Auth, with automatic session refresh.
- **User Profiles** — View and edit your profile including full name, username, website, and avatar.
- **Avatar Upload** — Pick an image from your device gallery, crop it, and upload it to Supabase Storage.
- **User Discovery** — Browse a list of all registered users and start a conversation with any of them.
- **Real-Time Messaging** — Send and receive messages instantly using Stream Chat, with full channel support.
- **Channel List** — See all your active conversations at a glance on the main screen.
- **Tab Navigation** — Easily switch between the Chats and Profile tabs.

## Tech Stack

| Layer            | Technology                        |
| ---------------- | --------------------------------- |
| Framework        | React Native + Expo (SDK 51)      |
| Language         | TypeScript                        |
| Routing          | Expo Router (file-based routing)  |
| Authentication   | Supabase Auth                     |
| Database         | Supabase (PostgreSQL)             |
| File Storage     | Supabase Storage                  |
| Real-Time Chat   | Stream Chat (stream-chat-expo)    |
| UI Components    | React Native Elements (@rneui)    |
| State Management | React Context API                 |
| Animations       | React Native Reanimated           |

## Project Structure

```
myChatApp/
├── assets/                  # App icons, splash screen, and static images
├── src/
│   ├── app/                 # Expo Router file-based routes
│   │   ├── _layout.tsx      # Root layout (GestureHandler + AuthProvider)
│   │   ├── index.tsx        # Entry redirect to login
│   │   ├── (auth)/
│   │   │   └── login.tsx    # Login / Sign-up screen
│   │   └── (home)/
│   │       ├── _layout.tsx  # Home layout (auth guard + ChatProvider)
│   │       ├── users.tsx    # User discovery screen
│   │       ├── (tabs)/
│   │       │   ├── index.tsx    # Channel list (Chats tab)
│   │       │   └── profile.tsx  # Profile management (Profile tab)
│   │       └── channel/
│   │           └── [cid].tsx    # Individual chat channel screen
│   ├── component/
│   │   ├── Avatar.tsx       # Avatar display and upload component
│   │   └── UserListItem.tsx # Pressable user row (starts a DM channel)
│   ├── lib/
│   │   └── supabase.ts      # Supabase client initialization
│   └── provider/
│       ├── AuthProvider.tsx  # Auth context (session, user, profile)
│       └── ChatProvider.tsx  # Stream Chat client connection
├── supabase/
│   └── migrations/          # Database migration files
├── app.json                 # Expo configuration
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── babel.config.js          # Babel configuration
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- A [Supabase](https://supabase.com/) project
- A [Stream Chat](https://getstream.io/chat/) account and API key

### Environment Variables

Create a `.env` file in the project root with the following keys:

```env
EXPO_PUBLIC_SUPABASE_URL=<your-supabase-url>
EXPO_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
EXPO_PUBLIC_STREAM_API_KEY=<your-stream-chat-api-key>
```

### Installation

```bash
# Install dependencies
npm install

# Start the Expo development server
npm start
```

### Running on a Device or Emulator

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## Database

The app uses a Supabase PostgreSQL database with a `profiles` table that stores user information (username, full name, website, avatar URL). Database migrations are located in `supabase/migrations/`.

## License

This project is private and not currently published under an open-source license.
