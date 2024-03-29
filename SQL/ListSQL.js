module.exports = {
    getLists: (token) => {
        return `
        select * 
        from ListView
        where Users_Email = (
            select Email
            from Users
            where Token = "${token}"
        )`;
    },
    
    createList: (token, list) => {
        return `call InsertList("${token}", "${list}")`;
    },

    deleteList: (token, listID) => {
        return `call DeleteList("${token}", "${listID}")`;
    },
    
    updateList: (token, listID, name) => {
        return `call UpdateList("${token}", "${listID}", "${name}")`;
    },

    removeUserPermissions: (ownerToken, targetEmail, listID) => {
        return `call deletePermissions("${ownerToken}", "${targetEmail}", "${listID}")`;
    },

    addUserPermissions: (token, new_email, listID, canWrite) => {
        return `call addPermissions("${token}", "${new_email}", "${listID}", "${canWrite}")`;
    },

    changePermissions: (token, email, lid, access) => {
        return `call changePermissions("${token}", "${email}", "${lid}", "${access}")`;
    },

    getPermissions: (listID, token) => {
        return `call getPermissions("${listID}", "${token}")`;
    },
}