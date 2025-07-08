// Built-in hooks: useState, useEffect, useRef,...
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';

// ✅ Custom hook to track previous value: usePrevious
function usePrevious(value: number) {
  const ref = useRef<number>();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>Current count: {count}</p>
      <p>Previous count: {prevCount ?? 'None'}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

const root = document.getElementById('root');
if (root) {
  window['REACT_ROOT'] = ReactDOM.createRoot(root)
  window['REACT_ROOT'].render(<Counter />);
}
