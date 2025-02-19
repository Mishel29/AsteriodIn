# 🚀 NASA Asteroid Explorer

A **React.js** and **Node.js (Express.js)** based web application that allows users to explore **Near Earth Objects (Asteroids)** based on a date range using NASA's NEO API.

---

## 🌟 Features
- 🔍 Fetch asteroids using a **start date** and **end date**
- 📋 Display asteroid details interactively
- 🎨 Modern UI with responsive design
- ⚡ Real-time API calls to NASA's Near Earth Objects API
- 🛠️ Built using **React, Express, and Axios**

---

## 📦 Tech Stack
- **Frontend:** React.js (Vite), Axios, CSS
- **Backend:** Node.js, Express.js
- **API:** NASA NEO API
- **Package Manager:** npm

---

## 🚀 How to Run the Project

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Mishel29/AsteriodInn.git

```

### 2️⃣ Backend Setup (Express.js)

#### 🔧 Install Dependencies
```bash
cd backend
npm install
```

#### 📌 Set Up Environment Variables
Create a `.env` file inside `backend` and add:
```ini
PORT=4050
NASA_API_KEY=your_nasa_api_key_here
```

#### ▶️ Start the Backend
```bash
npm run dev
```
Your Express.js server will run at:
```bash
http://localhost:4050
```

---

### 3️⃣ Frontend Setup (React)

#### 🔧 Install Dependencies
```bash
cd frontend
npm install
```

#### 📌 Set Up Environment Variables
Create a `.env` file inside `frontend` and add:
```ini
VITE_NASA_API_KEY=your_nasa_api_key_here
VITE_BACKEND_URL=http://localhost:4050
```

#### ▶️ Start the Frontend
```bash
npm run dev
```
Your React App will run at:
```bash
http://localhost:5173
```

---

## ⚙️ API Usage
The application interacts with NASA's Near Earth Objects API:
```bash
GET https://api.nasa.gov/neo/rest/v1/feed?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD&api_key=YOUR_API_KEY
```
### Parameters:
- **start_date** → Start date (Max range: 7 days)
- **end_date** → End date
- **api_key** → Your NASA API key

---

## 📌 Troubleshooting

### "process is not defined" error
➤ Make sure you're using `process.env.NASA_API_KEY` in the frontend

### API Fetch Error (400 Bad Request)
➤ Ensure the date format is `YYYY-MM-DD`
➤ Check that `NASA_API_KEY` is correct

### Port conflicts
➤ Ensure no other process is using `4050` (backend) or `5173` (frontend)

---

## 📜 License
This project is open-source and available under the **MIT License**.

---

🚀 **Developed with ❤️ by Mishel**


