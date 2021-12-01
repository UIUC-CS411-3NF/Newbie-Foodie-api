findByUserSql = (user_id) => {
  return `SELECT * FROM UserReviewRecipe WHERE user_id = '${user_id}';`;
};

findByRecipeSql = (recipe_id) => {
  return `SELECT * FROM UserReviewRecipe WHERE recipe_id = '${recipe_id}';`;
};

findByIDSql = (review_id) => {
  return `SELECT * FROM UserReviewRecipe WHERE user_review_recipe_id = '${review_id}';`;
};

insertNewSql = (user_id, recipe_id, rate, comment) => {
  return `CALL InsertReview('${user_id}', ${recipe_id}, '${rate}', '${comment}');`;
};
/*
editSql = (rate, comment, review_id) => {
  return `UPDATE Recipe SET rate = '${rate}', comment = '${comment}' WHERE user_review_recipe_id = '${review_id}';`;
};

// BUG: no param recipe_id
deleteSql = (review_id, user_id, recipe_id) => {
  return `DELETE FROM Recipe WHERE user_review_recipe_id = '${review_id}' AND user_id = '${user_id}' AND recipe_id = '${recipe_id}';`;
};
*/

const recipe = {
  findByUserSql: findByUserSql,
  findByRecipeSql: findByRecipeSql,
  findByIDSql: findByIDSql,
  insertNewSql: insertNewSql,
  editSql: editSql,
  deleteSql: deleteSql,
};

module.exports = recipe;
