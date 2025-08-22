import React from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TopRated from "./pages/TopRated";
import Upcoming from "./pages/Upcoming";
import MovieDetail from "./pages/MovieDetail";
import SearchResults from "./pages/SearchResults";
import LoginPage from "./pages/LoginPage";

export default function App() {
  const location = useLocation();
  const hideLayout = location.pathname === "/login-page";

  return (
    <div className="app">
      {!hideLayout && <Navbar />}
      <main className={hideLayout ? "" : "container"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/top-rated" element={<TopRated />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/search/:query" element={<SearchResults />} />
          <Route path="/login-page" element={<LoginPage />} />
          {/* Only redirect unknown routes, excluding /login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!hideLayout && (
        <footer className="footer">
          © {new Date().getFullYear()} MovieDB Machine Test
        </footer>
      )}
    </div>
  );
}
