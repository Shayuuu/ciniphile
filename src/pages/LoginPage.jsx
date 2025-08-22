import React, { useState } from "react";

export default function LoginPage() {
  const [tab, setTab] = useState("username");
  const posters = [
    "https://image.tmdb.org/t/p/w500/bcCBq9N1EMo3daNIjWJ8kYvrQm6.jpg",
    "https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
    "https://image.tmdb.org/t/p/w500/wFjboE0aFZNbVOF05fzrka9Fqyx.jpg",
    "https://image.tmdb.org/t/p/w500/padhpUq5Z8SGvtQvV4H14RJCdxu.jpg",
    "https://image.tmdb.org/t/p/w500/7YLyXcHR6sm9UMtjm5LJ1Z9Zp8B.jpg"
  ];

  return (
    <div className="login-page">
      {/* Posters Section */}
      <div className="posters">
        <div className="posters-scroll">
          {posters.concat(posters).map((src, i) => (
            <img key={i} src={src} alt="poster" />
          ))}
        </div>
        <div className="poster-text">
          FIND TALES <br /> THAT MATTER
        </div>
      </div>

      {/* Login Section */}
      <div className="login-box">
        <h1>Login</h1>

        <div className="tabs">
          <button
            className={tab === "username" ? "active" : ""}
            onClick={() => setTab("username")}
          >
            Username
          </button>
          <button
            className={tab === "phone" ? "active" : ""}
            onClick={() => setTab("phone")}
          >
            Phone
          </button>
        </div>

        <form>
          <input
            type={tab === "username" ? "text" : "tel"}
            placeholder={tab === "username" ? "Enter your username" : "Enter your phone"}
          />
          <button type="submit">Next</button>
          <a href="#" className="forgot">Forgot Password?</a>
        </form>

        <p>
          Don’t have an account? <a href="#">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
