import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [text, setText] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const q = text.trim()
    if (!q) return
    navigate(`/search/${encodeURIComponent(q)}?page=1`)
    setText('')
  }

  return (
    <nav className="navbar">
      <div className="container navbar-wrap">
        <div className="brand" onClick={() => navigate('/')} style={{cursor:'pointer'}}>
          <div className="logo" />
          <span>Ciniphile</span>
        </div>

        <div className="navlinks">
          <NavLink to="/" end>Popular</NavLink>
          <NavLink to="/top-rated">Top Rated</NavLink>
          <NavLink to="/upcoming">Upcoming</NavLink>
        </div>

        <form className="searchbar" onSubmit={handleSubmit}>
          <input
            placeholder="Search movies..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </nav>
  )
}