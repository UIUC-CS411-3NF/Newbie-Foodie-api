const mysql = require("mysql2");
const dbConfig = require("../config/db.config.js");

const conn = mysql.createConnection({
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  multipleStatements: true,
});

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
  exec: exec
}

module.exports = db;