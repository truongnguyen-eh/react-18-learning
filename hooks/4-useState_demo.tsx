import ReactDOM from 'react-dom/client';

function Counter() {
  const increase = () => {

  }

  return (
    <div>
    <button onClick={increase}>click {count}</button>
    </div>
  );
}


const root = document.getElementById('root');
if (root) {
  window['REACT_ROOT'] = ReactDOM.createRoot(root)
  window['REACT_ROOT'].render(<Counter />);
}
