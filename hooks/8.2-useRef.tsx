import ReactDOM from "react-dom/client";

import { useCallback, useEffect, useRef, useState } from "react";

function TimerWithState() {
  // const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const timerIdRef = useRef<NodeJS.Timeout>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [count, setCount] = useState(0);
  const [showInput, setShowInput] = useState(false);

  const startTimer = () => {
    // 🔴 Bad: Setting state causes a re-render
    timerIdRef.current && clearInterval(timerIdRef.current);
    const id = setInterval(() => {
      console.log("Timer is running...");
    }, 1000);
    timerIdRef.current = id;
  };

  const stopTimer = () => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
      // Clean up by setting state to null, causing another re-render
      timerIdRef.current = null;
    }
  };

  const ref = useCallback((node: HTMLInputElement) => {
    console.log("ref called", node);
    if (node) {
      node.focus();
    }
  }, []);

  return (
    <div>
      {showInput && <input ref={ref} />}
      <button onClick={() => setShowInput(!showInput)}>
        {showInput ? "Hide Input" : "Show Input"}
      </button>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
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
