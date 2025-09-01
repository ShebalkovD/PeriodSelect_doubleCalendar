import {
  Box,
  FormControl,
  Grow,
  InputLabel,
  ListSubheader,
  MenuItem,
  Popper,
  Select,
  Stack,
} from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { Calendar } from 'Calendar';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { JSX } from '@emotion/react/jsx-runtime';
import { FastPeriod } from 'fastPeriod';

export type Period = {
  year: number;
  month: number;
  label: string;
};

export type Periods = Period[] | [];

export const App = (): JSX.Element => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [periods, setPeriods] = useState<Periods | null>([]);
  const [value, setValue] = useState<string>('');

  const myRef = useRef(null);

  const handleCalendarOpen = useCallback(() => {
    setIsCalendarOpen((prev) => !prev);
  }, []);

  const handleCalendarClose = useCallback(() => {
    setIsCalendarOpen(false);
  }, []);

  const handlePresetPeriod = useCallback((newValue: string) => {
    setValue(newValue);
  }, []);

  useEffect(() => {
    if (periods) {
      const result = periods.map(
        (period) => new Date(period.year, period.month - 1, 1),
      );
      console.log(result);
    }
  }, [periods]);

  return (
    <Stack
      justifyContent={'start'}
      alignItems={'center'}
      sx={{ width: '100%', height: '100%', m: 0 }}
    >
      <FormControl
        sx={{ m: 1, minWidth: 400, position: 'relative' }}
        ref={myRef}
        size="small"
      >
        <InputLabel htmlFor="grouped-select">
          Выберите периоды для сравнения
        </InputLabel>
        <Select
          defaultValue=""
          id="grouped-select"
          label="Выберите периоды для сравнения"
          value={value}
        >
          <ListSubheader>Сезоны</ListSubheader>
          <MenuItem value={'Зима'} onClick={() => handlePresetPeriod('Зима')}>
            Зима
          </MenuItem>
          <MenuItem value={'Лето'} onClick={() => handlePresetPeriod('Лето')}>
            Лето
          </MenuItem>
          <ListSubheader>Свой период</ListSubheader>
          <MenuItem value={'Свой период'} onClick={handleCalendarOpen}>
            Добавить
          </MenuItem>
        </Select>
      </FormControl>

      <Popper
        id={'periodDoubleCalendar'}
        open={isCalendarOpen}
        anchorEl={myRef.current}
        transition
        sx={{ zIndex: 100 }}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleCalendarClose}>
            <Grow
              {...TransitionProps}
              timeout={250}
              style={{ transformOrigin: 'center top' }}
            >
              <Box>
                <Calendar
                  minYear={2020}
                  maxYear={2025}
                  handleCalendarClose={handleCalendarClose}
                  setValue={setPeriods}
                />
              </Box>
            </Grow>
          </ClickAwayListener>
        )}
      </Popper>
      <FastPeriod periodLabel="Зима" />
    </Stack>
  );
};
