import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        height: "100vh",
        background: "linear-gradient(135deg,rgb(0, 0, 0),rgb(8, 8, 8),rgb(0, 0, 0))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Animated Waves */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "-10%",
          width: "200%",
          height: "200%",
          background:
            "radial-gradient(circle, rgba(0, 0, 0, 0.15) 0%, transparent 70%)",
          animation: "moveWaves 10s infinite linear",
          zIndex: 0,
        }}
      ></div>

      {/* Hero Section Card */}
      <div
        style={{
          zIndex: 2,
          background: "rgba(8, 6, 6, 0.08)",
          border: "1px solid rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(12px)",
          borderRadius: "20px",
          padding: "60px",
          textAlign: "center",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
          animation: "fadeIn 1s ease-out",
          maxWidth: "700px",
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontSize: "3.5rem",
            color: "#00ffcc",
            marginBottom: "20px",
            letterSpacing: "2px",
            textShadow: "0 5px 15px rgba(0, 255, 255, 0.6)",
          }}
        >
          UNLEASH YOUR POTENTIAL!
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "1.25rem",
            lineHeight: "1.8",
            color: "#e0e0e0",
            marginBottom: "40px",
          }}
        >
          Your productivity is about to reach new heights. Track your goals,
          organize tasks, and achieve greatness with ease.
        </p>

        {/* Get Started Button */}
        <button
          onClick={handleGetStarted}
          style={{
            padding: "15px 40px",
            fontSize: "1.5rem",
            color: "#ffffff",
            fontWeight: "600",
            border: "none",
            borderRadius: "30px",
            background:
              "linear-gradient(90deg,rgb(232, 235, 234),rgb(72, 72, 75),rgb(15, 51, 44),rgb(0, 0, 0))",
            backgroundSize: "300%",
            boxShadow: "0 10px 30px rgba(37, 116, 116, 0.4)",
            cursor: "pointer",
            transition: "all 0.3s ease",
            animation: "gradientMove 5s infinite linear",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.boxShadow =
              "0 15px 40px rgba(165, 211, 211, 0.6)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow =
              "0 10px 30px rgba(135, 167, 167, 0.4)";
          }}
        >
          Get Started
        </button>
      </div>

      {/* Floating Decorations */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "5%",
          width: "150px",
          height: "150px",
          background: "rgba(0, 255, 255, 0.3)",
          borderRadius: "50%",
          filter: "blur(80px)",
          zIndex: 1,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: "15%",
          right: "10%",
          width: "200px",
          height: "200px",
          background: "rgba(0, 255, 255, 0.2)",
          borderRadius: "50%",
          filter: "blur(100px)",
          zIndex: 1,
        }}
      ></div>

      {/* Animations */}
      <style>
        {`
          @keyframes moveWaves {
            0% { transform: translate(0, 0); }
            50% { transform: translate(-50px, -50px); }
            100% { transform: translate(0, 0); }
          }
          @keyframes gradientMove {
            0% { background-position: 0%; }
            100% { background-position: 100%; }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

export default LandingPage;
