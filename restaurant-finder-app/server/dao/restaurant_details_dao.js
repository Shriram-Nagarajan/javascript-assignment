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

const getCuisines = (cuisineArr, callBack) => {

    let query = queries.get_cuisines;

    connector.query(query, [cuisineArr], (error, results, fields) => {

        if(!error){
            console.log("Results : ", results);
            let cuisines = results.reduce(
                (obj, each) => Object.assign(obj, { [each.cuisine_name]: each.cuisine_id }), {});
            console.log("Cuisines : ", cuisines);
            callBack(error,cuisines);
        }
        else{
            callBack(error, null);
        }

    });

}

const getDishes = (dishArr, callBack) => {

    let query = queries.get_dishes;
    console.log("Get dishes invoked!")

    connector.query(query, [dishArr], (error, results, fields) => {

        if(!error){
            console.log("Get dishes success! : ", results);
            let dishes = results.reduce(
                (obj, each) => Object.assign(obj, { [each.dish_name]: each.dish_id }), {});
            console.log("Dish: ", dishes);
            callBack(error, dishes);
        }else{
            callBack(error, null);
        }

    });

}

const addCuisines = (connection, cuisineArr, callBack) => {

    if(cuisineArr && cuisineArr != null && cuisineArr.length > 0){
        let cuisines = cuisineArr.map((each, idx) => {return [each]});
        console.log("Cuisines :", cuisines);
        connection.query(queries.insert_cuisines, [cuisines], (err, result) => {

            callBack(err, result);
            console.log("Add cuisines complete!");

        });
    }   else{
       callBack(null, {});
    }


}

const addDishes = (connection, dishArr, callBack) => {

    if(dishArr && dishArr != null && dishArr.length > 0){
        let dishes = dishArr.map((each, idx) => {return [each]});
        connection.query(queries.insert_dishes, [dishes], (err, result) => {

            callBack(err, result);
            console.log("Add dishes complete!");

        });
    }   else{
        callBack(null, {});
    }


}

const insertRestBranch = (connection, restDetails, callBack) => {

    let restBranch = [[restDetails.restId,0.00,0.00,restDetails.street,restDetails.locality,restDetails.cityId]];

    connection.query(queries.insert_rest_branch, [restBranch], (err, result) => {

        callBack(err, result);

    });


}

const insertRestDefn = (connection, restName, callBack) => {


    connection.query(queries.insert_rest_defn, [[[restName]]], (err, result) => {

        callBack(err, result);

    });


}

const insertRestCuisineMap = (connection, restCuisineMap, callBack) => {

    connection.query(queries.insert_rest_cuisine_map, [restCuisineMap], (err, result) => {
        callBack(err, result);
    });

}

const insertRestMenu = (connection, restMenu, callBack) => {

    connection.query(queries.insert_rest_menu, [restMenu], (err, result) => {
        callBack(err, result);
    });

}

const concatMaps = (insStartId, insertedData, existingData) => {

    let data = {};
    console.log("Existing data : ", existingData);
    console.log("inserted data : ", insertedData);
    if(existingData && existingData != null){
        Object.assign(data, existingData);
    }

    if(!data || data == null){
        data = {};
    }

    if(insertedData && insertedData != null && insertedData.length > 0){
        for(let entry of insertedData){

            data[entry] = (insStartId++);
    
        }
    }
    return data;

}

const createRestaurant = (restDetails, callBack) => {

    if(restDetails && restDetails.name && restDetails.street && restDetails.locality &&
            restDetails.cityId && restDetails.cuisineArr && restDetails.dishArr){
        
        let pool = connector.getPool();

        if(pool && pool != null){

            let cuisines = null;

            getCuisines(restDetails.cuisineArr, (err, results) => {
                if(err){
                    throw err;
                }
                else{
                    cuisines = results;

                    let dishNameList = restDetails.dishArr.map((each) => {return each.dishName});
                    
                    let nameDescMap = restDetails.dishArr.reduce((obj, each) => Object.assign(obj, { [each.dishName]: each.dishDescription }), {});
                    let dishes = null;
                    
                    getDishes(dishNameList, (err, results) => {
                        
                        if(err){
                            throw err;
                        }
                        else{
                            dishes = results;
                            console.log("Dishes.....", dishes);
                            let newDishes = (dishes && dishes != null) ? (restDetails.dishArr.filter((dish) => {
                                if(!(dish.dishName in dishes)){
                                    return true;
                                }else{
                                    return false;
                                }
                            })).map((each) => {return each.dishName}) : restDetails.dishArr;
                            console.log("new Dishes://///////", newDishes);
                            let newCuisines = (cuisines && cuisines != null) ? (restDetails.cuisineArr.filter((cuisine) => {return !(cuisine in cuisines)})) : restDetails.cuisineArr;
                
                            pool.getConnection((err, connection) => {
                
                                if(err){
                                    throw err;
                                }
                
                                connection.beginTransaction((err) => {
                                    if(err){
                                        connection.rollback(() => {
                                            throw err;
                                        })
                                    }   else{
                    
                                        try{
                                            addCuisines(connection, newCuisines, (err, results) => {
                                                if(err){
                                                    throw err;
                                                }   else{
                                                    let cuisineInsId = results.insertId ? results.insertId : 0;
                                                    addDishes(connection, newDishes, (err, results) => {
                        
                                                        if(err){
                                                            throw err;
                                                        }   else{
                                                            let dishInsId = results.insertId ? results.insertId : 0;
                                                            insertRestDefn(connection, restDetails.name, (err, results) => {
                        
                                                                let restId = results.insertId;
                                                                restDetails.restId = restId;
                                                                insertRestBranch(connection, restDetails, (err, results) => {
                        
                                                                    if(err){
                                                                        throw err;
                                                                    }   else{
                                                                        
                                                                        let branchId = results.insertId;
                                                                        let cuisineMap = concatMaps(cuisineInsId,newCuisines, cuisines);
                                                                        let restCuisineMap = [];
                    
                                                                        if(cuisineMap && Object.keys(cuisineMap)){
                                                                            let cuisineIds = Object.values(cuisineMap);
                                                                            restCuisineMap = cuisineIds.map((each, idx) => {
                                                                                return [branchId, each];
                                                                            })
                                                                        }
                                                                        
                        
                                                                        insertRestCuisineMap(connection, restCuisineMap, (err, results) => {
                        
                                                                            let dishMap = concatMaps(dishInsId, newDishes, dishes);
                                                                            let restMenu = [];
                    
                                                                            if(dishMap){
                    
                                                                                for(let [dishName,dishId] of Object.entries(dishMap)){
                                                                                    restMenu.push([branchId, dishId, nameDescMap[dishName]]);
                                                                                }
                    
                                                                            }
                    
                                                                            if(err){
                                                                                throw err;
                                                                            }   else{
                                                                                insertRestMenu(connection, restMenu, (err, results) => {
                                                                                    if(err){
                                                                                        connection.rollback(() => {
                                                                                            throw err;
                                                                                        })
                                                                                    }   else{
                                                                                        connection.commit((err) => {
                                                                                            if(err){
                                                                                                connection.rollback(() => {
                                                                                                    throw err;
                                                                                                })
                                                                                            }   else{
                                                                                                console.log("Insert restaurant success: branchId : " , branchId);
                                                                                                callBack({"branchId" : branchId});
                                                                                                return;
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                });
                                                                            }
                        
                                                                        });
                        
                                                                    }
                        
                                                                });                                    
                            
                            
                                                            });
                                                        }
                        
                        
                                                    });         
                                                }        
                                            });
                                        } catch(e){
                                            console.error("Error occurred : ",e);
                                            connection.rollback(() => {
                                                throw err;
                                            })
                                        }
                                        
                    
                                    }
                                });
                
                
                            });
                        }
                    });
                }
    
            });



        }else{
            throw new Error("Unable to connect to database");
        }
        
    }   else{
        throw new Error("Empty inputs ");
    }

}

// getCuisines(["Indian", "French", "Japanese", "S Italian"]);
// getDishes(["Idly", "Roll", "Dosa"]);

// let pool = connector.getPool();

// console.log("Pool : ", pool);
// pool.getConnection((err, connection) => {


//     if(!err){
//         addCuisines(connection, [["S Italian"], ["N Italian"]] ,(err, result) => {
//             if(!err){
//                 console.log("success: ", result);
//             }else{
//                 throw err;
//             }
//         })
//     }   else{
//         // console.log("Adding ")
//         console.error("Error : ",err);
//         throw err;
//     }

// });

// pool.getConnection((err, connection) => {
//     if(!err){
//         addDishes(connection, [["Thalapakatti Biryani"], ["Ambur Biryani"]] ,(err, result) => {
//             if(!err){
//                 console.log("success: ", result);
//             }else{
//                 throw err;
//             }
//         })
//     }
// })

// if(restDetails && restDetails.name && restDetails.street && restDetails.locality &&
//     restDetails.cityId && restDetails.cuisineArr && restDetails.dishArr){

// let restDetails = {
//     name : "Adyar Anandha Bhavan",
//     street : "Adyar main road",
//     locality : "Adyar",
//     cityId : 1,
//     cuisineArr : ["South Indian", "North Indian", "Chinese"],
//     dishArr : [{
//         "dishName" : "Idly",
//         "dishDescription" : "Smooth and soft idlys"
//     }, {
//         "dishName" : "Mysore Masala Dosa",
//         "dishDescription" : "With the goodness of coriander, pudina and potatoes"
//     }]
// }
module.exports = {
    getRestaurantDetails : getRestaurantDetails,
    createRestaurant : createRestaurant
}