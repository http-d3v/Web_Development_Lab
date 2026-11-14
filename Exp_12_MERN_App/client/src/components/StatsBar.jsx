import React from 'react'

export default function StatsBar({ total, completed, inProgress, pending }) {
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <div className="stats-row">
      <div className="stat-card">
        <div className="stat-icon">📋</div>
        <div>
          <div className="stat-value">{total}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">⏳</div>
        <div>
          <div className="stat-value">{inProgress}</div>
          <div className="stat-label">In Progress</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">✅</div>
        <div>
          <div className="stat-value">{completed}</div>
          <div className="stat-label">Completed ({completionRate}%)</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">📌</div>
        <div>
          <div className="stat-value">{pending}</div>
          <div className="stat-label">Pending Action</div>
        </div>
      </div>
    </div>
  )
}
