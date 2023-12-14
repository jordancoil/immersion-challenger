const { pick } = require("lodash")
const bcrypt = require('bcrypt')

const authQueries = require("../db/queries/auth.queries")

async function loginUser({
  email,
  password
}) {
  const user = await authQueries.getUserByEmail(email)

  if (!user) {
    return [null, new Error("Invalid email or password.")]
  }

  const isValid = bcrypt.compareSync(password, user.password_hash)

  if (!isValid) return [null, new Error("Invalid email or password.")]

  return [filteredUser(user), null]
}

async function registerNewUser({
  email,
  password
}) {
  if (!email) {
    return [null, new Error("Email cannot be empty!")]
  }

  if (!password) {
    return [null, new Error("Password cannot be empty!")]
  }

  const password_hash = bcrypt.hashSync(password, 10);
  const timestamp = Date.now();

  const user = await authQueries.newUser(email, password_hash, timestamp)

  return [filteredUser(user), null]
}

function filteredUser(user) {
  return pick(user, ["id", "email", "is_admin"])
}

module.exports = {
  loginUser,
  registerNewUser
}