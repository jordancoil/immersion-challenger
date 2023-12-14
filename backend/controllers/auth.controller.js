const userService = require("../services/user.service")

const login = async (req, res) => {
  try {
    const [user, login_error] = await userService.loginUser(req.body)

    if (login_error) {
      return res.status(401).json({ message: login_error.message })
    }

    res.status(200).send({ user: user });
  } catch (error) {
    res.status(500).json({
      message: error.message || "An error occurred while logging in."
    })
  }
}

const register = async (req, res) => {
  try {
    const [user, registration_error] = userService.registerNewUser(req.body)

    if (registration_error) {
      return res.status(400).send({ message: registration_error })
    }

    res.status(200).send({
      message: "Registration successful.",
      user: user
    });
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