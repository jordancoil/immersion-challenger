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
        {error &&
          <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <span className="sr-only">Info</span>
            <div>
              {error}
            </div>
          </div>}
        
        <Outlet />
      </main>
    </div>
  )
}

export default App