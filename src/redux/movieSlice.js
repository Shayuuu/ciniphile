import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_KEY = 'c45a857c193f6302f2b5061c3b85e743'
const BASE_URL = 'https://api.themoviedb.org/3'

const initialListState = { items: [], page: 1, total_pages: 1, total_results: 0, loading: false, error: null }
const initialState = {
  popular: { ...initialListState },
  topRated: { ...initialListState },
  upcoming: { ...initialListState },
  search: { ...initialListState, query: '' },
  detail: { data: null, loading: false, error: null },
  credits: { cast: [], loading: false, error: null }
}

const listFetcher = async (endpoint, page=1, query='') => {
  const params = { api_key: API_KEY, language: 'en-US', page }
  if (query) params.query = query
  const { data } = await axios.get(`${BASE_URL}${endpoint}`, { params })
  return data
}

// Thunks
export const fetchPopular = createAsyncThunk('movies/fetchPopular', async (page=1) => {
  return await listFetcher('/movie/popular', page)
})
export const fetchTopRated = createAsyncThunk('movies/fetchTopRated', async (page=1) => {
  return await listFetcher('/movie/top_rated', page)
})
export const fetchUpcoming = createAsyncThunk('movies/fetchUpcoming', async (page=1) => {
  return await listFetcher('/movie/upcoming', page)
})
export const fetchSearch = createAsyncThunk('movies/fetchSearch', async ({ query, page=1 }) => {
  return await listFetcher('/search/movie', page, query)
})
export const fetchMovieDetail = createAsyncThunk('movies/fetchMovieDetail', async (movieId) => {
  const { data } = await axios.get(`${BASE_URL}/movie/${movieId}`, { params: { api_key: API_KEY, language: 'en-US' } })
  return data
})
export const fetchMovieCredits = createAsyncThunk('movies/fetchMovieCredits', async (movieId) => {
  const { data } = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, { params: { api_key: API_KEY, language: 'en-US' } })
  return data
})

const slice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // popular
    builder
      .addCase(fetchPopular.pending, (state) => { state.popular.loading = true; state.popular.error = null })
      .addCase(fetchPopular.fulfilled, (state, action) => {
        const { results, page, total_pages, total_results } = action.payload
        state.popular.loading = false
        state.popular.items = results
        state.popular.page = page
        state.popular.total_pages = total_pages
        state.popular.total_results = total_results
      })
      .addCase(fetchPopular.rejected, (state, action) => { state.popular.loading = false; state.popular.error = action.error.message })

    // top rated
      .addCase(fetchTopRated.pending, (state) => { state.topRated.loading = true; state.topRated.error = null })
      .addCase(fetchTopRated.fulfilled, (state, action) => {
        const { results, page, total_pages, total_results } = action.payload
        state.topRated.loading = false
        state.topRated.items = results
        state.topRated.page = page
        state.topRated.total_pages = total_pages
        state.topRated.total_results = total_results
      })
      .addCase(fetchTopRated.rejected, (state, action) => { state.topRated.loading = false; state.topRated.error = action.error.message })

    // upcoming
      .addCase(fetchUpcoming.pending, (state) => { state.upcoming.loading = true; state.upcoming.error = null })
      .addCase(fetchUpcoming.fulfilled, (state, action) => {
        const { results, page, total_pages, total_results } = action.payload
        state.upcoming.loading = false
        state.upcoming.items = results
        state.upcoming.page = page
        state.upcoming.total_pages = total_pages
        state.upcoming.total_results = total_results
      })
      .addCase(fetchUpcoming.rejected, (state, action) => { state.upcoming.loading = false; state.upcoming.error = action.error.message })

    // search
      .addCase(fetchSearch.pending, (state) => { state.search.loading = true; state.search.error = null })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        const { results, page, total_pages, total_results } = action.payload
        state.search.loading = false
        state.search.items = results
        state.search.page = page
        state.search.total_pages = total_pages
        state.search.total_results = total_results
      })
      .addCase(fetchSearch.rejected, (state, action) => { state.search.loading = false; state.search.error = action.error.message })

    // detail
      .addCase(fetchMovieDetail.pending, (state) => { state.detail.loading = true; state.detail.error = null })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => { state.detail.loading = false; state.detail.data = action.payload })
      .addCase(fetchMovieDetail.rejected, (state, action) => { state.detail.loading = false; state.detail.error = action.error.message })

    // credits
      .addCase(fetchMovieCredits.pending, (state) => { state.credits.loading = true; state.credits.error = null })
      .addCase(fetchMovieCredits.fulfilled, (state, action) => { state.credits.loading = false; state.credits.cast = action.payload.cast || [] })
      .addCase(fetchMovieCredits.rejected, (state, action) => { state.credits.loading = false; state.credits.error = action.error.message })
  }
})

export default slice.reducer

export const IMG_BASE = 'https://image.tmdb.org/t/p/w500'