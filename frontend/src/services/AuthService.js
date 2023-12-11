import APIClient from "../clients/ApiClient"

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PASSWORD_CASE_REGEX = /(?=.*[a-z])(?=.*[A-Z])/
const PASSWORD_DIGIT_REGEX = /(?=.*\d)/

const AuthService = {
    async loginUser(credentials) {
        return await APIClient.post("/auth/login", credentials)
        .then(res => {
            return res.data.user
        })
        .catch(err => {
            console.error(err)
        })
    },

    async registerUser(credentials) {
        return await APIClient.post("/auth/register", credentials)
        .then(res => {
            return res.data.success
        })
        .catch(err => {
            console.error(err)
        })
    },

    validateRegistration(email, password, passwordConfirmation) {
        let errors = []

        if (email.length === 0 || !String(email).toLowerCase().match(EMAIL_REGEX)) {
            errors.push("Please enter a valid email address.")
        }

        if (password.length === 0) {
            errors.push("Please enter a password.")
        }

        if (password.length < 8) {
            errors.push("You password must be at least 8 characters.")
        }

        if (!String(password).match(PASSWORD_CASE_REGEX)) {
            errors.push("You password must include both lowercase and uppercase letters.")
        }

        if (!String(password).match(PASSWORD_DIGIT_REGEX)) {
            errors.push("You password must include a number.")
        }

        if (password !== passwordConfirmation) {
            errors.push("Passwords do not match.")
        }

        return errors
    }
}
export default AuthService