import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { HOME_PATH } from "../../routes";
import AuthService from "../../services/AuthService";

export default function Register() {
    const { updateToken } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [formError, setFormError] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault()

        const validationErrors = AuthService.validateRegistration(email, password, passwordConfirmation)

        if (validationErrors.length > 0) {
            setFormError(validationErrors.map(error => (
                <div>
                    {error}
                </div>
            )))
            return
        }

        const token = await AuthService.registerUser({
            email: email,
            password: password
        })

        updateToken(token)
        navigate(HOME_PATH, { replace: true })
    }

    return(
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Register
                </h1>
                {formError &&
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    {formError}
                </div>}
                <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        <p>Email</p>
                        <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            type="text" onChange={e => setEmail(e.target.value)} />
                    </label>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        <p>Password</p>
                        <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            type="password" onChange={e => setPassword(e.target.value)} />
                    </label>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        <p>Confirm Password</p>
                        <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            type="password" onChange={e => setPasswordConfirmation(e.target.value)} />
                    </label>
                    <div className="text-gray-400">
                        <h4 className="mb-2">Secure Password Rules</h4>
                        <ul className="list-disc pl-5">
                            <li>At least 8 characters long</li>
                            <li>Includes both lowercase and uppercase letters</li>
                            <li>Includes both numbers and letters</li>
                        </ul>
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