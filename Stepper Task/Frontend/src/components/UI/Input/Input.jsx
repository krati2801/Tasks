import TextField from '@mui/material/TextField';

import './Input.css';

export default function Input(props) {
    return (
        <TextField required id="standard-required" variant="standard" {...props} />
    )
}