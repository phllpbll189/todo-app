USE TodoSchema;
DROP PROCEDURE IF EXISTS DeleteList;
DELIMITER //

CREATE PROCEDURE DeleteList(IN TOK varchar(255), IN LID varchar(255))
BEGIN
	DECLARE EXIT HANDLER FOR sqlexception
    BEGIN
		ROLLBACK;
	END;
    
    START TRANSACTION;
    BEGIN
		SET @count = (
			SELECT L_ListID
			FROM Invite_List
			WHERE Users_Email = (
				SELECT Email 
				FROM Users
				WHERE Token = TOK
				)
			AND `Owner` = true
			AND L_ListID = LID
        );

    
		DELETE FROM Invite_List
        WHERE L_ListID = LID
        AND @count > 0;
        
        DELETE FROM Lists
        WHERE ListID = LID;

		COMMIT;
    END;
END//

DELIMITER ;