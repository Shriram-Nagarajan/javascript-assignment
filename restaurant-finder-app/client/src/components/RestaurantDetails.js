import Card from "react-bootstrap/Card";
import CoreView from "../core/CoreView";
import Cuisines from "./Cuisines";
import Menu from "./Menu";

export default class RestaurantDetails extends CoreView{

    constructor(props){
        super(props);
    }

    render(){

        let restName = "Sangeetha";
        let streetName = "GST Road";
        let locality = "T. Nagar";
        let city = "Chennai";
        let state = "Tamil Nadu";
        let country = "India";
        return(
            <div className="p-2">
                <h4>{restName}</h4>
                <Card.Text>
                    {locality}
                </Card.Text>
                <Cuisines />
                <Card.Text className="mt-4">
                    <h5>Address</h5> 
                    <div className="d-flex flex-column ml-3">
                        <span>{streetName}</span>
                        <span>{locality}</span>
                        <span>{city+", " +state+ ", "+country}</span>
                    </div>
                </Card.Text>
                <h5>Menus</h5>
                <Menu />
                {/* <Menu className="mt-4"></Menu>
                <Menu />
                <Menu /> */}
            </div>
        );



    }

}