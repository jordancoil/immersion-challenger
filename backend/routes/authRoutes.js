const express = require("express")
const loginController = require("../controllers/authController")

const router = express.Router()

router.post("/login", loginController.login)

router.get("/register", loginController.register)

module.exports = router