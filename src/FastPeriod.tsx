import type { JSX } from '@emotion/react/jsx-runtime';
import { getYear } from 'date-fns';

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
import {
  useCallback,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import type { Period, Periods } from 'App';

type Props = {
  parentWidth: number;
  periodID: string;
  minYear: number;
  closePopper: () => void;
  setValue: Dispatch<SetStateAction<Periods | null>>;
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
  { id: 'Зима', months: [1, 2] },
];

export const FastPeriod = ({
  parentWidth,
  periodID,
  minYear,
  closePopper,
  setValue,
}: Props): JSX.Element => {
  const [years, setYears] = useState<Array<number>>([]);
  const [selected, setSelected] = useState<Array<number>>([]);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const generateYears = useCallback(() => {
    const result: Array<number> = [];
    let i = currentYear;

    while (i >= minYear) {
      result.push(i);
      i--;
    }

    setYears(result);
  }, [minYear]);

  useEffect(() => {
    generateYears();
  }, [generateYears]);

  const handleChange = useCallback(
    (event: SelectChangeEvent<typeof selected>) => {
      const {
        target: { value },
      } = event;
      setSelected(typeof value !== 'string' ? value : []);
    },

    [],
  );

  const handleClose = useCallback(() => {
    setIsOpen(false);
    closePopper();
  }, [closePopper]);

  // Передать периоды в род. компонент
  useEffect(() => {
    const period = periodConfig.filter((item) => item.id === periodID);
    const result: Period[] = [];
    selected.forEach((year) => {
      period[0].months.forEach((month) => {
        result.push({ year: year, month: month });
      });
    });

    setValue(result);
  }, [periodID, selected, setValue]);

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
};
