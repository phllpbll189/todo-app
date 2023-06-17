use TodoSchema;
DROP PROCEDURE IF EXISTS changePermissions;
Delimiter //

create procedure changePermissions(in TOKEN VARCHAR(255), in EMAIL VARCHAR(255), in LID int, in WRITEACCESS BOOL)
begin
	declare exit handler for sqlexception
	begin
		ROLLBACK;
	end;

	start transaction;
    begin
    
		update Invite_List
        set Write_Privilege = WRITEACCESS
        where L_ListID = (
			select L_ListID 
            from (
				select L_ListID
				from Invite_List
				where Users_email = (
					select Email
					from Users
					where Token = TOKEN
				)
				and L_ListID = LID
				and `Owner` = true
			) tempthing
        )
        and Users_Email = EMAIL;
        
    end;
	
end//