const mysql = require('mysql');

var DBFactory = (function(){
    class singletonDB {
        pool

        constructor(){
            this.pool = mysql.createPool({
                connectionLimit: 30,
                host    : process.env.DB_HOST,
                user    : process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB 
            })  
        }

        query(sql, func){
            if(!func || !sql){
                throw new Error("DBFactory.query requires SQLcode and a function")
            }

            this.pool.getConnection((err, conn) => {
               
                // wrap function with conn.release
                func = (func=> {
                    return function (){
                        conn.release();
                        func.apply(this, arguments);
                    }
                })(func);
                

                if(err){
                    func(err, null, conn);
                    return;
                }
                
                conn.query(sql, (err, result) => {
                    if(err){
                        func(err, null, conn);
                        return;
                    }

                    func(err, result, conn);  
                })

                return;
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
})()

module.exports = DBFactory.getInstance()