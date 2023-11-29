USE TodoSchema;
DROP PROCEDURE IF EXISTS insertCat;

DELIMITER //
CREATE PROCEDURE insertCat(in TOK varchar(255), in LID int, in NAMED varchar(255), in XD int, in YD int, in WIDTHD int, in HEIGHTD int)
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
            WHERE token = TOK
        );

        SET @hasAccess = (
            SELECT Write_Privilege
            FROM Invite_List
            WHERE Users_Email = @email
            AND L_ListID = LID
        );

        INSERT into catagory(`L_ListID`, `Name`, `X`, `Y`, `Width`, `Height`)
        SELECT L_ListID , NAMED, XD, YD, WIDTHD, HEIGHTD
        from InviteList
        where Users_Email = @email
        and L_ListID = LID;
    END;

END//