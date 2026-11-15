import React from 'react'

export default function TaskCard({ task, onUpdateStatus, onEdit, onDelete }) {
  const taskId = task.id || task._id || ''

  const getStatusClass = (status) => {
    switch (status) {
      case 'Completed': return 'completed'
      case 'In Progress': return 'in-progress'
      default: return 'pending'
    }
  }

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High': return 'priority-high'
      case 'Low': return 'priority-low'
      default: return 'priority-medium'
    }
  }

  return (
    <article className={`task-card ${getStatusClass(task.status)}`}>
      <div className="card-top">
        <h3 className="task-title">{task.title || 'Untitled Task'}</h3>
        <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
          {task.priority || 'Medium'}
        </span>
      </div>

      <p className="task-desc">{task.description || 'No additional notes provided.'}</p>

      <div className="card-meta">
        <span className="category-tag">{task.category || 'General'}</span>
        {task.dueDate && <span>Due: <strong>{task.dueDate}</strong></span>}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem' }}>
        <select
          className="status-select"
          value={task.status || 'Pending'}
          onChange={(e) => onUpdateStatus(taskId, e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <div className="card-controls">
          <button className="ctrl-btn" onClick={() => onEdit(task)}>
            Edit
          </button>
          <button className="ctrl-btn delete" onClick={() => onDelete(taskId)}>
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}
