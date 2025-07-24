import ReactDOM from 'react-dom/client';

function Counter() {
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
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
