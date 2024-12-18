import React, { useState, useEffect } from "react";

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(25);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const totalSeconds = inputMinutes * 60 + inputSeconds;

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsActive(false);
            playAudioAlert();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
        const elapsedSeconds = totalSeconds - (minutes * 60 + seconds);
        setProgress(((elapsedSeconds / totalSeconds) * 100).toFixed(2));
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, minutes]);

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setMinutes(inputMinutes);
    setSeconds(inputSeconds);
    setProgress(0);
  };

  const handleSetTimer = (e) => {
    e.preventDefault();
    setMinutes(inputMinutes);
    setSeconds(inputSeconds);
    setProgress(0);
  };

  const playAudioAlert = () => {
    const audio = new Audio("https://www.soundjay.com/button/beep-07.wav");
    audio.play();
  };

  return (
    <div style={{
      fontFamily: 'Poppins', 
      textAlign: 'center', 
      padding: '30px', 
      background: 'linear-gradient(135deg, #000000, #434343)', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      color: '#fff',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Animation */}
      <div style={{
        position: 'absolute', 
        top: '0', 
        left: '0', 
        right: '0', 
        bottom: '0', 
        zIndex: '-1',
        background: 'linear-gradient(45deg, rgba(0, 0, 0, 0.6), rgba(100, 100, 100, 0.4))',
        animation: 'background 10s infinite alternate'
      }}></div>

      <h2 style={{
        fontSize: '2.5rem', 
        marginBottom: '20px', 
        textShadow: '0 4px 10px rgba(255, 255, 255, 0.7)',
        fontWeight: 'bold'
      }}>POMODORO TIMER</h2>

      <div style={{ width: '300px', marginBottom: '30px' }}>
        <p style={{
          fontSize: '3rem', 
          fontWeight: 'bold', 
          margin: '20px 0',
          textShadow: '0 4px 10px rgba(255, 255, 255, 0.7)'
        }}>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</p>

        {/* Circular Progress Bar */}
        <div style={{
          position: 'relative', 
          width: '150px', 
          height: '150px', 
          borderRadius: '50%', 
          border: '10px solid #00bfff', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          margin: '20px auto',
          boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)'
        }}>
          <div style={{
            width: '120px', 
            height: '120px', 
            background: '#222', 
            borderRadius: '50%', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center'
          }}>
            <p style={{
              fontSize: '1.5rem', 
              color: '#fff'
            }}>{progress}%</p>
          </div>
        </div>

        <div style={{
          height: '10px', 
          width: '100%', 
          background: '#222', 
          borderRadius: '5px', 
          overflow: 'hidden', 
          margin: '10px 0'
        }}>
          <div style={{
            height: '10px', 
            background: '#00bfff', 
            width: `${progress}%`, 
            transition: 'width 0.5s ease'
          }}></div>
        </div>

        <p style={{
          fontSize: '1rem', 
          color: '#00bfff'
        }}>{progress}%</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button 
          style={{
            backgroundColor: '#00bfff', 
            color: '#fff', 
            padding: '10px 25px', 
            borderRadius: '30px', 
            border: 'none', 
            fontSize: '1.2rem', 
            cursor: 'pointer', 
            margin: '0 10px', 
            transition: 'background-color 0.3s, transform 0.2s',
            boxShadow: '0 4px 10px rgba(0, 191, 255, 0.5)'
          }} 
          onClick={handleStartPause}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>

        <button 
          style={{
            backgroundColor: '#ff3d3d', 
            color: '#fff', 
            padding: '10px 25px', 
            borderRadius: '30px', 
            border: 'none', 
            fontSize: '1.2rem', 
            cursor: 'pointer', 
            margin: '0 10px', 
            transition: 'background-color 0.3s, transform 0.2s',
            boxShadow: '0 4px 10px rgba(255, 61, 61, 0.5)'
          }} 
          onClick={handleReset}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          Reset
        </button>
      </div>

      <form onSubmit={handleSetTimer} style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <input 
            type="number" 
            value={inputMinutes} 
            onChange={(e) => setInputMinutes(Number(e.target.value))} 
            placeholder="Minutes" 
            style={{
              padding: '10px', 
              width: '80px', 
              borderRadius: '5px', 
              border: '1px solid #ccc', 
              background: '#222', 
              color: '#fff'
            }} 
            min="0" 
          />
          <input 
            type="number" 
            value={inputSeconds} 
            onChange={(e) => setInputSeconds(Number(e.target.value))} 
            placeholder="Seconds" 
            style={{
              padding: '10px', 
              width: '80px', 
              borderRadius: '5px', 
              border: '1px solid #ccc', 
              background: '#222', 
              color: '#fff'
            }} 
            min="0" 
            max="59" 
          />
          <button type="submit" style={{
            backgroundColor: '#00bfff', 
            color: '#fff', 
            padding: '10px 15px', 
            borderRadius: '30px', 
            border: 'none', 
            fontSize: '1rem', 
            cursor: 'pointer', 
            transition: 'background-color 0.3s',
            boxShadow: '0 4px 10px rgba(0, 191, 255, 0.5)'
          }}>Set Timer</button>
        </div>
      </form>
    </div>
  );
};

export default PomodoroTimer;
