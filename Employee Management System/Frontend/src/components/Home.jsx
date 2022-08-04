import { Typography } from "@material-ui/core";

import TableStructure from './UI/Table'
import Navbar from './UI/Navbar';

export default function Home(){
  return(
    <>
        <Typography variant="h5" align="center" mt={10}>
          Employee Management System
        </Typography>

        <Navbar />
       
        <TableStructure />
    </>
  )
}
