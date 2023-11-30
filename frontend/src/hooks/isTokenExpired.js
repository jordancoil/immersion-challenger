import { jwtDecode } from "jwt-decode";

const isTokenExpired = (token) => {
    if (token === undefined || token === null) return true
    return jwtDecode(token)?.exp * 1000 < new Date().getTime()
}

export default isTokenExpired