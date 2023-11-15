import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Layout } from "../App"
import Login from "../components/Auth/Login"
import Logout from "../components/Auth/Logout"
import ChannelPage from "../pages/ChannelPage"
import Home from "../pages/Home"
import { useAuth } from "../providers/AuthProvider"
import { ProtectedRoute } from "./ProtectedRoute"

export const HOME_PATH = "/"

export const LOGIN_PATH = "/login"
export const LOGOUT_PATH = "/logout"
export const PROFILE_PATH = "/profile"

const Routes = () => {
    const { token } = useAuth()

    const publicRoutes = [
        {
            path: HOME_PATH, 
            element: <Home />
        },
        {
            path: "/channel/:id",
            element: <ChannelPage />
        },
    ]
    
    const nonAuthenticatedRoutes = [
        {
            path: LOGIN_PATH, 
            element: <Login />
        },
    ]

    const authenticatedRoutes = [
        {
            path: "/",
            element: <ProtectedRoute />,
            children: [
                {
                    path: PROFILE_PATH,
                    element: <div>Profile Page</div>
                },
                {
                    path: LOGOUT_PATH,
                    element: <Logout />
                }
            ]
        }
    ]

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                ...publicRoutes,
                ...(!token ? nonAuthenticatedRoutes : []),
                ...authenticatedRoutes
            ]
        }
    ])

    return <RouterProvider router={router} />
}

export default Routes