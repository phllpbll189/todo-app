USE TodoSchema;
DROP PROCEDURE IF EXISTS InsertTodo;

DELIMITER //
CREATE PROCEDURE InsertTodo(in TOK varchar(255), in LID varchar(255), in TIT varchar(255), in X int, in Y int, in CON JSON, in StartD DATETIME, in endD DATETIME)
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
            SELECT `Write_Privilege`
            FROM Invite_List
            WHERE Users_Email = @email
            AND L_ListID = LID
        );

        INSERT into todos(`L_ListID`, `X`, `Y`, `Title`, `Content`, `StartDate`, `EndDate`)
        SELECT LID, X, Y, TIT, CON, StartD, EndD
        WHERE @hasAccess = true;
    END;

END//