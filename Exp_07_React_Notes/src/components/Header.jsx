import React from 'react'

export default function Header({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory,
  categories,
  totalNotes,
  pinnedCount
}) {
  return (
    <header className="app-header">
      {/* Academic Announcement Bar */}
      <aside className="academic-bar" aria-label="Course Header">
        <div className="academic-content">
          <div className="academic-badge">
            <span>🎓 Web Development Lab &bull; Experiment 07: React Notes SPA</span>
          </div>
          <div className="academic-sub">
            <span>Dev Kumar Tiwari &bull; 2nd Year B.Tech CSE (Data Science) &bull; <a href="../index.html">&larr; Lab Index</a></span>
          </div>
        </div>
      </aside>

      <div className="app-container" style={{ marginBottom: 0, paddingBottom: 0 }}>
        <div className="header-top">
          <div>
            <h1 className="app-title">Study & Lab Notes</h1>
            <p className="app-subtitle">
              Single-page React application with useState, useEffect, category tagging, and local persistence.
            </p>
          </div>
          <div className="header-stats">
            <div className="stat-pill">Total: <strong>{totalNotes}</strong></div>
            <div className="stat-pill">Pinned: <strong>{pinnedCount}</strong></div>
          </div>
        </div>

        <div className="controls-bar">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              className="search-input"
              placeholder="Search notes by title or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search notes"
            />
          </div>

          <div className="category-chips">
            <button 
              className={`chip-btn ${selectedCategory === 'All' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('All')}
            >
              All Notes
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`chip-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
