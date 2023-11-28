require("dotenv").config()
const authQueries = require("../db/queries/authQueries")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const login = async (req, res) => {
    const { email, password } = req.body

    authQueries.getUserByEmail(email)
    .then(result => {
        if(bcrypt.compareSync('passwordToCompare', hash)) {
            const token = jwt.sign({ login: 'valid' }, process.env.JWT_KEY);

            res.status(200).send({
                token: token
            });
        } else {
            res.status(200).send({
                loginError: "Invalid password."
            });
        }
    })
    .catch((error) => {
        // TODO add different handling of various error codes
        res.status(500).json({
            message: error.message || "An error occurred while retrieving the user."
        })
    })
}

const register = async (req, res) => {
    const { email, password } = req.body

    if (!email) {
        res.status(400).send({
            message: "Email cannot be empty!"
        });
        return;
    }

    if (!password) {
        res.status(400).send({
            message: "Password cannot be empty!"
        });
        return;
    }

    const password_hash = bcrypt.hashSync(password, 10);

    authQueries.newUser(email, password_hash, false, Date.now().toString())
    .then(result => {
        const token = jwt.sign({ login: 'valid' }, process.env.JWT_KEY);

        res.status(200).send({
            token: token
        });
    })
    .catch((error) => {
        res.status(500).json({
            message: error.message || "An error occurred while registering the user."
        })
    })
}

module.exports = {
    login,
    register
}