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
import { FastPeriod } from 'FastPeriod';

export type Period = {
  year: number;
  month: number;
  label: string;
};

const WIDTH: number = 400;

export type Periods = Period[] | [];

export const App = (): JSX.Element => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isFastPeriodYearOpen, setIsFastPeriodYearOpen] = useState(false);
  const [periods, setPeriods] = useState<Periods | null>([]);
  // const [value, setValue] = useState<string>('');

  const handleFastPeriodClick = (
    event: React.MouseEvent<HTMLElement>,
  ): void => {
    event.preventDefault();
    setIsFastPeriodYearOpen((prev) => !prev);
  };

  const myRef = useRef(null);

  const handleCalendarOpen = useCallback(() => {
    setIsCalendarOpen((prev) => !prev);
  }, []);

  const handleCalendarClose = useCallback(() => {
    setIsCalendarOpen(false);
  }, []);

  const handleFastPeriodYearClose = useCallback(() => {
    setIsFastPeriodYearOpen(false);
  }, []);

  // const handlePresetPeriod = useCallback((newValue: string) => {
  //   setValue(newValue);
  // }, []);

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
        sx={{ m: 1, minWidth: WIDTH, position: 'relative' }}
        ref={myRef}
        size="small"
      >
        <InputLabel id="grouped-select-label">
          Выберите периоды для сравнения
        </InputLabel>
        <Select
          labelId="grouped-select-label"
          defaultValue=""
          id="grouped-select"
          label="Выберите периоды для сравнения"
          // value={value}
        >
          <ListSubheader>Сезоны</ListSubheader>
          <MenuItem value={'Зима'} onClick={handleFastPeriodClick}>
            Зима
          </MenuItem>
          <MenuItem value={'Лето'} onClick={handleFastPeriodClick}>
            Лето
          </MenuItem>
          <ListSubheader>Свой период</ListSubheader>
          <MenuItem value={'Свой период'} onClick={handleCalendarOpen}>
            Добавить
          </MenuItem>
        </Select>
      </FormControl>

      <Popper
        id="periodDoubleCalendar"
        open={isCalendarOpen}
        anchorEl={myRef.current}
        transition
        placement="top"
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

      <Popper
        id="FastPeriodYear"
        open={isFastPeriodYearOpen}
        anchorEl={myRef.current}
        transition
        placement="bottom-start"
        sx={{ zIndex: 100 }}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleFastPeriodYearClose}>
            <Grow {...TransitionProps} timeout={250}>
              <Box>
                <FastPeriod
                  periodID="Зима"
                  minYear={2020}
                  closePopper={() => setIsFastPeriodYearOpen(false)}
                  parentWidth={WIDTH}
                />
              </Box>
            </Grow>
          </ClickAwayListener>
        )}
      </Popper>
    </Stack>
  );
};
