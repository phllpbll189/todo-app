USE TodoSchema;
DROP PROCEDURE IF EXISTS changePermissions;
DELIMITER //

CREATE PROCEDURE changePermissions(in T VARCHAR(255), in EM VARCHAR(255), in LID int, in WR BOOL)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
	END;

	START TRANSACTION;
    BEGIN
    
		UPDATE Invite_List
        SET Write_Privilege = WR
        WHERE L_ListID = (
			SELECT L_ListID 
            FROM (
				SELECT L_ListID
				FROM Invite_List
				WHERE Users_email = (
					SELECT Email
					FROM Users
					WHERE Token = T
				)
				AND L_ListID = LID
				AND `Owner` = true
			) tempthing
        )
        AND Users_Email = EM;

	   COMMIT; 
    END;
	
END//