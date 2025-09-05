import type { JSX } from '@emotion/react/jsx-runtime';
import { Box } from '@mui/material';
import { MonthSelector } from 'MonthSelector/MonthSelector';

export const App = (): JSX.Element => {
  return (
    <Box>
      <MonthSelector />
    </Box>
  );
};
