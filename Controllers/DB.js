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
               if(err){
                cb(err, null, conn);
                return;
               }
                // wrap function with conn.release()
                cb = (cb=> {
                    return function (){
                        arguments[2].release();
                        cb.apply(this, arguments);
                    }
                })(cb);

                if(err){
                    cb(err, null, conn);
                    return;
                }
                
                conn.query(sql, (err, result) => {
                    if(err){
                        cb(err, null, conn);
                        return;
                    }
                    
                    cb(err, result, conn);  
                })

                return;
            })
        }
    }

    let instance

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