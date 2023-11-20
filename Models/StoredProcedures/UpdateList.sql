USE TodoSchema;
DROP PROCEDURE IF EXISTS UpdateList;

DELIMITER //
CREATE PROCEDURE UpdateList(in TOK varchar(255), in LID varchar(255), in NAM varchar(255))
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
	END;

	START TRANSACTION;
    BEGIN
        UPDATE Lists
        SET `name` = NAM
        WHERE ListID = (
            SELECT L_ListID
            FROM Invite_List
            WHERE Users_Email = (
                SELECT Email
                FROM Users
                WHERE Token = TOK
            )
            AND L_ListID = LID
            AND `Owner` = true
        );



        COMMIT;
    END;
END//

DELIMITER ;