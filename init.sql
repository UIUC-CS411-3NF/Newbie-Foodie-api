CREATE TABLE User (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL
);

CREATE TABLE Auth (
    user_id INT REFERENCES User(user_id),
    password_hash VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE Profile (
    user_id INT REFERENCES User(user_id),
    description TEXT NOT NULL,
    photo VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE Role (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE UserRole (
    user_id INT REFERENCES User(user_id),
    role_id INT REFERENCES Role(role_id),
    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE Follow (
    follower_id INT REFERENCES User(user_id),
    followee_id INT REFERENCES User(user_id),
    PRIMARY KEY (follower_id, followee_id)
);

CREATE TABLE Ingredient (
    ingredient_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE Utensil (
    utensil_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE Status (
    status_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE Recipe (
    recipe_id INT PRIMARY KEY AUTO_INCREMENT,
    dish_name VARCHAR(255),
    cooking_time INT,
    description TEXT,
    create_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_update_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status_id INT REFERENCES Status(status_id),
    author_id INT REFERENCES User(user_id)
);

CREATE TABLE UserSaveRecipe (
    user_id INT REFERENCES User(user_id),
    recipe_id INT REFERENCES Recipe(recipe_id),
    PRIMARY KEY (user_id, recipe_id)
);

CREATE TABLE UserReviewRecipe (
    user_review_recipe_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT REFERENCES User(user_id),
    recipe_id INT REFERENCES Recipe(recipe_id),
    rate INT NOT NULL,
    comment TEXT,
    create_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_update_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status_id INT REFERENCES Status(status_id)
);

CREATE TABLE RecipeRequireIngredient (
    recipe_id INT REFERENCES Recipe(recipe_id),
    ingredient_id INT REFERENCES Ingredient(ingredient_id),
    amount INT,
    PRIMARY KEY (recipe_id, ingredient_id)
);

CREATE TABLE RecipeUtensil (
    recipe_id INT REFERENCES Recipe(recipe_id),
    utensil_id INT REFERENCES Utensil(utensil_id),
    PRIMARY KEY (recipe_id, utensil_id)
);

CREATE TABLE Media (
    media_id INT PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
    post_order INT NOT NULL,
    recipe_id INT REFERENCES Recipe(recipe_id)
);

CREATE TABLE FoodType (
    foodtype_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE RecipeFoodType (
    recipe_id INT REFERENCES Recipe(recipe_id),
    foodtype_id INT REFERENCES FoodType(foodtype_id),
    PRIMARY KEY (recipe_id, foodtype_id)
);

CREATE TABLE Instruction (
    instruction_id INT PRIMARY KEY AUTO_INCREMENT,
    content TEXT NOT NULL,
    post_order INT NOT NULL,
    recipe_id INT REFERENCES Recipe(recipe_id)
);
