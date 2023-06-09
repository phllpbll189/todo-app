use TodoSchema;

select token, Email, ListID, `name`
from Invite_List
join Lists
on ListID = L_ListID
join Users
on Users_Email = Email;