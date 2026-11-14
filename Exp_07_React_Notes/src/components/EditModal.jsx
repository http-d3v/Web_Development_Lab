import React, { useState } from 'react'

export default function EditModal({ note, onSave, onClose, categories }) {
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const [category, setCategory] = useState(note.category)

  const handleSave = (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return
    onSave({
      ...note,
      title: title.trim(),
      content: content.trim(),
      category
    })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h3 style={{ marginBottom: '1rem', fontFamily: 'var(--font-heading)', fontSize: '1.4rem' }}>
          Edit Note
        </h3>
        <form onSubmit={handleSave}>
          <input
            type="text"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="form-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            required
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
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Update Note
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
