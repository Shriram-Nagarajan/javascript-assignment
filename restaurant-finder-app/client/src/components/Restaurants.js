import React from 'react';
import { createMuiTheme, makeStyles, withStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import CoreView from '../core/CoreView';
import RestaurantCard from './RestaurantCard';

import '../css/Restaurants.css';

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

  render(){
    let {classes} = this.props;
    console.log("classes" , classes);
    return (
        <div className={" d-flex flex-column align-items-start"}>
          {/* <Pagination count={10} variant="outlined" /> */}
          <div className="d-flex flex-column cardContainer align-items-center">
            <RestaurantCard  />
            <RestaurantCard />
            
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