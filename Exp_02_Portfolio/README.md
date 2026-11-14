# Experiment 02: Responsive Personal Portfolio Website

**Course:** B.Tech CSE (Data Science) — Web Development Laboratory  
**Author:** Dev Kumar Tiwari ([@http-d3v](https://github.com/http-d3v))  
**Academic Year:** 2nd Year (IV Semester)  
**Live URL:** [https://exp-02-portfolio.vercel.app](https://exp-02-portfolio.vercel.app)  
**GitHub Repository:** [https://github.com/http-d3v/Web_Development_Lab](https://github.com/http-d3v/Web_Development_Lab)  

---

## 1. Aim
To design and develop a clean, modern, and fully responsive personal portfolio website using semantic HTML5 and CSS3 that highlights student academic credentials, technical skills, coursework projects, and provides a validated contact channel.

---

## 2. Technologies Used
- **Semantic HTML5:** `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<figure>`, `<footer>`, `<form>`, `<label>`, `<input>`, `<textarea>`.
- **CSS3:**
  - CSS Custom Properties (CSS Variables) for palette management.
  - Flexbox and CSS Grid layout algorithms.
  - Media queries for responsive viewports (Desktop, Tablet, Mobile).
  - Clean typography using Google Fonts (`Plus Jakarta Sans`).
  - Warm, professional color palette:
    - Cream Base: `#FDFBF7`
    - Soft Surface: `#F4EFE6`
    - Deep Charcoal: `#2C2522`
    - Terracotta Accent: `#A25E3E`
    - Forest Olive: `#48604F`
- **Vanilla JavaScript (ES6+):**
  - Mobile hamburger navigation menu toggle.
  - Scroll-spy section highlighting via `IntersectionObserver`.
  - Client-side form validation with real-time feedback and `localStorage` message persistence.

---

## 3. Features Implemented

1. **Sticky Navigation Bar:**
   - Student branding mark and degree indicator.
   - Smooth anchor scrolling to each section.
   - Fully accessible mobile hamburger menu with ARIA attributes (`aria-expanded`, `aria-label`).

2. **Hero Section:**
   - Concise professional summary and availability badge.
   - Clear Call-To-Action (CTA) buttons linking to projects and contact form.
   - Quick metadata highlights (Degree, Specialization, GitHub profile).
   - Custom SVG student avatar illustration.

3. **About Me & Academic Metrics:**
   - Narrative of engineering journey and technical philosophy.
   - Key areas of interest (Frontend, DSA in C++, Backend, Web Standards).
   - Metrics grid (Current Year, CGPA, Projects Completed, Problems Solved).

4. **Education Timeline:**
   - Chronological vertical timeline representing B.Tech degree and Senior Secondary schooling.
   - Coursework tag pills for subject highlights (DSA, DBMS, OS, Computer Networks).

5. **Categorized Skills Matrix:**
   - 4 distinct technical domains: Frontend Development, Programming Languages, Backend & Databases, Tools & Workflows.
   - Proficiency badges for each skill.

6. **Featured Projects Showcase:**
   - Realistic academic projects: Campus Event Notice Board, Student Expense Tracker, Central Library Book Catalog.
   - Tech stack tags, feature lists, source code links, and preview triggers.

7. **Validated Contact Form:**
   - Full Name, Email, Subject, and Message inputs.
   - Custom client-side validation logic with instant error state clearing on typing.
   - Non-blocking confirmation banner with local storage logging.

---

## 4. File Structure

```text
Exp_02_Portfolio/
├── assets/
│   ├── avatar.svg            # Custom student profile portrait
│   ├── favicon.svg           # Monogram favicon
│   ├── project-campus.svg    # Campus Event Portal interface preview
│   ├── project-expense.svg   # Expense Tracker interface preview
│   └── project-library.svg   # Library Catalog interface preview
├── index.html                # Semantic HTML5 markup
├── style.css                 # Custom CSS3 styling and media queries
├── script.js                 # Navigation and form validation script
├── .gitignore                # Git ignore rules
└── README.md                 # Complete experiment documentation
```

---

## 5. How to Run Locally

### Option A: Direct Browser Opening
1. Clone or download the repository.
2. Navigate to `Web_Development_Lab/Exp_02_Portfolio/`.
3. Double-click `index.html` or right-click and choose **Open with > Chrome / Edge / Firefox**.

### Option B: VS Code Live Server
1. Open the `Exp_02_Portfolio` folder in VS Code.
2. Install the **Live Server** extension if not already present.
3. Click **Go Live** at the bottom right corner or right-click `index.html` and select **Open with Live Server**.
4. The website will open at `http://127.0.0.1:5500`.

### Option C: Python HTTP Server (Command Line)
```bash
cd Web_Development_Lab/Exp_02_Portfolio
python -m http.server 3000
```
Open `http://localhost:3000` in your web browser.

---

## 6. Expected Output

- **Desktop View (1200px+):** A 2-column hero layout with avatar card on the right, 2-column about and skills cards, 3-column project cards grid, and a split contact section.
- **Tablet View (768px - 992px):** Smooth transition to 2-column grids with adjusted spacing and readable font sizes.
- **Mobile View (≤ 680px):** Responsive stacked single-column layout, compact headers, and an interactive hamburger menu.
- **Form Submission:** Submitting valid form inputs displays a green success confirmation and stores the record in `localStorage.getItem('portfolio_messages')`.
