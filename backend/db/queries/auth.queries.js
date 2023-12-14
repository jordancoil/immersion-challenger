const pool = require("../db")

const getUserByEmail = async (email) => {
    const query = {
        name: "get-user-by-email",
        text: `SELECT * FROM users WHERE "email" = $1::text;`,
        values: [email]
    }

    result = await pool.query(query)
    return result.rows[0]
}

const newUser = async (email, password_hash, timestamp) => {
    const query = {
        name: "new-user",
        text: `INSERT INTO users (email, password_hash, email_confirmed, created_on)
            VALUES ($1::text, $2::text, $3::boolean, to_timestamp($4::numeric))
            RETURNING *;`,
        values: [email, password_hash, false, timestamp]
    }

    result = await pool.query(query)
    return result.rows[0]
}

module.exports = {
    getUserByEmail,
    newUser
}