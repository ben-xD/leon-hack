import React, { useState, useEffect } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  createStyles,
  Button
} from '@material-ui/core';
import mockData from '../mockData';
import io from 'socket.io-client';
import WasteChart from './WasteChart';

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
  const [mealIndex, setMealIndex] = useState<any>(null);
  const classes = useStyles();

  useEffect(() => {
    const socket = io(endpoint);

    socket.on('waste', (socket: any) => {
      console.log('Received message:');
      console.log({ socket });
      setMeals({
        ...meals,
        name: socket
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const incrementChipotle = () => {
    console.log('incrementing');
    setMeals({
      ...meals,
      'Lentil Masala': {
        name: 'Lentil Masala',
        pastWeekWaste: [0, 1, 3, 6, 10, 12, 4],
        pastWeekSold: [200, 220, 205, 195, 180, 0, 400]
      }
    });
  };

  return (
    <div className=''>
      <Typography variant='h3'>
        Total meals wasted today: 23 (£400.29)
      </Typography>
      {!mealIndex ? (
        <>
          <Typography variant='h5'>Meals</Typography>
          <Typography>Select a meal to view waste history</Typography>
        </>
      ) : (
        <></>
      )}
      <WasteChart meal={meals[mealIndex]}></WasteChart>
      <List component='nav' aria-label='main mailbox folders'>
        {Object.keys(meals).map((mealName, index) => {
          return (
            <ListItem
              className={classes.root}
              key={index}
              onClick={() => setMealIndex(mealName)}
              button
            >
              <ListItemText primary={`${index}: ${mealName}`} />
              <ListItemText
                primary={
                  meals[mealName].pastWeekWaste[
                    meals[mealName].pastWeekWaste.length - 1
                  ]
                }
              />
            </ListItem>
          );
        })}
      </List>
      {/* <Button onClick={incrementChipotle}>Click</Button> */}
    </div>
  );
};

export default RestaurantWaste;
