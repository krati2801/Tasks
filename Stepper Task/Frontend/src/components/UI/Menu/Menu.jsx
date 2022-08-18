import { InputLabel, MenuItem, Select, FormControl } from '@mui/material';

export default function Menu(props) {
  return (
    <>
      <FormControl variant="standard" {...props}>
        <InputLabel id="demo-simple-select-standard-label">{props.label}</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          onChange={props.onChange}
          name={props.name}
          value={props.value}
          error={props.error}
          helperText={props.helperText}
        >
          {props.data.map((data, index) =>
            <MenuItem key={index} value={index}>{data}</MenuItem>
          )}
        </Select>
      </FormControl>
    </>
  )
}