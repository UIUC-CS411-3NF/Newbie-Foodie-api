getAllSql = () => {
  return `SELECT * FROM FoodType;`;
};

findTopThreeSql = () => {
  return `SELECT * FROM FoodType NATURAL JOIN (
    SELECT name, COUNT(*) as numRecipe
    FROM FoodType NATURAL JOIN RecipeFoodType
    GROUP BY name
    ORDER BY numRecipe DESC
    LIMIT 3
  ) AS t
  ORDER BY t.numRecipe DESC`;
};

const foodtype = {
  getAllSql: getAllSql,
  findTopThreeSql: findTopThreeSql,
};

module.exports = foodtype;
