DROP PROCEDURE InsertReview;

DELIMITER //
CREATE PROCEDURE InsertReview(
    IN new_user_id INT,
    IN new_recipe_id INT,
    IN new_rate INT,
    IN new_comment TEXT
)
BEGIN
	DECLARE _user_id INT;

    DROP TABLE IF EXISTS ValuableUser;
    CREATE TABLE ValuableUser(
        id INT PRIMARY KEY AUTO_INCREMENT,
        uuuser_id INT UNIQUE
    );

    -- 1
    BEGIN
		DECLARE done int default 0;

		DECLARE cur CURSOR FOR (
			SELECT followee_id AS u
			FROM Follow JOIN Recipe
			WHERE followee_id = author_id
			GROUP BY followee_id
			ORDER BY COUNT(*) DESC
			LIMIT 3
		);
		DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

		OPEN cur;
		l: REPEAT
			FETCH cur INTO _user_id;
            IF done = 1 THEN
				LEAVE l;
			END IF;
			INSERT IGNORE INTO ValuableUser(uuuser_id)
			VALUES (_user_id);
		UNTIL done
		END REPEAT;
		CLOSE cur;
	END;

    -- 2
    BEGIN
		DECLARE done int default 0;

		DECLARE cur CURSOR FOR (
			(SELECT user_id
			FROM User JOIN Recipe ON author_id = user_id
			GROUP BY user_id
			ORDER BY COUNT(*) DESC
			LIMIT 5)
			UNION
			(SELECT user_id
			FROM UserReviewRecipe
			GROUP BY user_id
			ORDER BY COUNT(*) DESC
			LIMIT 5)
		);
		DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

		OPEN cur;
		l: REPEAT
			FETCH cur INTO _user_id;
            IF done = 1 THEN
				LEAVE l;
			END IF;
			INSERT IGNORE INTO ValuableUser(uuuser_id)
			VALUES (_user_id);
		UNTIL done
		END REPEAT;
		CLOSE cur;

	END;

    -- 3
    BEGIN
		DECLARE done int default 0;

		DECLARE cur CURSOR FOR (
			SELECT author_id AS user_id
			FROM User JOIN Recipe ON author_id = user_id
			JOIN UserReviewRecipe USING (recipe_id)
			GROUP BY author_id
			ORDER BY AVG(rate) DESC
			LIMIT 10
		);
		DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

		OPEN cur;
		l: REPEAT
			FETCH cur INTO _user_id;
            IF done = 1 THEN
				LEAVE l;
			END IF;
			INSERT IGNORE INTO ValuableUser(uuuser_id)
			VALUES (_user_id);
		UNTIL done
		END REPEAT;
		CLOSE cur;
	END;

    INSERT INTO UserReviewRecipe(user_id, recipe_id, rate, comment)
    VALUES (new_user_id, new_recipe_id, new_rate, new_comment);

END //
DELIMITER ;

CALL InsertReview(5, 10, 3, "aa");
