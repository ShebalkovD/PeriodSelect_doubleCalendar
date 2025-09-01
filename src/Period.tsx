import type { JSX } from '@emotion/react/jsx-runtime';

import { Box, Button, Divider, Paper, Stack, useTheme } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CustomHeader } from './CustomHeader';
import { PeriodGroup } from './PeriodGroup';

const dates: Record<string, number> = {
  январь: 1,
  февраль: 2,
  март: 3,
  апрель: 4,
  май: 5,
  июнь: 6,
  июль: 7,
  август: 8,
  сентябрь: 9,
  октябрь: 10,
  ноябрь: 11,
  декабрь: 12,
};

type Props = {
  minYear: number;
  maxYear: number;
};

interface Period {
  year: number;
  month: number;
  label: string;
}

export type Periods = Period[] | [];

export const Period = ({ minYear, maxYear }: Props): JSX.Element => {
  const theme = useTheme();

  const calendarRef = useRef<HTMLDivElement>(null);
  const calendarRef2 = useRef<HTMLDivElement>(null);

  const [monthButtons, setMonthButtons] = useState<NodeListOf<Element> | null>(
    null,
  );
  const [monthButtons2, setMonthButtons2] =
    useState<NodeListOf<Element> | null>(null);

  const [currentYear, setCurrentYear] = useState(maxYear - 1);
  const [currentYear2, setCurrentYear2] = useState(maxYear);

  const [periods, setPeriods] = useState<Periods>([]);

  const [years, setYears] = useState<number[] | []>([]);

  // Получение списков кнопок
  useEffect(() => {
    if (!calendarRef.current) return;
    if (!calendarRef2.current) return;

    const buttons = calendarRef.current.querySelectorAll(
      '.MuiMonthCalendar-button, .MuiPickersMonth-monthButton',
    );

    const buttons2 = calendarRef2.current.querySelectorAll(
      '.MuiMonthCalendar-button, .MuiPickersMonth-monthButton',
    );

    setMonthButtons(buttons.length > 0 ? buttons : null);
    setMonthButtons2(buttons2.length > 0 ? buttons2 : null);
  }, [calendarRef, calendarRef2]);

  const resetButtons = useCallback(() => {
    if (monthButtons) {
      monthButtons.forEach((button) => {
        button.classList.remove('Mui-selected');
      });
    }

    if (monthButtons2) {
      monthButtons2.forEach((button) => {
        button.classList.remove('Mui-selected');
      });
    }
  }, [monthButtons, monthButtons2]);

  const handleReset = useCallback(() => {
    resetButtons();
    setPeriods([]);
  }, [resetButtons]);

  const sortPeriods = useCallback(() => {
    setPeriods((prev) => {
      return prev.sort((a, b) => {
        return b.year - a.year;
      });
    });
  }, []);

  const handleChange = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.currentTarget.classList.toggle('Mui-selected');
      event.currentTarget.setAttribute(
        'aria-checked',
        event.currentTarget.classList.contains('Mui-selected')
          ? 'true'
          : 'false',
      );

      const monthName = event.currentTarget.ariaLabel || '';
      const monthNumber = dates[monthName];

      const newPeriod: Period = {
        year: currentYear,
        month: monthNumber,
        label: monthName,
      };

      if (periods) {
        setPeriods((prev) => {
          if (
            prev.some(
              (period) =>
                period.year === newPeriod.year &&
                period.month === newPeriod.month,
            )
          ) {
            return prev.filter(
              (period) =>
                period.year !== newPeriod.year ||
                period.month !== newPeriod.month,
            );
          } else {
            return [...prev, newPeriod];
          }
        });
      } else {
        setPeriods([newPeriod]);
      }

      sortPeriods();
    },
    [currentYear, periods, sortPeriods],
  );

  const handleChange2 = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.currentTarget.classList.toggle('Mui-selected');
      event.currentTarget.setAttribute(
        'aria-checked',
        event.currentTarget.classList.contains('Mui-selected')
          ? 'true'
          : 'false',
      );

      const monthName = event.currentTarget.ariaLabel || '';
      const monthNumber = dates[monthName];

      const newPeriod: Period = {
        year: currentYear2,
        month: monthNumber,
        label: monthName,
      };

      if (periods) {
        setPeriods((prev) => {
          if (
            prev.some(
              (period) =>
                period.year === newPeriod.year &&
                period.month === newPeriod.month,
            )
          ) {
            return prev.filter(
              (period) =>
                period.year !== newPeriod.year ||
                period.month !== newPeriod.month,
            );
          } else {
            return [...prev, newPeriod];
          }
        });
      } else {
        setPeriods([newPeriod]);
      }

      sortPeriods();
    },
    [currentYear2, periods, sortPeriods],
  );

  // Получение списка выбранных лет
  useEffect(() => {
    const uniqueYears: number[] = [];
    periods.forEach((period) => {
      if (!uniqueYears.includes(period.year)) {
        uniqueYears.push(period.year);
      }
    });
    setYears(uniqueYears);
  }, [periods]);

  // Выделение кнопок при переключении года
  useEffect(() => {
    resetButtons();
    const currentMonths = periods.filter(
      (period) => period.year === currentYear,
    );
    const currentMonthsNames: string[] = [];
    currentMonths.forEach((month) => currentMonthsNames.push(month.label));

    if (monthButtons) {
      monthButtons.forEach((button) => {
        if (button.ariaLabel && currentMonthsNames.includes(button.ariaLabel)) {
          button.classList.add('Mui-selected');
        }
      });
    }

    const currentMonths2 = periods.filter(
      (period) => period.year === currentYear2,
    );
    const currentMonthsNames2: string[] = [];
    currentMonths2.forEach((month) => currentMonthsNames2.push(month.label));

    if (monthButtons2) {
      monthButtons2.forEach((button) => {
        if (
          button.ariaLabel &&
          currentMonthsNames2.includes(button.ariaLabel)
        ) {
          button.classList.add('Mui-selected');
        }
      });
    }
  }, [
    currentYear,
    currentYear2,
    periods,
    resetButtons,
    monthButtons,
    monthButtons2,
  ]);

  const handleComplete = useCallback(() => {
    const result = periods.map(
      (period) => new Date(period.year, period.month - 1, 1),
    );

    console.log(result);
  }, [periods]);

  return (
    <Paper
      sx={{ p: 2, fontFamily: 'arial', borderRadius: 4, position: 'relative' }}
    >
      <Stack
        flexDirection={'column'}
        justifyContent={'space-between'}
        sx={{ minHeight: 520 }}
      >
        <Box>
          <Stack
            sx={{
              mb: 2,
              backgroundColor: '#fff',
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <CustomHeader
              minYear={minYear}
              maxYear={maxYear}
              value={currentYear}
              value2={currentYear2}
              setValue={setCurrentYear}
              setValue2={setCurrentYear2}
            />
            <Stack
              flexDirection={'row'}
              justifyContent={'space-between'}
              alignContent={'center'}
              gap={2}
            >
              <DateCalendar
                ref={calendarRef}
                openTo="month"
                views={['month']}
                sx={{ height: 'fit-content', userSelect: 'none', p: 1 }}
                onMonthChange={(value) => console.log(value)}
                slots={{
                  calendarHeader: () => <Box></Box>,
                }}
                slotProps={{
                  monthButton: {
                    onClick: handleChange,
                  },
                }}
              />

              <Divider orientation="vertical" flexItem variant="middle" />

              <DateCalendar
                ref={calendarRef2}
                openTo="month"
                views={['month']}
                sx={{ height: 'fit-content', userSelect: 'none', p: 1 }}
                onMonthChange={(value) => console.log(value)}
                slots={{
                  calendarHeader: () => <Box></Box>,
                }}
                slotProps={{
                  monthButton: {
                    onClick: handleChange2,
                  },
                }}
              />
            </Stack>
          </Stack>

          {/* Для анимации элемента списка добавить в css файле анимацию к классу calendar_list_item */}
          <Box
            sx={{
              mb: 2,
              borderRadius: 2,
              backgroundColor: '#fff',
              minHeight: 100,
            }}
          >
            {years.length > 0 &&
              years.map((year) => (
                <PeriodGroup key={year} year={year} periods={periods} />
              ))}
          </Box>
        </Box>

        <Stack flexDirection={'row'} justifyContent={'flex-end'} gap={1}>
          <Button
            variant="outlined"
            sx={{ width: 140 }}
            onClick={handleReset}
            disabled={periods.length <= 0}
          >
            Сбросить
          </Button>
          <Button
            variant="contained"
            sx={{ width: 140 }}
            onClick={handleComplete}
          >
            Подтвердить
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};
