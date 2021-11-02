findByAuthorSql = (uid) => {
  return `SELECT * FROM Recipe WHERE author_id = '${uid}';`;
}

findByIDSql = (rid) => {
  return `SELECT * FROM Recipe WHERE recipe_id = '${rid}';`;
}

insertNewSql = (dish_name, cooking_time, description, uid) => {
  return `INSERT INTO Recipe(dish_name, cooking_time, description, author_id) VALUES ('${dish_name}', ${cooking_time}, '${description}', '${uid}');`;
}

editSql = (dish_name, cooking_time, description, rid) => {
  return `UPDATE Recipe SET dish_name = '${dish_name}', cooking_time = ${cooking_time}, description = '${description}' WHERE recipe_id = '${rid}';`; 
}

deleteSql = (rid, uid) => {
  return `DELETE FROM Recipe WHERE recipe_id = '${rid}' AND author_id = '${uid}';`; 
}

findByDishNameSql = (name) => {
  return `SELECT * FROM Recipe WHERE dish_name LIKE '%${name}%' LIMIT 20;`;
}

const recipe = {
  findByAuthorSql: findByAuthorSql,
  findByIDSql: findByIDSql,
  insertNewSql: insertNewSql,
  editSql: editSql,
  deleteSql: deleteSql,
  findByDishNameSql: findByDishNameSql
};

module.exports = recipe

/*

CREATE TABLE Recipe (
  id INT PRIMARY KEY AUTO_INCREMENT,
  dish_name VARCHAR(255),
  cooking_time INT,
  description TEXT,
  author_id INT REFERENCES User(id)
);

*/