import logo from "./logo.svg";
import "./App.css";
import { Typography } from "@material-ui/core";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Button, Container } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const rows = [
  
];
function App() {
  return (
    <div className="App">
      <Container>
        <Typography variant="h5" align="center" mt={10}>
          Employee Management System
        </Typography>

        <div style={{textAlign: 'right'}}>
          <Button startIcon={< PersonAddIcon />} variant="contained" sx={{ mt: 7, backgroundColor:"#6610f2", textTransform : "none" }}>
            Employee
          </Button>
        </div>
        <div>
          {/* <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                mt: 2,
                width: '100%',
                height: 150,
              },
            }}
          >
            <Paper elevation={10} />
          </Box> */}
           <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <caption>A basic table example with a caption</caption>
        <TableHead>
          <TableRow sx={{color: "rgba(96, 96, 96)"}}>
            <TableCell>Profile Picture</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Department</TableCell>
            <TableCell align="right">Designation</TableCell>
            <TableCell align="right">Email</TableCell>
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
        </div>
      </Container>
    </div>
  );
}

export default App;
