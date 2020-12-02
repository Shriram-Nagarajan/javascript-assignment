import Card from "react-bootstrap/Card";
import CoreView from "../core/CoreView";
import Cuisines from "./Cuisines";
import Menu from "./Menu";

export default class RestaurantDetails extends CoreView{

    constructor(props){
        super(props);
        this.data = null;
        this.state = {
            dataLoaded : false
        }
    }

    renderRestDetails(data){

        if(data && data.location && data.menu){

            let loc = data.location[0];
            let menu = data.menu;
            return(
                <div className="p-2">
                    <h4>{loc.restaurant_name}</h4>
                    <Card.Text>
                        {loc.locality}
                    </Card.Text>
                    <Cuisines />
                    <Card.Text className="mt-4">
                        <h5>Address</h5> 
                        <div className="d-flex flex-column ml-3">
                            <span>{loc.street}</span>
                            <span>{loc.locality}</span>
                            <span>{loc.city+", " +loc.state+ ", "+loc.country_name}</span>
                        </div>
                    </Card.Text>
                    <h5>Menus</h5>
                    <Menu menuItems={menu} />
                    {/* <Menu className="mt-4"></Menu>
                    <Menu />
                    <Menu /> */}
                </div>
            )
        }

    }

    fetchRestDetails(restId){

        let me = this;

        let success = function(response){

        if(response && response != null){
            me.data = response;
            me.setState({
                dataLoaded : true
            });
        }

        }

        let failure = function(response){
            
        }

        me.ajaxGet(me.urlFor("get_rest_details"),{"restId" : restId},success, failure);



    }

    getRestId(){
        return window.location.pathname.split("/restdetails/")[1];
      }

    render(){

        let me = this;
        if(me.state.dataLoaded){
            return me.renderRestDetails(me.data);
        }   else{
            this.fetchRestDetails(me.getRestId());
            return(<></>)
        }

    }

}