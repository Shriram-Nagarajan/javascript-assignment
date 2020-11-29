import CoreView from "../core/CoreView";
import Button from '@material-ui/core/Button';
import { Avatar, Box } from "@material-ui/core";
import '../css/Cities.css';
import {deepPurple} from '@material-ui/core/colors';
import { withStyles } from '@material-ui/styles';
import {createMuiTheme} from '@material-ui/core/styles';

import logo from '../img/logo.jpg';

const theme = createMuiTheme({
    root: {
      display: 'flex',
      '& > *': {
        margin: createMuiTheme({
            spacing : 1
        }),
      },
    }
});

class Cities extends CoreView{

    constructor(props){
        super(props);
    }

    render(){
        return(
                <Box className="pageCenter citiesBox">
                    <Avatar alt={"A"} src={logo} className="logo" />
                    <h1>{this.rb("app_name")}</h1>
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
                    </Button>
                </Box>
        )
    }

}

// export default withStyles(theme)(Cities);
export default Cities;