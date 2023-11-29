use TodoSchema;
DROP PROCEDURE IF EXISTS deleteTodo;
Delimiter //

CREATE PROCEDURE deleteTodo(in TOK VARCHAR(255), in LID int, in TID int)
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
        
        DELETE FROM todos
        WHERE L_ListID = LID
        and todoID = TID
        AND @hasAccess;
	
		COMMIT;
    END;
END//