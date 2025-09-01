import { Stack } from "@mui/material"
import { Period } from "./Period";

function App() {
  return (
    <Stack justifyContent={'center'} alignItems={'center'} sx={{ width: '100%', height: '100vh', p: 10, m: 0}}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel htmlFor="grouped-native-select">Grouping</InputLabel>
        <Select native defaultValue="" id="grouped-native-select" label="Grouping">
          <option aria-label="None" value="" />
          <optgroup label="Category 1">
            <option value={1}>Option 1</option>
            <option value={2}>Option 2</option>
          </optgroup>
          <optgroup label="Category 2">
            <option value={3}>Option 3</option>
            <option value={4}>Option 4</option>
          </optgroup>
        </Select>
      </FormControl>

      
      {/* <Period minYear={2020} maxYear={2025}/> */}
    </Stack>
  )
}

export default App;
