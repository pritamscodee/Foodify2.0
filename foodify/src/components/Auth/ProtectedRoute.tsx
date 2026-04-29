import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (user?.role === 'seller' && location.pathname.startsWith('/buyer')) {
    return <Navigate to='/seller/dashboard' replace />;
  }

  if (user?.role === 'user' && location.pathname.startsWith('/seller')) {
    return <Navigate to='/buyer/foods' replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
