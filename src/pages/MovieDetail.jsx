import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchMovieCredits, fetchMovieDetail, IMG_BASE } from '../redux/movieSlice'
import Loader from '../components/Loader'

export default function MovieDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((s) => s.movies.detail)
  const { cast, loading: castLoading } = useSelector((s) => s.movies.credits)

  useEffect(() => {
    dispatch(fetchMovieDetail(id))
    dispatch(fetchMovieCredits(id))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [dispatch, id])

  if (loading) return <Loader />
  if (error) return <div className="empty">Error: {error}</div>
  if (!data) return null

  const poster = data.poster_path ? (IMG_BASE + data.poster_path) : 'https://via.placeholder.com/500x750?text=No+Image'
  const genres = (data.genres || []).map(g => g.name).join(', ')

  return (
    <section className="detail">
      <div className="detail-hero">
        <img src={poster} alt={data.title} />
        <div>
          <h1 className="detail-title">{data.title}</h1>
          <p className="detail-sub">
            {data.release_date} • {data.runtime} mins • {genres || '—'}
          </p>
          <p style={{marginTop: 12}}>{data.overview || 'No overview available.'}</p>
          <div style={{marginTop: 12}} className="meta">
            <span className="badge">⭐ {data.vote_average?.toFixed(1)}</span>
            <span className="badge">Votes {data.vote_count}</span>
            {data.spoken_languages?.length ? <span>Languages: {data.spoken_languages.map(l=>l.english_name).join(', ')}</span> : null}
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Cast</h3>
        {castLoading && <Loader text="Loading cast..." />}
        <div className="cast-grid">
          {cast?.slice(0, 18).map((c) => {
            const img = c.profile_path ? (IMG_BASE + c.profile_path) : 'https://via.placeholder.com/400x600?text=No+Image'
            return (
              <div key={c.cast_id || c.credit_id} className="cast-card">
                <img src={img} alt={c.name} loading="lazy" />
                <div className="c-body">
                  <div className="name">{c.name}</div>
                  <div className="role">{c.character || '—'}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}