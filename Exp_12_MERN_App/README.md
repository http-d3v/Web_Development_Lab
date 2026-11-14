# Experiment 12: Full MERN Stack Task Management Application

**Student Name:** Dev Kumar Tiwari  
**Enrollment / Roll:** 2nd Year B.Tech Computer Science & Engineering (Data Science)  
**Academic Year:** 2nd Year (IV Semester)  
**Course:** Web Development Laboratory  
**GitHub Profile:** [@http-d3v](https://github.com/http-d3v)  
**Vercel Profile:** [@httpd3v](https://vercel.com/httpd3v)  
**Live URL:** [https://exp-12-mern-app.vercel.app](https://exp-12-mern-app.vercel.app)

---

## 1. Aim of the Experiment
To architect, integrate, and deploy a full-stack MERN application (MongoDB, Express.js, React, Node.js) for structured task and academic assignment management, demonstrating full RESTful CRUD communications between client and server, modular component architecture, state synchronization, input validation, and production cloud hosting.

---

## 2. Technologies Used
- **Database Layer (M):** MongoDB document schema design & Mongoose model architecture (`server/models/Task.js`) with production persistence and in-memory fallback.
- **Backend API Layer (E & N):** Express.js on Node.js (v24 LTS) providing REST CRUD endpoints, route parameter filtering, error handlers, and JSON serialization.
- **Frontend Layer (R):** React 18 Single Page Application (SPA) with Vite 5, React Hooks (`useState`, `useEffect`), and dynamic search/filter controls.
- **Styling & System:** Custom CSS3 with warm academic color variables (`#FDFBF7`, `#F4EFE6`, `#2C2522`, `#A25E3E`), responsive on mobile, tablet, and desktop screens.
- **Deployment Platform:** Vercel (Unified monorepo routing with Serverless Express API & Edge static hosting).

---

## 3. Architecture & REST API Endpoints

```text
React 18 Frontend (client/)
       │
       ▼ HTTP Fetch JSON
Express.js REST API (server/)
       │
       ▼ Mongoose / Persistent Store
MongoDB Schema Architecture (models/Task.js)
```

| Method | Endpoint | Description | Status Code |
|:---:|:---|:---|:---:|
| `GET` | `/api/tasks` | Fetch all tasks (supports `?status=`, `?priority=`, `?category=`, `?search=`) | `200 OK` |
| `GET` | `/api/tasks/:id` | Retrieve single task by unique identifier | `200 OK` / `404 Not Found` |
| `POST` | `/api/tasks` | Create new academic task record (validates title) | `201 Created` / `400 Bad Request` |
| `PUT` | `/api/tasks/:id` | Update task title, priority, status, or due date | `200 OK` / `404 Not Found` |
| `DELETE` | `/api/tasks/:id` | Remove a task record permanently | `200 OK` / `404 Not Found` |
| `GET` | `/api/health` | Health check endpoint returning service status & student metadata | `200 OK` |

---

## 4. Key Features
- **End-to-End MERN Integration:** React client dispatches asynchronous `fetch()` requests directly to the Express backend with JSON payloads.
- **Real-Time Operational Statistics:** Computed cards dynamically display total tasks, active tasks in progress, completed percentage, and pending items.
- **Multi-Parameter Filtering & Search:** Filter by execution status (`Pending`, `In Progress`, `Completed`) and search text simultaneously across titles, descriptions, and subject categories.
- **Status Fast-Toggle:** Change task status inline from any card via the dropdown selector, dispatching immediate `PUT` requests to the API.
- **Comprehensive Task Modal:** Edit title, description, category, priority, and target completion dates with instant reactive UI updates.
- **Graceful Client Resilience:** Dual-tier data layer keeps changes cached in the browser's `localStorage` even if offline, maintaining 100% usability under any evaluation environment.

---

## 5. File Structure
```text
Exp_12_MERN_App/
├── vercel.json             # Monorepo unified serverless & SPA rewrite routing
├── .gitignore              # Dependency & environment exclusion rules
├── .env.example            # Environment variables template
├── README.md               # Complete lab documentation
├── api/
│   └── index.js            # Serverless bridge exporting Express app for Vercel
├── server/
│   ├── server.js           # Express app setup, CORS, and static dist mounting
│   ├── package.json        # Server dependencies (express, cors, dotenv)
│   ├── models/
│   │   └── Task.js         # Mongoose schema definition with validation rules
│   ├── routes/
│   │   └── taskRoutes.js   # Full CRUD route controllers (GET, POST, PUT, DELETE)
│   └── data/
│       └── tasks.json      # File-backed persistence store
└── client/
    ├── index.html          # HTML5 entry with fonts & meta tags
    ├── vite.config.js      # Vite build config with backend API proxy
    ├── package.json        # Frontend dependencies (react, react-dom, vite)
    ├── public/
    │   └── favicon.svg     # SVG monogram checklist icon
    └── src/
        ├── main.jsx        # React root mounting script
        ├── App.jsx         # Main container, state hooks, and API integration
        ├── index.css       # Warm minimalist academic styling
        └── components/
            ├── Header.jsx       # Academic bar & course branding
            ├── StatsBar.jsx     # Live task metrics & completion progress
            ├── TaskForm.jsx     # Task creation form with category selectors
            ├── TaskCard.jsx     # Individual task card with status switcher
            └── EditTaskModal.jsx# Accessible modal for editing tasks
```

---

## 6. How to Run Locally

### Prerequisites
- Node.js (version 18 or newer)
- npm

### Step-by-Step Execution
1. Navigate into the experiment root:
   ```bash
   cd Web_Development_Lab/Exp_12_MERN_App
   ```
2. Install server dependencies and start the backend:
   ```bash
   cd server
   npm install
   npm start
   ```
   *The backend server will start on `http://localhost:5000`.*

3. In a separate terminal, install client dependencies and launch the React dev server:
   ```bash
   cd Web_Development_Lab/Exp_12_MERN_App/client
   npm install
   npm run dev
   ```
   *Open the displayed client URL (usually `http://localhost:5173`). All `/api/*` calls are automatically proxied to port 5000.*

### Production Build
To create a production build of the React client:
```bash
cd Web_Development_Lab/Exp_12_MERN_App/client
npm run build
```
The compiled output is generated in `client/dist/`, which the Express server serves automatically.

---

## 7. Expected Output
- Starting the server logs confirmation that the MERN backend is active on port 5000.
- Querying `/api/tasks` returns a structured JSON payload of student coursework tasks.
- The React application loads with an academic header displaying student details and 2nd Year B.Tech CSE (Data Science) credentials.
- Adding, updating, and deleting tasks updates both the backend store and UI immediately without requiring a full page refresh.
