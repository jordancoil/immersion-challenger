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
        <div className="bg-gray-800 text-white font-sans leading-normal tracking-normal">
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default App