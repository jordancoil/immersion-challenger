DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
	email VARCHAR(255) UNIQUE NOT NULL,
	password_hash VARCHAR(50) NOT NULL,
	email_confirmed BOOLEAN,
	created_on TIMESTAMP NOT NULL,
    last_login TIMESTAMP
);
