const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");

const constants = require("./constants");
const restList = require("./restaurants_list");
const restDetails = require("./restaurant_details");

const configureCors = function(){

    if(constants.cors_enabled){

      const whiteList = constants.allowed_clients;
   
      const corsOptions = {
        origin : whiteList,
        credentials: true
      }
  
      app.use(cors(corsOptions));
    }
}

configureCors();
app.use(express.json());   
app.use(express.urlencoded())

app.route("/getCities")
    .get(restList.getCities);

app.route("/getRestaurants")
    .get(restList.getRestaurants);

app.route("/getDetails")
    .get(restDetails.getDetails);

app.route("/createRestaurant")
    .post(restDetails.addDetails);

app.listen(port);
