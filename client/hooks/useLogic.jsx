import { useState, useEffect, useContext } from 'react';
import jwt_decode from 'jwt-decode';

import { UserContext } from '@/providers/UserProvider.jsx';
import { PlaceContext } from '@/providers/PlaceProvider.jsx';

import {
  getItemFromLocalStorage,
  setItemsInLocalStorage,
  removeItemFromLocalStorage,
} from '@/utils/index.js';
import axiosInstance from '@/utils/axios.js';

// USER
export const useAuth = () => {
  return useContext(UserContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getItemFromLocalStorage('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("❌ Erreur lors du parsing du user dans localStorage :", error);
      }
    }
    setLoading(false);
  }, []);

  const register = async (formData) => {
    const { name, email, password } = formData;

    try {
      const { data } = await axiosInstance.post('user/register', {
        name,
        email,
        password,
      });
      if (data.user && data.token) {
        setUser(data.user);
        setItemsInLocalStorage('user', data.user);
        setItemsInLocalStorage('token', data.token);
      }
      return { success: true, message: 'Registration successful' };
    } catch (error) {
      const { message } = error.response?.data || error.message;
      return { success: false, message };
    }
  };

  const login = async (formData) => {
    const { email, password } = formData;

    try {
      const { data } = await axiosInstance.post('user/login', {
        email,
        password,
      });

      if (data.user && data.token) {
        setUser(data.user);
        setItemsInLocalStorage('user', data.user);
        setItemsInLocalStorage('token', data.token);
      }
      return { success: true, message: 'Login successful' };
    } catch (error) {
      const { message } = error.response?.data || error.message;
      return { success: false, message };
    }
  };

  const googleLogin = async (credential) => {
    const decoded = jwt_decode(credential);
    try {
      const { data } = await axiosInstance.post('user/google/login', {
        name: `${decoded.given_name} ${decoded.family_name}`,
        email: decoded.email,
      });
      if (data.user && data.token) {
        setUser(data.user);
        setItemsInLocalStorage('user', data.user);
        setItemsInLocalStorage('token', data.token);
      }
      return { success: true, message: 'Login successful' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = async () => {
    try {
      const { data } = await axiosInstance.get('/user/logout');
      if (data.success) {
        setUser(null);
        removeItemFromLocalStorage('user');
        removeItemFromLocalStorage('token');
      }
      return { success: true, message: 'Logout successful' };
    } catch (error) {
      return { success: false, message: 'Something went wrong!' };
    }
  };

  const uploadPicture = async (picture) => {
    try {
      const formData = new FormData();
      formData.append('picture', picture);
      const { data } = await axiosInstance.post('/user/upload-picture', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (userDetails) => {
    const storedUser = getItemFromLocalStorage('user');
    let email = null;

    try {
      email = storedUser ? JSON.parse(storedUser).email : null;
    } catch (e) {
      console.error("❌ Impossible de parser l'utilisateur pour obtenir l'email :", e);
    }

    if (!email) {
      return { success: false, message: "Email utilisateur non disponible" };
    }

    const { name, password, picture } = userDetails;

    try {
      const { data } = await axiosInstance.put('/user/update-user', {
        name,
        password,
        email,
        picture,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    user,
    setUser,
    register,
    login,
    googleLogin,
    logout,
    loading,
    uploadPicture,
    updateUser,
  };
};

// PLACES
export const usePlaces = () => {
  return useContext(PlaceContext);
};

export const useProvidePlaces = (initialData = []) => {
    const [places, setPlaces] = useState(initialData);
    const [loading, setLoading] = useState(!initialData.length);
  
    const getPlaces = async () => {
      try {
        const { data } = await axiosInstance.get('/places');
        setPlaces(data.places);
      } catch (error) {
        console.error("❌ Failed to fetch places:", error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if (typeof window !== 'undefined' && !initialData.length) {
        getPlaces();
      }
    }, []);
  
    return {
      places,
      setPlaces,
      loading,
      setLoading,
    };
  };
  