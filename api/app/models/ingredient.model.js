getAllSql = () => {
  return `SELECT * FROM Ingredient;`;
};

const ingredient = {
  getAllSql: getAllSql,
};

module.exports = ingredient;
