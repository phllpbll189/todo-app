USE TodoSchema;

-- standard inserts
INSERT INTO `Users`(`Email`,`Pass`,`Token`)
VALUES("TEST2@EMAIL","0123456789","TOKEN2");

insert into `Lists`(`name`)
values("TEST LIST");

insert into Invite_List(Users_Email, L_ListID, Write_Privilege, `Owner`)
values("TEST@EMAIL", 2, true, true);

-- standard selects
SELECT `Users`.`Email`,
    `Users`.`Pass`,
    `Users`.`Token`
FROM `TodoSchema`.`Users`;

SELECT `Lists`.`ListID`,
    `Lists`.`name`
FROM `TodoSchema`.`Lists`;

SELECT `Invite_List`.`Users_Email`,
    `Invite_List`.`L_ListID`,
    `Invite_List`.`Write_Privilege`,
    `Invite_List`.`Owner`,
    `Invite_List`.`invite_accepted`
FROM `TodoSchema`.`Invite_List`;

-- returns 1 if the email is the owner and the token provided is verified
SELECT Owner
FROM Invite_List
INNER JOIN Users ON Users_Email = Email
AND Token = "BADTOKEN";

-- cleanup

-- THIS WILL DELETE EVERYTHING FROM LISTS, INVITE, AND USERS. CAREFUL
DELETE `Users`, `Invite_List`, `Lists`
FROM `Invite_List`
INNER JOIN `Users` ON `Users`.`Email` = `Invite_List`.`Users_Email`
INNER JOIN `Lists` ON `Lists`.`ListID` = `Invite_List`.`L_ListID`;

DELETE FROM Lists
where ListID = 8
or ListID = 9


