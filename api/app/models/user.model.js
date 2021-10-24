findByEmailSql = (email) => {
  return `SELECT * FROM User WHERE email = '${email}';`;
};

findByEmailWithAuthSql = (email) => {
  return `SELECT * FROM User NATURAL JOIN Auth WHERE email = '${email}';`;
};

insertNewSql = (email, username, passwordhash) => {
  return `INSERT INTO User(email, username) VALUES ('${email}', '${username}'); INSERT INTO Auth(user_id, password_hash) VALUES (LAST_INSERT_ID(), '${passwordhash}');`;
};

const user = {
  findByEmailSql: findByEmailSql,
  findByEmailWithAuthSql: findByEmailWithAuthSql,
  insertNewSql: insertNewSql,
};

module.exports = user;

/*

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

*/
