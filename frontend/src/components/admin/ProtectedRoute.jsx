import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useCmsData } from '../../context/CmsDataContext.jsx';

export default function ProtectedRoute() {
  const { isAuthenticated } = useCmsData();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
