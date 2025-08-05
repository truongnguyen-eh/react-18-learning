import ReactDOM from "react-dom/client";

import { useState } from "react";

function TimerWithState() {
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    // 🔴 Bad: Setting state causes a re-render
    timerId && clearInterval(timerId);
    const id = setInterval(() => {
      console.log("Timer is running...");
    }, 1000);
    setTimerId(id);
  };

  const stopTimer = () => {
    if (timerId) {
      clearInterval(timerId);
      // Clean up by setting state to null, causing another re-render
      setTimerId(null);
    }
  };

  console.log("render TimerWithState");

  return (
    <div>
      <button onClick={startTimer}>Start Timer</button>
      <button onClick={stopTimer}>Stop Timer</button>
      <p>Component will re-render every time the timer ID state is set.</p>
    </div>
  );
}

const root = document.getElementById("root");
if (root) {
  if (!window["REACT_ROOT"]) {
    window["REACT_ROOT"] = ReactDOM.createRoot(root);
  }
  window["REACT_ROOT"].render(<TimerWithState />);
}
