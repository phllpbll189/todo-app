USE TodoSchema;
DROP PROCEDURE IF EXISTS UpdateTodo;
DELIMITER //

CREATE PROCEDURE UpdateTodo(in TD varchar(255), in TODOIDD int, in LISTIDD int, in TITLED varchar(255), in XD int, in YD int, in CONTENTD json, in STARTD DateTime, in ENDD DateTime)
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
        and L_ListID = LISTIDD
    );

    update todos
    set X = XD, Y = YD, Title = TITLED, Content = CONTENTD, StartDate = STARTD, EndDate = ENDD
    Where @hasAccess
    and TodoID = TODOIDD;
    commit;
END;

END