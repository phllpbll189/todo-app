exports.parseToken = (header, payload, token) => {
    return header + '.' + payload + '.' + token;
}

//this isn't necassary but im trying to get better with working with objects
exports.handleQuery = function (connection){
    this.connection = connection
    this.query = function query(sql, cb){
        this.connection.connect((err) => {
            connection.query(sql, cb)
        })
    }
} 