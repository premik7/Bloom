import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};

export const registerUser = async (details) => {
  const response = await axios.post(`${API_URL}/auth/register`, details);
  return response.data;
};

// Add fetchPosts function here
export const fetchPosts = async (params) => {
  const response = await axios.get(`${API_URL}/posts`, { params });
  return response.data;
};


export const createPost = async (postData) => {
  const token = localStorage.getItem('token'); // or any other method to retrieve the token
  const response = await axios.post('http://localhost:5000/api/posts', postData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};





