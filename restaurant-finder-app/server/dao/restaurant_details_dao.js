const queries = require("./queries");
const connector = require("../database/connector");

const getRestaurantLocation = (branchIdArr, callBack) => {

    let query = queries.get_restaurant_location;
    connector.query(query, [branchIdArr], (error, results, fields) => {

        if(!error){
            // console.log("Restaurant details : ", results);
            callBack(results);
        }   else{
            throw error;
        }

    });

}

const getRestaurantMenu = (branchIdArr, callBack) => {

    let query = queries.get_menu;
    connector.query(query, [branchIdArr], (error, results, fields) => {

        if(!error){
            // console.log("Restaurant menu : ", results);
            callBack(results);
        }   else{
            throw error;
        }

    });

}

const getRestaurantDetails = (branchIdArr, callBack) => {

    getRestaurantLocation(branchIdArr, (restLoc) => {

        getRestaurantMenu(branchIdArr, (restMenu) => {
            if(callBack && typeof callBack === "function"){
                callBack({"location" : restLoc, "menu" : restMenu});
            }
        })

    });

}

module.exports = {
    getRestaurantDetails : getRestaurantDetails
}