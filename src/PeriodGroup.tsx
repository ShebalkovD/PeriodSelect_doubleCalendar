import type { JSX } from '@emotion/react/jsx-runtime';
import { Stack, Box } from '@mui/material';
import type { Periods } from './App';

type Props = {
  year: number;
  periods: Periods;
};

export const PeriodGroup = ({ year, periods }: Props): JSX.Element => {
  return (
    <Stack
      flexDirection={'row'}
      justifyContent={'start'}
      alignItems={'center'}
      gap={1}
      sx={{ p: 1 }}
      className="calendar_list_item"
    >
      <Box
        sx={{
          fontWeight: 400,
          backgroundColor: '#0000000a',
          borderRadius: 10,
          p: 1,
          pl: 2,
          pr: 2,
        }}
      >
        {year}
      </Box>
      <Box>
        {periods
          .filter((period) => period.year === year)
          .map((period) => period.label)
          .join(', ')}
      </Box>
    </Stack>
  );
};
