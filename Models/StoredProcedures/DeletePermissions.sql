use TodoSchema;
DROP PROCEDURE IF EXISTS deletePermissions;
Delimiter //

CREATE PROCEDURE deletePermissions(in TOK VARCHAR(255), in EMA VARCHAR(255), in LID int)
BEGIN

	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
	END;

	START TRANSACTION;
    BEGIN
    
		SET @em = (
        		SELECT Email
				FROM Users
				WHERE Token = TOK
        );
        
        
        SET @id = (
				SELECT L_ListID
				FROM Invite_List
				WHERE Users_Email = @em
				AND L_ListID = LID
				AND `Owner` = true
        );
        
        DELETE FROM Invite_List
        WHERE L_ListID = @id
        AND Users_Email = EMA
        AND Users_Email != @em;
	
		COMMIT;
    END;
END//