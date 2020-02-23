import React from 'react';
import RestaurantWaste from '../RestaurantWaste';
import Sidebar from './Sidebar';
import {
  Grid,
  Paper,
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core';

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary
    }
  })
);

const Dashboard: React.FC<Props> = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Paper className={classes.paper} elevation={3}>
            <Sidebar></Sidebar>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper} elevation={3}>
            <RestaurantWaste></RestaurantWaste>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
