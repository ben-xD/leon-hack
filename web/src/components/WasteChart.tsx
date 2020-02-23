import React, { useEffect, useState } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryStack } from 'victory';
import { Typography } from '@material-ui/core';

interface Props {
  meal: any;
}

const WasteChart: React.FC<Props> = ({ meal }) => {
  const [pastWeekWaste, setPastWeekWaste] = useState<any>([]);
  const [pastWeekSold, setPastWeekSold] = useState<any>([]);
  console.log({ meal });

  useEffect(() => {
    if (meal) {
      setPastWeekWaste(
        meal.pastWeekWaste.map((waste: any, i: number) => ({
          'days ago': i + 1,
          Meals: waste
        }))
      );
      setPastWeekSold(
        meal.pastWeekSold.map((waste: any, i: number) => ({
          'days ago': i + 1,
          Meals: waste
        }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meal]);

  return (
    <div>
      <Typography variant='h3'>{meal?.name}</Typography>
      <VictoryChart
        domainPadding={10}
        animate={{ duration: 2000, easing: 'bounce' }}
      >
        <VictoryAxis tickValues={['6', '5', '4', '3', '2', '1', 'today']} />
        <VictoryAxis dependentAxis label='Meals wasted' />
        <VictoryAxis label='days ago' />
        <VictoryBar data={pastWeekWaste} x='days ago' y='Meals' />
      </VictoryChart>
      <VictoryChart
        domainPadding={10}
        animate={{ duration: 2000, easing: 'bounce' }}
      >
        <VictoryAxis tickValues={['6', '5', '4', '3', '2', '1', 'today']} />
        <VictoryAxis dependentAxis label='Meals sold' />
        <VictoryAxis label='days ago' />
        <VictoryBar data={pastWeekSold} x='days ago' y='Meals' />
      </VictoryChart>
    </div>
  );
};

export default WasteChart;
