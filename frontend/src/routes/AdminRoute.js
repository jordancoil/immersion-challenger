import { Navigate, Outlet } from "react-router-dom"
import { HOME_PATH } from "."
import { useCookies } from "react-cookie";

export const AdminRoute = () => {
    const [cookies] = useCookies(["user"]);

    // TODO lookup on backend if user is an admin, cookie is not secure.
    // TODO stop passing "is_admin" to front end

    if (!cookies.user || !cookies.user.is_admin) {
        return <Navigate to={HOME_PATH} />
    }

    return <Outlet />
}