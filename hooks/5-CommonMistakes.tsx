import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

function UserProfile() {
  const [user, setUser] = useState({ name: 'React', age: 25 });
  console.log('Component render/rerender', user)

  const handleUpdateUser = () => {
    // 1. Mutate the state directly
    // user.name = 'Workshop';
    // setUser(user);

    // 2. Not using updater function for dependent updates
    // setUser({
    //   ...user,
    //   age: 26
    // })
    // setUser({
    //   ...user,
    //   age: user.age + 1,
    // });
  };

  // 3. Call set function directly in component body
  // setUser({
  //   name: 'New name',
  //   age: 25,
  // })
  
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
