const mysql = require("mysql2");
const dbConfig = require("../config/db.config.js");

let conn;

if (dbConfig.SOCKET_PATH) {
  conn = mysql.createConnection({
    socketPath: `${dbConfig.SOCKET_PATH}/${dbConfig.CLOUD_SQL_CONNECTION_NAME}`,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    multipleStatements: true,
  });
}
else {
  conn = mysql.createConnection({
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    multipleStatements: true,
  });
}

conn.connect((err) => {
  if (err) throw err;
});

exec = (sqlcmd) => {
  return new Promise((resolve, reject) => {
    conn.query(sqlcmd, (error, results) => {
      if (error) {
        console.log("db query fail", error);
        reject(err);
        return;
      }
      resolve(results);
    });
  });
};

const db = {
  user: require("./user.model.js"),
  recipe: require("./recipe.model.js"),
  ingredient: require("./ingredient.model.js"),
  foodtype: require("./foodtype.model.js"),
  utensil: require("./utensil.model.js"),
  review: require("./review.model.js"),
  exec: exec
}

module.exports = db;