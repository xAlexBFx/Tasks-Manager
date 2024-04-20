import { Navigate, Outlet} from 'react-router-dom'
import { useAuth } from "./context/auth.context";

function ProtectedRoute () {
    const {isLoading, user, isAuthenticated } = useAuth();
    if(!isAuthenticated && !isLoading) return <Navigate to= '/login' replace />

    return <Outlet />;
}

export default ProtectedRoute;