import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from "@mui/material/Paper";

const rows = [
  
];
function TableStructure(){
  return(
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <caption sx={{color:"black", align:"center"}}>No records found.</caption>
        <TableHead>
          <TableRow>
            <TableCell sx={{color:"#0000008a;", fontSize:"12px"}}>Profile Picture</TableCell>
            <TableCell align="right" sx={{color:"#0000008a;", fontSize:"12px"}}>Name</TableCell>
            <TableCell align="right" sx={{color:"#0000008a;", fontSize:"12px"}}>Department</TableCell>
            <TableCell align="right" sx={{color:"#0000008a;", fontSize:"12px"}}>Designation</TableCell>
            <TableCell align="right" sx={{color:"#0000008a;", fontSize:"12px"}}>Email</TableCell>
            <TableCell align="right" sx={{color:"#0000008a;", fontSize:"12px"}}>Mobile Number</TableCell>
            <TableCell align="right" sx={{color:"#0000008a;", fontSize:"12px"}}>Resume</TableCell>
            <TableCell align="right" sx={{color:"#0000008a;", fontSize:"12px"}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableStructure;
