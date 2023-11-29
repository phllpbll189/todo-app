use TodoSchema;
DROP PROCEDURE IF EXISTS deleteCat;
Delimiter //

CREATE PROCEDURE DeleteCat(in TOK VARCHAR(255), in LID int, in CID int)
BEGIN

	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
	END;

	START TRANSACTION;
    BEGIN
    
		SET @email = (
        		SELECT Email
				FROM Users
				WHERE Token = TOK
        );
        
        
		set @hasAccess = (
			select Write_Privilege
			from invite_list
			where Users_Email = @email
			and L_ListID = LID
		);
        
        DELETE FROM catagory
        WHERE L_ListID = LID
        and CatID = CID
        AND @hasAccess;
	
		COMMIT;
    END;
END//