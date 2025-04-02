import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

function RouteGuard({ children, requireAuth }) {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  // If the authentication state is still loading, display a loading spinner
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Redirect to the login page if the route requires authentication and the user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If the route does not require authentication but the user is authenticated, redirect to the homepage
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Render the component if all conditions are met
  return children;
}

export default RouteGuard;