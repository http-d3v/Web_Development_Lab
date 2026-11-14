/**
 * ============================================================================
 * EXPERIMENT 09: USER AUTHENTICATION & AUTHORIZATION SYSTEM
 * Student: Dev Kumar Tiwari (GitHub: @http-d3v | Vercel: @httpd3v)
 * Academic: 2nd Year B.Tech CSE (Data Science)
 * Course: Web Development Laboratory
 * Technology: Node.js, Express, JWT, bcryptjs, dotenv, JSON data store
 * ============================================================================
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const verifyToken = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'webdevlab_btech_cseds_2026_jwtsecret';
const DATA_FILE = path.join(__dirname, 'data', 'users.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend
app.use(express.static(path.join(__dirname, 'public')));

// Helper to read users
function readUsers() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, '[]', 'utf8');
      return [];
    }
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading users data:', err);
    return [];
  }
}

// Helper to write users
function writeUsers(users) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing users data:', err);
  }
}

// ============================================================================
// Authentication Routes
// ============================================================================

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user account with hashed password and return JWT
 * @access  Public
 */
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Name is required.' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Email address is required.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
    }

    const users = readUsers();
    const normalizedEmail = email.trim().toLowerCase();

    // Check existing email
    const existingUser = users.find(u => u.email.toLowerCase() === normalizedEmail);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email address already exists. Please log in.'
      });
    }

    // Hash password with salt rounds = 10
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      name: name.trim(),
      email: normalizedEmail,
      role: (role && role.trim()) || 'Student',
      program: '2nd Year B.Tech CSE (Data Science)',
      passwordHash,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    writeUsers(users);

    // Issue JWT token (expires in 2 hours)
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(201).json({
      success: true,
      message: 'Account successfully registered.',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        program: newUser.program,
        createdAt: newUser.createdAt
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ success: false, message: 'Internal server error during registration.' });
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user credentials and issue JWT
 * @access  Public
 */
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Both email and password are required.'
      });
    }

    const users = readUsers();
    const normalizedEmail = email.trim().toLowerCase();
    const user = users.find(u => u.email.toLowerCase() === normalizedEmail);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials: User not found.'
      });
    }

    // Compare bcrypt hash
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials: Password incorrect.'
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        program: user.program || '2nd Year B.Tech CSE (Data Science)'
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Internal server error during login.' });
  }
});

/**
 * @route   GET /api/auth/profile
 * @desc    Fetch authenticated user profile details
 * @access  Private (Requires valid JWT in Authorization header)
 */
app.get('/api/auth/profile', verifyToken, (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.id === req.user.id);

  if (!user) {
    return res.status(404).json({ success: false, message: 'User record not found.' });
  }

  res.status(200).json({
    success: true,
    message: 'Profile retrieved successfully.',
    profile: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      program: user.program || '2nd Year B.Tech CSE (Data Science)',
      createdAt: user.createdAt,
      tokenClaims: req.user
    }
  });
});

/**
 * @route   GET /api/auth/protected-resource
 * @desc    Example protected lab data endpoint
 * @access  Private
 */
app.get('/api/auth/protected-resource', verifyToken, (req, res) => {
  res.status(200).json({
    success: true,
    message: `Access granted to confidential lab grades for ${req.user.name}.`,
    data: {
      labCourse: 'Web Development Laboratory (Exp 02 - 12)',
      enrolledStudent: req.user.name,
      academicYear: '2nd Year (IV Semester)',
      specialization: 'CSE (Data Science)',
      status: 'Enrolled & Verified',
      issuedAt: new Date().toISOString()
    }
  });
});

/**
 * @route   POST /api/auth/logout
 * @desc    Logout confirmation (instructs client to purge token)
 * @access  Public
 */
app.post('/api/auth/logout', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logout successful. Client must remove the stored JWT.'
  });
});

// Export app for serverless / testing
module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[Exp 09 Authentication Server] Listening on http://localhost:${PORT}`);
  });
}
