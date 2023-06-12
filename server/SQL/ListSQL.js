module.exports = {
    getLists: (token) => {
        return `
        select * 
        from ListView
        where Users_Email = (
            select Email
            from Users
            where Token = "${token}"
        )`
    },
    
    createList: (token, list) => {
        return `CALL InsertList("${token}", "${list}")`;
    },

    deleteList: (token, listID) => {
        return `CALL DeleteList("${token}", "${listID}")`;
    },
    
    updateList: () => {
        return ""
    },

    removeUserPermissions: (ownerToken, targetEmail, listID) => {
        return `call deletePermissions(${ownerToken}, ${targetEmail}, ${listID})`;
    },

    addUserPermissions: () => {
        return `INSERT INTO \`Invite_List\`(\`Users_Email\`, \`L_ListID\`, \`Write_Privilege\`, \`Owner\`)
        SELECT \`${new_email}\`, ${listID}, ${canWrite}, ${isOwner} 
        WHERE 0 < ( 
            SELECT COUNT(*)
            FROM Invite_List
            INNER JOIN Users on Users_Email = \`${Email}\`
            AND \`L_ListID\` = ${listID}
            AND \`Owner\` = ${owner_email}
            AND Token = \`${token}\`)
        AND 0 = (  
            SELECT COUNT(*)
            FROM Invite_List
            WHERE Users_Email = \`${new_email}\`
            AND \`L_ListID\` = ${listID})`
    },

    changePermissions: (token, email, lid, access) => {
        return `call changePermissions(${token}, ${email}, ${lid}, ${access})`;
    },

    getPermissions: () => {
        return ""
    },
}