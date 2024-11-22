import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";



const ProtectedRoutes = ({ isAllowed = false, redirectPath = "/" }) => {
  const location = useLocation();

  return isAllowed ? (
    <Outlet />
  ) : (
    <Navigate to={redirectPath} replace state={{ from: location }} />
  );
};
export default ProtectedRoutes;
