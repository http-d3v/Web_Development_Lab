# Experiment 08: Book Management RESTful API

**Student Name:** Dev Kumar Tiwari  
**Enrollment / Roll:** 2nd Year B.Tech Computer Science & Engineering (Data Science)  
**Academic Year:** 2nd Year (IV Semester)  
**Course:** Web Development Laboratory  
**GitHub Profile:** [@http-d3v](https://github.com/http-d3v)  
**Vercel Profile:** [@httpd3v](https://vercel.com/httpd3v)  
**Live URL:** [https://exp-08-book-api.vercel.app](https://exp-08-book-api.vercel.app)

---

## 1. Aim of the Experiment
To develop a complete, robust RESTful API in Node.js and Express.js implementing full Create, Read, Update, and Delete (CRUD) operations for a Book Management resource, adhering to proper HTTP methods, standard response status codes (200, 201, 400, 404, 500), payload validation, and an interactive testing client.

---

## 2. Technologies Used
- **Runtime Environment:** Node.js (v24 LTS)
- **Web Framework:** Express.js (v4.21)
- **Cross-Origin Resource Sharing:** `cors` middleware
- **Data Persistence:** In-memory structured JSON data store
- **Frontend / Client Tester:** Vanilla JavaScript, HTML5, CSS3 Custom Properties
- **Deployment Platform:** Vercel (Serverless Functions & Static Hosting)

---

## 3. REST API Specification

| Method | Endpoint | Description | Status Code | Sample Request Payload |
|:---:|:---|:---|:---:|:---|
| `GET` | `/api/books` | Retrieve all books (supports `?genre=`, `?author=`, `?search=`) | `200 OK` | None |
| `GET` | `/api/books/:id` | Fetch a single book by numeric ID | `200 OK` / `404 Not Found` | None |
| `POST` | `/api/books` | Create a new book record (validates title & author) | `201 Created` / `400 Bad Request` | `{"title":"CLRS","author":"Cormen"}` |
| `PUT` | `/api/books/:id` | Update properties of an existing book | `200 OK` / `404 Not Found` | `{"available":false}` |
| `DELETE` | `/api/books/:id` | Remove a book record by ID | `200 OK` / `404 Not Found` | None |

---

## 4. Key Features Implemented
- **Full CRUD Coverage:** All five core REST verbs fully realized with route parameter handling.
- **Strict HTTP Status Code Discipline:**
  - `200 OK` for successful fetches, updates, and removals.
  - `201 Created` for new resource allocations.
  - `400 Bad Request` for missing required parameters (title/author) or invalid ID types.
  - `404 Not Found` when requesting, updating, or deleting a non-existent ID.
- **Input Validation:** Enforces non-empty strings for titles and authors with meaningful JSON error feedback.
- **Interactive Testing Web Suite:** Built-in web client (`public/index.html`) featuring instant request presets, live status badges, latency timing, and formatted JSON output.
- **Query Parameter Filtering:** Real-time server-side search across genres, authors, and keywords.

---

## 5. File Structure
```text
Exp_08_Book_API/
├── server.js               # Express application entry, routes, and data store
├── package.json            # Dependencies (express, cors)
├── vercel.json             # Vercel serverless routing configuration
├── .gitignore              # Ignored dependencies & environment files
├── README.md               # Complete lab documentation
├── api/
│   └── index.js            # Serverless entry point for Vercel
└── public/
    ├── index.html          # Interactive REST documentation & tester
    ├── style.css           # Warm minimalist academic styling
    ├── app.js              # Client-side fetch & console execution logic
    └── favicon.svg         # Monogram SVG book icon
```

---

## 6. How to Run Locally

### Prerequisites
- Node.js (version 18 or newer)
- npm

### Execution Steps
1. Navigate to the experiment directory:
   ```bash
   cd Web_Development_Lab/Exp_08_Book_API
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Express server:
   ```bash
   npm start
   ```
4. Access the documentation and interactive tester at `http://localhost:3000`.

### Command Line Testing (cURL Examples)

```bash
# 1. Fetch all books
curl -X GET http://localhost:3000/api/books

# 2. Filter by genre
curl -X GET "http://localhost:3000/api/books?genre=Data%20Science"

# 3. Create a new book
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Speech and Language Processing","author":"Daniel Jurafsky","genre":"NLP","year":2024}'

# 4. Update book availability
curl -X PUT http://localhost:3000/api/books/1 \
  -H "Content-Type: application/json" \
  -d '{"available":false}'

# 5. Delete a book
curl -X DELETE http://localhost:3000/api/books/4
```

---

## 7. Expected Output
- Running `node server.js` binds to port 3000 with console confirmation.
- Direct browser navigation to `/api/books` produces a formatted JSON array of textbook records.
- Testing through the built-in UI displays instant status code badges (`200 OK`, `201 Created`, `400 Bad Request`), response payloads, and round-trip execution times in milliseconds.
