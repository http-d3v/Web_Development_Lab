import React, { useState } from 'react'

const COLORS = [
  { name: 'Terracotta', hex: '#A25E3E' },
  { name: 'Olive Forest', hex: '#48604F' },
  { name: 'Warm Amber', hex: '#B88338' },
  { name: 'Slate Blue', hex: '#3E6685' },
  { name: 'Heather', hex: '#6A4C6E' },
]

export default function NoteForm({ onAddNote, categories }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState(categories[0] || 'General')
  const [color, setColor] = useState(COLORS[0].hex)
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    onAddNote({
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      category,
      color,
      pinned: false,
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    })

    setTitle('')
    setContent('')
    setIsOpen(false)
  }

  return (
    <div className="note-form-wrapper">
      {!isOpen ? (
        <div 
          onClick={() => setIsOpen(true)}
          style={{ 
            cursor: 'pointer', 
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.25rem 0'
          }}
        >
          <span>✍️</span>
          <span>Click to jot down a new note or task...</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-title">
            <span>✍️</span>
            <span>Compose New Academic Note</span>
          </div>
          
          <input
            type="text"
            className="form-input"
            placeholder="Note title (e.g., Graph Algorithms Lecture Summary)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            autoFocus
          />

          <textarea
            className="form-textarea"
            placeholder="Write note contents, code snippets, or key concepts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            required
          />

          <div className="form-row">
            <select
              className="form-select"
              style={{ width: 'auto', minWidth: '160px', marginBottom: 0 }}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <div className="color-picker">
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Color:</span>
              {COLORS.map((c) => (
                <button
                  type="button"
                  key={c.hex}
                  className={`color-option ${color === c.hex ? 'selected' : ''}`}
                  style={{ backgroundColor: c.hex }}
                  onClick={() => setColor(c.hex)}
                  title={c.name}
                  aria-label={c.name}
                />
              ))}
            </div>

            <button type="submit" className="btn-primary">
              Save Note
            </button>
            <button 
              type="button" 
              className="btn-secondary"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
