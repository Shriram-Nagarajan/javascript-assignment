const restListDao = require("../dao/restaurant_list_dao");

const getCities = (req, res) => {

    restListDao.getCities((cities) => {
        res.send(cities);
    });

}

const getRestaurants = (req, res) => {

    if(req && req.query && req.query.cityId){
        restListDao.getRestaurants(req.query.cityId, (restaurants) => {
            res.send(restaurants);
        });
    }

}

module.exports = {
    getCities : getCities,
    getRestaurants : getRestaurants
}