USE TodoSchema;
DROP PROCEDURE IF EXISTS addPermissions;
DELIMITER //

CREATE PROCEDURE addPermissions(in T VARCHAR(255), in newEmail varchar(255), in LID varchar(255), in canWrite boolean)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;
    BEGIN
        SET @email = (
            SELECT email
            FROM Users
            WHERE token = T
        );

        SET @hasAccess = (
            SELECT `Owner`
            FROM Invite_List
            WHERE Users_Email = @email
            AND L_ListID = LID
        );

        INSERT INTO Invite_List (Users_Email, L_ListID, Write_Privilege, `Owner`)
        SELECT newEmail, LID, canWrite, 0
        WHERE @hasAccess = true;
    END;
END