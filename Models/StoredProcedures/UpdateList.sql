USE TodoSchema;
DROP PROCEDURE IF EXISTS updateList;
DELIMITER //

CREATE PROCEDURE updateList(in T varchar(255), in LID varchar(255), in N varchar(255))
BEGIN
    UPDATE Lists
    SET `name` = N
    WHERE ListID = LID
    AND (
		SELECT `Owner`
        FROM Invite_List
        WHERE Users_email = (
			SELECT Email
			FROM Users
			WHERE Token = T
        )
        AND L_ListID = LID
    ) = 1;

    COMMIT;
END//

DELIMITER ;