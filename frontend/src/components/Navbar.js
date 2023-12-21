import { useCookies } from "react-cookie";
import userPortrait from "../assets/images/user_portrait.png"
import { LOGIN_PATH, LOGOUT_PATH, PROFILE_PATH, REGISTER_PATH } from "../routes"

const { Link } = require("react-router-dom")

export default function Navbar() {
  const [cookies] = useCookies(["user"]);

  return (
    <header className="mb-8">
      <nav aria-label="menu nav" className="bg-gray-50 dark:bg-gray-900 border-b-2 border-slate-500 pt-2 pb-1 px-1 mt-0 h-auto w-full">
        <div className="flex flex-wrap items-center justify-between">
          <div>
            <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
              <li className="flex-1 flex-none mr-3 inline-block py-2 px-4 text-white no-underline">
                <Link to="/">
                  Home
                </Link>
              </li>
            </ul>
          </div>
          <div>
            {cookies.user ?
              <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
                <Link to={LOGOUT_PATH}>
                  <li className="flex-1 flex-none mr-3 inline-block py-2 px-4 text-white no-underline">
                    Logout
                  </li>
                </Link>
                <Link to={PROFILE_PATH}>
                  <li className="flex-1 flex-none mr-3 inline-block py-2 px-4 text-white no-underline">
                    <img className="w-8 h-8 rounded-full" src={userPortrait} alt="user profile" />
                  </li>
                </Link>
              </ul> :
              <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
                <Link to={LOGIN_PATH}>
                  <li className="flex-1 flex-none mr-3 inline-block py-2 px-4 text-white no-underline">
                    Login
                  </li>
                </Link>
                <Link to={REGISTER_PATH}>
                  <li className="flex-1 flex-none mr-3 inline-block py-2 px-4 text-white no-underline">
                    Register
                  </li>
                </Link>
              </ul>}
          </div>
        </div>
      </nav>
    </header>
  )
}