USE TodoSchema;

drop view if exists ListView;

create view ListView as
select `Owner`, Write_Privilege, `name`, Users_Email, L_ListID
from Invite_List
join Lists
on L_ListID = ListID;
        