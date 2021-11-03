findByIdSql = (user_id) => {
  return `SELECT * FROM User WHERE user_id = '${user_id}';`;
}

findByEmailSql = (email) => {
  return `SELECT * FROM User WHERE email = '${email}';`;
};

findByEmailWithAuthSql = (email) => {
  return `SELECT * FROM User NATURAL JOIN Auth WHERE email = '${email}';`;
};

insertNewUserSql = (email, username) => {
  return `INSERT INTO User(email, username) VALUES ('${email}', '${username}');`;
};

insertNewAuthSql = (user_id, passwordhash) => {
  return `INSERT INTO Auth(user_id, password_hash) VALUES (${user_id}, '${passwordhash}');`;
};

insertNewProfileSql = (user_id, description, photo) => {
  return `INSERT INTO Profile(user_id, description, photo) VALUES (${user_id}, '${description}', '${photo}')`;
};

const user = {
  findByIdSql: findByIdSql,
  findByEmailSql: findByEmailSql,
  findByEmailWithAuthSql: findByEmailWithAuthSql,
  insertNewUserSql: insertNewUserSql,
  insertNewAuthSql: insertNewAuthSql,
  insertNewProfileSql: insertNewProfileSql,
};

module.exports = user;
