import React from 'react'

export default function Pagination({ page, totalPages, onChange }) {
  const current = Number(page) || 1
  const total = Math.min(totalPages || 1, 500) // TMDB caps at 500

  const canPrev = current > 1
  const canNext = current < total

  const pages = []
  const start = Math.max(1, current - 2)
  const end = Math.min(total, current + 2)
  for (let i = start; i <= end; i++) pages.push(i)

  return (
    <div className="pagination">
      <button disabled={!canPrev} onClick={() => onChange(1)}>« First</button>
      <button disabled={!canPrev} onClick={() => onChange(current - 1)}>‹ Prev</button>
      {pages.map((p) => (
        <button
          key={p}
          className={`page ${p === current ? 'active' : ''}`}
          onClick={() => onChange(p)}
        >
          {p}
        </button>
      ))}
      <button disabled={!canNext} onClick={() => onChange(current + 1)}>Next ›</button>
      <button disabled={!canNext} onClick={() => onChange(total)}>Last »</button>
    </div>
  )
}