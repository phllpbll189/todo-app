use TodoSchema;
DROP PROCEDURE IF EXISTS changePermissions;
Delimiter //

create procedure changePermissions(in T VARCHAR(255), in EM VARCHAR(255), in LID int, in WR BOOL)
begin
	declare exit handler for sqlexception
	begin
		ROLLBACK;
	end;

	start transaction;
    begin
    
		update Invite_List
        set Write_Privilege = WR
        where L_ListID = (
			select L_ListID 
            from (
				select L_ListID
				from Invite_List
				where Users_email = (
					select Email
					from Users
					where Token = T
				)
				and L_ListID = LID
				and `Owner` = true
			) tempthing
        )
        and Users_Email = EM;
        
    end;
	
end//