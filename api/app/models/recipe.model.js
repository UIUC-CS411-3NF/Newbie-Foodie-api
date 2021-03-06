getRandomSql = (n) => {
  return `SELECT * FROM Recipe ORDER BY RAND() LIMIT ${n};`;
}

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

findRequireIngredientSql = (recipe_id) => {
  return `SELECT * FROM RecipeRequireIngredient NATURAL JOIN Ingredient WHERE recipe_id = ${recipe_id};`;
}

insertRequireIngredientSql = (recipe_id, ingredient_id, amount) => {
  return `INSERT INTO RecipeRequireIngredient(recipe_id, ingredient_id, amount) VALUES (${recipe_id}, ${ingredient_id}, ${amount});`;
}

deleteRequireIngredientSql = (recipe_id) => {
  return `DELETE FROM RecipeRequireIngredient WHERE recipe_id = ${recipe_id};`;
}

findFoodtypeSql = (recipe_id) => {
  return `SELECT * FROM RecipeFoodType NATURAL JOIN FoodType WHERE recipe_id = ${recipe_id};`;
}

insertFoodtypeSql = (recipe_id, foodtype_id) => {
  return `INSERT INTO RecipeFoodType(recipe_id, foodtype_id) VALUES (${recipe_id}, ${foodtype_id});`;
}

deleteFoodtypeSql = (recipe_id) => {
  return `DELETE FROM RecipeFoodType WHERE recipe_id = ${recipe_id};`;
}

findUtensilSql = (recipe_id) => {
  return `SELECT * FROM RecipeUtensil NATURAL JOIN Utensil WHERE recipe_id = ${recipe_id};`;
}

insertUtensilSql = (recipe_id, utensil_id) => {
  return `INSERT INTO RecipeUtensil(recipe_id, utensil_id) VALUES (${recipe_id}, ${utensil_id});`;
}

deleteUtensilSql = (recipe_id) => {
  return `DELETE FROM RecipeUtensil WHERE recipe_id = ${recipe_id};`;
}

insertWeightedRateSql = (recipe_id) => {
  return `INSERT INTO RecipeWeightedRate(recipe_id) VALUES (${recipe_id});`;
}

findWeightedRateByIDSql = (recipe_id) => {
  return `SELECT * FROM RecipeWeightedRate WHERE recipe_id = ${recipe_id};`;
}

const recipe = {
  getRandomSql: getRandomSql,
  findByAuthorSql: findByAuthorSql,
  findByIDSql: findByIDSql,
  insertNewSql: insertNewSql,
  editSql: editSql,
  deleteSql: deleteSql,
  findByDishNameSql: findByDishNameSql,
  findRequireIngredientSql: findRequireIngredientSql,
  insertRequireIngredientSql: insertRequireIngredientSql,
  deleteRequireIngredientSql: deleteRequireIngredientSql,
  findFoodtypeSql: findFoodtypeSql,
  insertFoodtypeSql: insertFoodtypeSql,
  deleteFoodtypeSql: deleteFoodtypeSql,
  findUtensilSql: findUtensilSql,
  insertUtensilSql: insertUtensilSql,
  deleteUtensilSql: deleteUtensilSql,
  insertWeightedRateSql: insertWeightedRateSql,
  findWeightedRateByIDSql: findWeightedRateByIDSql,
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