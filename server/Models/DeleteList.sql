USE TodoSchema;
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
			SELECT L_ListID
            FROM Invite_List
            WHERE L_ListID = LID
            AND `Owner` = true
            AND Users_Email = (
				SELECT Email 
                FROM Users
                WHERE Token = token
			)
        );
        
        DELETE FROM Lists
        WHERE ListID = LID;
    END;
END//

DELIMITER ;