import { useSession } from '@/contexts/SessionContext';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const { session } = useSession();

  if (session) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;