# Experiment 07: React Notes Single Page Application (SPA)

**Student Name:** Dev Kumar Tiwari  
**Enrollment / Roll:** 2nd Year B.Tech Computer Science & Engineering (Data Science)  
**Academic Year:** 2nd Year (IV Semester)  
**Course:** Web Development Laboratory  
**GitHub Profile:** [@http-d3v](https://github.com/http-d3v)  
**Vercel Profile:** [@httpd3v](https://vercel.com/httpd3v)  
**Live URL:** [https://exp-07-react-notes.vercel.app](https://exp-07-react-notes.vercel.app)

---

## 1. Aim of the Experiment
To design and build an interactive, responsive Single Page Application (SPA) using React and Vite, implementing modular functional component architecture, state management with React Hooks (`useState`, `useEffect`), search and categorization logic, and local data persistence via the browser's `localStorage` API.

---

## 2. Technologies Used
- **Frontend Framework:** React 18 (Functional Components, Hooks)
- **Build Tool:** Vite 5 (Fast ESM-based development and optimized production bundling)
- **Styling:** Vanilla CSS3 with CSS Custom Properties adhering to warm academic palette (`#FDFBF7`, `#F4EFE6`, `#2C2522`, `#A25E3E`)
- **Typography:** Google Fonts (`Plus Jakarta Sans` & `Newsreader`)
- **Storage:** Browser `localStorage` API
- **Deployment Platform:** Vercel

---

## 3. Key Features
- **Component-Driven Architecture:** Clean division of concerns across `Header`, `NoteForm`, `NoteCard`, `EmptyState`, and `EditModal`.
- **Full CRUD Operations:** Create new notes, view in a responsive multi-column grid, edit note content/category, and delete notes.
- **Pin to Top:** Toggle pinned status on priority study notes so they appear first in the feed.
- **Category Filter Chips:** Filter notes by subject (`Data Structures`, `Data Science`, `Web Dev Lab`, `DBMS`, `Exam Prep`).
- **Live Search Filtering:** Real-time search query matching note titles and text bodies.
- **Color Strip Accent:** Select custom accent colors for visual distinction across topics.
- **Automatic Persistence:** Changes immediately persist to `localStorage` and recover upon page reload.
- **Responsive Layout:** Adaptive grid seamlessly restructuring from mobile smartphones to widescreen monitors.

---

## 4. File Structure
```text
Exp_07_React_Notes/
├── index.html              # HTML5 entry with fonts & meta tags
├── package.json            # Node.js dependencies and build scripts
├── vite.config.js          # Vite build configuration
├── .gitignore              # Ignored build artifacts and dependencies
├── README.md               # Complete lab documentation
├── public/
│   └── favicon.svg         # SVG monogram favicon
└── src/
    ├── main.jsx            # React root DOM mounting point
    ├── App.jsx             # Main container & state management
    ├── index.css           # Global typography & warm design system
    └── components/
        ├── Header.jsx      # Academic bar, search, and category chips
        ├── NoteForm.jsx    # Expandable note composition form
        ├── NoteCard.jsx    # Individual note display card with controls
        ├── EmptyState.jsx  # Context-aware empty/no-results indicator
        └── EditModal.jsx   # Accessible modal for updating note details
```

---

## 5. How to Run Locally

### Prerequisites
- Node.js (version 18 or newer)
- npm or yarn

### Step-by-Step Execution
1. Open terminal and navigate into this experiment's directory:
   ```bash
   cd Web_Development_Lab/Exp_07_React_Notes
   ```
2. Install project dependencies:
   ```bash
   npm install
   ```
3. Start the local Vite development server:
   ```bash
   npm run dev
   ```
4. Open the displayed local URL in your browser (typically `http://localhost:5173`).

### Production Build
To generate an optimized production bundle:
```bash
npm run build
```
The output will be placed in the `dist/` directory ready for deployment.

---

## 6. Expected Output
- A warm cream and terracotta styled Single Page Application loads in the browser.
- The top academic bar clearly displays the experiment number, student credentials, and course information.
- Pre-populated notes demonstrate Data Structures and Data Science topic notes.
- Submitting the form immediately appends a new card to the grid and saves it in `localStorage`.
- Pinning, editing, and deleting notes update the UI instantly without page refreshes.
