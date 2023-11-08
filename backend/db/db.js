const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    // host: "locahost",
    host: "127.0.0.1",
    database: "immersion",
    password: "test",
    port: 5432,
});

module.exports = pool;