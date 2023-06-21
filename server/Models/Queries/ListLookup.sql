use TodoSchema;

select token, Email, ListID, `name`, Write_Privilege, `Owner`
from Invite_List
inner join Lists
on ListID = L_ListID
join Users
on Users_Email = Email;
