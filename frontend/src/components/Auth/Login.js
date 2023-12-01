import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FORGOT_PASSWORD_PATH, HOME_PATH } from "../../routes";
import AuthService from "../../services/AuthService";
import { useCookies } from "react-cookie";


export default function Login() {
    const [cookies, setCookie] = useCookies(["userId"]);
    const navigate = useNavigate()

    const { state } = useLocation()
    const newUser = state ? state.newUser : undefined

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [stayLoggedIn, setStayLoggedIn] = useState(false);
    const [formError, setFormError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault()
        
        await AuthService.loginUser({
            email: email,
            password: password,
            stayLoggedIn: stayLoggedIn
        }).then(userId => {
            setCookie("userId", userId, { path: "/" });

            navigate(HOME_PATH, { replace: true })
        }).catch(error => {
            setFormError(error.message)
        })
    }

    const toggleCheckbox = () => {
        setStayLoggedIn(prev => !prev)
    }

    return(
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                </h1>
                {formError &&
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    {formError}
                </div>}

                {newUser && 
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    Registration successful! You can now sign in to your account.
                </div>}
                
                <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        <p>Email</p>
                        <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            type="email" onChange={e => setEmail(e.target.value)} />
                    </label>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        <p>Password</p>
                        <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            type="password" onChange={e => setPassword(e.target.value)} />
                    </label>
                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" 
                                    aria-describedby="remember" type="checkbox" checked={stayLoggedIn} onChange={toggleCheckbox} />
                            </div>
                            <div className="ml-3 text-sm">
                                <label className="text-gray-500 dark:text-gray-300">Remember me</label>
                            </div>
                        </div>
                        <Link to={FORGOT_PASSWORD_PATH} className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                            Forgot password?
                        </Link>
                    </div>
                    <div>
                        <button className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}