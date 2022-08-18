import { Button } from "@mui/material";

import "./Navbar.css"

export default function Navbar(props) {
  return (
    <>
      <div style={{ textAlign: "right" }}>
        <Button className="button" variant="contained" {...props}>
          {props.label}
        </Button>
      </div>
    </>
  )
}
