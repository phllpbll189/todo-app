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
    }
}