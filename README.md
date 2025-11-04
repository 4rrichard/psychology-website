# 🧠 Psychology Website

A full-stack web application built with **React** and **Node/Express**, using **MongoDB** for data storage.  
The project was created to be used in real life by a **clinical psychologist** (my partner), so the focus was on real-world features like appointment booking, form handling, and admin access.

---

## 📦 Project Structure
- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)

---

## 🎯 Motivation

I wanted to build something **useful and realistic**, not just a demo.  
This project simulates a real psychologist’s website where clients can:

-   browse information,
-   book an appointment,
-   fill in forms,
-   and the psychologist can manage bookings via an admin panel.

---

## 🧪 Challenges Solved

This project was **not** a simple CRUD. I specifically challenged myself with:

-   🔽 **Scroll to section** on button click
-   🧭 **Smooth navigation** across the website
-   📅 **Calendar creation via API** (appointments)
-   ⏱️ **Disabling time slots in real time** (if time has already passed)
-   ✅ **Disabling buttons after form submission** to prevent duplicates
-   📧 **Connecting form to Google Forms and sending e-mails**
-   👤 **Admin login page** with:
    -   JWT
    -   Cookies
    -   Protected routes
-   🖥️ **Full backend setup** (Express + MongoDB)
-   👩‍💻 **Built solo** (with mentor guidance)

---

## 💡 Soft Skills Gained

Working on this project helped me improve:

-   🕒 **Time management** – planning features and breaking them down
-   🧩 **Problem solving** – finding solutions for real-life UI/UX needs
-   💪 **Persistence** – continuing even when stuck for a long time
-   🗣️ **Asking for help** – learning to consult mentor / docs
-   🤓 **Enjoying learning** – discovering new tools and patterns

---

## 🛠️ Hard Skills Practiced

-   🌐 **API calls with Axios**
-   🖥️ **Backend with Express.js**
-   🗄️ **MongoDB** for storing appointments and form data
-   🍪 **Auth & persistence** with **JWT, cookies, localStorage**
-   📧 **Email sending** from form submission
-   ⚛️ **React state & hooks** (`useState`, `useEffect`, Context API)
-   🧭 **Routing** with **React Router**
-   🔐 **Protected routes** (only logged-in admin can access dashboard)
-   👤 **User registration / login** flow

---

## 🧰 Tech Stack

**Frontend**

-   React
-   React Router
-   Axios
-   Context API

**Backend**

-   Node.js
-   Express.js
-   JWT auth
-   Google forms/Google script

**Database**

-   MongoDB

---

## 🚀 Possible Next Steps

-   Add multi-language support (HU / EN / TR)
-   Admin UI for editing available time slots
-   Dashboard to view submitted forms
-   Deploy to Render / Vercel / Railway + MongoDB Atlas
