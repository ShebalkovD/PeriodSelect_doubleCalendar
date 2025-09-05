import type { JSX } from '@emotion/react/jsx-runtime';
import { Stack, IconButton, useTheme, Icon } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { useCallback } from 'react';

type Props = {
  minYear: number;
  maxYear: number;
  value: number;
  value2: number;
  setValue: (updater: (prev: number) => number) => void;
  setValue2: (updater: (prev: number) => number) => void;
};

export const CustomHeader = ({
  minYear,
  maxYear,
  value,
  value2,
  setValue,
  setValue2,
}: Props): JSX.Element => {
  const theme = useTheme();

  const handlePrev = useCallback(() => {
    setValue((prev: number) => prev - 1);
    setValue2((prev: number) => prev - 1);
  }, [setValue, setValue2]);

  const handleNext = useCallback(() => {
    setValue((prev) => prev + 1);
    setValue2((prev) => prev + 1);
  }, [setValue, setValue2]);

  return (
    <Stack
      justifyContent={'space-between'}
      flexDirection={'row'}
      alignItems={'center'}
      sx={{
        p: 1,
        fontWeight: 700,
        userSelect: 'none',
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <IconButton onClick={handlePrev} disabled={value === minYear}>
        <NavigateBeforeIcon />
      </IconButton>

      <Stack
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        gap={1}
      >
        <span>{value}</span>
        <Icon>
          <HorizontalRuleIcon />
        </Icon>
        <span>{value2}</span>
      </Stack>

      <IconButton onClick={handleNext} disabled={value2 === maxYear}>
        <NavigateNextIcon />
      </IconButton>
    </Stack>
  );
};
