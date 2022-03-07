import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import { Navbar } from './components/Navbar';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';
import { useRoutes } from './routes';

function App() {
  const {login, logout, token, userId} = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider value={{ login, logout, token, userId, isAuthenticated }}>
      <Router>
        {isAuthenticated && <Navbar/>}
        <div>{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
