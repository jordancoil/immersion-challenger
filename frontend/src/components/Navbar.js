import userPortrait from "../assets/images/user_portrait.png"
import { useAuth } from "../providers/AuthProvider"
import { LOGIN_PATH, LOGOUT_PATH, PROFILE_PATH } from "../routes"

const { Link } = require("react-router-dom")

export default function Navbar() {
    const { token } = useAuth()

    return (
        <header className="">
            <nav aria-label="menu nav" className="bg-gray-800 border-b-2 border-slate-500 pt-2 pb-1 px-1 mt-0 h-auto w-full">
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
                        {token ?
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
                            </ul>
                            :
                            <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
                                <Link to={LOGIN_PATH}>
                                    <li className="flex-1 flex-none mr-3 inline-block py-2 px-4 text-white no-underline">
                                        Login
                                    </li>
                                </Link>
                            </ul>
                        }
                    </div>
                </div>
            </nav>
        </header>
    )
}