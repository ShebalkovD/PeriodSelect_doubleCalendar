import { Box, Fade, FormControl, InputLabel, ListSubheader, MenuItem, Popper, Select, Stack } from "@mui/material"
import { useRef } from "react";
import { useState } from "react";
import { Period } from "./Period";

function App() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const myRef = useRef(null);

  const handleClick = () => {
    setIsCalendarOpen((prev) => !prev);
  };

  return (
    <Stack justifyContent={'start'} alignItems={'center'} sx={{ width: '100%', height: '100%', m: 0}}>
      <FormControl sx={{ m: 1, minWidth: 400, position: 'relative' }} ref={myRef} size="small">
        <InputLabel htmlFor="grouped-select">Выберите периоды для сравнения</InputLabel>
        <Select defaultValue="" id="grouped-select" label="Выберите периоды для сравнения">
          <ListSubheader>Сезоны</ListSubheader>
          <MenuItem value={1}>Зима</MenuItem>
          <MenuItem value={2}>Лето</MenuItem>
          <ListSubheader>Свой период</ListSubheader>
          <MenuItem value={3} onClick={handleClick}>Добавить</MenuItem>
        </Select>
      </FormControl>

      <Popper id={'periodDoubleCalendar'} open={isCalendarOpen} anchorEl={myRef.current} transition sx={{ zIndex: 100 }}>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box>
              <Period minYear={2020} maxYear={2025}/>
            </Box>
          </Fade>
        )}
      </Popper>
    </Stack>
  )
}

export default App;
