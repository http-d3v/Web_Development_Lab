import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import StatsBar from './components/StatsBar'
import TaskForm from './components/TaskForm'
import TaskCard from './components/TaskCard'
import EditTaskModal from './components/EditTaskModal'

const CATEGORIES = ['Data Structures', 'Data Science', 'DBMS', 'Web Development', 'Personal']

const INITIAL_LOCAL_TASKS = [
  {
    id: 'task-101',
    title: 'Complete Exp 12 MERN Stack Deployment & Documentation',
    description: 'Finalize full-stack MongoDB Express React Node task manager with CRUD operations and responsive UI.',
    category: 'Web Development',
    priority: 'High',
    status: 'In Progress',
    dueDate: '2026-11-15'
  },
  {
    id: 'task-102',
    title: 'Implement Linear Regression on Housing Dataset in Python',
    description: 'Perform feature engineering, min-max scaling, and compute MSE loss curve for Data Science lab evaluation.',
    category: 'Data Science',
    priority: 'High',
    status: 'Completed',
    dueDate: '2026-11-13'
  },
  {
    id: 'task-103',
    title: 'B-Tree and B+ Tree Indexing Theory Review',
    description: 'Study disk block access optimization and multi-level index fan-out for upcoming DBMS mid-semester test.',
    category: 'DBMS',
    priority: 'Medium',
    status: 'Pending',
    dueDate: '2026-11-18'
  },
  {
    id: 'task-104',
    title: 'Graph Traversal Algorithms: BFS & Dijkstra',
    description: 'Write clean C++ code for shortest path determination on weighted directed acyclic graphs.',
    category: 'Data Structures',
    priority: 'Medium',
    status: 'Completed',
    dueDate: '2026-11-10'
  }
]

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('mern_tasks_exp12')
      return saved ? JSON.parse(saved) : INITIAL_LOCAL_TASKS
    } catch {
      return INITIAL_LOCAL_TASKS
    }
  })

  const [statusFilter, setStatusFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [editingTask, setEditingTask] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Fetch tasks from backend API on mount
  useEffect(() => {
    async function fetchTasks() {
      setIsLoading(true)
      try {
        const res = await fetch('/api/tasks')
        if (res.ok) {
          const json = await res.json()
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            setTasks(json.data)
            localStorage.setItem('mern_tasks_exp12', JSON.stringify(json.data))
          }
        }
      } catch (err) {
        console.warn('Backend API unavailable, utilizing client storage:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchTasks()
  }, [])

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mern_tasks_exp12', JSON.stringify(tasks))
    } catch (e) {
      console.error(e)
    }
  }, [tasks])

  // Create Task
  const handleAddTask = async (taskData) => {
    const tempTask = { ...taskData, id: 'task-' + Date.now() }
    setTasks([tempTask, ...tasks])

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      })
      if (res.ok) {
        const json = await res.json()
        if (json.success && json.data) {
          setTasks(prev => [json.data, ...prev.filter(t => t.id !== tempTask.id)])
        }
      }
    } catch (err) {
      console.log('Saved locally:', err)
    }
  }

  // Update Status
  const handleUpdateStatus = async (id, newStatus) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t))

    try {
      await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
    } catch (err) {
      console.log('Updated locally:', err)
    }
  }

  // Save Edit
  const handleSaveEdit = async (updated) => {
    setTasks(tasks.map(t => t.id === updated.id ? updated : t))
    setEditingTask(null)

    try {
      await fetch(`/api/tasks/${updated.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      })
    } catch (err) {
      console.log('Edited locally:', err)
    }
  }

  // Delete Task
  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return
    setTasks(tasks.filter(t => t.id !== id))

    try {
      await fetch(`/api/tasks/${id}`, { method: 'DELETE' })
    } catch (err) {
      console.log('Deleted locally:', err)
    }
  }

  // Computed metrics
  const total = tasks.length
  const completed = tasks.filter(t => t.status === 'Completed').length
  const inProgress = tasks.filter(t => t.status === 'In Progress').length
  const pending = tasks.filter(t => t.status === 'Pending').length

  // Filter tasks
  const filteredTasks = tasks.filter(t => {
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter
    const q = searchQuery.toLowerCase().trim()
    const matchesQuery = !q || 
      t.title.toLowerCase().includes(q) || 
      (t.description && t.description.toLowerCase().includes(q)) ||
      t.category.toLowerCase().includes(q)
    return matchesStatus && matchesQuery
  })

  return (
    <div className="page-wrapper">
      <Header />

      <main className="app-container">
        <StatsBar 
          total={total} 
          completed={completed} 
          inProgress={inProgress} 
          pending={pending} 
        />

        <TaskForm onAddTask={handleAddTask} categories={CATEGORIES} />

        <div className="controls-bar">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search by title, subject, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-pills">
            {['All', 'Pending', 'In Progress', 'Completed'].map((st) => (
              <button
                key={st}
                className={`filter-pill ${statusFilter === st ? 'active' : ''}`}
                onClick={() => setStatusFilter(st)}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📋</div>
            <h3>No tasks match your criteria</h3>
            <p style={{ marginTop: '0.4rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Try clearing your search query or selecting a different status filter above.
            </p>
          </div>
        ) : (
          <div className="tasks-grid">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onUpdateStatus={handleUpdateStatus}
                onEdit={setEditingTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </main>

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onSave={handleSaveEdit}
          onClose={() => setEditingTask(null)}
          categories={CATEGORIES}
        />
      )}

      <footer>
        <p>
          &copy; 2026 Dev Kumar Tiwari &bull; 2nd Year B.Tech CSE (Data Science) &bull; Web Development Lab Exp 12 (MERN Stack)
        </p>
      </footer>
    </div>
  )
}
