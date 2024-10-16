import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const initialState = {
  token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
  user: localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')) : null,
  isAuthenticated: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      const token = action.payload;
      state.token = token;
      state.user = jwtDecode(token);
      state.isAuthenticated = true;
      localStorage.setItem('token', token);
    },
    clearToken: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token'); 
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;