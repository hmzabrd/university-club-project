/* ============================================================
   📄 FILE: src/main.jsx (THE STARTING POINT)
   ============================================================
   This is the VERY FIRST file that runs when the website loads.
   Think of it like the "on switch" for the whole application.
   
   What it does:
   1. Finds the empty <div id="root"> in index.html
   2. Tells React: "Put the entire website inside that div"
   3. Turns on StrictMode (a helper that catches mistakes)
   ============================================================ */

// 👇 Import a helper from React that checks for problems in our code.
// StrictMode wraps the app and tells us if we do something wrong.
import { StrictMode } from 'react';

// 👇 Import the function that puts React components into the browser page.
// "createRoot" means "make a new React space inside this HTML element".
import { createRoot } from 'react-dom/client';

// 👇 Import the main App component (the big boss component that contains everything).
import App from './App.jsx';

/* ------------------------------------------------------------
   🚀 LAUNCH THE APP
   ------------------------------------------------------------
   - document.getElementById('root') finds the empty div in index.html.
   - createRoot(...) creates a React workspace inside that div.
   - .render(...) tells React: "Draw this component (and everything inside it) 
     into the workspace".
   - <StrictMode> wraps <App /> so React can warn us about bad code.
   ------------------------------------------------------------ */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
