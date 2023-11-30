require("dotenv").config()
const jwt = require('jsonwebtoken');

const parseTokenFromAuthHeader = (authHeader) => {
    if (authHeader === undefined) return ""
    return authHeader.substring(7, authHeader.length);
}

const validateJWT = async (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_KEY, (error, decoded) => (
            error ? reject(new Error("Invalid token")) : resolve(decoded)
        ))
    }) 
}

module.exports = {
    parseTokenFromAuthHeader,
    validateJWT
}