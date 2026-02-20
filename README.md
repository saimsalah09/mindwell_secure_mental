<<<<<<< HEAD
# 🧠 MindWell – Secure Mental Wellness Web Application

MindWell is a privacy-focused full-stack mental wellness application where users can write encrypted journals, track daily moods, visualize emotional trends, and practice guided breathing exercises.

This project focuses on security, data privacy, clean UI/UX, and real-world deployment architecture.

---

## 🚀 Live Features

### 🔐 Authentication
- User Login with JWT authentication
- Protected routes using auth middleware
- Token-based access control

### 📝 Secure Journal (CRUD)
- Create journal entries
- View journal history
- Edit journal entries
- Delete journal entries
- User-based data isolation

### 📊 Mood Tracking
- Daily mood slider (1–10)
- Emoji-based mood indicator
- Line chart visualization using Chart.js
- Weekly average mood summary
- Mood trend detection

### 🧘 Breathing Mode
- Animated inhale/exhale breathing exercise
- Smooth UI transitions
- Guided relaxation cycle

### 📦 Export My Data
- Export all journals and mood records
- JSON file download
- User-specific data only

---

## 🛠 Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Chart.js

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

## 📁 Project Structure
MindWell/ │ 
    ├── backend/ │  
            ├── models/ │   
            ├── routes/ │   
            ├── middleware/ │   
            └── server.js │ 
    ├── frontend/ │   
            ├── index.html │
            ├── login.html │   
            ├── dashboard.html │   
            ├── journal.html │  
            ├── mood.html │   
            ├── breathing.html 
            │── style.css │   
            ├── api.js │   
            ├── auth.js │  
            ├── journal.js │   
            ├── mood.js │   
            └── dashboard.js │ 
            └── README.md



            ---

## 🔐 Security Architecture

- JWT-based authentication
- Protected API routes
- User-based filtering (`userId`)
- Token stored in localStorage
- SecureFetch wrapper for protected requests

---

## 📊 Mood Analytics Logic

- Weekly average calculation
- Dynamic trend detection (Improving / Dropping / Stable)
- Real-time chart updates after mood save

---

## 📦 Export System

- Fetch user journals and moods
- Generate downloadable JSON file
- Data isolation per authenticated user

---

## 🧪 How To Run Locally

### 1️⃣ Clone Repository


---

## 🚀 Deployment Ready

- Backend → Render
- Frontend → Vercel
- Database → MongoDB Atlas

---

## 💡 Future Improvements (Planned)

- Premium tier system
- Dark/Light theme toggle
- Data encryption at rest (AES)
- CSV export option
- AI-based mood insights

---

## 👨‍💻 Developer

Built with ❤️ by Ghaus

Full Stack Developer (MERN Stack)
=======
# mindwell_secure_mental
🧠 MindWell – Secure Mental Wellness Web Application
>>>>>>> 7110af5196ce27a4c583d3508a80d017e328b9f3
