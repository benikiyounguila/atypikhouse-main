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


//pour le ssr
export const useProvideAuth = (initialUser = null) => {
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(!initialUser);

  useEffect(() => {
    if (!initialUser) {
      const storedUser = getItemFromLocalStorage('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    }
  }, [initialUser]);
//------

// export const useProvideAuth = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const storedUser = getItemFromLocalStorage('user');
//     console.log('Stored user from localStorage:', storedUser);
//     if (storedUser) {
//       const parsedUser = JSON.parse(storedUser);
//       console.log('Parsed user:', parsedUser);
//       setUser(parsedUser);
//     }
//     setLoading(false);
//   }, []);

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
        // save user and token in local storage
        setItemsInLocalStorage('user', data.user);
        setItemsInLocalStorage('token', data.token);
      }
      return { success: true, message: 'Registration successfull' };
    } catch (error) {
      const { message } = error.response.data;
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

      // Vérifiez que l'utilisateur et le token sont bien retournés
      console.log('User data received: ', data.user);
      console.log('Token received: ', data.token);

      if (data.user && data.token) {
        console.log('Is Admin: ', data.user.isAdmin);
        setUser(data.user);
        // save user and token in local storage
        setItemsInLocalStorage('user', data.user);
        setItemsInLocalStorage('token', data.token);
      }
      return { success: true, message: 'Login successfull' };
    } catch (error) {
      const { message } = error.response.data;
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
        // save user and token in local storage
        setItemsInLocalStorage('user', data.user);
        setItemsInLocalStorage('token', data.token);
      }
      return { success: true, message: 'Login successfull' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = async () => {
    try {
      const { data } = await axiosInstance.get('/user/logout');
      if (data.success) {
        setUser(null);

        // Clear user data and token from localStorage when logging out
        removeItemFromLocalStorage('user');
        removeItemFromLocalStorage('token');
      }
      return { success: true, message: 'Logout successfull' };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Something went wrong!' };
    }
  };

  const uploadPicture = async (picture) => {
    try {
      const formData = new FormData();
      formData.append('picture', picture);
      const { data } = await axiosInstance.post(
        '/user/upload-picture',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (userDetails) => {
    const { name, password, picture } = userDetails;
    const email = JSON.parse(getItemFromLocalStorage('user')).email;
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

//pour le ssr

export const useProvidePlaces = (initialPlaces = []) => {
  const [places, setPlaces] = useState(initialPlaces);
  const [loading, setLoading] = useState(!initialPlaces.length);

  const getPlaces = async () => {
    const { data } = await axiosInstance.get('/places');
    setPlaces(data.places);
    setLoading(false);
  };

  useEffect(() => {
    if (initialPlaces.length === 0) {
      getPlaces();
    }
  }, [initialPlaces]);

  return {
    places,
    setPlaces,
    loading,
    setLoading,
  };
};

// export const useProvidePlaces = () => {
//   const [places, setPlaces] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const getPlaces = async () => {
//     const { data } = await axiosInstance.get('/places');
//     setPlaces(data.places);
//     setLoading(false);
//   };

//   useEffect(() => {
//     getPlaces();
//   }, []);

//   return {
//     places,
//     setPlaces,
//     loading,
//     setLoading,
//   };
// };



