/* eslint-disable flowtype/require-valid-file-annotation */

import { create, SheetsRegistry } from 'jss';
import preset from 'jss-preset-default';
import { createMuiTheme } from 'material-ui/styles';
import { indigo, pink } from 'material-ui/colors';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';

const theme = createMuiTheme({
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary: indigo,
        secondary: pink,

        // type: 'dark', // Switching the dark mode on is a single property value change.
        // primary1Color: cyan500,
        // primary2Color: cyan700,
        // primary3Color: grey400,
        // accent1Color: pinkA200,
        // accent2Color: grey100,
        // accent3Color: grey500,
        // textColor: darkBlack,
        // alternateTextColor: white,
        // canvasColor: white,
        // borderColor: grey300,
        // disabledColor: fade(darkBlack, 0.3),
        // pickerHeaderColor: cyan500,
        // clockCircleColor: fade(darkBlack, 0.07),
        // shadowColor: fullBlack,
    },
});

// Configure JSS
const jss = create(preset());
jss.options.createGenerateClassName = createGenerateClassName;

export const sheetsManager = new Map();

export default function createContext() {
  return {
    jss,
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager,
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
  };
}
