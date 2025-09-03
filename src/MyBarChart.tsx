import type { JSX } from '@emotion/react/jsx-runtime';
import type { BarData } from 'App';
import { useTheme } from '@mui/material';
import { memo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type Props = {
  data: BarData;
};

export const MyBarChart = memo(({ data }: Props): JSX.Element => {
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="label"
          angle={-45}
          textAnchor="end"
          height={100}
          fontFamily="arial"
          fontSize={12}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="value"
          stroke={theme.palette.primary.main}
        />
      </LineChart>
    </ResponsiveContainer>
  );
});
