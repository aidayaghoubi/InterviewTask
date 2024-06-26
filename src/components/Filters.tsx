import { Box, FormControl, Input, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material"
import { FILTERS } from "../static"

interface IFilters {
  inputValue: string,
  setInputValue: (e: string) => void,
  setFilterValues: (e: string[]) => void,
  filterValues: string[]
}
const Filters = ({ inputValue, setInputValue, filterValues, setFilterValues }: IFilters) => {

  function searchBaseStatus(e: any) {
    setInputValue(e.target.value)
  }

  function handleSelectFieldChange(e: any) {
    setFilterValues(e.target.value)
  }

  return <Box sx={{ display: "flex", gap: "1rem", alignItems: 'center', mb: "1rem" }}>
    <Input value={inputValue} onChange={(e) => searchBaseStatus(e as any)} placeholder='search hear' />
    <FormControl size="small" sx={{ m: 1, width: 150 }}>
      <InputLabel id="demo-multiple-name-label">Filter base on status</InputLabel>
      <Select
        sx={{ width: "250px" }}
        name="filterStatus"
        multiple
        onChange={handleSelectFieldChange}
        value={filterValues}
        input={<OutlinedInput label={"Filter base on status"} />}
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
      >
        {FILTERS.map((option: string) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>
}
export default Filters 