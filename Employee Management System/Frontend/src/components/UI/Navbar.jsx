import { Button} from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import "./Navbar.css"

export default function Navbar(){
  return(
    <>
    <div style={{textAlign: "right"}}>
       <Button className="button" startIcon={< PersonAddIcon />} variant="contained">
        Employee
       </Button>
    </div>
  </>
  )
}
