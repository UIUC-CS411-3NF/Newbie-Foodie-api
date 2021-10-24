CREATE TABLE User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL
);

CREATE TABLE Auth (
    user_id INT REFERENCES User(id),
    password_hash VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE Profile (
    user_id INT REFERENCES User(id),
    description TEXT NOT NULL,
    photo VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);