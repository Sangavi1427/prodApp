import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login"); // Change this route if your LoginRegister page has a different path
  };

  return (
    <div
      className="App-header"
      style={{
        fontFamily: "'Poppins', sans-serif",
        padding: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      {/* Title */}
      <h1
        style={{
          fontSize: "4rem",
          marginBottom: "20px",
          color: "#00ffcc",
          textShadow: "0 4px 10px rgba(0, 255, 255, 0.5)",
          letterSpacing: "3px",
          animation: "App-logo-spin 20s linear infinite", // Use spin animation from CSS file
        }}
      >
        Welcome to Your Productivity Hub
      </h1>

      {/* Description */}
      <p
        style={{
          fontSize: "1.5rem",
          marginBottom: "40px",
          color: "#ddd",
          maxWidth: "600px",
        }}
      >
        Boost your productivity and track your daily habits, goals, and tasks
        with ease. Start your journey to a better you!
      </p>

      {/* Get Started Button */}
      <button
        onClick={handleGetStarted}
        className="App-link" // Leverage existing CSS styles
        style={{
          padding: "15px 40px",
          fontSize: "1.5rem",
          fontWeight: "700",
          border: "3px solid #00ffcc",
          borderRadius: "30px",
          cursor: "pointer",
          transition: "transform 0.3s ease",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        Get Started
      </button>
    </div>
  );
};

export default LandingPage;
