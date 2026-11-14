import React from 'react'

export default function NoteCard({ note, onDelete, onPin, onEdit }) {
  return (
    <article 
      className={`note-card ${note.pinned ? 'pinned' : ''}`}
      style={{ borderLeftColor: note.color || 'var(--accent)' }}
    >
      <div className="card-header">
        <h3 className="card-title">{note.title}</h3>
        <button 
          className={`pin-btn ${note.pinned ? 'active' : ''}`}
          onClick={() => onPin(note.id)}
          title={note.pinned ? "Unpin note" : "Pin note to top"}
          aria-label={note.pinned ? "Unpin note" : "Pin note to top"}
        >
          📌
        </button>
      </div>

      <p className="card-content">{note.content}</p>

      <div className="card-footer">
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span className="category-tag">{note.category}</span>
          <span>{note.createdAt}</span>
        </div>

        <div className="card-actions">
          <button 
            className="action-btn"
            onClick={() => onEdit(note)}
            title="Edit note"
          >
            Edit
          </button>
          <button 
            className="action-btn delete"
            onClick={() => onDelete(note.id)}
            title="Delete note"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}
