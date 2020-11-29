const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

const restList = require("./restaurants_list");
const restDetails = require("./restaurant_details");

app.route("/getCities")
    .get(restList.getCities);

app.route("/getRestaurants")
    .get(restList.getRestaurants);

app.route("/getDetails")
    .get(restDetails.getDetails);

app.listen(port);
