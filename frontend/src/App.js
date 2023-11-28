import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthProvider from "./providers/AuthProvider";
import Routes from "./routes";


const App = () => {
    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    )
}

export const Layout = () => {
    return (
        <div className="bg-gray-50 dark:bg-gray-900 text-white font-sans leading-normal tracking-normal min-h-screen">
            <Navbar />
            <main className="container mx-auto flex flex-auto flex-col grow items-center">
                <Outlet />
            </main>
        </div>
    )
}

export default App