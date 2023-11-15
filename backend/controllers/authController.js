const loginQueries = require("../db/queries/authQueries")

// TODO add input validation

const login = async (req, res) => {
    // const { username, password } = req.body

    res.send({
        token: 'test123'
    });
}

const register = async (req, res) => {
    // const { username, password } = req.body

    res.send({
        message: 'not implemented'
    });
}

module.exports = {
    login,
    register
}