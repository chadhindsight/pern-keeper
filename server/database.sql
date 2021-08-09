CREATE DATABASE keepernotes;

CREATE TABLE note(
    note_id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    memo VARCHAR(255)
);