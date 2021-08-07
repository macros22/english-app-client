import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';

import { Categories } from 'components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
      maxWidth: '100%',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    customizeToolbar: {
      minHeight: 36,
    },
    title: {
      fontWeight: 500,
      letterSpacing: '4px',
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'block',
      },
    },
    inputRoot: {
      color: 'inherit',
    },
  })
);

export default function Navbar() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.grow}>
        <AppBar className={classes.customizeToolbar} position="static" elevation={2}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h5" noWrap>
              ENGLISH WORDBOOK
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <Categories />
    </>
  );
}
