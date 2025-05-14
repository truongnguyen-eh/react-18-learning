import React from 'react';
import ReactDOM from 'react-dom/client';

function TodoList() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: "Learn React" },
    { id: 2, text: "Build a project" },
    { id: 3, text: "Get hired" },
    { id: 4, text: "Keep learning" },
  ]);

 const addTodo = () => {
    setTodos([{ id: Date.now(), text: "New todo" }, ...todos]);
  };

  return (
    <>
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
          </li>
        ))}
      </ul>
    </>
  );
}

const container = document.querySelector('#root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<TodoList />);
}

