import { useSession } from '@/contexts/SessionContext';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  const { session, profile, loading } = useSession();
  const location = useLocation();

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-brand-green"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated and not already on login page
  if (!session && location.pathname !== '/login' && location.pathname !== '/') {
    return <Navigate to="/login" replace />;
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