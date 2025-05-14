import React from 'react';
import ReactDOM from 'react-dom/client';

function UserList() {
  const [users, setUsers] = React.useState([
    { id: 1, name: 'Ben Johnson' },
    { id: 2, name: 'Devin Tong' },
    { id: 3, name: 'Alan Walker' }
  ]);

  const addUser = () => {
    setUsers([{ id: Date.now(), name: "" }, ...users]);
  };

  const deleteUser = React.useCallback((id) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  }, [])

  React.useEffect(() => {
    setTimeout(addUser, 10000)
  }, [])

  return (
    <>
      <button onClick={addUser}>Add User</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <input
              value={user.name}
              style={{ margin: "5px 0" }}
            />        
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>   
        ))}
      </ul>
    </>
  );
}

const container = document.querySelector('#root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<UserList />);
}
