import axios from '../axios';
import { setToken, clearToken } from './authSlice';

export const login = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post('/generate-token', credentials);
    const token = response.data.token;
    dispatch(setToken(token));
  } catch (error) {
    console.error('Login failed:', error);
    alert('Inavlid username/password,try again!!')
  }
};

export const logout = () => (dispatch) => {
  dispatch(clearToken());
};