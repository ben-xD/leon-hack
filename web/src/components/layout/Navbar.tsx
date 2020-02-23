import React from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button
} from '@material-ui/core';
import { DashboardRounded } from '@material-ui/icons';
import Dashboard from './Dashboard';
import { Link } from 'react-router-dom';

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  })
);

const Navbar: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <div className='classes grow'>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            className={classes.title}
            variant='h6'
            noWrap
            component={Link}
            to='/'
          >
            NOEL
          </Typography>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <DashboardRounded />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Waste Dashboard
          </Typography>
          <Button component={Link} to='/dashboard'>
            Dashboard
          </Button>
          <Button color='inherit'>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
