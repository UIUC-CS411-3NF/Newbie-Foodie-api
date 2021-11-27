const db = require("../models");
const Review = db.review;

findReviewByID = (req, res) => {
  db.exec(Review.findByIDSql(req.params.review_id))
    .then((results) => results[0])
    .then((result) => {
      return res.status(200).send(result);
    })
    .catch((error) => {
      return res.status(400).send({
        message: error.message,
      });
    });
};

findReviewByUser = (req, res) => {
  db.exec(Review.findByUserSql(req.query.user_id))
    .then((results) => {
      return res.status(200).send(results);
    })
    .catch((error) => {
      return res.status(400).send({
        message: error.message,
      });
    });
};

findReviewByRecipe = (req, res) => {
  db.exec(Review.findByRecipeSql(req.query.recipe_id))
    .then((results) => {
      return res.status(200).send(results);
    })
    .catch((error) => {
      return res.status(400).send({
        message: error.message,
      });
    });
};

postReview = (req, res) => {
  db.exec(
    Review.insertNewSql(
      req.userId,
      req.body.recipe_id,
      req.body.rate,
      req.body.comment
    )
  )
    .then((result) => {
      return res
        .status(200)
        .send({ message: "Review was posted successfully!" });
    })
    .catch((error) => {
      return res.status(400).send({
        message: error.message,
      });
    });
};

editReview = (req, res) => {
  db.exec(
    Recipe.editSql(
      req.body.rate,
      req.body.comment,
      req.params.review_id
    )
  )
    .then((result) => {
      res.status(200).send({ message: "Review was edited successfully!" });
    })
    .catch((error) => {
      return res.status(400).send({
        message: error.message,
      });
    });
};

deleteReview = (req, res) => {
  db.exec(Review.deleteSql(req.params.review_id, req.userId, req.params.recipe_id))
    .then((results) => {
      return res
        .status(200)
        .send({ message: "Review was deleted successfully!" });
    })
    .catch((error) => {
      return res.status(400).send({
        message: error.message,
      });
    });
};

module.exports = {
  findReviewByID: findReviewByID,
  findReviewByUser: findReviewByUser,
  findReviewByRecipe: findReviewByRecipe,
  postReview: postReview,
  editReview: editReview,
  deleteReview: deleteReview,
};
