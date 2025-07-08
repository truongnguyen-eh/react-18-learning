import { useState } from "react";
import { createRoot } from "react-dom/client";

const render = () => {
  window['REACT_ROOT'].render(<Counter />)
}

function Counter() {
  console.log('Re-render');
  const [count, setCount] = useState(0);
  // const [enabled, setEnabled] = useState(false);

  const increment = () => setCount(count + 1);
  // const toggle = () => setEnabled(!enabled)

  return (
    <>
      {/* <button onClick={toggle}>{enabled ? 'Disable' : 'Enable'}</button> */}
      <button onClick={increment}>{count}</button>
    </>
  )
}

const root = document.getElementById('root');
if (root) {
  if (!window['REACT_ROOT']) {
    window['REACT_ROOT'] = createRoot(root)
  }  
  render();
}
