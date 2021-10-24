CREATE TABLE User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL
);

CREATE TABLE Auth (
    user_id INT REFERENCES User(id),
    password_hash VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE Profile (
    user_id INT REFERENCES User(id),
    description TEXT NOT NULL,
    photo VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE Role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE UserRole (
    user_id INT REFERENCES User(id),
    role_id INT REFERENCES Role(id),
    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE Follow (
    follower_id INT REFERENCES User(id),
    followee_id INT REFERENCES User(id),
    PRIMARY KEY (follower_id, followee_id)
);

CREATE TABLE Ingredient (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE Utensil (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE Status (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE Recipe (
    id INT PRIMARY KEY AUTO_INCREMENT,
    dish_name VARCHAR(255),
    cooking_time INT,
    description TEXT,
    create_date DATETIME NOT NULL,
    last_update_date DATETIME NOT NULL,
    status_id INT REFERENCES Status(id),
    author_id INT REFERENCES User(id)
);

CREATE TABLE UserSaveRecipe (
    user_id INT REFERENCES User(id),
    recipe_id INT REFERENCES Recipe(id),
    PRIMARY KEY (user_id, recipe_id)
);

CREATE TABLE UserReviewRecipe (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT REFERENCES User(id),
    recipe_id INT REFERENCES Recipe(id),
    rate INT NOT NULL,
    comment TEXT,
    create_date DATETIME,
    last_update_date DATETIME,
    status_id INT REFERENCES Status(id)
);

CREATE TABLE RecipeRequireIngredient (
    recipe_id INT REFERENCES Recipe(id),
    ingredient_id INT REFERENCES Ingredient(id),
    amount INT,
    PRIMARY KEY (recipe_id, ingredient_id)
);

CREATE TABLE RecipeUtensil (
    recipe_id INT REFERENCES Recipe(id),
    utensil_id INT REFERENCES Utensil(id),
    PRIMARY KEY (recipe_id, utensil_id)
);

CREATE TABLE Media (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
    post_order INT NOT NULL,
    recipe_id INT REFERENCES Recipe(id)
);

CREATE TABLE FoodType (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE RecipeFoodType (
    recipe_id INT REFERENCES Recipe(id),
    food_type_id INT REFERENCES FoodType(id),
    PRIMARY KEY (recipe_id, food_type_id)
);

CREATE TABLE Instruction (
    id INT PRIMARY KEY AUTO_INCREMENT,
    content TEXT NOT NULL,
    post_order INT NOT NULL,
    recipe_id INT REFERENCES Recipe(id)
);
