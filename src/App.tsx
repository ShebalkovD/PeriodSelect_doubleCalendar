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
import AddIcon from '@mui/icons-material/Add';
import { Calendar } from 'Calendar';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { JSX } from '@emotion/react/jsx-runtime';
import { FastPeriod } from 'FastPeriod';
import { MyBarChart } from './MyBarChart';

export type Period = {
  year: number;
  month: number;
  label?: string;
};

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const data = [];

const years = [2025, 2024, 2023, 2022, 2021, 2020];
const monthNames = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

years.forEach((year) => {
  for (let i = 0; i < 12; i++) {
    const date = new Date(year, i, 1);
    const label = `${monthNames[i]} ${year}`;
    const value = Math.round(getRandomArbitrary(100, 999));
    data.push({ date: date, label: label, value: value });
  }
});

console.log(data);

const WIDTH: number = 400;

export type Periods = Period[] | [];

export const App = (): JSX.Element => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isFastPeriodYearOpen, setIsFastPeriodYearOpen] = useState(false);
  const [periods, setPeriods] = useState<Periods | null>(null);
  const [fastPeriodID, setFastPeriodID] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const periodHistory = useMemo(() => {
    const history = localStorage.getItem('PMC.sales.periodHistory');

    return history ? JSON.parse(history) : null;
  }, [periods]);

  console.log(periodHistory);

  const barData = useMemo(() => {
    if (periods) {
      const resultCompare = periods.map((period) =>
        new Date(period.year, period.month - 1, 1).getTime(),
      );

      return data.filter((item) => resultCompare.includes(item.date.getTime()));
    }

    return data;
  }, [periods]);

  const handleFastPeriodClick = (
    event: React.MouseEvent<HTMLElement>,
  ): void => {
    event.preventDefault();
    setFastPeriodID(
      event.currentTarget.dataset.value
        ? event.currentTarget.dataset.value
        : '',
    );
    setIsFastPeriodYearOpen((prev) => !prev);
    setInputValue(
      event.currentTarget.dataset.value
        ? event.currentTarget.dataset.value
        : '',
    );
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
      // const resultCompare = result.map((item) => item.getTime());
    }
  }, [periods]);

  return (
    <Stack
      justifyContent={'start'}
      alignItems={'center'}
      sx={{ width: '100%', height: '100%', m: 0, pt: 2 }}
      gap={4}
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
          value={inputValue}
        >
          <ListSubheader>Сезоны</ListSubheader>
          <MenuItem value={'Зима'} onClick={handleFastPeriodClick}>
            Зима
          </MenuItem>
          <MenuItem value={'Лето'} onClick={handleFastPeriodClick}>
            Лето
          </MenuItem>
          <ListSubheader>Свой период</ListSubheader>
          <MenuItem
            value={'Свой период'}
            onClick={handleCalendarOpen}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            Добавить
            <AddIcon fontSize="medium" />
          </MenuItem>
          {periodHistory && <ListSubheader>История</ListSubheader>}
          {periodHistory &&
            periodHistory.map((item) => (
              <MenuItem
                value={item.label}
                key={`${item.label}-${item.year}`}
                onClick={() => {
                  setPeriods(item.periods);
                  setInputValue(item.label);
                }}
              >
                {item.label}
              </MenuItem>
            ))}
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
                  setInputValue={setInputValue}
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
                  periodID={fastPeriodID}
                  minYear={2020}
                  closePopper={() => setIsFastPeriodYearOpen(false)}
                  parentWidth={WIDTH}
                  setValue={setPeriods}
                />
              </Box>
            </Grow>
          </ClickAwayListener>
        )}
      </Popper>

      <Box sx={{ height: 400, width: '100%', overflow: 'hidden' }}>
        <MyBarChart data={barData} />
      </Box>
    </Stack>
  );
};
