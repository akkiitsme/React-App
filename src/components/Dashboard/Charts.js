import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Box } from '@mui/material';
//import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import Grid from '@mui/material/Grid2';

export default function ChartsOverviewDemo() {
  return (
    <Box>
        <Grid container spacing={2}>
            <Grid size={6}>
                <BarChart
                series={[
                    { data: [35, 44, 24, 34] },
                    { data: [51, 6, 49, 30] },
                    { data: [15, 25, 30, 50] },
                    { data: [60, 50, 15, 25] },
                ]}
                height={290}
                xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
                margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                />
            </Grid>
            <Grid size={6}>
                <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[
                    {
                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                    area: true,
                    },
                ]}
                width={500}
                height={300}
                />
            </Grid>
        </Grid>
    </Box>
  );
}