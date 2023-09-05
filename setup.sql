DROP DATABASE IF EXISTS projectdb;
CREATE DATABASE projectdb;
\c projectdb
DROP TABLE IF EXISTS userlogin;
CREATE TABLE userlogin(
	id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(100),
    country VARCHAR(50),
    favgenres text[],
    likedthreads text[]
);
DROP TABLE IF EXISTS threads;
CREATE TABLE threads(
	threadid SERIAL PRIMARY KEY,
    username VARCHAR(50) REFERENCES userlogin(username),
    messagebody VARCHAR(2000),
    url VARCHAR(200),
    dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
DROP TABLE IF EXISTS comments;
CREATE TABLE comments(
	commentid SERIAL PRIMARY KEY,
    threadid INT REFERENCES threads(threadid),
    username VARCHAR(50) REFERENCES userlogin(username),
    comment VARCHAR(200),
    dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO userlogin (username, password) VALUES ('user1', 'password');
INSERT INTO userlogin (username, password) VALUES ('user2', 'password');
INSERT INTO userlogin (username, password) VALUES ('user3', 'password');
INSERT INTO userlogin (username, password) VALUES ('user4', 'password');
INSERT INTO userlogin (username, password) VALUES ('user5', 'password');
INSERT INTO userlogin (username, password) VALUES ('user6', 'password');


INSERT INTO threads (username, messagebody) VALUES ('user1', 'user1body1');
INSERT INTO threads (username, messagebody) VALUES ('user2', 'user2body1');
INSERT INTO threads (username, messagebody) VALUES ('user3', 'user3body1');
INSERT INTO threads (username, messagebody) VALUES ('user4', 'user4body1');
INSERT INTO threads (username, messagebody) VALUES ('user5', 'user5body1');
INSERT INTO threads (username, messagebody) VALUES ('user6', 'user6body1');

INSERT INTO threads (username, messagebody) VALUES ('user1', 'user1body2');
INSERT INTO threads (username, messagebody) VALUES ('user2', 'user2body2');
INSERT INTO threads (username, messagebody) VALUES ('user3', 'user3body2');
INSERT INTO threads (username, messagebody) VALUES ('user4', 'user4body2');
INSERT INTO threads (username, messagebody) VALUES ('user5', 'user5body2');
INSERT INTO threads (username, messagebody) VALUES ('user6', 'user6body2');

INSERT INTO comments (threadid, username, comment) VALUES (1, 'user2', 'user2comment');
INSERT INTO comments (threadid, username, comment) VALUES (1, 'user4', 'user4comment');