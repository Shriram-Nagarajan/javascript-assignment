import CoreView from "../core/CoreView";
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import '../css/AddRestaurant.css';

export default class AddRestaurant extends CoreView{

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleDishChange = this.handleDishChange.bind(this);
        this.addNewDish = this.addNewDish.bind(this);
        this.validateAndSubmit = this.validateAndSubmit.bind(this);
        this.createRestaurant = this.createRestaurant.bind(this);
        this.state = {
            changes : 0,
            citiesLoaded : false,
            cityId : 1,
            submitProcessed : false
        }
        this.name = "";
        this.street = "";
        this.locality = "";
        this.cities = [];
        this.cuisines = "";
        this.submitValid = true;
        this.submitMsg = "";
        // this.dishes = [{
        //     "dishName" : "Idly",
        //     "dishDescription" : "IdlyD",
        // },{
        //     "dishName" : "Dosa",
        //     "dishDescription" : "DosaD",
        // }]
        this.dishes = [];
        this.branchId = 0;
    }

    handleChange(event){

        if(event && event.currentTarget){
            let key = event.currentTarget.name;
            let value = event.currentTarget.value;
            if(key){
                this[key] = value ? value : "";

                this.setState({
                    changes : this.state.changes+1
                });
            }
        }

    }

    handleCityChange(event){

        if(event && event.currentTarget){
            let cityId = parseInt(event.currentTarget.dataset.value);
            this.setState({
                cityId : cityId
            });
        }

    }

    loadCities(){

        let me = this;
        let success = function(response){

            if(response){
                me.cities = response;
                me.setState({
                    citiesLoaded : true
                });
            }

        }

        let failure = function(response){

        }

        this.ajaxGet(this.urlFor("get_cities"), null, success, failure);


    }

    renderCities(){
        if(this.cities && this.cities.length > 0){

            let me =this;
            return(
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="City"
                    value={this.state.cityId}
                    onChange={this.handleCityChange}
                    className="mt-3"
                >
                {(() => {
                    return me.cities.map((each, idx) => {
                        return (<MenuItem name="city" value={each.id}>{each.city}</MenuItem>);
                    });
                })()}
                </Select>

            )
        }
    }

    handleDishChange(index, key, event){

        if(index >= 0 && index < this.dishes.length && event && event.currentTarget){
            this.dishes[index][key] = event.currentTarget.value || "";
            this.setState({
                changes : this.state.changes+1
            });
        }

    }

    addNewDish(){

        this.dishes.push({
            "dishName" : "",
            "dishDescription" : ""
        });

        this.setState({
            changes : this.state.changes+1
        });


    }

    removeDish(idx){

        if(this.dishes && this.dishes.length > 0 && this.dishes.length > idx){
            this.dishes.splice(idx,1);
        }

        this.setState({
            changes : this.state.changes+1
        });


    }

    renderDishes(){

        if(this.dishes && this.dishes.length > 0){
            let me = this;
            return(

                
                <div className ="d-flex flex-column">
                    <Button style={{"color" : "green"}} className="mt-3 addDishBtn" variant="outlined" onClick={this.addNewDish}><AddCircleOutlineOutlinedIcon />{this.rb("add_dish")}</Button>
                    {(()=>{
                        return me.dishes.map((each,idx) => {
                            let marginTop = idx == 0 ? "mt-3"  : "mt-2";
                            return(
                                <div className={"d-flex flex-row " + marginTop}>
                                    <TextField name={idx+"-dishName"} label="Dish name" value={each.dishName} onChange={(e) => {this.handleDishChange(idx, "dishName",e)}} />
                                    <TextField className="ml-4" name={idx+"-dishDesc"} label="Dish description" value={each.dishDescription} onChange={(e) => {this.handleDishChange(idx, "dishDescription",e)}} />
                                    <RemoveCircleOutlineOutlinedIcon className="ml-4 align-self-center removeDishBtn" color="error" onClick={() => {this.removeDish(idx)}}  />
                                </div>
                            )
                        });
                    })()}
                    
    
                </div>
    
    
            )
        }   else{
            return(
                <div className ="d-flex flex-column">
                    <Button style={{"color" : "green"}} className="mt-5 addDishBtn" variant="outlined" onClick={this.addNewDish}><AddCircleOutlineOutlinedIcon />Add Dish</Button>
                </div>
            );
        }

    }

    createRestaurant(){

        let success = (response) => {
            if(response && response.status){

                if(response.status === "success"){
                    this.branchId = response.branchId;
                    this.submitValid = true;
                }   else{
                    this.submitValid = false;
                    this.submitMsg = "Error occurred while creating restaurant, please try again";
                }

            }   else{
                this.submitValid = false;
                this.submitMsg = "Error occurred while creating restaurant, please try again";
            }

            if(this.submitValid === true){
                this.submitMsg = "Successfully created restaurant";
                this.setState({
                    submitProcessed : true
                });
            }   else{
                this.setState({
                    changes : this.state.changes+1
                });
            }


        }

        let failure = (response) =>{

        }

        let restDetails = {
            restDetails : {
                name : this.name,
                street : this.street,
                locality : this.locality,
                cityId : this.state.cityId,
                cuisineArr : this.cuisines.split(",").filter((cuisine) => {return cuisine && cuisine.trim().length > 0}).map((each) => {return each.trim()}),
                dishArr : this.dishes.filter((each) => {return each && each.dishName.trim().length > 0 }).map((each) => {return {dishName : each.dishName.trim(), dishDescription : each.dishDescription.trim()}})
            }
        }

        this.ajaxPost(this.urlFor("create_restaurant"),restDetails, success, failure);

    }

    validateAndSubmit(){

        let valid = false, message = "";
        if(this.name && this.name.length > 0){

            if(this.street && this.street.length > 0){
    
                if(this.locality && this.locality.length > 0){
        
                    if(this.state.cityId > 0){
            
                        if(this.cuisines && this.cuisines.length > 0){
                
                            if(this.dishes && this.dishes.length > 0){

                                let nonEmptyDishes = this.dishes.filter((dish) => {
                                    return dish != null && dish.dishName != null && dish.dishName.length > 0
                                });

                                if(nonEmptyDishes.length > 0){
                                    valid = true;
                                }else{
                                    message = "Please input at least 1 dish";
                                }

                            }   else{
                                message = "Please input at least 1 dish";
                            }
                        }   else{
                            message = "Please add at least 1 cuisine";
                        }
                
                    }else{
                        message = "Please select a valid city";
                    }
            
                } else{
                    message = "Please enter the locality"
                }
        
            } else{
                message = "Please specify the street"
            }
    
        }   else{
            message = "Please enter the restaurant name";
        }

        if(!valid){
            this.submitMsg = message;
            this.submitValid = false;
            this.setState({
                changes : this.state.changes+1
            });
        }   else{
            this.submitValid = true;
            this.createRestaurant();
        }

    }

    renderAlert(){
        if(this.state.submitProcessed === true && this.branchId){
            let branchId = this.branchId;
            setTimeout(() =>{
                window.location.href = "/restdetails/" + branchId;
            },2000)
            return(<Alert className="mt-4" variant="outlined"> {this.submitMsg}</Alert>);
        }
        else if(this.submitValid === false){
            this.submitValid = true;
            return(
                <Alert className="mt-4" variant="outlined" severity="error" action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        this.setState({changes : this.state.changes+1})
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                > {this.submitMsg}</Alert>
            );
        }else{
            return (<></>);
        }
    }

    render(){

        if(!this.state.citiesLoaded){
            this.loadCities();
            return(<></>);
        }   else{
            return(
                <div className="d-flex flex-column pageCenter addRestContainer">
                    <h1 className="align-self-center">{this.rb("create_restaurant")}</h1>
                    <form noValidate autoComplete="off" className="mt-4 d-flex flex-column addRestForm">
                            <TextField name="name" label="Name" value={this.name} onChange={this.handleChange} />
                            <TextField name="street" label="Street" value={this.street} onChange={this.handleChange} />
                            <TextField name="locality" label="Locality" value={this.locality} onChange={this.handleChange} />
                            {this.renderCities()}
                            <TextField name="cuisines" label="Cuisines" value={this.cuisines} onChange={this.handleChange} />
                            {this.renderDishes()}
                            <Button style={{"color" : "green"}} className="mt-5 align-self-center" variant="outlined" onClick={this.validateAndSubmit}>{this.rb("submit")}</Button>
                            {this.renderAlert()}
                    </form>
                </div>
            );
        }



    }

}