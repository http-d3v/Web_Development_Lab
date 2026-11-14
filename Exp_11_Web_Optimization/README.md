# Experiment 11: Website Performance Optimization

**Student Name:** Dev Kumar Tiwari  
**Enrollment / Roll:** 2nd Year B.Tech Computer Science & Engineering (Data Science)  
**Academic Year:** 2nd Year (IV Semester)  
**Course:** Web Development Laboratory  
**GitHub Profile:** [@http-d3v](https://github.com/http-d3v)  
**Vercel Profile:** [@httpd3v](https://vercel.com/httpd3v)  
**Live URL:** [https://exp-11-web-optimization.vercel.app](https://exp-11-web-optimization.vercel.app)

---

## 1. Aim of the Experiment
To conduct an empirical web performance optimization audit by engineering two distinct versions of a web portal (`before.html` containing performance anti-patterns, and `after.html` with modern front-end optimizations) and building an interactive dashboard (`index.html`) demonstrating measurable reductions in First Contentful Paint (FCP), Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), Total Blocking Time (TBT), and asset payload byte weight.

---

## 2. Technologies Used
- **Core Web Technologies:** Semantic HTML5, CSS3 Custom Properties, Vanilla JavaScript (ES6+)
- **Performance Tooling & Standards:** Google Lighthouse, Web Vitals specification (FCP, LCP, CLS, TBT)
- **Techniques Implemented:** Critical path CSS inlining, dead code elimination, asynchronous script execution (`defer`), resource preconnects (`preconnect`), font-display swap, aspect-ratio reservation, and third-party dependency pruning.
- **Deployment Platform:** Vercel (Edge Distribution)

---

## 3. Quantitative Before vs After Audit

| Metric | Before Optimization | After Optimization | Impact Delta | Optimization Mechanism |
|:---|:---:|:---:|:---:|:---|
| **Lighthouse Score** | 42 / 100 | **98 / 100** | **+56 points** | Comprehensive front-end pipeline overhaul |
| **First Contentful Paint (FCP)** | 2.8 s | **0.7 s** | **-75.0%** | Critical CSS inlining; eliminated parser-blocking scripts |
| **Largest Contentful Paint (LCP)** | 4.1 s | **1.1 s** | **-73.1%** | Early origin preconnect; optimized vector assets |
| **Cumulative Layout Shift (CLS)** | 0.28 | **0.00** | **100% stable** | Explicit image dimensions and `aspect-ratio` rules |
| **Total Blocking Time (TBT)** | 480 ms | **15 ms** | **-96.8%** | Purged 85KB jQuery; vanilla native event listeners |
| **CSS Payload Size** | 28.4 KB | **1.9 KB** | **-93.3%** | Purged 40+ unused legacy CSS rules; minified whitespace |
| **HTTP Requests** | 8 requests | **3 requests** | **-62.5%** | Asset consolidation; eliminated redundant CDN calls |

---

## 4. Key Techniques Implemented
1. **Eliminate Render-Blocking Scripts:** Replaced blocking `<head>` scripts with `<script defer>` placed before `</body>`.
2. **Critical CSS Inlining:** Inlined above-the-fold layout styles directly into the document `<head>`, enabling single-roundtrip visual painting.
3. **Dead Code Elimination (Tree-Shaking):** Removed over 40 unused CSS selectors (legacy carousels, unused navigation bars, oversized modals).
4. **Preconnect Hints:** Initiated early DNS resolution and TLS handshakes via `<link rel="preconnect">` for Google Fonts origins.
5. **Font-Display Swap:** Added `&display=swap` to eliminate Flash of Invisible Text (FOIT) during font asset retrieval.
6. **Layout Shift (CLS) Prevention:** Supplied explicit width/height and CSS `aspect-ratio` properties on media containers.
7. **Native DOM APIs over jQuery:** Migrated from bloated 85KB jQuery to modern vanilla `document.querySelector` and `addEventListener`.
8. **Purged Console Debug Noise:** Removed verbose iterative `console.log()` statements that stall the browser DevTools engine.

---

## 5. File Structure
```text
Exp_11_Web_Optimization/
├── index.html              # Interactive Optimization Dashboard & comparison suite
├── before.html             # Unoptimized baseline with deliberate performance anti-patterns
├── after.html              # Optimized production version adhering to Web Vitals
├── optimized-script.js     # Lightweight deferred vanilla JavaScript
├── style.css               # Warm editorial stylesheet for the dashboard
├── app.js                  # View-switching interactivity for comparison iframes
├── .gitignore              # Ignored files
├── README.md               # Complete lab documentation
└── assets/
    └── favicon.svg         # SVG performance gauge monogram
```

---

## 6. How to Run Locally

### Option 1: Browser Launch
Double click `index.html` to open the comparison dashboard, or open `before.html` and `after.html` independently.

### Option 2: Python Simple HTTP Server
```bash
cd Web_Development_Lab/Exp_11_Web_Optimization
python -m http.server 8000
```
Visit `http://localhost:8000` to interact with both iframes simultaneously.

### Option 3: Node.js `serve`
```bash
npx serve .
```

---

## 7. Expected Output
- The dashboard displays clear simulated Google Lighthouse metric scorecards showing the jump from 42 to 98.
- An interactive iframe switcher allows evaluating both versions side-by-side or individually.
- The concrete web metrics table displays quantitative speedups across FCP, LCP, CLS, TBT, and total payload size.
- The 8 applied optimization techniques are documented with code patterns and explanations.
