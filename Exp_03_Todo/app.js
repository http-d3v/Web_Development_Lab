/**
 * ============================================================================
 * EXPERIMENT 03: INTERACTIVE TO-DO LIST APPLICATION
 * Course: B.Tech Computer Science & Engineering - Web Development Lab
 * File: app.js
 * Description: Client-side DOM manipulation, event handling, input validation,
 *              and LocalStorage persistence.
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Initial State & Sample Data
  // --------------------------------------------------------------------------
  const STORAGE_KEY = 'student_todo_tasks';

  // Realistic sample tasks pre-populated for examiners/first-time visitors
  const DEFAULT_TASKS = [
    {
      id: 'task-1',
      title: 'Prepare Web Development Lab record for Experiment 03',
      priority: 'High',
      category: 'Lab Record',
      dueDate: getFutureDate(1),
      completed: true,
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
      id: 'task-2',
      title: 'Revise Binary Search Trees and AVL Trees for DSA technical assessment',
      priority: 'High',
      category: 'Academics',
      dueDate: getFutureDate(2),
      completed: false,
      createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: 'task-3',
      title: 'Review Operating Systems process scheduling algorithms',
      priority: 'Medium',
      category: 'Academics',
      dueDate: getFutureDate(4),
      completed: false,
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
    },
    {
      id: 'task-4',
      title: 'Submit hostel mess preference form at administrative office',
      priority: 'Low',
      category: 'Personal',
      dueDate: getFutureDate(5),
      completed: false,
      createdAt: new Date().toISOString()
    }
  ];

  // Application state
  let tasks = loadTasksFromStorage();
  let currentFilter = 'all'; // 'all' | 'pending' | 'completed'
  let currentSearchQuery = '';
  let currentSort = 'newest';

  // --------------------------------------------------------------------------
  // 2. DOM Element Selectors
  // --------------------------------------------------------------------------
  const taskForm = document.getElementById('taskForm');
  const taskInput = document.getElementById('taskInput');
  const taskPriority = document.getElementById('taskPriority');
  const taskCategory = document.getElementById('taskCategory');
  const taskDueDate = document.getElementById('taskDueDate');
  const validationMessage = document.getElementById('validationMessage');
  const taskList = document.getElementById('taskList');
  const emptyState = document.getElementById('emptyState');
  const emptyTitle = document.getElementById('emptyTitle');
  const emptyDesc = document.getElementById('emptyDesc');

  // Metrics elements
  const totalTasksCount = document.getElementById('totalTasksCount');
  const pendingTasksCount = document.getElementById('pendingTasksCount');
  const completedTasksCount = document.getElementById('completedTasksCount');
  const progressPercent = document.getElementById('progressPercent');
  const progressBarFill = document.getElementById('progressBarFill');

  // Filter tabs & badges
  const filterTabs = document.querySelectorAll('.filter-tab');
  const badgeAll = document.getElementById('badgeAll');
  const badgePending = document.getElementById('badgePending');
  const badgeCompleted = document.getElementById('badgeCompleted');

  // Search & Controls
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');
  const clearCompletedBtn = document.getElementById('clearCompletedBtn');

  // Modal elements
  const editModal = document.getElementById('editModal');
  const editForm = document.getElementById('editForm');
  const editTaskId = document.getElementById('editTaskId');
  const editTaskTitle = document.getElementById('editTaskTitle');
  const editTaskPriority = document.getElementById('editTaskPriority');
  const editTaskCategory = document.getElementById('editTaskCategory');
  const editTaskDueDate = document.getElementById('editTaskDueDate');
  const editError = document.getElementById('editError');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const cancelEditBtn = document.getElementById('cancelEditBtn');

  // Toast
  const toastNotification = document.getElementById('toastNotification');

  // Header Date display
  initHeaderDate();

  // --------------------------------------------------------------------------
  // 3. LocalStorage Operations
  // --------------------------------------------------------------------------
  function loadTasksFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_TASKS));
        return [...DEFAULT_TASKS];
      }
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse tasks from localStorage:', e);
      return [...DEFAULT_TASKS];
    }
  }

  function saveTasksToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to save tasks to localStorage:', e);
      showToast('⚠️ Storage limit reached or localStorage disabled');
    }
  }

  // --------------------------------------------------------------------------
  // 4. Task CRUD Operations
  // --------------------------------------------------------------------------

  // Add Task
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const rawTitle = taskInput.value.trim();

    // Validation 1: Empty check
    if (!rawTitle) {
      showValidationError('Please enter a task description before adding.');
      taskInput.classList.add('invalid');
      taskInput.focus();
      return;
    }

    // Validation 2: Minimum length check
    if (rawTitle.length < 3) {
      showValidationError('Task description is too short (minimum 3 characters required).');
      taskInput.classList.add('invalid');
      taskInput.focus();
      return;
    }

    // Validation 3: Duplicate active task warning check
    const isDuplicate = tasks.some(
      (t) => !t.completed && t.title.toLowerCase() === rawTitle.toLowerCase()
    );
    if (isDuplicate) {
      showValidationError('An active task with this exact title already exists.');
      taskInput.classList.add('invalid');
      taskInput.focus();
      return;
    }

    // Clear validation error if valid
    clearValidationError();

    const newTask = {
      id: 'task-' + Date.now(),
      title: rawTitle,
      priority: taskPriority.value,
      category: taskCategory.value,
      dueDate: taskDueDate.value || null,
      completed: false,
      createdAt: new Date().toISOString()
    };

    tasks.unshift(newTask);
    saveTasksToStorage();
    render();

    // Reset input fields
    taskInput.value = '';
    taskDueDate.value = '';
    taskPriority.value = 'Medium';
    taskCategory.value = 'Academics';
    taskInput.focus();

    showToast('✓ Task added successfully');
  });

  // Toggle Task Completion
  function toggleTaskComplete(id) {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      task.completed = !task.completed;
      saveTasksToStorage();
      render();
      showToast(task.completed ? '✓ Task marked completed' : '↩ Task marked pending');
    }
  }

  // Delete Task
  function deleteTask(id) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    tasks = tasks.filter((t) => t.id !== id);
    saveTasksToStorage();
    render();
    showToast('🗑 Task removed');
  }

  // Clear Completed Tasks
  clearCompletedBtn.addEventListener('click', () => {
    const completedCount = tasks.filter((t) => t.completed).length;
    if (completedCount === 0) {
      showToast('No completed tasks to clear.');
      return;
    }

    if (confirm(`Are you sure you want to remove all ${completedCount} completed task(s)?`)) {
      tasks = tasks.filter((t) => !t.completed);
      saveTasksToStorage();
      render();
      showToast(`✓ Removed ${completedCount} completed task(s)`);
    }
  });

  // --------------------------------------------------------------------------
  // 5. Edit Modal Handling
  // --------------------------------------------------------------------------
  function openEditModal(id) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    editTaskId.value = task.id;
    editTaskTitle.value = task.title;
    editTaskPriority.value = task.priority;
    editTaskCategory.value = task.category;
    editTaskDueDate.value = task.dueDate || '';

    editError.style.display = 'none';
    editTaskTitle.classList.remove('invalid');
    editModal.style.display = 'flex';
    editTaskTitle.focus();
  }

  function closeEditModal() {
    editModal.style.display = 'none';
  }

  closeModalBtn.addEventListener('click', closeEditModal);
  cancelEditBtn.addEventListener('click', closeEditModal);

  // Close modal when clicking outside dialog
  editModal.addEventListener('click', (e) => {
    if (e.target === editModal) closeEditModal();
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && editModal.style.display === 'flex') {
      closeEditModal();
    }
  });

  editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = editTaskId.value;
    const newTitle = editTaskTitle.value.trim();

    if (!newTitle || newTitle.length < 3) {
      editError.style.display = 'block';
      editTaskTitle.classList.add('invalid');
      editTaskTitle.focus();
      return;
    }

    const task = tasks.find((t) => t.id === id);
    if (task) {
      task.title = newTitle;
      task.priority = editTaskPriority.value;
      task.category = editTaskCategory.value;
      task.dueDate = editTaskDueDate.value || null;

      saveTasksToStorage();
      render();
      closeEditModal();
      showToast('✓ Task updated');
    }
  });

  // --------------------------------------------------------------------------
  // 6. Filtering & Searching
  // --------------------------------------------------------------------------
  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      currentFilter = tab.getAttribute('data-filter');
      render();
    });
  });

  searchInput.addEventListener('input', (e) => {
    currentSearchQuery = e.target.value.trim().toLowerCase();
    render();
  });

  sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    render();
  });

  // Real-time input error removal
  taskInput.addEventListener('input', () => {
    if (taskInput.value.trim().length >= 3) {
      clearValidationError();
    }
  });

  // --------------------------------------------------------------------------
  // 7. Rendering Logic
  // --------------------------------------------------------------------------
  function render() {
    updateMetrics();

    // Filter tasks
    let filtered = tasks.filter((task) => {
      if (currentFilter === 'pending' && task.completed) return false;
      if (currentFilter === 'completed' && !task.completed) return false;
      if (currentSearchQuery) {
        const matchesTitle = task.title.toLowerCase().includes(currentSearchQuery);
        const matchesCategory = task.category.toLowerCase().includes(currentSearchQuery);
        if (!matchesTitle && !matchesCategory) return false;
      }
      return true;
    });

    // Sort tasks
    filtered.sort((a, b) => {
      if (currentSort === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (currentSort === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      if (currentSort === 'priority') {
        const priorityWeight = { High: 3, Medium: 2, Low: 1 };
        return priorityWeight[b.priority] - priorityWeight[a.priority];
      }
      if (currentSort === 'alphabetical') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    // Render list or empty state
    if (filtered.length === 0) {
      taskList.innerHTML = '';
      emptyState.style.display = 'block';

      if (currentSearchQuery) {
        emptyTitle.textContent = 'No matching tasks found';
        emptyDesc.textContent = `No tasks matched your search query "${currentSearchQuery}".`;
      } else if (currentFilter === 'pending') {
        emptyTitle.textContent = 'All caught up! 🎉';
        emptyDesc.textContent = 'You have zero pending tasks on your schedule.';
      } else if (currentFilter === 'completed') {
        emptyTitle.textContent = 'No completed tasks yet';
        emptyDesc.textContent = 'Check off tasks as you finish them to track your progress.';
      } else {
        emptyTitle.textContent = 'Your task list is empty';
        emptyDesc.textContent = 'Add your first task above to organize your study schedule.';
      }
    } else {
      emptyState.style.display = 'none';
      taskList.innerHTML = filtered.map((task) => createTaskHTML(task)).join('');
      attachTaskEvents();
    }
  }

  function createTaskHTML(task) {
    const isOverdue = task.dueDate && !task.completed && isDatePast(task.dueDate);
    const dueDateFormatted = task.dueDate ? formatDueDate(task.dueDate) : null;

    return `
      <li class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
        <div class="task-left">
          <div class="task-checkbox-wrap">
            <input 
              type="checkbox" 
              class="task-checkbox" 
              id="chk-${task.id}" 
              ${task.completed ? 'checked' : ''} 
              aria-label="Mark task as ${task.completed ? 'pending' : 'completed'}"
            />
          </div>
          <div class="task-body">
            <span class="task-title">${escapeHTML(task.title)}</span>
            <div class="task-tags">
              <span class="task-tag priority-${task.priority}">
                ${task.priority === 'High' ? '🔴' : task.priority === 'Medium' ? '🟡' : '🟢'} ${task.priority}
              </span>
              <span class="task-tag category-tag">${escapeHTML(task.category)}</span>
              ${
                dueDateFormatted
                  ? `<span class="task-tag due-tag ${isOverdue ? 'overdue' : ''}">
                      📅 ${dueDateFormatted} ${isOverdue ? '(Overdue)' : ''}
                    </span>`
                  : ''
              }
            </div>
          </div>
        </div>

        <div class="task-actions">
          <button class="action-btn edit-btn" title="Edit task" aria-label="Edit task">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 2a1.414 1.414 0 0 1 2 2L5 12l-3 1 1-3 8-8z"/>
            </svg>
          </button>
          <button class="action-btn delete-btn" title="Delete task" aria-label="Delete task">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="13" y1="3" x2="3" y2="13"/>
              <line x1="3" y1="3" x2="13" y2="13"/>
            </svg>
          </button>
        </div>
      </li>
    `;
  }

  function attachTaskEvents() {
    taskList.querySelectorAll('.task-item').forEach((item) => {
      const id = item.getAttribute('data-id');

      // Checkbox click
      const checkbox = item.querySelector('.task-checkbox');
      checkbox?.addEventListener('change', () => toggleTaskComplete(id));

      // Edit click
      const editBtn = item.querySelector('.edit-btn');
      editBtn?.addEventListener('click', () => openEditModal(id));

      // Delete click
      const deleteBtn = item.querySelector('.delete-btn');
      deleteBtn?.addEventListener('click', () => deleteTask(id));
    });
  }

  // --------------------------------------------------------------------------
  // 8. Metrics & Counters
  // --------------------------------------------------------------------------
  function updateMetrics() {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    totalTasksCount.textContent = total;
    pendingTasksCount.textContent = pending;
    completedTasksCount.textContent = completed;
    progressPercent.textContent = `${percentage}%`;

    progressBarFill.style.width = `${percentage}%`;
    const track = document.querySelector('.progress-bar-track');
    if (track) {
      track.setAttribute('aria-valuenow', percentage);
    }

    // Filter badge counters
    badgeAll.textContent = total;
    badgePending.textContent = pending;
    badgeCompleted.textContent = completed;
  }

  // --------------------------------------------------------------------------
  // 9. Helper Utilities
  // --------------------------------------------------------------------------
  function showValidationError(message) {
    validationMessage.textContent = message;
    validationMessage.style.display = 'block';
  }

  function clearValidationError() {
    validationMessage.style.display = 'none';
    taskInput.classList.remove('invalid');
  }

  let toastTimeout;
  function showToast(message) {
    if (!toastNotification) return;
    toastNotification.textContent = message;
    toastNotification.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 2500);
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, (tag) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  function getFutureDate(daysAhead) {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    return d.toISOString().split('T')[0];
  }

  function isDatePast(dateStr) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(dateStr + 'T00:00:00');
    return target < today;
  }

  function formatDueDate(dateStr) {
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  }

  function initHeaderDate() {
    const now = new Date();
    const dayElement = document.getElementById('currentDay');
    const fullElement = document.getElementById('currentDateFormatted');

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    if (dayElement) dayElement.textContent = days[now.getDay()];

    if (fullElement) {
      fullElement.textContent = now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
  }

  // Initial render
  render();
});
