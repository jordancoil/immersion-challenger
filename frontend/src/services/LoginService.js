import axios from "axios"
import APIClient from "../clients/ApiClient"

const LoginService = {
    async loginUser(credentials) {
        return await APIClient.post("/auth/login", credentials)
        .then(res => {
            return res.data.token
        })
        .catch(err => {
            console.error(err)
        })
    }
}
export default LoginService