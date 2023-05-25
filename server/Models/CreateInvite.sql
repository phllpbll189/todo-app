USE TodoSchema;

SELECT Write_Privilege, `Owner`
FROM Invite_List
INNER JOIN Users on Email = "TEST@EMAIL"
and Token = "TOKEN";

-- create an invite 
INSERT INTO `Invite_List`(`Users_Email`, `L_ListID`, `Write_Privilege`, `Owner`)
SELECT "TEST2@EMAIL", 2, true, false -- data to be added
WHERE 0 < ( -- make sure the request comes from the owner
	SELECT COUNT(*)
    FROM Invite_List
    INNER JOIN Users on Users_Email = "TEST@EMAIL"
    AND `L_ListID` = 2
    AND `Owner` = 1
    AND Token = "TOKEN")
AND 0 = (  -- prevent duplicates
	SELECT COUNT(*)
    FROM Invite_List
    WHERE Users_Email = "TEST2@EMAIL"
    AND `L_ListID` = 2);

-- deletes everything 
-- delete from `Invite_List`