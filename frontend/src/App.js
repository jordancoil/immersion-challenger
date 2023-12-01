import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Routes from "./routes";
import { CookiesProvider, useCookies } from "react-cookie";


const App = () => {
    return (
        <CookiesProvider>
            <Routes />
        </CookiesProvider>
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