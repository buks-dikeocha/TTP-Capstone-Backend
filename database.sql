CREATE DATABASE ttpcapstone

CREATE TABLE user(
    userid SERIAL PRIMARY KEY,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    dob VARCHAR(255),
    phone VARCHAR(255),
    bloodtype VARCHAR(255),
    insurancename VARCHAR(255),
    emergencyphone VARCHAR(255),
)