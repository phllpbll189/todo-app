module.exports = {
    insertTodo: (Token, listID, Title, X, Y, Content, StartDate, EndDate) => {
        return `call InsertTodo("${Token}", "${listID}", "${Title}", "${X}", "${Y}", '${Content}', '${StartDate}', '${EndDate}')`;

    },

    getTodos: (Token, ListID) => {
       return `select *
        from todos
        where "${ListID}" = (
            select Invite_List.L_ListID
            from Invite_List
            where Users_Email  = (
                select email 
                from Users
                where token = "${Token}"
            )
        );`
    },

    updateTodos: (Token, TodoID, ListID, Title, X, Y, Content, StartDate, EndDate) => {
        return `call UpdateTodo("${Token}","${TodoID}","${ListID}","${Title}","${X}","${Y}",'${Content}', '${StartDate}', '${EndDate}')`;
    },

    deleteTodo: (Token, TodoID, ListID) => {
        return `call deleteTodo("${Token}", "${ListID}", "${TodoID}")`;
    }
}