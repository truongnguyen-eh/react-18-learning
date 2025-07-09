import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent){
      setPosition({ x: e.clientX, y: e.clientY });
    };

    if (isTracking) {
      document.addEventListener('mousemove', handleMouseMove);
    }
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [isTracking]);

  return [position, isTracking, setIsTracking] as const;
}

function Dashboard() {
  const [position, isTracking, setIsTracking] = useMousePosition();

  return (
    <div>
      <p>Mouse position: ({position.x}, {position.y})</p>
      <button onClick={() => setIsTracking(!isTracking)}>{isTracking ? 'Stop tracking me, please' : 'Start tracking'}</button>
    </div>
  );
}

const root = document.getElementById('root');
if (root) {
  window['REACT_ROOT'] = createRoot(root)
  window['REACT_ROOT'].render(<Dashboard />);
}
