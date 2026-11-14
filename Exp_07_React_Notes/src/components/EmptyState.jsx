import React from 'react'

export default function EmptyState({ isFiltered }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">📝</div>
      <h3>{isFiltered ? "No matching notes found" : "No notes yet"}</h3>
      <p style={{ marginTop: '0.4rem', fontSize: '0.9rem' }}>
        {isFiltered 
          ? "Try adjusting your search query or switching to another category filter."
          : "Add your first study note, lab reminder, or lecture concept above."}
      </p>
    </div>
  )
}
