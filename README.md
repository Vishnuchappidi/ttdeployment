# 🌍 EcoClean – Smart Waste Management System

A professional, modern, full-stack municipal waste management platform. It acts as a unified hub bridging citizens reporting waste issues with administrative dispatchers and environmental collection workers via role-based access control.

## 🚀 Built With
* **Frontend:** React.js, Vite, Tailwind CSS, React Router, Recharts, Axios
* **Backend:** Java 17, Spring Boot 3.x, Spring Data JPA, Hibernate, Validation
* **Database:** MySQL
* **Orchestration:** Docker & Docker Compose

---

## ✨ Features by Role

### 👤 Citizens
* Create waste complaints pinpointing exact street address/location.
* Select exact **Waste Type** (Household, Electronic, Hazardous, Construction, etc.) and designate **Urgency**.
* Track request status in real-time.

### 🛡️ System Administrators
* Comprehensive **Analytics Dashboard** rendering live stat-cards, Status distribution (Pie charts), and collection metrics.
* **Request Table:** Accept and filter requests seamlessly. Manage and toggle the status for any request manually.
* **Worker Assignment:** Dispatch specific "Pending" tasks to registered Collection Workers.

### 🚛 Collection Workers
* Dedicated **Task Dashboard** showing "Active Tasks" vs "Completed Tasks".
* Update assignments from *Assigned* → *In Progress* → *Collected*.

---

## 🛠️ How to Run Locally

### Option 1: Using Docker (Recommended)
You don't need Java, Node.js, or MySQL installed locally. Just rely on Docker runtime.
1. Add your desired MySQL password to the root `.env` file (`DB_PASSWORD=your_password`).
2. Run `docker-compose up --build -d`.
3. Open `http://localhost:5173` in your browser.

### Option 2: Running Native (Development Mode)
#### Backend
1. Make sure your local MySQL server is running (port 3306). Update `backend/src/main/resources/application.properties` with your database credentials.
2. Navigate to `backend/` and run `mvn spring-boot:run`. (App starts on `http://localhost:8081`).
3. *(First Boot Only)* The application will auto-generate the database schema (`ecoclean_db`) and seed standard users.

#### Frontend
1. Make sure Node is installed.
2. Navigate to `frontend/`.
3. Run `npm install` followed by `npm run dev`.
4. Open `http://localhost:5173`.

---

## 🔑 Test Accounts
On the first application start, the Database Seeder automatically injects testing roles. Use these to bypass signup:

**System Admin:** `admin@ecoclean.com` | `admin123`  
**Worker 1:** `worker1@ecoclean.com` | `worker123`  
**Worker 2:** `worker2@ecoclean.com` | `worker123`  
**Citizen:** `citizen@ecoclean.com` | `citizen123`
