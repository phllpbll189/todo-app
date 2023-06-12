const mysql = require('mysql');

var DBFactory = (function(){
    class singletonDB {
        pool

        constructor(){
            this.pool = mysql.createPool({
                connectionLimit: 100,
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB
            })  
        }

        query(sql, func){
            this.pool.query(sql, (err, result) => {
                if(err){
                    func(err, result);
                   return;
                }
                func(_, result);

            })
        }
    }

    var instance

    return {
        getInstance: function(){
            if(instance){
                return instance
            }

            instance = new singletonDB();
        }
    }
})

var datab = db.getInstance();
var thing = new db();

module.exports = {
    DBFactory
}