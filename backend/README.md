# 🧠 Psychology Website - Backend

This is the backend server for the Psychology Website, built with **Node.js, Express, and MongoDB**.

## 🚀 How to run

```bash
cd backend
npm install
npm start
```

## 🚀 Backend Setup

The backend runs at:  
👉 **http://localhost:8080**

---

## ⚙️ Environment Variables

All required environment variables are documented in the `.env.sample` file.  

Copy the example environment file and create your own `.env`:

### 🖥️ macOS / Linux
```bash
cp .env.sample .env
```
### 🪟 Windows (PowerShell)
```bash
Copy-Item .env.sample .env
```

Then open the newly created `.env` file and fill in your own values (e.g., database URI, JWT secrets, API keys, etc.).

## 🧱 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **Multer** – for file uploads
- **Google reCAPTCHA + Forms**
