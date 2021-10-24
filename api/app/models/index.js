const mysql = require('mysql2');
const dbConfig = require("../config/db.config.js");

const conn = mysql.createConnection({
	host: dbConfig.HOST,
	user: dbConfig.USER,
	password: dbConfig.PASSWORD,
	database: dbConfig.DB,
	multipleStatements: true
});

conn.connect((err) => {
	if (err) throw err
});

exec = (sqlcmd, callback) => {
	conn.query(sqlcmd, (error, results) => {
		if (error) {
			console.log("db query fail", error);
			return callback([]);
		}
		return callback(null, results);
	});
}

const db = {
	user: require("./user.model.js"),
	exec: exec
}

module.exports = db;