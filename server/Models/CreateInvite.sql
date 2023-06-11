USE TodoSchema;

SELECT Write_Privilege, `Owner`
FROM Invite_List
INNER JOIN Users on Email = "TEST@EMAIL"
and Token = "TOKEN";


set @T = "TOKEN"; -- owner token

set @OEM = "TEST@EMAIL"; -- owner email
set @NEM = "TEST2@EMAIL"; -- new email
set @LID = 12; -- list id
set @WP = true; -- write permission
set @OWN = false; -- is owner 

-- create an invite 
INSERT INTO `Invite_List`(`Users_Email`, `L_ListID`, `Write_Privilege`, `Owner`)
SELECT @T, @LID, @WP, @OWN -- data to be added
WHERE 0 < ( -- make sure the request comes from the owner
	SELECT COUNT(*)
    FROM Invite_List
    INNER JOIN Users 
    on `Users_Email` = @OEM
    AND `Token` = @T
    AND `L_ListID` = @LID
    AND `Owner` = true
    )
AND 0 = (  -- prevent duplicates
	SELECT COUNT(*)
    FROM Invite_List
    WHERE Users_Email = @NEM
    AND `L_ListID` = @LID);

-- deletes everything 
-- delete from `Invite_List`