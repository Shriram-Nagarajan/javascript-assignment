import { Box } from "@material-ui/core";
import CoreView from "../core/CoreView"

export default class Cuisines extends CoreView{

    constructor(props){
        super(props);
    }

    getEach(each, idx){

        if(each && idx >= 0){

            if(idx === 0){
                return (
                    <Box color="primary.main" component="span" display="inline" border={1} className="p-1" borderRadius="5px">{each}</Box>
                );
            }   else{
                return(
                    <Box color="primary.main" component="span" display="inline" border={1} className="ml-3 p-1" borderRadius="5px">{each}</Box>
                );
            }

        }

        return(<></>);

    }

    getCuisines(){
        let me = this;
        let {cuisines} = me.props; 
        if(cuisines && cuisines.length > 0){
            return cuisines.map(this.getEach);
        }
        return (<></>);
    }

    render(){
        let me = this;
        return (
            <div className="d-flex flex-row align-items-start flex-wrap">
                {(() => me.getCuisines())()}
            </div>
        )



    }

}