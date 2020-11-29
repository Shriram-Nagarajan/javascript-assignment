const mysql = require("mysql");
const config = require("./config");
const constants = require("./constants");

let connectionPool = null;

const getPool = () => {

    if(connectionPool == null){
        connectionPool = mysql.createPool({
            connectionLimit : config.connectionLimit,
            host            : config.host,
            user            : config.user,
            password        : config.password,
            database        : config.database
        });
    }

    return connectionPool;

}

const query = (query, parameters, callBack) => {

    let pool = getPool();
    if(pool != null){
        pool.query(query, parameters, callBack);
    } else{
        if(callBack && typeof callBack === "function"){
            callBack(new Error(constants.err_connect_database), null, null);
        }
    }

}

const releaseAll = (callBack) => {

    if(connectionPool != null){
        connectionPool.end((err) => {
            if(err){
                console.error("Error occurred while releasing connections from pool : ", err);
                if(callBack && typeof callBack === "function"){
                    callBack(new Error(constants.err_releasing_connection));
                }
            }
            else{
                if(callBack && typeof callBack === "function"){
                    callBack(null);
                }
            }
        });
    }

}

module.exports = {
    getPool : getPool,
    query : query,
    releaseAll : releaseAll
}