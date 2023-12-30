import { Navigate, Outlet } from "react-router-dom"
import { LOGIN_PATH } from "."
import { useCookies } from "react-cookie";

export const ProtectedRoute = () => {
    const [cookies] = useCookies(["user"]);

    if (!cookies.user || !cookies.user.id) {
        return <Navigate to={LOGIN_PATH} />
    }

    return <Outlet />
}