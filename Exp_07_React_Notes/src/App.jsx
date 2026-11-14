import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import NoteForm from './components/NoteForm'
import NoteCard from './components/NoteCard'
import EmptyState from './components/EmptyState'
import EditModal from './components/EditModal'

const CATEGORIES = ['Data Structures', 'Data Science', 'Web Dev Lab', 'DBMS', 'Exam Prep']

const INITIAL_NOTES = [
  {
    id: 'note-1',
    title: 'Balanced Binary Search Trees & AVL Rotations',
    content: 'An AVL tree maintains height balance where |h_left - h_right| <= 1. Four rotation types: LL (right rotate), RR (left rotate), LR (left-then-right), RL (right-then-left). Essential for worst-case O(log n) searches.',
    category: 'Data Structures',
    color: '#A25E3E',
    pinned: true,
    createdAt: 'Nov 12, 2026'
  },
  {
    id: 'note-2',
    title: 'Pandas Vectorization vs Apply Performance',
    content: 'Always prefer vectorized operations in Pandas/NumPy over .apply() and iterrows(). Vectorized ops execute in compiled C code at 10x-100x speedups for large datasets in 2nd year data science assignments.',
    category: 'Data Science',
    color: '#48604F',
    pinned: true,
    createdAt: 'Nov 13, 2026'
  },
  {
    id: 'note-3',
    title: 'Web Dev Lab Exp 07 — React State Management',
    content: 'Components re-render when state changes via useState setter. Lift state up to common ancestor (App.jsx) when sibling components need access to the same dataset.',
    category: 'Web Dev Lab',
    color: '#3E6685',
    pinned: false,
    createdAt: 'Nov 14, 2026'
  }
]

export default function App() {
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('btech_cse_notes_exp07')
      return saved ? JSON.parse(saved) : INITIAL_NOTES
    } catch {
      return INITIAL_NOTES
    }
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [editingNote, setEditingNote] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem('btech_cse_notes_exp07', JSON.stringify(notes))
    } catch (e) {
      console.error('Failed to save to localStorage:', e)
    }
  }, [notes])

  const handleAddNote = (newNote) => {
    setNotes([newNote, ...notes])
  }

  const handleDeleteNote = (id) => {
    if (window.confirm('Delete this note permanently?')) {
      setNotes(notes.filter((n) => n.id !== id))
    }
  }

  const handlePinNote = (id) => {
    setNotes(notes.map((n) => n.id === id ? { ...n, pinned: !n.pinned } : n))
  }

  const handleSaveEdit = (updatedNote) => {
    setNotes(notes.map((n) => n.id === updatedNote.id ? updatedNote : n))
    setEditingNote(null)
  }

  // Filter notes
  const filteredNotes = notes
    .filter((n) => {
      const matchesCategory = selectedCategory === 'All' || n.category === selectedCategory
      const query = searchQuery.toLowerCase().trim()
      const matchesSearch = !query || 
        n.title.toLowerCase().includes(query) || 
        n.content.toLowerCase().includes(query)
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      // Pinned first
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1
      return 0
    })

  const totalNotes = notes.length
  const pinnedCount = notes.filter((n) => n.pinned).length

  return (
    <div className="page-wrapper">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={CATEGORIES}
        totalNotes={totalNotes}
        pinnedCount={pinnedCount}
      />

      <main className="app-container">
        <NoteForm onAddNote={handleAddNote} categories={CATEGORIES} />

        {filteredNotes.length === 0 ? (
          <EmptyState isFiltered={searchQuery.length > 0 || selectedCategory !== 'All'} />
        ) : (
          <div className="notes-grid">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={handleDeleteNote}
                onPin={handlePinNote}
                onEdit={setEditingNote}
              />
            ))}
          </div>
        )}
      </main>

      {editingNote && (
        <EditModal
          note={editingNote}
          onSave={handleSaveEdit}
          onClose={() => setEditingNote(null)}
          categories={CATEGORIES}
        />
      )}

      <footer>
        <p>
          &copy; 2026 Dev Kumar Tiwari &bull; 2nd Year B.Tech CSE (Data Science) &bull; Web Development Lab Exp 07
        </p>
      </footer>
    </div>
  )
}
