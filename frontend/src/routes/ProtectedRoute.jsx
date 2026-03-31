import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const ProtectedRoute = ({ allowedRoles }) => {
  const isAuth = isAuthenticated();
  
  // Later we can add role checking
  // const userRole = getRole();
  // if (allowedRoles && !allowedRoles.includes(userRole)) { ... }

  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
