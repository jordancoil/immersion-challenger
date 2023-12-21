import { useCookies } from "react-cookie"
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"
import { Layout } from "../App"
import Login from "../components/Auth/Login"
import Logout from "../components/Auth/Logout"
import Register from "../components/Auth/Register"
import NotFound from "../pages/NotFound"
import ChannelPage from "../pages/ChannelPage"
import Home from "../pages/Home"
import VideoPlayer from "../pages/VideoPlayer"
import { AdminRoute } from "./AdminRoute"
import { ProtectedRoute } from "./ProtectedRoute"
import Admin from "../pages/Admin"

export const HOME_PATH = "/"

export const LOGIN_PATH = "/login"
export const REGISTER_PATH = "/register"
export const FORGOT_PASSWORD_PATH = "/forgot-password"
export const LOGOUT_PATH = "/logout"
export const PROFILE_PATH = "/profile"

export const ADMIN_PATH = "/admin"

export const CHANNEL_PATH = (channel_id) => `/channels/${channel_id}`
export const VIDEO_PATH = (channel_id, yt_video_id) => `/channels/${channel_id}/videos/${yt_video_id}`

const Routes = () => {
  const [cookies] = useCookies(["user"]);

  const publicRoutes = [
    {
      path: "*",
      element: <NotFound />
    },
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
    {
      path: LOGOUT_PATH,
      element: <Logout />
    }
  ]
    
  const loggedOutRoutes = [
    {
      path: LOGIN_PATH, 
      element: <Login />
    },
    {
      path: REGISTER_PATH, 
      element: <Register />
    },
  ]

  const loggedInRoutes = [
    {
      path: LOGIN_PATH, 
      element: <Navigate to="/" />
    },
    {
      path: REGISTER_PATH, 
      element: <Navigate to="/" />
    },
  ]

  const adminRoutes = [
    {
      path: "/",
      element: <AdminRoute />,
      children: [
        {
          path: ADMIN_PATH,
          element: <div>Admin Page</div>
        }
      ]
    }
  ]

  const authenticatedRoutes = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: ADMIN_PATH,
          element: <Admin />
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
        ...(!cookies.user ? loggedOutRoutes : loggedInRoutes),
        ...authenticatedRoutes,
        ...adminRoutes
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default Routes