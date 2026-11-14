# Experiment 02: Responsive Personal Portfolio Website

**Course:** B.Tech CSE (Data Science) — Web Development Laboratory  
**Student:** Dev Kumar Tiwari  
**Academic Standing:** Sophomore (2025 – 2029) &bull; JSS University, Noida &bull; CGPA 8.0  
**GitHub Profile:** [@http-d3v](https://github.com/http-d3v)  
**Vercel Profile:** [@httpd3v](https://vercel.com/httpd3v)  
**Live URL:** [https://exp-02-portfolio.vercel.app](https://exp-02-portfolio.vercel.app)  
**GitHub Repository:** [https://github.com/http-d3v/Web_Development_Lab](https://github.com/http-d3v/Web_Development_Lab)  

---

## 1. Aim
To design and develop a clean, modern, and fully responsive personal portfolio website using semantic HTML5 and CSS3 that highlights student academic credentials, technical skills, production AI & database projects (ClaimGuard AI, Metrology R76, Hostel Room Allocation System), leadership activities, hackathon participations (Smart India Hackathon), and provides an accessible validated contact channel.

---

## 2. Technologies Used
- **Semantic HTML5:** `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<figure>`, `<footer>`, `<form>`, `<label>`, `<input>`, `<textarea>`.
- **CSS3:**
  - CSS Custom Properties (CSS Variables) for palette management.
  - Flexbox and CSS Grid layout algorithms.
  - Media queries for responsive viewports (Desktop, Tablet, Mobile).
  - Editorial typography using Google Fonts (`Plus Jakarta Sans` & `Newsreader`).
  - Warm, professional student color palette:
    - Cream Base: `#FDFBF7`
    - Soft Surface: `#F4EFE6`
    - Deep Charcoal: `#2C2522`
    - Terracotta Accent: `#A25E3E`
    - Forest Olive: `#48604F`
    - Warm Amber: `#B88338`
- **Vanilla JavaScript (ES6+):**
  - Mobile hamburger navigation menu toggle.
  - Scroll-spy section highlighting via `IntersectionObserver`.
  - Client-side form validation with real-time feedback and `localStorage` message persistence.

---

## 3. Features Implemented

1. **Sticky Navigation Bar:**
   - Student branding mark and degree indicator (`Dev Kumar Tiwari | Sophomore • CSE (Data Science)`).
   - Smooth anchor scrolling to each section.
   - Fully accessible mobile hamburger menu with ARIA attributes (`aria-expanded`, `aria-label`).

2. **Hero Section:**
   - Status badge: JSS University, Noida | CGPA 8.0.
   - Professional headline: Sophomore &bull; Aspiring Data Scientist &amp; Full-Stack Developer &bull; AI/ML Enthusiast.
   - Clear Call-To-Action (CTA) buttons linking to projects and contact form.
   - Quick metadata highlights (University, Degree, GitHub, Vercel).
   - Custom SVG student avatar illustration.

3. **About Me & Academic Metrics:**
   - Narrative of data science, machine learning, and full-stack development journey.
   - Key metrics cards: CGPA 8.0, 2025–29 cohort, 3+ deployed projects, 3 spoken languages (English, Hindi, French).

4. **Education Timeline:**
   - **B.Tech, CSE (Data Science):** JSS University, Noida (2025 – 2029) &bull; CGPA 8.0.
   - **Class XII:** Sunbeam School (80% Distinction).
   - **Class X:** Sunbeam School (90% High Distinction).

5. **Skills Matrix:**
   - **Languages:** Python, C, C++, Java.
   - **Web Technologies:** HTML5, CSS3, JavaScript (ES6+), React.js, Node.js, Express.js.
   - **Databases:** MySQL 8.0 (Triggers & Procedures), DBMS, RDBMS, OODBMS, Supabase.
   - **Core Disciplines:** Data Structures & Algorithms, AI / Machine Learning, Software & Web Development.
   - **Spoken:** English, Hindi, French.

6. **Featured Projects Showcase:**
   - **ClaimGuard AI:** AI tool catching errors in hospital insurance claims before submission; Check Claim, Dashboard, and Appeals modules. Live at `claimguard-phi.vercel.app`.
   - **Metrology R76:** Addresses faulty weighing scales globally with automated OIML R76 certification. Live at `metrology3-xcuw.vercel.app`.
   - **Hostel Room Allocation System:** MySQL 8.0 relational database architecture with custom triggers, stored procedures, and capacity functions. Live at `hostel-project-rho.vercel.app`.

7. **Positions of Responsibility, Hackathons & Certifications:**
   - **Positions:** Technical Team Member (EDC JSS), Editorial Team (Lingua Franca), Event Manager (Inkspire), Debater & Quizzer (Quizzoc Society).
   - **Hackathons:** Smart India Hackathon (SIH - result awaited), Airforge36, Devnovate.
   - **Certifications:** NCC 'B' Certificate, Decode the Data Bootcamp, IBM SkillsBuild (IBM Bob Troubleshooting Lab).

8. **Contact Section:**
   - Contact channels: Email (`devkumartiwari563@gmail.com`), GitHub (`github.com/http-d3v`), LinkedIn (`linkedin.com/in/dev-kumar-tiwari`), Vercel (`vercel.com/httpd3v`), Location (Noida).
   - *Phone number omitted for privacy reasons.*
   - Fully validated interactive message form with error states and confirmation alert.

---

## 4. File Structure
```text
Exp_02_Portfolio/
├── index.html              # Main portfolio page with semantic HTML5
├── style.css               # Warm minimalist styles with custom CSS variables
├── script.js               # Mobile navigation, scroll-spy, and contact form validation
├── .gitignore              # Ignored files
├── README.md               # Complete lab documentation
└── assets/
    ├── avatar.svg          # Custom portrait illustration
    ├── favicon.svg         # Monogram SVG favicon
    ├── project-claimguard.svg # Mockup for ClaimGuard AI
    ├── project-metrology.svg  # Mockup for Metrology R76
    └── project-hostel.svg     # Mockup for Hostel Room Allocation System
```

---

## 5. How to Run Locally

### Option 1: Browser Direct
Double-click `index.html` to open in any web browser.

### Option 2: Python HTTP Server
```bash
cd Web_Development_Lab/Exp_02_Portfolio
python -m http.server 8000
```
Visit `http://localhost:8000`.

### Option 3: Node.js `serve`
```bash
npx serve .
```

---

## 6. Expected Output
- A warm cream and charcoal minimalist portfolio loads with responsive typography.
- Hero section highlights student name, JSS University credentials, CGPA 8.0, and specialization.
- All three actual projects (ClaimGuard AI, Metrology R76, Hostel Room Allocation System) showcase live links to Vercel and GitHub repositories.
- Contact section lists email, LinkedIn, GitHub, and Vercel with phone numbers excluded for privacy.
