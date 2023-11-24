module.exports = {
    insertTodo: (Token, listID, Title, X, Y, Content, StartDate, EndDate) => {
        return `call InsertTodo("${Token}", "${listID}", "${Title}", "${X}", "${Y}", '${Content}', '${StartDate}', '${EndDate}')`;

    },

    getTodos: (Token, ListID) => {
       return `select *
        from todos
        where "${ListID}" = (
            select L_ListID
            from Invite_List
            where Users_Email  = (
                select email 
                from Users
                where token = "${Token}"
            )
        );`
    },
}