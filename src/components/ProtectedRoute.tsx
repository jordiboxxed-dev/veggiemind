import { useSession } from '@/contexts/SessionContext';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const ProtectedRoute = () => {
  const { session, profile, loading } = useSession();
  const location = useLocation();

  // Redirect to login if not authenticated and not already on login page
  if (!loading && !session && location.pathname !== '/login') {
    return <Navigate to="/login" replace />;
  }

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-brand-green"></div>
      </div>
    );
  }

  // If authenticated but no profile, redirect to onboarding
  if (session && !profile?.goal && location.pathname !== '/onboarding' && location.pathname !== '/login') {
    return <Navigate to="/onboarding" replace />;
  }

  // If trying to access onboarding but already has profile, redirect to dashboard
  if (session && profile?.goal && location.pathname === '/onboarding') {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;