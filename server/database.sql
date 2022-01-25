CREATE DATABASE capstone;
CREATE TABLE users(
    userid SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    password_user VARCHAR(255),
    date_of_birth VARCHAR(255),
    phone_number VARCHAR(255),
    blood_type VARCHAR(255),
    insurance_company VARCHAR(255),
    emergency_phone VARCHAR(255)  
);