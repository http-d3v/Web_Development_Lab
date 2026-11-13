# Experiment 04: SEO & Web Accessibility Audit (Before & After)

**Course:** B.Tech Computer Science & Engineering — Web Development Laboratory  
**Author:** Dev Kumar Tiwari ([@http-d3v](https://github.com/http-d3v))  
**Academic Year:** 3rd Year (VI Semester)  
**Live URL:** [https://exp-04-seo-accessibility.vercel.app](https://exp-04-seo-accessibility.vercel.app)  
**GitHub Repository:** [https://github.com/http-d3v/Web_Development_Lab](https://github.com/http-d3v/Web_Development_Lab)  

---

## 1. Aim
To audit, refactor, and implement web accessibility (A11y) and search engine optimization (SEO) best practices according to W3C WCAG 2.1 Level AA standards, demonstrating comparative **BEFORE** (unoptimized & inaccessible) and **AFTER** (fully compliant) implementations.

---

## 2. Technologies Used
- **Semantic HTML5:** `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<figure>`, `<figcaption>`, `<label>`, `<button>`.
- **W3C WAI-ARIA:** `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-required`, `aria-current`, `role="banner"`, `role="navigation"`, `role="main"`, `role="contentinfo"`.
- **Search Engine Optimization (SEO):**
  - OpenGraph protocol (`og:title`, `og:description`, `og:image`, `og:url`).
  - Twitter Card metadata.
  - JSON-LD Structured Data Schema (`@type: Library`).
  - Canonical link tags and robots directive.
- **CSS3 Standards:**
  - High contrast color palette: Charcoal (`#2C2522`) on Cream (`#FDFBF7`) delivering an enhanced **14.8:1** contrast ratio (exceeding WCAG AAA 7:1).
  - Explicit keyboard focus states (`:focus-visible` with 3px solid outline rings).
  - Screen reader Skip-To-Content link (`.skip-link`).
- **Vanilla JavaScript (ES6+):**
  - Real-time mathematical relative luminance & contrast ratio calculator based on the WCAG 2.1 algorithm.
  - Interactive tabbed inspection portal.

---

## 3. Comprehensive Before vs. After Audit Breakdown

| Parameter | ❌ Before Version (`before.html`) | ✅ After Version (`after.html`) | Technical Impact |
|:---|:---|:---|:---|
| **HTML5 Landmarks** | Generic `<div>` soup without semantic tags. | `<header>`, `<nav>`, `<main>`, `<figure>`, `<footer>`. | Enables screen readers to jump directly between regions using landmark hotkeys (`D` in NVDA/JAWS). |
| **Heading Hierarchy** | Skips `<h1>`, uses random `<h4>` followed directly by `<h6>` and `<b>`. | Exactly one `<h1>`, sequential `<h2>` sections, nested `<h3>` subsections. | Restores unbroken logical outline; search engines index document topics accurately. |
| **Mobile Viewport** | Missing `<meta name="viewport">`. | `<meta name="viewport" content="width=device-width, initial-scale=1.0">`. | Prevents artificial desktop zoom-out; enables fluid responsive rendering. |
| **Search Engine Meta** | Generic title `Central Library`, no meta description. | 55-char title, 150-char description, OpenGraph, Twitter Cards, JSON-LD Schema. | Boosts SERP rankings, generates rich social preview snippets and search cards. |
| **Image Alt Text** | Missing or useless `alt="image"`. | Context-rich alt describing architectural facade + `<figcaption>`. | Provides meaningful mental model of illustrations for visually impaired scholars. |
| **Form Accessibility** | Inputs without `<label>`, relying solely on placeholders. | Explicit `<label for="...">` with `aria-required="true"` and `aria-describedby`. | Associates labels programmatically with inputs; persists context while typing. |
| **Keyboard Operability** | Clickable `<div onclick="...">` with `outline: none`. | Native `<button type="submit">`, high-visibility `:focus-visible` ring, Skip Link. | Keyboard users can navigate via Tab/Shift+Tab and trigger actions with Space/Enter. |
| **Color Contrast** | Light gray (`#999999`) on white: **2.8:1**. | Charcoal (`#2C2522`) on cream (`#FDFBF7`): **14.8:1**. | Exceeds WCAG 2.1 AA (4.5:1) and AAA (7:1) requirements, eliminating eye strain. |

---

## 4. File Structure

```text
Exp_04_SEO_Accessibility/
├── assets/
│   ├── campus-library.svg     # Architectural facade illustration
│   ├── data-diagram.svg       # WCAG 2.1 POUR framework diagram
│   └── favicon.svg            # Accessibility monogram favicon
├── before.html                # Unoptimized & inaccessible baseline version
├── after.html                 # Fully accessible WCAG 2.1 AA & SEO compliant version
├── index.html                 # Master interactive comparative audit portal
├── style.css                  # Custom styling, contrast variables & media queries
├── app.js                     # Tab switcher & live WCAG contrast calculation engine
├── .gitignore                 # Local Git ignore rules
└── README.md                  # Comprehensive documentation & viva Q&A
```

---

## 5. How to Run Locally

### Option A: Direct Browser Opening
1. Navigate to `Web_Development_Lab/Exp_04_SEO_Accessibility/`.
2. Double-click `index.html` to explore the master comparative audit dashboard.
3. Open `before.html` or `after.html` individually to test isolated versions with screen readers.

### Option B: VS Code Live Server
1. Open the folder in VS Code.
2. Right-click `index.html` &rarr; **Open with Live Server**.

### Option C: Python HTTP Server
```bash
cd Web_Development_Lab/Exp_04_SEO_Accessibility
python -m http.server 3000
```
Open `http://localhost:3000` in your web browser.

---

## 6. Expected Output

- **Comparative Dashboard (`index.html`):**
  - Displays Lighthouse comparison scorecard (Before: 42 A11y, 58 SEO vs. After: 100 A11y, 100 SEO).
  - 8-point comparative audit table with code snippets and rationale.
  - Side-by-side live iframes rendering both versions simultaneously.
  - Interactive color contrast meter allowing arbitrary hex testing and preset toggling.
- **Before Page (`before.html`):**
  - Demonstrates illegible contrast, unscalable desktop viewport, inoperable fake buttons, and broken heading flow.
- **After Page (`after.html`):**
  - Full keyboard skip link, semantic landmarks, high contrast text, accessible catalog search form, and structured schema metadata.

---

## 7. Viva Voce Questions & Answers

**Q1: What are the four core principles of WCAG 2.1 (POUR framework)?**  
*Answer:*
1. **Perceivable:** Information and UI components must be presentable to users in ways they can perceive (e.g. text alternatives for non-text content, high color contrast).
2. **Operable:** User interface components and navigation must be operable (e.g. full keyboard access, no seizure-inducing flashes, sufficient time).
3. **Understandable:** Information and operation of UI must be understandable (e.g. readable text, predictable behavior, input assistance).
4. **Robust:** Content must be robust enough to be reliably interpreted by a wide variety of user agents, including assistive technologies.

**Q2: What is the mathematical formula used to determine Color Contrast Ratio?**  
*Answer:* The contrast ratio is defined as:
$$\text{Contrast Ratio} = \frac{L_1 + 0.05}{L_2 + 0.05}$$
where $L_1$ is the relative luminance of the lighter color and $L_2$ is the relative luminance of the darker color (both normalized between 0.0 and 1.0).

**Q3: Why is a `<label>` element superior to a `placeholder` attribute in form inputs?**  
*Answer:* A placeholder disappears as soon as the user begins typing, leaving users with cognitive difficulties or short-term memory loss without context. Furthermore, many screen readers do not announce placeholders reliably. An explicit `<label for="inputId">` provides permanent, unambiguous identification, expands the clickable tap target, and is formally announced by all assistive devices.

**Q4: What is JSON-LD and how does it affect SEO?**  
*Answer:* JSON-LD (JavaScript Object Notation for Linked Data) is a W3C standard method of encoding Linked Data using JSON. Implemented within a `<script type="application/ld+json">` tag, it provides structured metadata (e.g., Schema.org `WebSite`, `Library`, `Article`) directly to search engines, enabling rich search snippets, knowledge panels, and enhanced indexing.
