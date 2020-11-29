import CoreView from "../core/CoreView";
import Card from "react-bootstrap/Card";
import Button from "@material-ui/core/Button";
import logo from '../img/logo.jpg';

export default class RestaurantCard extends CoreView{
    
    constructor(props){
        super(props);
    }

    render(){
        return(<Card className="restCard d-flex flex-row">
            <Card.Img variant="left align-self-center" src={logo} className="cardImg" />
            <Card.Body>
              <Card.Title>Restaurant Name</Card.Title>
              <Card.Text>
                Locality
              </Card.Text>
              <div className="d-flex flex-row">
                <Button  variant="outlined" color="primary" style={{marginLeft : "20px"}}>Cuisine</Button>
                <Button  variant="outlined" color="primary" style={{marginLeft : "20px"}}>Cuisine</Button>
              </div>
            </Card.Body>
          </Card>)
    }

}