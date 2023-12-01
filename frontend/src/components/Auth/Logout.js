import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { HOME_PATH } from "../../routes"
import { useCookies } from "react-cookie"

const Logout = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["userId"]);

    useEffect(() => {
        removeCookie("userId")
    }, [])

    return (
        <Navigate to={HOME_PATH} />
    )
}

export default Logout