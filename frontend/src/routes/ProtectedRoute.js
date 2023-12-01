import { Navigate, Outlet } from "react-router-dom"
import { LOGIN_PATH } from "."
import { useCookies } from "react-cookie";

export const ProtectedRoute = () => {
    const [cookies] = useCookies(["userId"]);

    if (!cookies.userId) {
        return <Navigate to={LOGIN_PATH} />
    }

    return <Outlet />
}