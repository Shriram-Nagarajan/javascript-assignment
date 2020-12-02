const restDetailsDao = require("../dao/restaurant_details_dao");

const getDetails = (req, res) => {

    if(req && req.query.restId){
        restDetailsDao.getRestaurantDetails(req.query.restId, (restDetails) => {
            res.send(restDetails);
        });
    }

}

const addDetails = (req,res) => {

    try{
        
        if(req && req.body.restDetails){
            restDetailsDao.createRestaurant(req.body.restDetails, function(response){
        
                if(response && response.branchId){
                    console.log("Create restaurant successful : ", response.branchId);
                    res.send({branchId : response.branchId, status : "success"});
                }
            
            });
        }else{
            console.log("Empty inputs: ", req);
            res.send({status : "error"});
        }
    }   catch(e){
        console.error("Error occurred : ",e);
        res.send({status : "error"});
    }

}

module.exports = {
    getDetails : getDetails,
    addDetails : addDetails
}
