const restDetailsDao = require("../dao/restaurant_details_dao");

const getDetails = (req, res) => {

    if(req && req.query.restId){
        restDetailsDao.getRestaurantDetails(req.query.restId, (restDetails) => {
            res.send(restDetails);
        });
    }

}

module.exports = {
    getDetails : getDetails
}