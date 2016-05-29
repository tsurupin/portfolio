import {
  teal500, teal700, teal100, redA200, red100, red500,
  gray900, white, gray400, darkBlack
} from 'material-ui/styles/colors';
import { fade }from 'material-ui/utils/colorManipulator';
import Spacing from 'material-ui/styles/spacing';
import zIndex from 'material-ui/styles/zIndex';

export default {
  spacing: Spacing,
  zIndex: zIndex,
  fontFamily: 'Roboto, sans-serif',
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
    pickerHeaderColor: teal500
  }
};