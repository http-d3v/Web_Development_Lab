/**
 * ============================================================================
 * EXPERIMENT 08: BOOK MANAGEMENT RESTFUL API
 * Student: Dev Kumar Tiwari (GitHub: @http-d3v | Vercel: @httpd3v)
 * Academic: 2nd Year B.Tech CSE (Data Science)
 * Course: Web Development Laboratory
 * Technology: Node.js, Express.js, REST Architecture, JSON Data Store
 * ============================================================================
 */

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// Serve static frontend documentation & API tester
app.use(express.static(path.join(__dirname, 'public')));

// In-Memory Data Store (Initial Academic Textbooks)
let books = [
  {
    id: 1,
    title: 'Introduction to Algorithms (CLRS)',
    author: 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein',
    genre: 'Data Structures & Algorithms',
    year: 2022,
    isbn: '978-0262046305',
    available: true
  },
  {
    id: 2,
    title: 'Database System Concepts',
    author: 'Abraham Silberschatz, Henry F. Korth, S. Sudarshan',
    genre: 'Database Systems',
    year: 2020,
    isbn: '978-0078022159',
    available: true
  },
  {
    id: 3,
    title: 'Python for Data Analysis',
    author: 'Wes McKinney',
    genre: 'Data Science',
    year: 2022,
    isbn: '978-1098104030',
    available: false
  },
  {
    id: 4,
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    genre: 'Distributed Systems',
    year: 2017,
    isbn: '978-1449373320',
    available: true
  }
];

// Helper to find next ID
function getNextId() {
  return books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
}

// ============================================================================
// RESTful API Routes
// ============================================================================

/**
 * @route   GET /api/books
 * @desc    Get all books with optional query filtering (?genre=, ?author=, ?search=)
 * @access  Public
 */
app.get('/api/books', (req, res) => {
  let result = [...books];
  const { genre, author, search } = req.query;

  if (genre) {
    result = result.filter(b => b.genre.toLowerCase().includes(genre.toLowerCase()));
  }

  if (author) {
    result = result.filter(b => b.author.toLowerCase().includes(author.toLowerCase()));
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(b =>
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.genre.toLowerCase().includes(q) ||
      (b.isbn && b.isbn.toLowerCase().includes(q))
    );
  }

  res.status(200).json({
    success: true,
    count: result.length,
    data: result
  });
});

/**
 * @route   GET /api/books/:id
 * @desc    Get a single book by ID
 * @access  Public
 */
app.get('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  if (isNaN(bookId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid book ID format. Must be an integer.'
    });
  }

  const book = books.find(b => b.id === bookId);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: `Book with ID ${bookId} was not found.`
    });
  }

  res.status(200).json({
    success: true,
    data: book
  });
});

/**
 * @route   POST /api/books
 * @desc    Create a new book record
 * @access  Public
 */
app.post('/api/books', (req, res) => {
  const { title, author, genre, year, isbn, available } = req.body;

  // Input Validation
  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error: "title" is required and must be non-empty.'
    });
  }

  if (!author || typeof author !== 'string' || !author.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error: "author" is required and must be non-empty.'
    });
  }

  const newBook = {
    id: getNextId(),
    title: title.trim(),
    author: author.trim(),
    genre: (genre && genre.trim()) || 'General',
    year: year ? parseInt(year, 10) : new Date().getFullYear(),
    isbn: isbn ? isbn.trim() : 'N/A',
    available: available !== undefined ? Boolean(available) : true
  };

  books.push(newBook);

  res.status(201).json({
    success: true,
    message: 'Book successfully created.',
    data: newBook
  });
});

/**
 * @route   PUT /api/books/:id
 * @desc    Update an existing book by ID
 * @access  Public
 */
app.put('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  if (isNaN(bookId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid book ID format. Must be an integer.'
    });
  }

  const index = books.findIndex(b => b.id === bookId);
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Book with ID ${bookId} was not found.`
    });
  }

  const { title, author, genre, year, isbn, available } = req.body;

  // Validation
  if (title !== undefined && (!title || !title.trim())) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error: "title" cannot be empty.'
    });
  }
  if (author !== undefined && (!author || !author.trim())) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error: "author" cannot be empty.'
    });
  }

  // Update fields
  const current = books[index];
  books[index] = {
    ...current,
    title: title ? title.trim() : current.title,
    author: author ? author.trim() : current.author,
    genre: genre ? genre.trim() : current.genre,
    year: year !== undefined ? parseInt(year, 10) : current.year,
    isbn: isbn !== undefined ? isbn.trim() : current.isbn,
    available: available !== undefined ? Boolean(available) : current.available
  };

  res.status(200).json({
    success: true,
    message: `Book ID ${bookId} updated successfully.`,
    data: books[index]
  });
});

/**
 * @route   DELETE /api/books/:id
 * @desc    Delete a book by ID
 * @access  Public
 */
app.delete('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  if (isNaN(bookId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid book ID format. Must be an integer.'
    });
  }

  const index = books.findIndex(b => b.id === bookId);
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Book with ID ${bookId} was not found.`
    });
  }

  const deletedBook = books.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: `Book "${deletedBook.title}" (ID: ${bookId}) successfully deleted.`,
    data: deletedBook
  });
});

// Export app for serverless / testing
module.exports = app;

// Start server if executed directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[Exp 08 Book REST API] Server active on http://localhost:${PORT}`);
  });
}
