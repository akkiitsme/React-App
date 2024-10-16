import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PrivateRoute from './privateRoute';
import LoginPage from './components/login/loginPage';
import DashboardPage from './components/Dashboard/dashboard';
import {jwtDecode} from 'jwt-decode';
import { clearToken, setToken } from './auth/authSlice';
import CustomerManagementPage from './components/Pages/CustomerMangement';


// Helper function to check if the token is expired or not
const isTokenExpired = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime; 
  } catch (error) {
    return true;
  }
};

function App() {

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  console.log("b-access-token: ",token);

  useEffect(() => {
    // Check if a token exists in localStorage and if it's still valid
    const storedToken = localStorage.getItem('token');
    if (storedToken && !isTokenExpired(storedToken)) {
      dispatch(setToken(storedToken)); // Set token to Redux if it's valid
    } else if (storedToken && isTokenExpired(storedToken)) {
      dispatch(clearToken()); // Clear the token if it's expired
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" 
            element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
            }
          />
          <Route path="/customer" 
            element={
                <PrivateRoute>
                  <CustomerManagementPage />
                </PrivateRoute>
            }
          />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
    
  );
}

export default App;
