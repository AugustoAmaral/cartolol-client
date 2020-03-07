import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
//import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";

export function Navbar() {
 
  return (
    <AppBar position="fixed">
      <Toolbar className="menu">
          <div>   
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          </div> 
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
