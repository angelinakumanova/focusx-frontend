import LoadingScreen from '@/components/LoadingScreen';
import { useAuthStore } from '@/context/useAuthStore';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const {user, isRefreshed} = useAuthStore();

  if (!isRefreshed) {
    return <LoadingScreen />
  }

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}

export default PublicRoute
