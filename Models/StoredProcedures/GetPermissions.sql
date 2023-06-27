USE TodoSchema;
DROP PROCEDURE IF EXISTS getPermissions;
DELIMITER //

CREATE PROCEDURE getPermissions(IN LID INT, IN TOK VARCHAR(255))
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
	END;
    
    START TRANSACTION;
	BEGIN		
		SET @tokenCheck = (
			SELECT count(*)
			FROM Invite_List
			WHERE L_ListID = LID
			AND Users_Email = (
				SELECT Email
				FROM Users
				WHERE token = TOK
				)
			);
            
		SELECT Users_Email, Write_Privilege
        FROM Invite_List
        WHERE L_ListID = LID
        AND @tokenCheck > 0;

		COMMIT;
    END;
END//
