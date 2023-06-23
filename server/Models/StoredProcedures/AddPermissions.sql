use TodoSchema;
DROP PROCEDURE IF EXISTS addPermissions;
Delimiter //

create procedure addPermissions(in T VARCHAR(255), in newEmail varchar(255), in LID varchar(255), in canWrite boolean)
begin
    declare exit handler for sqlexception
    begin
        rollback;
    end

    start transaction;
    begin
        set @email = (
            select email
            from Users
            where token = T
        );

        set @hasAccess = (
            select `Owner`
            from Invite_List
            where Users_Email = @email
            and L_ListID = LID
        );

        insert into Invite_List (Users_Email, L_ListID, Write_Privilege, `Owner`)
        values newEmail, LID, canWrite, 0
        where @hasAccess = true;
    end;
end