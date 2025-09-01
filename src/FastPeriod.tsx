import type { JSX } from '@emotion/react/jsx-runtime';
import { Icon, Paper, Stack } from '@mui/material';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { DatePicker } from '@mui/x-date-pickers';

type Props = {
  periodLabel: string;
};

export const FastPeriod = ({ periodLabel }: Props): JSX.Element => {
  return (
    <Paper
      sx={{
        p: 1,
        fontFamily: 'arial',
        borderRadius: 1,
        position: 'relative',
        userSelect: 'none',
      }}
    >
      <Stack
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        gap={2}
      >
        <Stack
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          gap={1}
        >
          <span style={{ lineHeight: 2 }}>{periodLabel}</span>

          <DatePicker
            label={'год'}
            openTo="year"
            views={['year']}
            slotProps={{
              textField: {
                size: 'small',
              },
            }}
            sx={{
              width: 120,
            }}
          />
        </Stack>
        <Icon>
          <HorizontalRuleIcon />
        </Icon>
        <Stack
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          gap={1}
        >
          <span>{periodLabel}</span>
          <DatePicker
            label={'год'}
            openTo="year"
            views={['year']}
            slotProps={{
              textField: {
                size: 'small',
              },
            }}
            sx={{
              width: 120,
            }}
          />
        </Stack>
      </Stack>
    </Paper>
  );
};
