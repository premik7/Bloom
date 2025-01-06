import React from 'react';
import ReactDOM from 'react-dom/client'; // Import the correct ReactDOM API for React 18
import App from './App'; // Ensure this is the correct path to your App component
import './index.css'; // Optional: Your global styles

// Get the root element from your HTML
const rootElement = document.getElementById('root');

// Use ReactDOM.createRoot for React 18
const root = ReactDOM.createRoot(rootElement);

// Render your app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
