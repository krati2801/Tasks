import { Button } from '@mui/material';

import './Button.css';

export default function ButtonStructure(props) {
    return (
        <Button {...props}>
            {props.label}
            {props.image ? <input hidden accept="image/*" multiple type="file" /> : ""}
        </Button>
    )
}