import React from "react";
import styled, { withTheme } from "styled-components/macro";
import { Link } from "react-router-dom";

import {
  Grid,
  Hidden,
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
  Toolbar,
  Typography,
  Tooltip,
  Button,
} from "@material-ui/core";

import { Menu as MenuIcon } from "@material-ui/icons";

import UserDropdown from "./../UserDropdown";

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const AppBar = styled(MuiAppBar)`
  background-color: ${(props) => props.theme.header.background};
  color: ${(props) => props.theme.header.color};
`;

const ActionButton = styled(Button)`
  margin-right: ${(props) => props.theme.spacing(2)}px;
  text-transform: uppercase;
  font-weight: normal;
`;

const pageTytle = "Movies rating";

const AppBarComponent = ({
  onDrawerToggle,
  onDesktopDrawerToggle,
  desktopSidebarOpen,
  user,
}) => (
  <React.Fragment>
    <AppBar position="sticky" elevation={2}>
      <Toolbar>
        <Grid container alignItems="center">
          <Hidden mdUp>
            <Grid item>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={onDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography variant="h5">{pageTytle}</Typography>
            </Grid>
          </Hidden>
          <Hidden smDown>
            {user && (
              <Grid item>
                <Tooltip
                  title={
                    onDesktopDrawerToggle ? "Ocultar menú" : "Mostrar menú"
                  }
                >
                  <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={onDesktopDrawerToggle}
                  >
                    <MenuIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            )}

            {!desktopSidebarOpen && (
              <Grid item>
                <Typography variant="h5">{pageTytle}</Typography>
              </Grid>
            )}
          </Hidden>
          <Grid item xs />
          <Grid item>
            <ActionButton color="primary" component={Link} to="/">
              Movies
            </ActionButton>
          </Grid>
          {user && (
            <Grid item>
              <ActionButton color="primary" component={Link} to="/watchlist">
                Watchlist
              </ActionButton>
            </Grid>
          )}
          {user ? (
            <>
              <Grid item>
                <Typography>{user.name.toUpperCase()}</Typography>
              </Grid>
              <Grid item>
                <UserDropdown />
              </Grid>
            </>
          ) : (
            <>
              <Grid item>
                <ActionButton
                  color="primary"
                  component={Link}
                  to="/auth/sign-in"
                >
                  Sign In
                </ActionButton>
              </Grid>

              <Grid item>
                <ActionButton
                  color="primary"
                  component={Link}
                  to="/auth/sign-up"
                >
                  Sign Up
                </ActionButton>
              </Grid>
            </>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  </React.Fragment>
);

export default withTheme(AppBarComponent);
