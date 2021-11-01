findByEmailSql = (email) => {
  return `SELECT * FROM User WHERE email = '${email}';`;
};

findByEmailWithAuthSql = (email) => {
  return `SELECT * FROM User JOIN Auth ON User.id = Auth.user_id WHERE email = '${email}';`;
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
  findByEmailSql: findByEmailSql,
  findByEmailWithAuthSql: findByEmailWithAuthSql,
  insertNewUserSql: insertNewUserSql,
  insertNewAuthSql: insertNewAuthSql,
  insertNewProfileSql: insertNewProfileSql,
};

module.exports = user;
