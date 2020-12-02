import CoreView from "../core/CoreView";
import Button from '@material-ui/core/Button';
import { Avatar, Box } from "@material-ui/core";
import '../css/Cities.css';
import {createMuiTheme} from '@material-ui/core/styles';

import logo from '../img/logo.jpg';

class Cities extends CoreView{

    constructor(props){
        super(props);
        this.state = {
            citiesLoaded : false
        }
        this.cities = null;

    }

    handleClick(cityId){

        window.location.href = "/restaurants/" + cityId;

    }

    renderCities(cities){

        if(cities && cities.length > 0){
            return  cities.map((each, idx) => {
                return(
                    <Button id={each.id} variant="outlined" color="primary" style={{marginTop : "20px"}} onClick={() => {this.handleClick(each.id)}} >
                        {each.city}
                    </Button>
                );
            });
        }
        return (<></>);

    }

    fetchCities(){

        let me = this;
        let success = function(response){

            if(response && response.length > 0){
                me.cities = response;
                me.setState({
                    citiesLoaded : true
                });
            }

        }

        let failure = function(response){

            alert("Error occurred, get_cities");

        }
        // debugger;

        this.ajaxGet(me.urlFor("get_cities"),null,success,failure);

    }

    render(){
        if(this.state.citiesLoaded){
            return(
                    <Box className="pageCenter citiesBox">
                        <Avatar alt={"A"} src={logo} className="logo" />
                        <h1>{this.rb("app_name")}</h1>
                        {/* <Button variant="outlined" color="primary" style={{marginTop : "20px"}}>
                            Chennai
                        </Button>
                        <Button variant="outlined" color="primary" style={{marginTop : "20px"}}>
                            Mumbai
                        </Button>
                        <Button variant="outlined" color="primary" style={{marginTop : "20px"}}>
                            Kolkata
                        </Button>
                        <Button variant="outlined" color="primary" style={{marginTop : "20px"}}>
                            Hyderabad
                        </Button>
                        <Button variant="outlined" color="primary" style={{marginTop : "20px"}}>
                            Chennai
                        </Button>
                        <Button variant="outlined" color="primary" style={{marginTop : "20px"}}>
                            Mumbai
                        </Button>
                        <Button variant="outlined" color="primary" style={{marginTop : "20px"}}>
                            Kolkata
                        </Button>
                        <Button variant="outlined" color="primary" style={{marginTop : "20px"}}>
                            Hyderabad
                        </Button> */}
                        {this.renderCities(this.cities)}
                    </Box>
            )

        }   else{
            this.fetchCities();
            return(<></>);
        }
    }

}

// export default withStyles(theme)(Cities);
export default Cities;