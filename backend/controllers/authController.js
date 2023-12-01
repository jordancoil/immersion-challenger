require("dotenv").config()
const authQueries = require("../db/queries/authQueries")
const bcrypt = require('bcrypt');


const login = async (req, res) => {
    try {
        const { email, password, stayLoggedIn } = req.body

        authQueries.getUserByEmail(email)
        .then(result => {
            const user = result.rows[0]
            if (bcrypt.compareSync(password, user.password_hash)) {
                res.status(200).send({
                    userId: user.id
                });
            } else {
                res.status(200).send({
                    loginError: "Invalid password."
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: error.message || "An error occurred while retrieving the user."
            })
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || "An error occurred while retrieving the user."
        })
    }
}

const register = async (req, res) => {
    try {
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
        const timestamp = Date.now();

        authQueries.newUser(email, password_hash, timestamp)
        .then(result => {
            const user = result.rows[0]

            res.status(200).send({
                success: true
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: error.message || "An error occurred while registering the user."
            })
        })    
    } catch (error) {
        res.status(500).json({
            message: error.message || "An error occurred while registering the user."
        })
    }
}

module.exports = {
    login,
    register
}