# Experiment 10: Full-Stack Application Deployment

**Student Name:** Dev Kumar Tiwari  
**Enrollment / Roll:** 2nd Year B.Tech Computer Science & Engineering (Data Science)  
**Academic Year:** 2nd Year (IV Semester)  
**Course:** Web Development Laboratory  
**GitHub Profile:** [@http-d3v](https://github.com/http-d3v)  
**Vercel Profile:** [@httpd3v](https://vercel.com/httpd3v)  
**Live URL:** [https://exp-10-deployment.vercel.app](https://exp-10-deployment.vercel.app)

---

## 1. Aim of the Experiment
To study, configure, and execute end-to-end cloud deployments for static frontends, single page applications (SPAs), and dynamic Node.js/Express backends using modern cloud platforms (Vercel, Render, Railway), implementing automated Git-triggered CI/CD pipelines, secure environment variable orchestration, domain management, and production health monitoring.

---

## 2. Technologies Used
- **Cloud Hosting & Edge Distribution:** Vercel (Edge Network & Serverless Functions)
- **Container / Backend PaaS:** Render, Railway
- **Version Control & CI/CD Trigger:** Git & GitHub Webhooks
- **Frontend Stack:** Semantic HTML5, CSS3 Custom Properties, Vanilla JavaScript
- **Security:** Environment variable management (`.env` vs Platform secrets, `.gitignore` isolation)

---

## 3. Key Concepts & Architecture
- **Static vs Dynamic Deployment:**
  - *Static:* Pre-built assets (HTML, CSS, JS bundles) distributed globally over Anycast Edge CDNs with near-zero latency and high availability.
  - *Dynamic:* Runtime Node.js/Express processes executing API routes, connecting to databases, and validating cryptographic tokens.
- **Continuous Integration & Delivery (CI/CD):**
  - Developer pushes commit to `main` branch.
  - GitHub fires webhook to Vercel/Render.
  - Platform spins up isolated build container, installs dependencies, runs build commands (`npm run build`).
  - Edge networks deploy fresh assets and atomically update production aliases with zero downtime.
- **Environment Isolation:** Secrets such as database connection strings, API tokens, and JWT signing keys are injected securely at runtime and omitted from version control.

---

## 4. Live Experiment Deployments Dashboard

| Exp # | Project Title | Architecture | Deployment Target | Live URL |
|:---:|:---|:---|:---|:---|
| **02** | Personal Portfolio | Static HTML/CSS/JS | Vercel Edge | [exp-02-portfolio.vercel.app](https://exp-02-portfolio.vercel.app) |
| **03** | Interactive To-Do List | DOM + LocalStorage | Vercel Edge | [exp-03-todo.vercel.app](https://exp-03-todo.vercel.app) |
| **04** | SEO & Accessibility Audit | Semantic Audit | Vercel Edge | [exp-04-seo-accessibility.vercel.app](https://exp-04-seo-accessibility.vercel.app) |
| **05** | Real-Time Weather App | Fetch API + REST | Vercel Edge | [exp-05-weather.vercel.app](https://exp-05-weather.vercel.app) |
| **06** | Responsive Blog Platform | Bootstrap 5 Grid | Vercel Edge | [exp-06-responsive-blog.vercel.app](https://exp-06-responsive-blog.vercel.app) |
| **07** | React Notes SPA | React 18 + Vite | Vercel Static | [exp-07-react-notes.vercel.app](https://exp-07-react-notes.vercel.app) |
| **08** | Book Management REST API | Node.js + Express | Vercel Serverless | [exp-08-book-api.vercel.app](https://exp-08-book-api.vercel.app) |
| **09** | User Authentication System | JWT + bcryptjs | Vercel Serverless | [exp-09-authentication.vercel.app](https://exp-09-authentication.vercel.app) |
| **10** | Full-Stack Deployment Guide | Documentation Hub | Vercel Edge | [exp-10-deployment.vercel.app](https://exp-10-deployment.vercel.app) |
| **11** | Website Performance Optimization | Asset Pipeline | Vercel Edge | [exp-11-web-optimization.vercel.app](https://exp-11-web-optimization.vercel.app) |
| **12** | MERN Task Management App | React + Express + DB | Vercel Monorepo | [exp-12-mern-app.vercel.app](https://exp-12-mern-app.vercel.app) |

---

## 5. File Structure
```text
Exp_10_Deployment/
├── index.html              # Main deployment dashboard & architectural manual
├── style.css               # Warm minimalist editorial styling
├── script.js               # Interactive pipeline inspector & persistent checklist
├── .gitignore              # Ignored files
├── README.md               # Complete lab documentation
└── assets/
    └── favicon.svg         # SVG cloud deployment monogram
```

---

## 6. How to Run Locally

### Option 1: Direct Browser Viewing
Double-click `index.html` or open it with any modern web browser.

### Option 2: Local HTTP Server (Python)
```bash
cd Web_Development_Lab/Exp_10_Deployment
python -m http.server 8000
```
Open `http://localhost:8000` in your browser.

### Option 3: Node.js `serve`
```bash
npx serve .
```

---

## 7. Expected Output
- A warm cream and charcoal technical documentation hub renders cleanly.
- The top academic bar reflects the course, student identity, and year.
- The Live Production Registry showcases direct links to all lab deployments.
- Clicking CI/CD stages interactively updates the operational description card below.
- Pre-flight and post-flight checkboxes retain their toggled states via `localStorage`.
