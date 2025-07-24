import { useState } from 'react';
import ReactDOM from 'react-dom/client';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count => count + 1)}>+</button>
      <button onClick={() => setCount(count => count - 1)}>-</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

const root = document.getElementById('root');
if (root) {
  if (!window['REACT_ROOT']) {
  window['REACT_ROOT'] = ReactDOM.createRoot(root)
  }
  window['REACT_ROOT'].render(<Counter />);
}
