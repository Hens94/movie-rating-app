import React from "react";
import { useSelector } from "react-redux";
import { HelmetProvider, Helmet } from "react-helmet-async";
import DateFnsUtils from "@date-io/date-fns";

import { ThemeProvider } from "styled-components/macro";
import { create } from "jss";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
  jssPreset,
} from "@material-ui/core/styles";

import Slide from "@material-ui/core/Slide";
import { SnackbarProvider } from "notistack";

import createTheme from "./theme";
import Routes from "./routes/Routes";

const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById("jss-insertion-point"),
});

function App() {
  const theme = useSelector((state) => state.themeReducer);

  return (
    <>
      <HelmetProvider>
        <Helmet titleTemplate="%s | Nicasource" defaultTitle="Nicasource" />
        <StylesProvider jss={jss}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <MuiThemeProvider theme={createTheme(theme.currentTheme)}>
              <ThemeProvider theme={createTheme(theme.currentTheme)}>
                <SnackbarProvider
                  maxSnack={3}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  TransitionComponent={Slide}
                  preventDuplicate
                >
                  <Routes />
                </SnackbarProvider>
              </ThemeProvider>
            </MuiThemeProvider>
          </MuiPickersUtilsProvider>
        </StylesProvider>
      </HelmetProvider>
    </>
  );
}

export default App;
