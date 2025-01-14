import React from "react";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => onMovieClick(movie)}
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        margin: "16px",
        width: "200px",
        textAlign: "center",
        cursor: "pointer",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <img
        src={movie.image}
        alt={movie.title}
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "8px",
          marginBottom: "12px",
        }}
      />
      <h5>{movie.title}</h5>
      <p style={{ fontSize: "0.9rem", color: "#555" }}>{movie.genre}</p>
    </div>
  );
};