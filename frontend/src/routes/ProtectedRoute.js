import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../providers/AuthProvider"
import { LOGIN_PATH } from "."

export const ProtectedRoute = () => {
    const { token } = useAuth()

    if (!token) {
        return <Navigate to={LOGIN_PATH} />
    }

    return <Outlet />
}