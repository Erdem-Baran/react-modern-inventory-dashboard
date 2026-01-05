import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  // If it's loading, please wait
  if (isLoading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, show the page
  return <Outlet />;
}