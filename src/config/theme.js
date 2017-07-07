import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  lightBlue200,
  blueGrey900,
  white
} from 'material-ui/styles/colors';

export default getMuiTheme({
    palette: {
        textColor: blueGrey900,
        alternateTextColor: white,
        primary1Color: lightBlue200,
        secondary1Color: blueGrey900,
        accent1Color: blueGrey900
    },
    appBar: {
        color: white,
        height: 60
    }
});
