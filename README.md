# Easy MERN Auth 🛡️

A professional, full-stack authentication starter kit built with the MERN stack (MongoDB, Express, React, Node.js). This project provides a robust foundation for secure user management, featuring email verification and password recovery.

## 🚀 Features

-   **Full Authentication Workflow**: Secure registration, login, and logout.
-   **Email Verification**: OTP-based account verification via Nodemailer.
-   **Password Recovery**: Secure "Forgot Password" flow with email OTP and password reset.
-   **State Management**: Lightweight and fast global state handling with Zustand.
-   **Modern UI/UX**: Built with React, Vite, Tailwind CSS, and Shadcn UI for a polished, responsive interface.
-   **Security First**:
    -   Password hashing with `bcryptjs`.
    -   JWT-based authentication.
    -   Secure, HTTP-only cookie storage for tokens.
    -   Protected API routes and frontend navigation guards.

## 🛠️ Tech Stack

### Backend
-   **Node.js & Express**: Fast, unopinionated web framework.
-   **MongoDB & Mongoose**: Flexible NoSQL database with schema modeling.
-   **JWT (jsonwebtoken)**: Secure token-based authentication.
-   **Nodemailer**: For sending transactional emails.

### Frontend
-   **React (Vite)**: Modern frontend framework with fast HMR.
-   **Zustand**: Clean and scalable state management.
-   **Tailwind CSS**: Utility-first CSS framework for rapid styling.
-   **Shadcn UI**: High-quality, accessible UI components.
-   **Axios**: Promise-based HTTP client for the browser and Node.js.

## 📦 Getting Started

### Prerequisites
-   Node.js installed on your machine.
-   MongoDB Atlas account or local MongoDB instance.
-   SMTP credentials (e.g., Gmail, SendGrid, or Mailtrap) for email features.

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd Easy_MERN_Auth
```

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory and add the following:
```env
PORT=8282
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development

SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
SENDER_EMAIL=your_verified_sender_email
```
Start the server:
```bash
npm run server
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Start the development server:
```bash
npm run dev
```

## 📂 Project Structure

```text
Easy_MERN_Auth/
├── server/               # Node.js Express Backend
│   ├── config/           # Database & Mailer configurations
│   ├── controllers/      # Business logic
│   ├── middleware/       # Auth guards
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API endpoints
│   └── server.js         # Entry point
└── frontend/             # React Vite Frontend
    ├── src/
    │   ├── components/   # UI & Shared components
    │   ├── hooks/        # Custom React hooks
    │   ├── pages/        # Route-level components
    │   ├── store/        # Zustand state store
    │   └── lib/          # Utilities
    └── tailwind.config.js
```

## 📜 License

Copyright © 2026 **Rajjit Laishram**.

This project is licensed under the MIT License - see the LICENSE file for details.
