import LoadingScreen from "@/components/LoadingScreen";
import { useAuthStore } from "@/context/useAuthStore";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const {user, isRefreshed, loading} = useAuthStore();

  if (!isRefreshed || loading) {
    return <LoadingScreen />
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
