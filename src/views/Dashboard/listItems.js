import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import { navigate } from "@reach/router";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logout } from '../Module/Authentication/action/auth'
// import { useDispatch, useSelector } from 'react-redux'
import signout from '../Module/Authentication/action/auth'
import { useDispatch, useSelector } from 'react-redux'


export const mainListItems = (
  <div>
    <ListItem button onClick={() => navigate("user-config")}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button onClick={() => navigate("data-info")}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItem>
    <ListItem button >
      <ListItemText primary="Logout" />
      <ExitToAppIcon primary="Log Out" />
    </ListItem>
  </div>
);
