import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const TimeLogging = () => {
  const [currentTask, setCurrentTask] = useState("");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timeLogs, setTimeLogs] = useState([]);
  const [sessionActive, setSessionActive] = useState(false);

  // Real-time timer update
  useEffect(() => {
    let timer;
    if (isTimerRunning) {
      timer = setInterval(() => {
        setElapsedTime(Math.floor((new Date() - startTime) / 1000 / 60));
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, startTime]);

  // Load time logs from cookies on component mount
  useEffect(() => {
    const savedLogs = Cookies.get("timeLogs");
    const activeSession = Cookies.get("sessionActive");
    setSessionActive(activeSession === "true");
    if (savedLogs) {
      setTimeLogs(JSON.parse(savedLogs));
    }
  }, []);

  // Save time logs to cookies whenever they change
  useEffect(() => {
    if (sessionActive) {
      Cookies.set("timeLogs", JSON.stringify(timeLogs), { expires: 7 }); // Set expiry to 7 days
    }
  }, [timeLogs, sessionActive]);

  // Handle session activation
  const handleSessionStart = () => {
    Cookies.set("sessionActive", "true", { expires: 1 }); // Session expires in 1 day
    setSessionActive(true);
  };

  const handleSessionEnd = () => {
    Cookies.remove("sessionActive");
    setSessionActive(false);
    alert("Session ended. Please start a new session to continue.");
  };

  // Start or stop the timer
  const handleToggleTimer = () => {
    if (!sessionActive) {
      alert("Session is not active. Please start a session to log time.");
      return;
    }

    if (currentTask.trim() === "") {
      alert("Please enter a task name before starting the timer.");
      return;
    }

    if (isTimerRunning) {
      const endTime = new Date();
      const timeSpent = (endTime - startTime) / 1000 / 60; // in minutes
      const newLog = {
        task: currentTask,
        timeSpent: timeSpent.toFixed(2),
        startTime: startTime.toLocaleTimeString(),
        endTime: endTime.toLocaleTimeString(),
      };
      setTimeLogs([...timeLogs, newLog]);
      setIsTimerRunning(false);
      setStartTime(null);
      setElapsedTime(0);
    } else {
      setStartTime(new Date());
      setIsTimerRunning(true);
    }
  };

  // Reset the timer
  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setStartTime(null);
    setElapsedTime(0);
  };

  // Handle task input change
  const handleTaskChange = (e) => setCurrentTask(e.target.value);

  // Styles
  const styles = {
    container: {
      fontFamily: "'Poppins', sans-serif",
      padding: "50px",
      background: "#111",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
    },
    title: {
      fontSize: "3rem",
      marginBottom: "10px",
      textShadow: "0 4px 10px rgba(0, 255, 255, 0.3)",
      letterSpacing: "3px",
    },
    form: {
      marginBottom: "20px",
      textAlign: "center",
    },
    input: {
      padding: "10px",
      margin: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      background: "#1c1c1c",
      color: "#fff",
      width: "300px",
    },
    button: {
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      background: "#00ffcc",
      color: "#111",
      cursor: "pointer",
      margin: "10px",
    },
    timerDisplay: {
      fontSize: "1.5rem",
      margin: "20px 0",
    },
    logContainer: {
      marginTop: "30px",
      maxWidth: "600px",
      width: "100%",
    },
    logItem: {
      padding: "15px",
      background: "#1c1c1c",
      marginBottom: "15px",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Time Logging</h1>

      {!sessionActive ? (
        <button onClick={handleSessionStart} style={styles.button}>
          Start Session
        </button>
      ) : (
        <>
          <button onClick={handleSessionEnd} style={styles.button}>
            End Session
          </button>

          {/* Task Input Form */}
          <div style={styles.form}>
            <input
              type="text"
              placeholder="Enter Task"
              value={currentTask}
              onChange={handleTaskChange}
              style={styles.input}
            />
          </div>

          {/* Timer Controls */}
          <div style={styles.timerDisplay}>
            {isTimerRunning ? (
              <div>
                <span>Time Elapsed: {elapsedTime} minutes</span>
                <br />
                <button onClick={handleToggleTimer} style={styles.button}>
                  Log Time
                </button>
              </div>
            ) : (
              <div>
                <button onClick={handleToggleTimer} style={styles.button}>
                  {startTime ? "Resume Timer" : "Start Timer"}
                </button>
                <button onClick={handleResetTimer} style={styles.button}>
                  Reset Timer
                </button>
              </div>
            )}
          </div>

          {/* Task Logs */}
          <div style={styles.logContainer}>
            <h2>Logged Time</h2>
            {timeLogs.length > 0 ? (
              timeLogs.map((log, index) => (
                <div key={index} style={styles.logItem}>
                  <strong>{log.task}</strong>
                  <p>
                    Time Spent: {log.timeSpent} minutes
                    <br />
                    Started: {log.startTime} | Ended: {log.endTime}
                  </p>
                </div>
              ))
            ) : (
              <p>No logs yet. Start tracking your tasks!</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TimeLogging;
