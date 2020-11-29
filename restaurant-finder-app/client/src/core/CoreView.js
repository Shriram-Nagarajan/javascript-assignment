import Observable from "./Observable";

export default class CoreView extends Observable{
    
    constructor(props){
        super(props);
    }

    render(){
        return(<div></div>);
    }

}