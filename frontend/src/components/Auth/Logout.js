import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { HOME_PATH } from "../../routes"
import { useCookies } from "react-cookie"

const Logout = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const navigate = useNavigate()

    useEffect(() => {
        removeCookie("user")
        navigate(HOME_PATH)
    }, [])

    return (
      <div>Logging out.</div>
    )
}

export default Logout