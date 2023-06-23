use TodoSchema;
drop procedure if exists updateList;
delimiter //

create procedure updateList(in T varchar(255), in LID varchar(255), in N varchar(255))
begin
    update Lists
    set `name` = N
    where ListID = LID
    and (
		select `Owner`
        from Invite_List
        where Users_email = (
			select Email
			from Users
			where Token = T
        )
        and L_ListID = LID
    ) = 1;

end//

delimiter ;