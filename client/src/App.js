import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import { useRoutes } from './routes';

function App() {
  const routes = useRoutes(false);
  return (
    <Router>
      <div>{routes}</div>
    </Router>
  );
}

export default App;
