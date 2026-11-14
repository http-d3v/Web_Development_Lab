import React, { useState } from 'react'

export default function TaskForm({ onAddTask, categories }) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState(categories[0] || 'Web Development')
  const [priority, setPriority] = useState('Medium')
  const [status, setStatus] = useState('Pending')
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return

    onAddTask({
      title: title.trim(),
      description: description.trim(),
      category,
      priority,
      status,
      dueDate
    })

    setTitle('')
    setDescription('')
    setDueDate('')
    setIsOpen(false)
  }

  return (
    <div className="task-form-card">
      {!isOpen ? (
        <div 
          onClick={() => setIsOpen(true)}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-muted)' }}
        >
          <span style={{ fontSize: '1.2rem', color: 'var(--accent)' }}>➕</span>
          <span>Click here to register a new academic task or assignment...</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-head">
            <span>📝</span>
            <span>Create New Task Record (POST /api/tasks)</span>
          </div>

          <div className="form-grid">
            <input
              type="text"
              className="form-input"
              placeholder="Task title (e.g. Implement Dijkstra's Algorithm in C++)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
            />

            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <select
              className="form-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Priority: Low</option>
              <option value="Medium">Priority: Medium</option>
              <option value="High">Priority: High</option>
            </select>
          </div>

          <textarea
            className="form-textarea"
            placeholder="Detailed task description, problem statement, or submission link..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
              <span>Initial Status:</span>
              <select 
                className="form-select" 
                style={{ width: 'auto', marginBottom: 0 }}
                value={status} 
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
              <span>Due Date:</span>
              <input 
                type="date" 
                className="form-input" 
                style={{ width: 'auto', marginBottom: 0 }}
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <div className="form-actions" style={{ marginLeft: 'auto' }}>
              <button type="button" className="btn-secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Save Task
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}
