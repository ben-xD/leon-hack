import React, { useState, useEffect } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  createStyles
} from '@material-ui/core';
import mockData from '../mockData';
import io from 'socket.io-client';

interface Props {}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1
    }
  })
);

const endpoint = 'http://localhost:5000';

const RestaurantWaste: React.FC<Props> = () => {
  const [meals, setMeals] = useState<any>(mockData.meals);
  const classes = useStyles();

  useEffect(() => {
    const socket = io(endpoint);

    socket.on('waste', (socket: any) => {
      console.log('Received message:');
      console.log({ socket });
      setMeals({
        ...meals,
        ...socket
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=''>
      <Typography>Meals</Typography>
      <List component='nav' aria-label='main mailbox folders'>
        {Object.keys(meals).map((mealName, index) => {
          return (
            <ListItem className={classes.root} button>
              <ListItemText primary={`${index}: ${mealName}`} />
              <ListItemText primary={meals[mealName].todaysWaste} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default RestaurantWaste;
