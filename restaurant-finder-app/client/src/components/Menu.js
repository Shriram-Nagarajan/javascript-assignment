import CoreView from "../core/CoreView";
import Card from "react-bootstrap/Card";

import '../css/Menu.css';

// const menus = [
//     {
//         "name": "Menu Item Name",
//         "description": "Description"
//     },
//     {
//         "name": "Menu Item Name 2",
//         "description": "Description 2"
//     },
//     {
//         "name": "Menu Item Name 3",
//         "description": "Description 3"
//     }

// ];
export default class Menu extends CoreView{

    constructor(props){
        super(props);
    }

    getMenus(){
        let menuItems = this.props.menuItems;
        if(menuItems && menuItems.length > 0){
            return menuItems.map((each,idx) => {
                let margin = idx === 0 ? "" : " mt-2";
                return(
                    <Card className={"menuCard" + margin}>
                        <Card.Title>{each.dish_name}</Card.Title>
                        <Card.Text>{each.description}</Card.Text>
                    </Card>
                );
            });
        }
        return <div className="ml-2 mt-2">Menu unavailable</div>
    }

    render(){

        return(
            <>
                {this.getMenus()}
            </>
        );

    }

}