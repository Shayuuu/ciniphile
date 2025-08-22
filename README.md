# React JS Machine Test — MovieDB

This is a complete implementation for the React JS Machine Test using The Movie Database (TMDB) API.

## Features
- Four main pages: Popular (Home), Top Rated, Upcoming, and Single Movie Detail with Cast.
- Global search in Navbar → navigates to Search Results page.
- Pagination on all list pages.
- Responsive, modern UI.
- Redux Toolkit for state management.
- Axios for API requests.
- React Router v6 for navigation.

## Endpoints
- Popular: `/movie/popular`
- Top Rated: `/movie/top_rated`
- Upcoming: `/movie/upcoming`
- Movie Detail: `/movie/{id}`
- Credits: `/movie/{id}/credits`
- Search: `/search/movie`

## Image Base
`https://image.tmdb.org/t/p/w500`

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:5173

## Deploy / Submit on CodeSandbox
1. Go to https://codesandbox.io/ → **Create Sandbox** → **Import from GitHub** or **Upload**.
2. Choose **Upload** and drop this zip OR paste the repo after you upload anywhere.
3. Make sure the sandbox runs `npm install` automatically; the default command is `vite` (already set).
4. Submit the sandbox link.

> API Key used: `c45a857c193f6302f2b5061c3b85e743` (you can change it in `src/redux/movieSlice.js`).