# MERN Live Chat Application

## Overview

A real-time chat application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js) and Socket.IO. The application allows users to register, log in, chat with other users in real time, view online users, and access previous conversation history.

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes

### Chat Features

* Real-Time Messaging using Socket.IO
* One-to-One Conversations
* Persistent Message Storage
* Conversation History
* Online User Tracking

### User Management

* User Search
* User List Display
* Secure User Authentication

### Security

* Password Hashing using bcryptjs
* JWT Token Verification
* Protected API Routes

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Socket.IO Client
* React Hot Toast
* CSS / Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.IO
* JWT
* bcryptjs

## Project Structure

Backend

```
backend/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── sockets/
├── server.js
└── package.json
```

Frontend

```
frontend/
├── src/
│   ├── pages/
│   ├── components/
│   ├── routes/
│   ├── context/
│   ├── services/
│   └── App.jsx
├── public/
└── package.json
```

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd live-chat-app
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=3001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run Backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3001/api
```

Run Frontend:

```bash
npm run dev
```

## API Endpoints

### Authentication

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register User |
| POST   | /api/auth/login    | Login User    |

### Users

| Method | Endpoint          | Description   |
| ------ | ----------------- | ------------- |
| GET    | /api/users        | Get All Users |
| GET    | /api/users/search | Search Users  |

### Conversations

| Method | Endpoint                  | Description         |
| ------ | ------------------------- | ------------------- |
| POST   | /api/conversation         | Create Conversation |
| GET    | /api/conversation/:userId | Get Conversation    |

### Messages

| Method | Endpoint                      | Description  |
| ------ | ----------------------------- | ------------ |
| POST   | /api/messages                 | Send Message |
| GET    | /api/messages/:conversationId | Get Messages |

## Future Enhancements

* Typing Indicators
* Profile Picture Upload
* Read Receipts
* Last Seen Status
* Image Sharing
* Group Chats
* Push Notifications
* Dark Mode

## Learning Outcomes

Through this project, the following concepts were implemented:

* MERN Stack Development
* REST API Design
* JWT Authentication
* MongoDB Relationships
* Socket.IO Real-Time Communication
* React Hooks
* Protected Routes
* State Management
* Deployment Workflow

## Author

Maha Raj

Aspiring Full Stack MERN Developer
