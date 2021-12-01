DELIMITER //

CREATE TRIGGER WeightedRateTrigger
    BEFORE INSERT ON UserReviewRecipe
    FOR EACH ROW
    BEGIN
        SET @CNT = (
            SELECT COUNT(*)
            FROM ValuableUser v
            WHERE new.user_id = v.uuuser_id
        );

        -- not valuable user
        -- weight 1
        IF @CNT = 0 THEN
            UPDATE RecipeWeightedRate
            SET weighted_rate_sum = weighted_rate_sum + new.rate, weighted_rate_count = weighted_rate_count + 1
            WHERE recipe_id = new.recipe_id;
        ELSE
            UPDATE RecipeWeightedRate
            SET weighted_rate_sum = weighted_rate_sum + 10 * new.rate, weighted_rate_count = weighted_rate_count + 10
            WHERE recipe_id = new.recipe_id;
        END IF;
    END //

DELIMITER ;
