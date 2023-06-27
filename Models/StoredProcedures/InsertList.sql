USE TodoSchema;

DROP PROCEDURE IF EXISTS InsertList;

DELIMITER //
CREATE PROCEDURE InsertList(IN TOK VARCHAR(255), IN N VARCHAR(255))
BEGIN
  
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
	END;
  
	START TRANSACTION;
    BEGIN
        
		INSERT INTO Lists(`name`)
		VALUES(N);
        

		INSERT INTO Invite_List(`Users_Email`, `L_ListID`, `Write_Privilege`, `Owner`)
		SELECT Email, LAST_INSERT_ID(), true, true
        FROM Users
        WHERE Token = TOK;

		COMMIT;
	END;
    
END//

delimiter ;
-- drop procedure InsertList;
