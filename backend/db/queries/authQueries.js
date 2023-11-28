const getUserByEmail = async (email) => {
    const query = {
        name: "get-user-by-email",
        text: `SELECT * FROM users WHERE "email" = $1::text;`,
        values: [email]
    }

    return pool.query(query).then(result => result);
}

const newUser = async (email, password_hash, timestamp) => {
    const query = {
        name: "new-user",
        text: `INSERT INTO users (email, password_has, email_confirmed, created_on)
            VALUES ($1::text, $2::text, $3::boolean, $4::text)
            RETURNING *;`,
        values: [email, password_hash, timestamp]
    }

    return pool.query(query).then(result => result);
}

module.exports = {
    getUserByEmail,
    newUser
}