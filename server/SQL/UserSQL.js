const { IsOwner } = require("../Controllers/UserController")

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
    
    CheckCred: (email, password) => {
        return `SELECT Email
                FROM Users
                WHERE Email="${email}"
                AND Pass="${password}"`
    },

    IsOwner: (Email, Token, ListID) => { //testing required
        return `SELECT \`Owner\`
                FROM Invite_List
                INNER JOIN Users ON Users_Email = Email
                AND \`L_ListID\` = "${ListID}"
                AND Token = "${Token}"`
    }
}