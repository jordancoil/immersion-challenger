import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Layout } from "../App"
import Login from "../components/Auth/Login"
import Logout from "../components/Auth/Logout"
import ChannelPage from "../pages/ChannelPage"
import Home from "../pages/Home"
import { useAuth } from "../providers/AuthProvider"
import { ProtectedRoute } from "./ProtectedRoute"
import VideoPlayer from "../pages/VideoPlayer"
import Register from "../components/Auth/Register"

export const HOME_PATH = "/"

export const LOGIN_PATH = "/login"
export const REGISTER_PATH = "/register"
export const LOGOUT_PATH = "/logout"
export const PROFILE_PATH = "/profile"

export const CHANNEL_PATH = (channel_id) => `/channels/${channel_id}`
export const VIDEO_PATH = (channel_id, yt_video_id) => `/channels/${channel_id}/videos/${yt_video_id}`

const Routes = () => {
    const { token } = useAuth()

    const publicRoutes = [
        {
            path: HOME_PATH, 
            element: <Home />
        },
        {
            path: "/channels/:id",
            element: <ChannelPage />
        },
        {
            path: "/channels/:id/videos/:yt_video_id",
            element: <VideoPlayer />
        },
    ]
    
    const nonAuthenticatedRoutes = [
        {
            path: LOGIN_PATH, 
            element: <Login />
        },
        {
            path: REGISTER_PATH, 
            element: <Register />
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