/**
 * ============================================================================
 * EXPERIMENT 12: MERN STACK — TASK ROUTE CONTROLLERS
 * Student: Dev Kumar Tiwari (GitHub: @http-d3v | Vercel: @httpd3v)
 * Academic: 2nd Year B.Tech CSE (Data Science)
 * Course: Web Development Laboratory
 *
 * Architecture:
 *   - Primary: File-backed persistence via server/data/tasks.json
 *   - Fallback: In-memory store for read-only serverless environments (Vercel)
 *   CRUD: GET all, GET /:id, POST, PUT /:id, DELETE /:id
 * ============================================================================
 */

const express = require('express');
const router  = express.Router();
const fs      = require('fs');
const path    = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'tasks.json');

/* ─── Seed Data ───────────────────────────────────────────────────────────── */
const SEED_TASKS = [
  {
    id:          'task-101',
    title:       'Complete Exp 12 MERN Stack Deployment & Documentation',
    description: 'Finalize full-stack MongoDB Express React Node task manager with CRUD operations and responsive UI.',
    category:    'Web Development',
    priority:    'High',
    status:      'In Progress',
    dueDate:     '2026-11-15',
    createdAt:   '2026-11-14T09:30:00.000Z'
  },
  {
    id:          'task-102',
    title:       'Implement Linear Regression on Housing Dataset in Python',
    description: 'Perform feature engineering, min-max scaling, and compute MSE loss curve for Data Science lab evaluation.',
    category:    'Data Science',
    priority:    'High',
    status:      'Completed',
    dueDate:     '2026-11-13',
    createdAt:   '2026-11-12T14:15:00.000Z'
  },
  {
    id:          'task-103',
    title:       'B-Tree and B+ Tree Indexing Theory Review',
    description: 'Study disk block access optimization and multi-level index fan-out for upcoming DBMS mid-semester test.',
    category:    'DBMS',
    priority:    'Medium',
    status:      'Pending',
    dueDate:     '2026-11-18',
    createdAt:   '2026-11-13T11:00:00.000Z'
  },
  {
    id:          'task-104',
    title:       'Graph Traversal Algorithms: BFS & Dijkstra',
    description: 'Write clean C++ code for shortest path determination on weighted directed acyclic graphs.',
    category:    'Data Structures',
    priority:    'Medium',
    status:      'Completed',
    dueDate:     '2026-11-10',
    createdAt:   '2026-11-09T16:45:00.000Z'
  }
];

/* ─── In-Memory Store (serverless fallback) ───────────────────────────────── */
let inMemoryTasks = JSON.parse(JSON.stringify(SEED_TASKS));

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
function getTasks() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw    = fs.readFileSync(DATA_FILE, 'utf8');
      const parsed = JSON.parse(raw || '[]');
      if (Array.isArray(parsed) && parsed.length > 0) {
        inMemoryTasks = parsed;        // keep in-memory in sync
        return parsed;
      }
    }
  } catch (_) { /* fall through to in-memory */ }
  return inMemoryTasks;
}

function saveTasks(tasks) {
  inMemoryTasks = tasks;
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2), 'utf8');
  } catch (_) { /* read-only FS in serverless — in-memory already updated */ }
}

/* ─── GET /api/tasks ──────────────────────────────────────────────────────── */
/**
 * @route   GET /api/tasks
 * @desc    Return all tasks; supports ?status=, ?priority=, ?category=, ?search=
 * @access  Public
 */
router.get('/', (req, res) => {
  let tasks = [...getTasks()];
  const { status, priority, category, search } = req.query;

  if (status && status !== 'All') {
    tasks = tasks.filter(t => t.status.toLowerCase() === status.toLowerCase());
  }
  if (priority && priority !== 'All') {
    tasks = tasks.filter(t => t.priority.toLowerCase() === priority.toLowerCase());
  }
  if (category && category !== 'All') {
    tasks = tasks.filter(t => t.category.toLowerCase() === category.toLowerCase());
  }
  if (search) {
    const q = search.toLowerCase();
    tasks = tasks.filter(t =>
      t.title.toLowerCase().includes(q) ||
      (t.description && t.description.toLowerCase().includes(q))
    );
  }

  res.status(200).json({ success: true, count: tasks.length, data: tasks });
});

/* ─── GET /api/tasks/:id ──────────────────────────────────────────────────── */
/**
 * @route   GET /api/tasks/:id
 * @desc    Return a single task by ID
 * @access  Public
 */
router.get('/:id', (req, res) => {
  const task = getTasks().find(t => String(t.id) === String(req.params.id));
  if (!task) {
    return res.status(404).json({
      success: false,
      message: `Task with ID "${req.params.id}" was not found.`
    });
  }
  res.status(200).json({ success: true, data: task });
});

/* ─── POST /api/tasks ─────────────────────────────────────────────────────── */
/**
 * @route   POST /api/tasks
 * @desc    Create a new task record
 * @access  Public
 */
router.post('/', (req, res) => {
  const { title, description, category, priority, status, dueDate } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error: Task title is required.'
    });
  }

  const tasks   = getTasks();
  const newTask = {
    id:          'task-' + Date.now(),
    title:       title.trim(),
    description: description ? description.trim() : '',
    category:    category    || 'Web Development',
    priority:    priority    || 'Medium',
    status:      status      || 'Pending',
    dueDate:     dueDate     || '',
    createdAt:   new Date().toISOString()
  };

  tasks.unshift(newTask);
  saveTasks(tasks);

  res.status(201).json({
    success: true,
    message: 'Task successfully created.',
    data:    newTask
  });
});

/* ─── PUT /api/tasks/:id ──────────────────────────────────────────────────── */
/**
 * @route   PUT /api/tasks/:id
 * @desc    Update an existing task
 * @access  Public
 */
router.put('/:id', (req, res) => {
  const tasks = getTasks();
  const index = tasks.findIndex(t => String(t.id) === String(req.params.id));

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Task with ID "${req.params.id}" was not found.`
    });
  }

  const current = tasks[index];
  const { title, description, category, priority, status, dueDate } = req.body;

  tasks[index] = {
    ...current,
    title:       title       !== undefined ? title.trim()       : current.title,
    description: description !== undefined ? description.trim() : current.description,
    category:    category    || current.category,
    priority:    priority    || current.priority,
    status:      status      || current.status,
    dueDate:     dueDate     !== undefined ? dueDate            : current.dueDate,
    updatedAt:   new Date().toISOString()
  };

  saveTasks(tasks);

  res.status(200).json({
    success: true,
    message: 'Task updated successfully.',
    data:    tasks[index]
  });
});

/* ─── DELETE /api/tasks/:id ───────────────────────────────────────────────── */
/**
 * @route   DELETE /api/tasks/:id
 * @desc    Remove a task record permanently
 * @access  Public
 */
router.delete('/:id', (req, res) => {
  const tasks = getTasks();
  const index = tasks.findIndex(t => String(t.id) === String(req.params.id));

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Task with ID "${req.params.id}" was not found.`
    });
  }

  const deleted = tasks.splice(index, 1)[0];
  saveTasks(tasks);

  res.status(200).json({
    success: true,
    message: `Task "${deleted.title}" deleted successfully.`,
    data:    deleted
  });
});

module.exports = router;
