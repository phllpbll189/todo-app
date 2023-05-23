module.exports = {
    getLists: () => {
        return `SELECT Write_Privilege, "Owner"
        FROM Invite_List
        INNER JOIN Users on Email = "TEST@EMAIL"
        and Token = "TOKEN"`
    },
    
    createList: () => {
        return ""
    },

    deleteList: () => {
        return ""
    },
    
    updateList: () => {
        return ""
    },

    removeUserPermissions: () => {
        return ""
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

    changePermissions: () => {
        return ""
    },

    getPermissions: () => {
        return ""
    },
}