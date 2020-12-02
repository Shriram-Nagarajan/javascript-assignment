import CoreView from "../core/CoreView";
import Card from "react-bootstrap/Card";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import Cuisines from "./Cuisines";

export default class RestaurantCard extends CoreView{
    
    constructor(props){
        super(props);
    }

    render(){
      let me = this;
      let name = me.props.name;
      let locality = me.props.locality;
      let logo = me.props.logo;
      return(<Card className="restCard d-flex flex-row">
          <Card.Img variant="left align-self-center" src={logo} className="cardImg" />
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              {locality}
            </Card.Text>
              <Cuisines />
          </Card.Body>
        </Card>)
    }

}