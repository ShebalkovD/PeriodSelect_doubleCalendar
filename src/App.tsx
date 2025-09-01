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
import { useRef, useState } from 'react';
import { Period } from './Period';

export const App = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const myRef = useRef(null);

  const handleClick = () => {
    setIsCalendarOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setIsCalendarOpen(false);
  };

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
        >
          <ListSubheader>Сезоны</ListSubheader>
          <MenuItem value={1}>Зима</MenuItem>
          <MenuItem value={2}>Лето</MenuItem>
          <ListSubheader>Свой период</ListSubheader>
          <MenuItem value={3} onClick={handleClick}>
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
          <ClickAwayListener onClickAway={handleClickAway}>
            <Grow
              {...TransitionProps}
              timeout={250}
              style={{ transformOrigin: 'center top' }}
            >
              <Box>
                <Period minYear={2020} maxYear={2025} />
              </Box>
            </Grow>
          </ClickAwayListener>
        )}
      </Popper>
    </Stack>
  );
};
