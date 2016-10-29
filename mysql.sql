DROP DATABASE IF EXISTS users; --Deleting previous database
CREATE DATABASE users;
USE users;

CREATE TABLE things (
	name: VARCHAR(20) NOT NULL,
	description: VARCHAR(50),
	latitude: DECIMAL(8,3),
	longtitude: DECIMAL(9,4)
);

INSERT INTO things (name, description, latitude, longtitude) 
VALUES ('Puhelin', 'Default puhelin', '64.356', '34.956');