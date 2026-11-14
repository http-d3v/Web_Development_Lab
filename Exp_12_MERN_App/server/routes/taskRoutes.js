const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'tasks.json');

// Helper to load tasks safely
function getTasks() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, '[]', 'utf8');
      return [];
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.error('Error reading tasks:', err);
    return [];
  }
}

// Helper to save tasks safely
function saveTasks(tasks) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving tasks:', err);
  }
}

/**
 * @route   GET /api/tasks
 * @desc    Get all tasks with optional filters (?status=, ?priority=, ?category=, ?search=)
 */
router.get('/', (req, res) => {
  let tasks = getTasks();
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

  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks
  });
});

/**
 * @route   GET /api/tasks/:id
 * @desc    Get single task by ID
 */
router.get('/:id', (req, res) => {
  const tasks = getTasks();
  const task = tasks.find(t => String(t.id) === String(req.params.id));

  if (!task) {
    return res.status(404).json({
      success: false,
      message: `Task with ID ${req.params.id} was not found.`
    });
  }

  res.status(200).json({ success: true, data: task });
});

/**
 * @route   POST /api/tasks
 * @desc    Create new task
 */
router.post('/', (req, res) => {
  const { title, description, category, priority, status, dueDate } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error: Task title is required.'
    });
  }

  const tasks = getTasks();
  const newTask = {
    id: 'task-' + Date.now(),
    title: title.trim(),
    description: description ? description.trim() : '',
    category: category || 'Web Development',
    priority: priority || 'Medium',
    status: status || 'Pending',
    dueDate: dueDate || '',
    createdAt: new Date().toISOString()
  };

  tasks.unshift(newTask);
  saveTasks(tasks);

  res.status(201).json({
    success: true,
    message: 'Task successfully created.',
    data: newTask
  });
});

/**
 * @route   PUT /api/tasks/:id
 * @desc    Update task details or status
 */
router.put('/:id', (req, res) => {
  const tasks = getTasks();
  const index = tasks.findIndex(t => String(t.id) === String(req.params.id));

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Task with ID ${req.params.id} was not found.`
    });
  }

  const current = tasks[index];
  const { title, description, category, priority, status, dueDate } = req.body;

  tasks[index] = {
    ...current,
    title: title !== undefined ? title.trim() : current.title,
    description: description !== undefined ? description.trim() : current.description,
    category: category || current.category,
    priority: priority || current.priority,
    status: status || current.status,
    dueDate: dueDate !== undefined ? dueDate : current.dueDate,
    updatedAt: new Date().toISOString()
  };

  saveTasks(tasks);

  res.status(200).json({
    success: true,
    message: 'Task updated successfully.',
    data: tasks[index]
  });
});

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Delete task by ID
 */
router.delete('/:id', (req, res) => {
  const tasks = getTasks();
  const index = tasks.findIndex(t => String(t.id) === String(req.params.id));

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Task with ID ${req.params.id} was not found.`
    });
  }

  const deleted = tasks.splice(index, 1)[0];
  saveTasks(tasks);

  res.status(200).json({
    success: true,
    message: `Task "${deleted.title}" deleted successfully.`,
    data: deleted
  });
});

module.exports = router;
