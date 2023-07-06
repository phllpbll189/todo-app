const mysql = require('mysql');

require('dotenv').config();
if(process.env.NODE_ENV !== 'production'){
    port = process.env.PORT || 8080;
}

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

        query(sql, cb){
            if(!cb || !sql){
                throw new Error("DBFactory.query requires SQLcode and a function")
            }

            this.pool.getConnection((err, conn) => {
               
                // wrap function with conn.release()
                const wrappedCb = (cb => {
                    return function (){
                        conn.release();
                        cb.apply(this, arguments);
                    }
                })(cb);
                cb = wrappedCb;

                if(err){
                    cb(err, null);
                    return;
                }
                
                conn.query(sql, (err, result) => {
                    cb(err, result);  
                })

                return;
            })
        }
    }

    var instance

    return {
        getInstance: function(){
            if(instance){
                return instance;
            }

            instance = new singletonDB();
            return instance;
        }
    }
})()

module.exports = {
    db: DBFactory.getInstance()
}