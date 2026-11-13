# Experiment 03: Interactive To-Do List Application

**Course:** B.Tech Computer Science & Engineering — Web Development Laboratory  
**Author:** Dev Kumar Tiwari ([@http-d3v](https://github.com/http-d3v))  
**Academic Year:** 3rd Year (VI Semester)  
**Live URL:** [https://exp-03-todo.vercel.app](https://exp-03-todo.vercel.app)  
**GitHub Repository:** [https://github.com/http-d3v/Web_Development_Lab](https://github.com/http-d3v/Web_Development_Lab)  

---

## 1. Aim
To design and develop an interactive, responsive task management application using HTML5, CSS3, vanilla JavaScript DOM manipulation, and the Web Storage API (`localStorage`) to manage student tasks with full CRUD operations, input validation, and real-time metrics.

---

## 2. Technologies Used
- **HTML5:** Semantic form inputs (`<input type="text">`, `<select>`, `<input type="date">`, `<button>`), accessible modal dialogues (`role="dialog"`, `aria-modal="true"`), and progress bars (`role="progressbar"`).
- **CSS3:**
  - CSS custom properties (variables) for a warm student-made palette:
    - Cream Base: `#FDFBF7`
    - Soft Surface: `#F4EFE6`
    - Charcoal: `#2C2522`
    - Terracotta Accent: `#A25E3E`
    - Olive Status: `#48604F`
    - Warm Amber: `#B88338`
  - Responsive flexbox and grid layouts.
  - Custom styled accessible checkboxes and badge states.
  - Backdrop blur modal dialogs.
- **Vanilla JavaScript (ES6+):**
  - DOM tree traversal and dynamic element rendering (`document.getElementById`, `innerHTML`, `createElement`, `dataset`).
  - Event-driven architecture (`submit`, `click`, `input`, `change`, `keydown`).
  - Web Storage API (`localStorage.getItem`, `localStorage.setItem`, `JSON.stringify`, `JSON.parse`).
  - Array higher-order methods (`filter`, `map`, `sort`, `some`, `unshift`).

---

## 3. Features Implemented

1. **Full CRUD Task Lifecycle:**
   - **Create:** Add new task with title, priority (High, Medium, Low), category (Academics, Lab Record, Project, Personal), and optional due date.
   - **Read:** Live rendering of tasks with priority tags, category badges, and overdue indicators.
   - **Update:** Toggle completion state with immediate strike-through, or edit task title, priority, and date via an interactive modal.
   - **Delete:** Remove individual tasks or batch delete all completed items with confirmation.

2. **Input Validation:**
   - Prevents empty or whitespace-only submissions.
   - Enforces a 3-character minimum description.
   - Detects and warns against duplicate active tasks.
   - Clears error states automatically as the student types.

3. **Persistent Local Storage:**
   - All tasks, completion statuses, and metadata persist across browser refreshes.
   - Pre-populates 4 realistic student academic tasks if storage is empty for instant examiner evaluation.

4. **Dynamic Metrics & Progress Bar:**
   - Real-time counters: Total Tasks, Pending Tasks, Completed Tasks.
   - Animated completion percentage progress bar.

5. **Search, Filtering & Sorting:**
   - Filter by status tabs: **All**, **Pending**, and **Completed** with live counter badges.
   - Real-time search query matching across task titles and categories.
   - Sort dropdown: Newest First, Oldest First, By Priority (High to Low), and Alphabetical (A to Z).

6. **Keyboard & Accessibility Support:**
   - Submitting with `Enter` key.
   - Closing modals with `Escape` key.
   - Accessible ARIA attributes (`aria-expanded`, `aria-selected`, `aria-label`).

---

## 4. File Structure

```text
Exp_03_Todo/
├── assets/
│   └── favicon.svg           # Custom checklist monogram favicon
├── index.html                # Semantic HTML5 application layout
├── style.css                 # Custom CSS3 styles, variables & media queries
├── app.js                    # DOM manipulation, CRUD & localStorage logic
├── .gitignore                # Git ignore configuration
└── README.md                 # Complete experiment documentation & viva Q&A
```

---

## 5. How to Run Locally

### Option A: Direct Browser Opening
1. Navigate to `Web_Development_Lab/Exp_03_Todo/`.
2. Double-click `index.html` to open in any modern browser (Chrome, Edge, Firefox, Safari).

### Option B: VS Code Live Server
1. Open the folder in VS Code.
2. Right-click `index.html` &rarr; **Open with Live Server**.

### Option C: Python HTTP Server
```bash
cd Web_Development_Lab/Exp_03_Todo
python -m http.server 3000
```
Open `http://localhost:3000` in your web browser.

---

## 6. Expected Output

- **Initial Load:** Displays the header date, 4 pre-populated academic tasks, statistics cards (e.g. 1 completed, 3 pending, 25% progress), and filter tabs.
- **Adding Task:** Submitting a valid title adds the item at the top of the list, updates all counters and the progress bar, and logs to `localStorage`.
- **Toggling Task:** Clicking the checkbox toggles completion, updates the strikethrough styling, and updates the progress percentage.
- **Editing Task:** Clicking the edit icon opens the modal populated with current task values; saving updates the item dynamically.
- **Deleting Task:** Deletes the task from memory and `localStorage`, refreshing the counter.

---

## 7. Viva Voce Questions & Answers

**Q1: What is the DOM (Document Object Model)?**  
*Answer:* The DOM is a platform- and language-neutral programming interface representing an HTML or XML document as a tree structure where each node corresponds to an object or element. It enables JavaScript to inspect, manipulate, create, and remove document content, styles, and attributes dynamically.

**Q2: What is the difference between `localStorage` and `sessionStorage`?**  
*Answer:* Both belong to the HTML5 Web Storage API and store data as key-value string pairs on the client side (typically up to 5MB). However, `localStorage` persists data indefinitely until explicitly cleared by the user or script, whereas `sessionStorage` data is cleared automatically when the browser tab or window is closed.

**Q3: Why are `JSON.stringify()` and `JSON.parse()` required when working with `localStorage`?**  
*Answer:* The `localStorage` API only accepts strings as keys and values. Complex data structures like JavaScript objects or arrays must be converted to a serialized string using `JSON.stringify(data)` before saving, and deserialized back into a native object/array using `JSON.parse(string)` upon retrieval.

**Q4: What is Event Delegation and why is it useful in a dynamic list?**  
*Answer:* Event delegation is a design pattern where an event listener is placed on a parent container rather than individually on every child element. Leveraging event bubbling, the parent handles events triggered by existing or newly created dynamic elements (`e.target`), saving memory and eliminating the need to re-bind event listeners when elements are added or removed.

**Q5: What is the difference between `innerHTML` and `textContent`?**  
*Answer:* `textContent` retrieves or sets the raw text content of a node without parsing HTML tags, making it safer against Cross-Site Scripting (XSS). `innerHTML` parses strings as HTML elements, allowing dynamic creation of HTML structure, but user inputs must be sanitized or escaped beforehand.
