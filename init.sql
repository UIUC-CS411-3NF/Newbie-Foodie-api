CREATE TABLE User (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL
);

CREATE TABLE Auth (
    user_id INT,
    password_hash VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE
);

CREATE TABLE Profile (
    user_id INT,
    description TEXT NOT NULL,
    photo VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE
);

CREATE TABLE Role (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE UserRole (
    user_id INT,
    role_id INT,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES Role(role_id) ON DELETE CASCADE
);

CREATE TABLE Follow (
    follower_id INT,
    followee_id INT,
    PRIMARY KEY (follower_id, followee_id),
    FOREIGN KEY (follower_id) REFERENCES User(user_id) ON DELETE CASCADE,
    FOREIGN KEY (followee_id) REFERENCES User(user_id) ON DELETE CASCADE
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
    status_id INT,
    author_id INT,
    FOREIGN KEY (status_id) REFERENCES Status(status_id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES User(user_id) ON DELETE CASCADE
);

CREATE TABLE UserSaveRecipe (
    user_id INT,
    recipe_id INT,
    PRIMARY KEY (user_id, recipe_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id) ON DELETE CASCADE
);

CREATE TABLE UserReviewRecipe (
    user_review_recipe_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    recipe_id INT,
    rate INT NOT NULL,
    comment TEXT,
    create_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_update_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status_id INT,
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id) ON DELETE CASCADE,
    FOREIGN KEY (status_id) REFERENCES Status(status_id) ON DELETE CASCADE
);

CREATE TABLE RecipeRequireIngredient (
    recipe_id INT,
    ingredient_id INT,
    amount INT,
    PRIMARY KEY (recipe_id, ingredient_id),
    FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES Ingredient(ingredient_id) ON DELETE CASCADE
);

CREATE TABLE RecipeUtensil (
    recipe_id INT,
    utensil_id INT,
    PRIMARY KEY (recipe_id, utensil_id),
    FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id) ON DELETE CASCADE,
    FOREIGN KEY (utensil_id) REFERENCES Utensil(utensil_id) ON DELETE CASCADE
);

CREATE TABLE Media (
    media_id INT PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
    post_order INT NOT NULL,
    recipe_id INT,
    FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id) ON DELETE CASCADE
);

CREATE TABLE FoodType (
    foodtype_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE RecipeFoodType (
    recipe_id INT,
    foodtype_id INT,
    PRIMARY KEY (recipe_id, foodtype_id),
    FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id) ON DELETE CASCADE,
    FOREIGN KEY (foodtype_id) REFERENCES FoodType(foodtype_id) ON DELETE CASCADE
);

CREATE TABLE Instruction (
    instruction_id INT PRIMARY KEY AUTO_INCREMENT,
    content TEXT NOT NULL,
    post_order INT NOT NULL,
    recipe_id INT,
    FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id) ON DELETE CASCADE
);
