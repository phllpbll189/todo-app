USE TodoSchema;
DROP PROCEDURE IF EXISTS UpdateCat;
DELIMITER //

CREATE PROCEDURE UpdateCat(in TD varchar(255), in LID int, in CID int, in NAMED varchar(255), in XD int, in YD int, in WIDTHD int, in HEIGHTD int)
BEGIN

DECLARE EXIT HANDLER FOR SQLEXCEPTION
BEGIN
    ROLLBACK;
END;

START TRANSACTION;
BEGIN
    SET @email = (
        select Email
        from Users
        where Token = TD
    );

    set @hasAccess = (
        select Write_Privilege
        from invite_list
        where Users_Email = @email
        and L_ListID = LID
    );

    update catagory
    set `Name` = NAMED, X = XD, Y = YD, Width = WIDTHD, Height = HEIGHTD
    Where @hasAccess
    and CatID = CID
    and L_ListID = LID;
    commit;
END;

END