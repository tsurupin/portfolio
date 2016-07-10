import {
  teal100,
  teal500,
  teal700,
  red100,
  red500,
  redA200,
  gray400,
  gray900,
  white,
  darkBlack,
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import Spacing from 'material-ui/styles/spacing';
import zIndex from 'material-ui/styles/zIndex';

export default {
  spacing: Spacing,
  zIndex,
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,' +
  '"Open Sans","Helvetica Neue",sans-serif',
  palette: {
    primary1Color: teal500,
    primary2Color: teal700,
    primary3Color: teal100,
    accent1Color: redA200,
    accent2Color: red100,
    accent3Color: red500,
    textColor: gray900,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: gray400,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: teal500,
  },
};
