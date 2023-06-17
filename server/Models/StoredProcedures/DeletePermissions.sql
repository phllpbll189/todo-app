use TodoSchema;
DROP PROCEDURE IF EXISTS deletePermissions;
Delimiter //

create procedure deletePermissions(in TOK VARCHAR(255), in EMA VARCHAR(255), in LID int)
begin

	declare exit handler for sqlexception
	begin
		ROLLBACK;
	end;

	start transaction;
    begin
    
		set @em = (
        		select Email
				from Users
				where Token = TOK
        );
        
        
        set @id = (
				select L_ListID
				from Invite_List
				where Users_Email = @em
				and L_ListID = LID
				and `Owner` = true
        );
        
        delete from Invite_List
        where L_ListID = @id
        and Users_Email = EMA
        and Users_Email != @em;
        
    end;
end//