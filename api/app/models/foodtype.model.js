getAllSql = () => {
  return `SELECT * FROM FoodType;`;
};

const foodtype = {
  getAllSql: getAllSql,
};

module.exports = foodtype;
