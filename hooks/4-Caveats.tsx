import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

function UserProfile() {
  const [user, setUser] = useState({ name: 'React', age: 25 });
  console.log('Component render/rerender', user)

  const handleUpdateUser = () => {
    // 1. Access outdated state
    // setUser({ name: 'Workshop', age: 26 });

    // console.log(user.name);

    // setTimeout(() => {
    //   console.log(user.name);
    // }, 5000);

    // setUser(user => {
    //   console.log('Function state', user.name);
    //   return user;
    // })

    // 2. Skip re-render if same value from Object.is
    // user.name = 'Workshop';
    // setUser(user);

    // 4. auto batching
    // setUser({
    //   name: 'Name 1',
    //   age: 20
    // })
    // setUser({
    //   name: 'Name 2',
    //   age: 21
    // })
    // setUser(user => ({
    //   name: 'Name 3',
    //   age: user.age + 1,
    // }))

    // Promise.resolve().then(() => {
    //   setUser({
    //     name: 'Name 4',
    //     age: 23
    //   })
    //   setUser({
    //     name: 'Name 5',
    //     age: 24
    //   })
    //   setUser(user => ({
    //     name: 'Name 6',
    //     age: user.age + 1,
    //   }))
    // });
  };

  // 4. setUser has a stable identity during component lifetime
  useEffect(() => {
    console.log('setUser change')
    setUser({ name: 'Workshop', age: 25 })
  }, [setUser])

  return (
    <div>
      <p>Name: {user.name}</p>
      <button onClick={handleUpdateUser}>Update</button>
    </div>
  );
}

const root = document.getElementById('root');
if (root) {
  if (typeof ReactDOM.createRoot === 'function') {
    window['REACT_ROOT'] = ReactDOM.createRoot(root)
    window['REACT_ROOT'].render(
      <UserProfile />
    );
  } else {
    window['REACT_ROOT'] = (ReactDOM as any).render(<UserProfile />, root);
  }
}
