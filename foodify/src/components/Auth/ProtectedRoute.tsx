import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'user' | 'seller';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { isAuthenticated, user, syncUserRoleFromRoute } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated && user) {
      syncUserRoleFromRoute(location.pathname);
    }
  }, [location.pathname, isAuthenticated, user, syncUserRoleFromRoute]);

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    const redirectPath =
      user?.role === 'seller' ? '/seller/dashboard' : '/buyer/foods';
    return <Navigate to={redirectPath} replace />;
  }

  const currentPath = location.pathname;
  if (user?.role === 'user' && currentPath.startsWith('/seller')) {
    return <Navigate to='/buyer/foods' replace />;
  }
  if (user?.role === 'seller' && currentPath.startsWith('/buyer')) {
    return <Navigate to='/seller/dashboard' replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
