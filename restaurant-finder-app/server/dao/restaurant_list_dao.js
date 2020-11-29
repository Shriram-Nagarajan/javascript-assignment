const queries = require("./queries");
const connector = require("../database/connector");

const getCities = (callBack) => {

    let query = queries.get_cities;
    connector.query(query, null, (error, results, fields) => {
        if(!error){
            console.log("Results : ", results);
            callBack(results);
        }   else{
            throw error;
        }
    });

}

const getRestaurants = (cities, callBack) => {

    let query = queries.get_restaurants_for_cities;
    connector.query(query, [cities], (error, results, fields) => {
        if(!error){
            console.log("Restaurants : ", results);
            callBack(results);
        }   else{
            throw error;
        }
    });

}

module.exports = {
    getCities : getCities,
    getRestaurants : getRestaurants
}