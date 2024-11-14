import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../providers/UserProvider';

const ProtectedAdminRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // Ou un autre indicateur de chargement
  }

  const isAdminRoute = location.pathname.startsWith('/admin');
  const isCommentsRoute = location.pathname === '/admin/comments';

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Autoriser les administrateurs pour toutes les routes admin
  if (user.isAdmin) {
    return children;
  }

  // Autoriser les modérateurs uniquement pour la route des commentaires
  if (user.role === 'modérateur' && isCommentsRoute) {
    return children;
  }

  // Rediriger pour les utilisateurs non autorisés
  return <Navigate to="/not-authorized" />;
};

export default ProtectedAdminRoute;
