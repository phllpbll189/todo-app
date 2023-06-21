module.exports = {
    verifyUser: (token) => {
        return `SELECT Email
                    FROM Users 
                    WHERE Token = "${token}"` 
    },

    signUp: (email, password, token) => {
        return `INSERT INTO TodoSchema.Users (Email, Pass, Token)
                    VALUES ("${email}", "${password}", "${token}");`
    },

    updateJWT: (jwt, email, password) => {
        return `UPDATE Users
                SET Token = "${jwt}"
                WHERE Email = "${email}"
                AND Pass = "${password}"`
    },
    
    Check: (email, password) => {
        return `SELECT Email
                FROM Users
                WHERE Email="${email}"
                AND Pass="${password}"`
    },

    IsOwner: (Email, Token, ListID) => { //testing required
        return `SELECT Owner
        FROM Invite_List
        INNER JOIN Users ON Users_Email = ${Email} 
        AND Token = "${Token}"
        AND Invite_List.L_ListID = ${ListID}`
    },

    HasAccess: (Email, Token, ListID) => {
        return `SELECT Users_Email, invite_accepted
        FROM Invite_List
        INNER JOIN Users ON Users_Email = ${Email} 
        AND Token = "${Token}"
        AND Invite_List.L_ListID = ${ListID}` 
    },

    HasWriteAccess: (Email, Token, ListID) => {
        return `SELECT Write_Privilege 
        FROM Invite_List
        INNER JOIN Users ON Users_Email = ${Email} 
        AND Token = "${Token}"
        AND Invite_List.L_ListID = ${ListID}`
    }
}