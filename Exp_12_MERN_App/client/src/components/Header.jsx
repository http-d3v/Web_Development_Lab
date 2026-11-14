import React from 'react'

export default function Header() {
  return (
    <header className="app-header">
      {/* Top Academic Announcement Bar */}
      <aside className="academic-bar" aria-label="Course Header">
        <div className="academic-content">
          <div className="academic-badge">
            <span>🎓 Web Development Lab &bull; Experiment 12: MERN Stack Task Application</span>
          </div>
          <div className="academic-sub">
            <span>Dev Kumar Tiwari &bull; 2nd Year B.Tech CSE (Data Science) &bull; <a href="../index.html">&larr; Lab Index</a></span>
          </div>
        </div>
      </aside>

      <div className="app-container" style={{ marginBottom: 0, paddingBottom: 0 }}>
        <div className="header-top">
          <div>
            <h1 className="app-title">MERN Stack Task Orchestrator</h1>
            <p className="app-subtitle">
              Full-stack application combining React 18, Node.js, Express REST API architecture, and MongoDB data modeling for academic workflow management.
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
