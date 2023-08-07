DROP DATABASE IF EXISTS projectdb;
CREATE DATABASE projectdb;
\c projectdb
DROP TABLE IF EXISTS userLogin;
CREATE TABLE userLogin(
	id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(100)
);
DROP TABLE IF EXISTS threads;
CREATE TABLE threads(
	threadID SERIAL PRIMARY KEY,
    username VARCHAR(50),
    messagebody VARCHAR(2000),
    dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
DROP TABLE IF EXISTS comment;
CREATE TABLE comment(
	commentID SERIAL PRIMARY KEY,
    --need to link to threadID properly as key, kept as int rn
    threadID INT,
    username VARCHAR(50),
    comment VARCHAR(200),
    dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);