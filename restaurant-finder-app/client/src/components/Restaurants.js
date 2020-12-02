import React from 'react';
import { createMuiTheme, makeStyles, withStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import CoreView from '../core/CoreView';
import RestaurantCard from './RestaurantCard';

import '../css/Restaurants.css';
import logo from '../img/logo.jpg';

class Restaurants extends CoreView {

  constructor(props){
      super(props);
      this.restaurants = null;
      this.handlePageChange = this.handlePageChange.bind(this);
      this.state = {
        restLoaded : false,
        pageNo: 1
      }
  }

  renderRestaurants(restaurants){
    if(restaurants && restaurants.length > 0){
      let pageNo = this.state.pageNo;
      return restaurants.filter((each, idx) => {
        return (idx >= ((pageNo-1) * (window.restaurantsPerPage)) && idx < ((pageNo) * (window.restaurantsPerPage)))
      }).map((each, idx) => {

        let rest = {};

        rest.name = each.restaurant_name;
        rest.locality = each.locality;
        rest.logo = logo;
        rest.restaurant_id = each.restaurant_id;
        rest.cuisines = each.cuisines.split(",");

        return <RestaurantCard key={each.restaurant_id} {...rest} />
      });
    }
  }

  fetchRestaurants(cityId){
    let me = this;

    let success = function(response){

      if(response && response.length > 0){
        me.restaurants = response;
        me.setState({
          restLoaded : true
        });
      }

    }

    let failure = function(response){
        
    }

    me.ajaxGet(me.urlFor("get_restaurants"),{"cityId" : cityId},success, failure);
  }

  getCityId(){
    return window.location.pathname.split("/restaurants/")[1];
  }

  handlePageChange(event, value){
    let me = this;
    if(value > 0){
      me.setState({
        pageNo : value
      });
    }
  }

  render(){
    let {classes} = this.props;
    console.log("classes" , classes);
    if(this.state.restLoaded && this.restaurants && this.restaurants.length > 0){
      let totalPages = this.restaurants.length / window.restaurantsPerPage;
      return (
        <div className={" d-flex flex-column align-items-start"}>
          {/* <Pagination count={10} variant="outlined" /> */}
          <div className="d-flex flex-column cardContainer align-items-center">
            {/* <RestaurantCard  />
            <RestaurantCard /> */}
            {this.renderRestaurants(this.restaurants)}
          </div>
          <div className="pagination-container">
             <Pagination count={totalPages} variant="outlined" color="primary" onChange={this.handlePageChange} />
          </div>
          {/* <Pagination count={10} variant="outlined" color="secondary" /> */}
          {/* <Pagination count={10} variant="outlined" disabled /> */}
        </div>
      );
    } else{
      this.fetchRestaurants(this.getCityId());
      return(<></>);
    }
  }
}

// export default withStyles(theme)(Restaurants);
export default Restaurants;