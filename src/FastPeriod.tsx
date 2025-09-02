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
import { useCallback, useEffect, useState } from 'react';

type Props = {
  parentWidth: number;
  periodID: string;
  minYear: number;
  closePopper: () => void;
};

const MenuPropsValue: Partial<MenuProps> = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'center',
  },
};
const currentYear = getYear(new Date());

export const FastPeriod = ({
  parentWidth,
  periodID,
  minYear,
  closePopper,
}: Props): JSX.Element => {
  console.log(periodID);
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
