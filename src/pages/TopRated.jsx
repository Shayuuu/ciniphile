import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { fetchTopRated } from '../redux/movieSlice'
import MovieCard from '../components/MovieCard'
import Pagination from '../components/Pagination'
import Loader from '../components/Loader'

export default function TopRated() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const page = Number(params.get('page') || 1)
  const { items, total_pages, loading, error } = useSelector((s) => s.movies.topRated)

  useEffect(() => { dispatch(fetchTopRated(page)) }, [dispatch, page])
  const handleChange = (p) => navigate(`/top-rated?page=${p}`)

  return (
    <section>
      <h2>Top Rated</h2>
      {loading && <Loader />}
      {error && <div className="empty">Error: {error}</div>}
      {!loading && items?.length === 0 && <div className="empty">No movies found.</div>}
      <div className="grid">
        {items?.map((m) => <MovieCard key={m.id} movie={m} />)}
      </div>
      <Pagination page={page} totalPages={total_pages} onChange={handleChange} />
    </section>
  )
}