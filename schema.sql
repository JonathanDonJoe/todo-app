CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    displayname VARCHAR(20) NOT NULL,
    username VARCHAR(50) NOT NULL
);

CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    priority INTEGER NOT NULL,
    task VARCHAR(50) NOT NULL,
    status BOOLEAN DEFAULT FALSE,
    user_id INTEGER REFERENCES users(id)
);