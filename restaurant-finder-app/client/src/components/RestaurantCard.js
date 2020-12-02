import CoreView from "../core/CoreView";
import Card from "react-bootstrap/Card";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import Cuisines from "./Cuisines";

export default class RestaurantCard extends CoreView{
    
    constructor(props){
        super(props);
    }

    handleClick(restId){

      window.location.href = "/restdetails/" + restId;

    }

    render(){
      let me = this;
      let restId = me.props.restaurant_id;
      let name = me.props.name;
      let locality = me.props.locality;
      let logo = me.props.logo;
      let cuisines = me.props.cuisines;
      return(<Card className="restCard d-flex flex-row"  onClick={() => {this.handleClick(restId)}} >
          <Card.Img variant="left align-self-center" src={logo} className="cardImg"/>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              {locality}
            </Card.Text>
              <Cuisines cuisines={cuisines} />
          </Card.Body>
        </Card>)
    }

}