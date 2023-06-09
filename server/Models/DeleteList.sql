USE TodoSchema;
DROP PROCEDURE IF EXISTS DeleteList;
DELIMITER //

CREATE PROCEDURE DeleteList(IN token varchar(255), IN LID varchar(255))
BEGIN
	DECLARE EXIT HANDLER FOR sqlexception
    BEGIN
		ROLLBACK;
	END;
    
    START TRANSACTION;
    BEGIN
		DELETE FROM Invite_List
        WHERE L_ListID = (
			select L_ListID
            from (
				SELECT L_ListID
				FROM Invite_List
				WHERE Users_Email = (
					SELECT Email 
					FROM Users
					WHERE Token = token
			
				AND `Owner` = true
				AND L_ListID = LID
			)) table_name_here
        );
        
        DELETE FROM Lists
        WHERE ListID = LID;
    END;
END//

DELIMITER ;