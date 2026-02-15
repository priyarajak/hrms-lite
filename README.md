<h1 align="center">🧑‍💼 HRMS Lite</h1>
<p align="center">
A lightweight Human Resource Management System built with React + FastAPI.
</p>

<p align="center">
  <a href="https://hrms-lite-eosin-three.vercel.app"><strong>🌐 Live App</strong></a> •
  <a href="https://hrms-lite-backend-9wjy.onrender.com/docs"><strong>📘 API Docs</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React%20(Vite)-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/Backend-FastAPI-green?style=flat-square" />
  <img src="https://img.shields.io/badge/Database-PostgreSQL-blueviolet?style=flat-square" />
  <img src="https://img.shields.io/badge/Deployment-Vercel%20%7C%20Render-black?style=flat-square" />
</p>

---

## 📌 Overview

**HRMS Lite** is a production-ready full-stack web application that allows an admin to manage employees and track daily attendance.

The project demonstrates **end-to-end development**, including API design, database modeling, validations, responsive UI, and cloud deployment.

---

## 🌐 Live Links

| Service | URL |
|---|---|
| Frontend | https://hrms-lite-eosin-three.vercel.app |
| Backend API | https://hrms-lite-backend-9wjy.onrender.com |
| Swagger Docs | https://hrms-lite-backend-9wjy.onrender.com/docs |

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios

### Backend
- FastAPI
- SQLAlchemy ORM
- PostgreSQL

### Deployment
- **Frontend:** Vercel  
- **Backend:** Render  
- **Database:** Render PostgreSQL  

---

## ✨ Features

### 👥 Employee Management
- Add employees with validation
- Delete employees with confirmation modal
- Prevent duplicate employee records
- Email format validation

### 📅 Attendance Management
- Mark daily attendance (Present / Absent)
- Prevent duplicate attendance for same date
- Prevent future date selection
- Prevent attendance before joining date
- Filter attendance by date

### 📊 Interactive Dashboard
- Total employee count
- Present & Absent counts by selected date
- Date filter for analytics
- Clickable cards to view employee drill-down lists
- Dashboard set as homepage

### 🎨 UI & UX
- Fully responsive (mobile + desktop)
- Loading & empty states
- Professional layout & reusable components
- Custom HRMS branding

---

## 🗄️ Database

The application uses a **cloud PostgreSQL database** hosted on Render.

All data is persistent and shared across users.

---

## ⚙️ Run Locally

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

Open: http://127.0.0.1:8000/docs

### Frontend

cd frontend
npm install
npm run dev

Open: http://localhost:5173
