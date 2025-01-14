import React from "react";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div style={{ padding: "20px" }}>
      <div>
        <img
          src={movie.image}
          alt={movie.title}
          style={{ width: "100%", maxWidth: "500px", marginBottom: "20px" }}
        />
      </div>
      <div>
        <h2>{movie.title}</h2>
        <p>{movie.description}</p>
      </div>
      <div>
        <h4>Director: {movie.director.name}</h4>
        <p>{movie.director.bio}</p>
      </div>
      <button
        onClick={onBackClick}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Back
      </button>
    </div>
  );
};







