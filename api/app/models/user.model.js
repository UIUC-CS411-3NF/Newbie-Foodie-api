findByIdSql = (user_id) => {
  return `SELECT * FROM User WHERE user_id = '${user_id}';`;
}

findByEmailSql = (email) => {
  return `SELECT * FROM User WHERE email = '${email}';`;
};

findByEmailWithAuthSql = (email) => {
  return `SELECT * FROM User NATURAL JOIN Auth WHERE email = '${email}';`;
};

findTopActiveSql = () => {
  return `SELECT user_id, email, username FROM User
    NATURAL JOIN (
      SELECT DISTINCT * FROM (
        (SELECT user_id, COUNT(*) as num
        FROM User JOIN Recipe ON author_id = user_id
        GROUP BY user_id
        ORDER BY num DESC
        LIMIT 5)
        UNION
        (SELECT user_id, COUNT(*) as num
        FROM UserReviewRecipe
        GROUP BY user_id
        ORDER BY num DESC
        LIMIT 5)
      ) AS Tin
    ) AS Tout`;
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
  findTopActiveSql: findTopActiveSql,
  insertNewUserSql: insertNewUserSql,
  insertNewAuthSql: insertNewAuthSql,
  insertNewProfileSql: insertNewProfileSql,
};

module.exports = user;
