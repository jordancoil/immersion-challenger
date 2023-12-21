import { CookiesProvider } from "react-cookie";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Routes from "./routes";
import { ErrorContextProvider, useErrorContext } from "./providers/ErrorContextProvider";


const App = () => {
  return (
    <CookiesProvider>
      <ErrorContextProvider>
        <Routes />
      </ErrorContextProvider>
    </CookiesProvider>
  )
}

export const Layout = () => {
  const { error } = useErrorContext()

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-white font-sans leading-normal tracking-normal min-h-screen">
      <Navbar />
      <main className="container mx-auto flex flex-auto flex-col grow items-center">
        {error ? 
          error :
          <Outlet />}
      </main>
    </div>
  )
}

export default App