import {
  memo,
  useCallback,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  type MenuProps,
  type SelectChangeEvent,
} from '@mui/material';

import type { JSX } from '@emotion/react/jsx-runtime';
import type { Period, Periods } from 'MonthSelector/MonthSelector';
import { getYear } from 'date-fns';

type Props = {
  parentWidth: number;
  periodID: string;
  lastPeriodID: string;
  fastPeriodValue: Array<number>;
  minYear: number;
  closePopper: () => void;
  setValue: Dispatch<SetStateAction<Periods | null>>;
  setFastPeriodValue: Dispatch<SetStateAction<Array<number>>>;
  setFastPeriodID: Dispatch<SetStateAction<string>>;
  setInputValue: Dispatch<SetStateAction<string>>;
};

interface PeriodConfigItem {
  id: string;
  months: number[];
}

const MenuPropsValue: Partial<MenuProps> = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'center',
  },
};

const currentYear = getYear(new Date());

const periodConfig: PeriodConfigItem[] = [
  { id: 'Лето', months: [6, 7, 8] },
  { id: 'Зима', months: [1, 2, 12] },
  { id: 'Полный год', months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
];

export const FastPeriod = memo(
  ({
    parentWidth,
    periodID,
    lastPeriodID,
    minYear,
    closePopper,
    setValue,
    fastPeriodValue,
    setFastPeriodValue,
    setFastPeriodID,
    setInputValue,
  }: Props): JSX.Element => {
    const [years, setYears] = useState<Array<number>>([]);
    const [selected, setSelected] = useState<Array<number>>(
      periodID === lastPeriodID ? fastPeriodValue : [],
    );

    const [isOpen, setIsOpen] = useState(false);

    const generateYears = useCallback(() => {
      const result: Array<number> = [];
      let i = currentYear;

      while (i >= minYear) {
        result.push(i);
        i--;
      }

      setYears(result);
    }, [minYear]);

    const handleChange = useCallback(
      (event: SelectChangeEvent<typeof selected>) => {
        const {
          target: { value },
        } = event;
        setSelected(typeof value !== 'string' ? value : []);
        setFastPeriodValue(typeof value !== 'string' ? value : []);
      },

      [setFastPeriodValue],
    );

    const handleClose = useCallback(() => {
      if (selected.length <= 0) {
        setFastPeriodID(lastPeriodID);
        setInputValue(lastPeriodID);
      }

      setIsOpen(false);
      closePopper();
    }, [
      closePopper,
      lastPeriodID,
      setFastPeriodID,
      setInputValue,
      selected.length,
    ]);

    // Передать периоды в род. компонент
    useEffect(() => {
      if (selected.length > 0) {
        const period = periodConfig.filter((item) => item.id === periodID);
        const result: Period[] = [];
        selected.forEach((year) => {
          period[0].months.forEach((month) => {
            result.push({ year: year, month: month });
          });
        });

        setValue(result);
      }
    }, [periodID, selected, setValue]);

    useEffect(() => {
      generateYears();
    }, [generateYears]);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 100);

      return () => clearTimeout(timer);
    }, []);

    return (
      <Paper
        sx={{
          mt: 2,
          fontFamily: 'arial',
          borderRadius: 1,
          position: 'relative',
          userSelect: 'none',
          width: parentWidth,
        }}
      >
        <FormControl sx={{ width: '100%' }}>
          <InputLabel id="fastperiod-multiple-checkbox-label" size="small">
            Год
          </InputLabel>
          <Select
            labelId="fastperiod-multiple-checkbox-label"
            label="Год"
            id="fastperiod-multiple-checkbox"
            name="fastperiod-multiple-checkbox"
            multiple
            value={selected}
            onChange={handleChange}
            input={<OutlinedInput label="Год" />}
            renderValue={() => selected.join(', ')}
            MenuProps={MenuPropsValue}
            size="small"
            open={isOpen}
            onClose={handleClose}
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                <Checkbox checked={selected.includes(year)} />
                <ListItemText primary={year} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>
    );
  },
);
