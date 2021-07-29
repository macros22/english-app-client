import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { AuthContext } from "../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const Navbar = () => {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const history = useHistory();

  const addWordHandler = (event) => {
    event.preventDefault();
    history.push("/addword");
  };

  const aboutHandler = (event) => {
    event.preventDefault();
    history.push("/about");
  };

  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            English learning
          </Typography>

          <Button color="inherit" onClick={addWordHandler}>
            ADD WORD
          </Button>

          <Button color="inherit" onClick={aboutHandler}>
            ABOUT
          </Button>

          <Button color="inherit" onClick={logoutHandler}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
