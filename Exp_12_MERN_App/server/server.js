/**
 * ============================================================================
 * EXPERIMENT 12: MERN STACK TASK MANAGEMENT API SERVER
 * Student: Dev Kumar Tiwari (GitHub: @http-d3v | Vercel: @httpd3v)
 * Academic: 2nd Year B.Tech CSE (Data Science)
 * Course: Web Development Laboratory
 * Technology: Node.js, Express, MongoDB Architecture, React SPA Integration
 * ============================================================================
 */

try {
  require('dotenv').config();
} catch (_) {}
const express = require('express');
const cors = require('cors');
const path = require('path');

const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`[MERN Backend] ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api/tasks', taskRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'MERN Task Manager API',
    student: 'Dev Kumar Tiwari',
    academicYear: '2nd Year B.Tech CSE (Data Science)',
    timestamp: new Date().toISOString()
  });
});

// Serve frontend build in production
const clientBuildPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientBuildPath));

app.get('*', (req, res, next) => {
  if (req.url.startsWith('/api')) return next();
  const indexHtml = path.join(clientBuildPath, 'index.html');
  res.sendFile(indexHtml, (err) => {
    if (err) {
      res.status(200).send('MERN API Backend active. Frontend available on client port.');
    }
  });
});

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[Exp 12 MERN Server] Active on http://localhost:${PORT}`);
  });
}
