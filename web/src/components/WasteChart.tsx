import React, { useEffect, useState } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import { Typography, Button } from '@material-ui/core';

interface Props {
  meal: any;
}

const WasteChart: React.FC<Props> = ({ meal }) => {
  const [pastWeekWaste, setPastWeekWaste] = useState<any>([]);
  console.log({ meal });

  useEffect(() => {
    if (meal) {
      setPastWeekWaste(
        meal.pastWeekWaste.map((waste: any, i: number) => ({
          'days ago': i + 1,
          Meals: waste
        }))
      );
    }
  }, [meal]);

  return (
    <div>
      <Typography variant='h3'>{meal?.name}</Typography>
      <VictoryChart
        domainPadding={10}
        animate={{ duration: 2000, easing: 'bounce' }}
      >
        <VictoryAxis tickValues={['6', '5', '4', '3', '2', '1', 'today']} />
        <VictoryAxis dependentAxis />
        <VictoryBar data={pastWeekWaste} x={'days ago'} y={'Meals'} />
      </VictoryChart>
    </div>
  );
};

export default WasteChart;
