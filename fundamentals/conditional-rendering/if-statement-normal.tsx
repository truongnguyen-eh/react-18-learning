import React from 'react';
import ReactDOM from 'react-dom/client';

function WelcomeMessage({ isLoggedIn }) {
  if (isLoggedIn) {
    return (
      <div className="welcome-box">
        <h1>Welcome back!</h1>
        <button>Logout</button>
      </div>
    );
  } else {
    return (
      <div className="welcome-box">
        <h1>Welcome, guest!</h1>
        <button>Login</button>
      </div>
    );
  }
}

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(<WelcomeMessage isLoggedIn={true} />);
}
