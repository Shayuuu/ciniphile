import React from 'react'
import { Link } from 'react-router-dom'
import { IMG_BASE } from '../redux/movieSlice'

export default function MovieCard({ movie }) {
  const poster = movie.poster_path ? (IMG_BASE + movie.poster_path) : 'https://via.placeholder.com/500x750?text=No+Image'

  return (
    <Link to={`/movie/${movie.id}`} className="card" aria-label={movie.title}>
      <img className="poster" src={poster} alt={movie.title} loading="lazy" />
      <div className="card-body">
        <div className="title">{movie.title}</div>
        <div className="meta">
          <span className="badge">⭐ {movie.vote_average?.toFixed(1)}</span>
          {movie.release_date ? <span>{movie.release_date}</span> : null}
          {movie.original_language ? <span>Lang: {movie.original_language.toUpperCase()}</span> : null}
        </div>
      </div>
    </Link>
  )
}