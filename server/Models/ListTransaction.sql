USE TodoSchema;
DELIMITER //

CREATE PROCEDURE InsertList(IN token VARCHAR(255), IN N VARCHAR(255))
BEGIN
  
	declare exit handler for sqlexception
	begin
		rollback;
	end;
  
	start transaction;
    begin
        
		insert into Lists(`name`)
		values(N);
        

		insert into Invite_List(`Users_Email`, `L_ListID`, `Write_Privilege`, `Owner`)
		select Email, LAST_INSERT_ID(), true, true
        from Users
        where Token = @token;

		commit;
	end;
    
END//

delimiter ;
show errors;
-- drop procedure InsertList;
