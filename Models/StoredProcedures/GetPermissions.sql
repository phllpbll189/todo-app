use TodoSchema;
drop procedure if exists getPermissions;
delimiter //

create procedure getPermissions(IN LID INT, IN TOK VARCHAR(255))
BEGIN
	DECLARE EXIT HANDLER FOR sqlexception
    begin
		rollback;
	end;
    
    start transaction;
	begin		
		set @tokenCheck = (
			select count(*)
			from Invite_List
			Where L_ListID = LID
			and Users_Email = (
				select Email
				from Users
				where token = TOK
				)
			);
            
		select Users_Email, Write_Privilege
        from Invite_List
        where L_ListID = LID
        and @tokenCheck > 0;
    end;
END//
