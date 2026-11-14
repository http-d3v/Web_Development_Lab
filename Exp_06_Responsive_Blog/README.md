# Experiment 06: Responsive Blog Platform

**Course:** B.Tech CSE (Data Science) — Web Development Laboratory  
**Author:** Dev Kumar Tiwari ([@http-d3v](https://github.com/http-d3v))  
**Academic Year:** 2nd Year (IV Semester)  
**Live URL:** [https://exp-06-responsive-blog.vercel.app](https://exp-06-responsive-blog.vercel.app)  
**GitHub Repository:** [https://github.com/http-d3v/Web_Development_Lab](https://github.com/http-d3v/Web_Development_Lab)  

---

## 1. Aim
To design and build an editorial responsive technology and engineering blog platform using semantic HTML5, custom CSS3, Bootstrap 5's responsive grid system, and media queries, featuring dynamic category filtering, search, modal post previews, and an author bio sidebar.

---

## 2. Technologies Used
- **Semantic HTML5:** `<nav>`, `<header>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`, `<form>`.
- **Bootstrap 5.3 Framework:**
  - Responsive Grid System (`row`, `col-lg-8`, `col-lg-4`, `col-md-6`, `col-12`).
  - Mobile Collapsible Navigation Bar (`navbar-expand-lg`).
  - Interactive Reader Modal (`modal-dialog-centered modal-lg`).
  - Spacing utilities (`mb-4`, `py-5`, `gap-3`).
- **Custom CSS3 Overrides:**
  - Warm minimalist color palette:
    - Base Cream: `#FDFBF7`
    - Surface: `#F4EFE6`
    - Charcoal: `#2C2522`
    - Terracotta Accent: `#A25E3E`
    - Forest Olive: `#3A5B44`
    - Warm Amber: `#B88338`
  - Editorial typography using `Newsreader` and `Plus Jakarta Sans`.
  - Custom pill filters and subtle hover transitions.
- **Vanilla JavaScript (ES6+):**
  - Category filtering across post items.
  - Real-time search query matching across article titles and descriptions.
  - Modal content injection for reading full articles.
  - Newsletter form validation with regex.

---

## 3. Features Implemented

1. **Responsive Editorial Navbar:**
   - Monogram logo badge, title, and topic navigation links.
   - Live article search input with auto-expanding width on focus.
   - Collapsible mobile hamburger menu.

2. **Featured Story Hero Banner:**
   - Prominent card showcasing a featured deep dive on modern CSS layouts.
   - Reading time, publish date, author avatar, and "Read Full Story" trigger.

3. **Multi-Category Responsive Post Grid:**
   - 4 engineering articles covering: *Web Tech*, *Cloud & DevOps*, *AI & Systems*, and *Campus Insights*.
   - Dynamic tag badges, metadata timestamps, and excerpt text.
   - Responsive transition: 2-column grid on desktop/tablet, stacked single-column on mobile.

4. **Dynamic Topic Filtering & Search:**
   - Filter pill buttons synchronized with navbar category links.
   - Instant search filtering with empty state feedback ("No matching articles found").

5. **Modal Article Reader:**
   - Full article reading view populated dynamically from an internal data store without page reloads.

6. **Sidebar Widgets:**
   - **Author Profile:** Student bio, affiliation, and GitHub/Portfolio links.
   - **Newsletter Digest:** Subscription form with email format validation.
   - **Topic Cloud:** Interactive technology tags.

---

## 4. File Structure

```text
Exp_06_Responsive_Blog/
├── assets/
│   ├── favicon.svg           # Editorial book monogram favicon
│   ├── thumb-ai.svg          # Graph algorithms illustration
│   ├── thumb-career.svg      # Undergraduate roadmap illustration
│   ├── thumb-cloud.svg       # Cloud deployment illustration
│   └── thumb-web.svg         # Modern CSS grid illustration
├── index.html                # Semantic HTML5 & Bootstrap layout
├── style.css                 # Custom CSS overrides & warm palette tokens
├── script.js                 # Filtering, search & modal reader script
├── .gitignore                # Git ignore configuration
└── README.md                 # Complete experiment documentation
```

---

## 5. How to Run Locally

### Option A: Direct Browser Opening
1. Navigate to `Web_Development_Lab/Exp_06_Responsive_Blog/`.
2. Double-click `index.html` to open in any web browser.

### Option B: VS Code Live Server
1. Open the folder in VS Code.
2. Right-click `index.html` &rarr; **Open with Live Server**.

### Option C: Python HTTP Server
```bash
cd Web_Development_Lab/Exp_06_Responsive_Blog
python -m http.server 3000
```
Open `http://localhost:3000` in your web browser.

---

## 6. Expected Output

- **Desktop View (&ge; 992px):** Top navbar with search input, featured hero card, 2-column post grid on left (col-8) and sticky sidebar on right (col-4).
- **Mobile View (&le; 768px):** Collapsible navigation menu, stacked full-width post cards, and fluid sidebar widgets.
- **Filtering:** Clicking "Cloud" filters the grid to cloud posts only and shows the matching item count.
- **Reading Modal:** Clicking "Read Article" smoothly presents the complete article text.
