import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

function UserProfile() {
  const [user, setUser] = useState({ name: 'React', age: 25 });
  const [isLoading, setIsLoading] = useState(false);
  const [fetchData, setFetchData] = useState<{ data: number }>();

  console.log('Component render/rerender', user)

  const handleUpdateUser = () => {
    // 1. Access outdated state

    // 2. Auto batching

    // 3. Skip re-render if same value from Object.is
  };
  
  return (
    <div>
      <p>Name: {user.name}, Age: {user.age}</p>
      <button onClick={handleUpdateUser}>Update</button>
    </div>
  );
}

const root = document.getElementById('root');
if (root) {
  if (typeof ReactDOM.createRoot === 'function') {
    if (!window['REACT_ROOT']) {
    window['REACT_ROOT'] = ReactDOM.createRoot(root)
    }
    window['REACT_ROOT'].render(
      <UserProfile />
    );
  } else {
    window['REACT_ROOT'] = (ReactDOM as any).render(<UserProfile />, root);
  }
}
