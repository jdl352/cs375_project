DROP DATABASE IF EXISTS projectdb;
CREATE DATABASE projectdb;
\c projectdb
DROP TABLE IF EXISTS userinfo;
CREATE TABLE userlogin(
	id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(100),
    favgenres text[],
    likedarticles text[]
);
DROP TABLE IF EXISTS threads;
CREATE TABLE threads(
	threadID SERIAL PRIMARY KEY,
    username VARCHAR(50) REFERENCES userlogin(username),
    messagebody VARCHAR(2000),
    dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
DROP TABLE IF EXISTS comment;
CREATE TABLE comment(
	commentID SERIAL PRIMARY KEY,
    threadID INT REFERENCES threads(threadID),
    username VARCHAR(50) REFERENCES userlogin(username),
    comment VARCHAR(200),
    dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);