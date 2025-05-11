import React from 'react';
import ReactDOM from 'react-dom/client';

function WelcomeMessage({ isLoggedIn }) {
  let headingText = '';
  let buttonText = '';

  if (isLoggedIn) {
    headingText = 'Welcome back!';
    buttonText = 'Logout';
  } else {
    headingText = 'Welcome, guest!';
    buttonText = 'Login';
  }

  return (
    <div className="welcome-box">
      <h1>{headingText}</h1>
      <button>{buttonText}</button>
    </div>
  );
}

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(<WelcomeMessage isLoggedIn={true} />);
}
