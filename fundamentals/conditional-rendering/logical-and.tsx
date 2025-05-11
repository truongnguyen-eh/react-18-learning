import React from 'react';
import ReactDOM from 'react-dom/client';

function WelcomeMessage({ isLoggedIn }) {
  return (
    <div className="welcome-box">
      <h1>{isLoggedIn ? 'Welcome back!' : 'Welcome, guest!'}</h1>
      <button>{isLoggedIn ? 'Logout' : 'Login'}</button>
    </div>
  );
}

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(<WelcomeMessage isLoggedIn={false} />);
}
