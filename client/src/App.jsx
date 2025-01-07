import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './components/ui/Layout';
import IndexPage from './pages/IndexPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import PlacesPage from './pages/PlacesPage';
import BookingsPage from './pages/BookingsPage';
import PlacesFormPage from './pages/PlacesFormPage';
import PlacePage from './pages/PlacePage';
import SingleBookedPlace from './pages/SingleBookedPlace';
import NotFoundPage from './pages/NotFoundPage';
import InfosProprietaires from './pages/InfosProprietairesPage';
import MentionsLegales from './pages/MentionsLegalesPage';

import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminEquipments from './pages/AdminPerks';
import AdminProperties from './pages/AdminProperties';
import AdminComments from './pages/AdminComments';
import { HelmetProvider } from 'react-helmet-async';

import axiosInstance from './utils/axios';
import { UserProvider } from './providers/UserProvider';
import { PlaceProvider } from './providers/PlaceProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { getItemFromLocalStorage } from './utils';
import ProtectedAdminRoute from './components//ui/ProtectedAdminRoute';

function App() {
  useEffect(() => {
    // set the token on refreshing the website
    axiosInstance.defaults.headers.common['Authorization'] =
      `Bearer ${getItemFromLocalStorage('token')}`;
  }, []);

  return (
    <HelmetProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <UserProvider>
          <PlaceProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<IndexPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/account" element={<ProfilePage />} />
                <Route path="/account/places" element={<PlacesPage />} />
                <Route
                  path="/infos-proprietaires"
                  element={<InfosProprietaires />}
                />
                <Route path="/mentions-legales" element={<MentionsLegales />} />

                <Route
                  path="/account/places/new"
                  element={<PlacesFormPage />}
                />
                <Route
                  path="/account/places/:id"
                  element={<PlacesFormPage />}
                />
                <Route path="/place/:id" element={<PlacePage />} />
                <Route path="/account/bookings" element={<BookingsPage />} />

                <Route
                  path="/account/bookings/:id"
                  element={<SingleBookedPlace />}
                />
                {/* Routes pour l'administration */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedAdminRoute>
                      <AdminDashboard />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <ProtectedAdminRoute>
                      <AdminUsers />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/equipments"
                  element={
                    <ProtectedAdminRoute>
                      <AdminEquipments />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/properties"
                  element={
                    <ProtectedAdminRoute>
                      <AdminProperties />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/comments"
                  element={
                    <ProtectedAdminRoute>
                      <AdminComments />
                    </ProtectedAdminRoute>
                  }
                />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
            <ToastContainer autoClose={2000} transition={Slide} />
          </PlaceProvider>
        </UserProvider>
      </GoogleOAuthProvider>
    </HelmetProvider>
  );
}

export default App;
