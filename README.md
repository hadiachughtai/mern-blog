# MERN Blog — Full-Stack Blog Application

A full-stack blog application built as the Week 4 capstone project for the InternX Frontend Web Development internship. Users can register, log in, and create/edit/delete their own blog posts.

## Tech Stack

- **Frontend:** React (Vite), React Router, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT (JSON Web Tokens) + bcrypt password hashing

## Features

- User registration and login with hashed passwords
- JWT-based authentication
- Create, read, update, and delete blog posts (CRUD)
- Only the post author can edit or delete their own posts
- Responsive UI across mobile, tablet, and desktop

## Project Structure

```
mern-blog/
├── backend/          Express + MongoDB API
└── frontend/          React + Vite + Tailwind CSS app
```

## Running Locally

### 1. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file (copy from `.env.example`) and fill in:
```
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=any_random_secret_string
PORT=5000
```

Start the backend:
```bash
npm run dev
```

### 2. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

The app will run at `http://localhost:5173` and connect to the backend at `http://localhost:5000`.

## Deployment

- **Backend:** Deployed on Render (or similar Node.js hosting)
- **Frontend:** Deployed on Vercel
- **Database:** MongoDB Atlas (free tier)

## Author

Hadia Babar — BS Information Technology, University of Sialkot
