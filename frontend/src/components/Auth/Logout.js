import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../../providers/AuthProvider"
import { HOME_PATH } from "../../routes"

const Logout = () => {
    const { updateToken } = useAuth()

    useEffect(() => {
        updateToken(null)
    }, [])

    return (
        <Navigate to={HOME_PATH} />
    )
}

export default Logout