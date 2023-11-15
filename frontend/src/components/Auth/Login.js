import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { HOME_PATH } from "../../routes";

// TODO move to login service
async function loginUser(credentials) {
    return fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(data => data.json())
}

export default function Login() {
    const { updateToken } = useAuth()
    const navigate = useNavigate()

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleLogin = async (e) => {
        e.preventDefault()
        // TODO hash password
        // maybe do this in login service once created
        const token = await loginUser({
            username: username,
            password: password
        })

        updateToken(token)
        navigate(HOME_PATH, { replace: true })
    }

    return(
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleLogin}>
                <label>
                    <p>Username</p>
                    <input className="text-black" type="text" onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input className="text-black" type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}