import React from 'react';
import { createMuiTheme, makeStyles, withStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import CoreView from '../core/CoreView';
import RestaurantCard from './RestaurantCard';

import '../css/Restaurants.css';
import logo from '../img/logo.jpg';
const restaurants = [
  {
    "name" : "Saravana Bhavan",
    "locality" : "Alandur",
    "logo" : logo
  }, {
    "name" : "Sangeetha",
    "locality" : "T. Nagar",
    "logo" : logo
  },
  {
    "name" : "Saravana Bhavan",
    "locality" : "Alandur",
    "logo" : logo
  }, {
    "name" : "Sangeetha",
    "locality" : "T. Nagar",
    "logo" : logo
  },
  {
    "name" : "Saravana Bhavan",
    "locality" : "Alandur",
    "logo" : logo
  }, {
    "name" : "Sangeetha",
    "locality" : "T. Nagar",
    "logo" : logo
  },
  {
    "name" : "Saravana Bhavan",
    "locality" : "Alandur",
    "logo" : logo
  }, {
    "name" : "Sangeetha",
    "locality" : "T. Nagar",
    "logo" : logo
  }

]

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

// const theme = ({
//     root: {
//       '& > *': {
//         marginTop: "5px"
//       },
//     },
// });

class Restaurants extends CoreView {

  constructor(props){
      super(props);
  }

  getRestaurants(){
    if(restaurants && restaurants.length > 0){
      return restaurants.map((each, idx) => {
        return <RestaurantCard {...each} />
      });
    }
  }

  fetchRestaurants(){
    let me = this;

    let success = function(){

    }

    let failure = function(){
        
    }

    me.ajaxGet(me.urlFor("get_restaurants"),{"cityId" : cityId},success, failure);
  }

  render(){
    let {classes} = this.props;
    console.log("classes" , classes);
    return (
        <div className={" d-flex flex-column align-items-start"}>
          {/* <Pagination count={10} variant="outlined" /> */}
          <div className="d-flex flex-column cardContainer align-items-center">
            {/* <RestaurantCard  />
            <RestaurantCard /> */}
            {this.getRestaurants()}
          </div>
          <div className="pagination-container">
             <Pagination count={10} variant="outlined" color="primary" />
          </div>
          {/* <Pagination count={10} variant="outlined" color="secondary" /> */}
          {/* <Pagination count={10} variant="outlined" disabled /> */}
        </div>
      );
  }
}

// export default withStyles(theme)(Restaurants);
export default Restaurants;