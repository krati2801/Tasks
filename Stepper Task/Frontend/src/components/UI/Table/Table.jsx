import React from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import { Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

import './Table.css';

export default function TableStructure(props) {
  const [data, setData] = React.useState({
    isOpen: false,
    id: null
  });
  const navigate = useNavigate();

  const setStateData = (openValue, id) => {
    setData({
      isOpen: openValue,
      id: id
    })
  }

  const deleteData = (id) => {
    props.deleteEmployee(data.id)
    setStateData(false, null)
  }

  const editEmployee = (data) => {
    navigate('/add-employee', { state: { data: data } });
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="caption table">
        {props.data.length > 0 ? "" : <caption>No records found.</caption>}
        <TableHead>
          <TableRow>
            <TableCell className="table-cell">Profile Picture</TableCell>
            <TableCell className="table-cell">Name</TableCell>
            <TableCell className="table-cell">Department</TableCell>
            <TableCell className="table-cell">Designation</TableCell>
            <TableCell className="table-cell">Email</TableCell>
            <TableCell className="table-cell">Mobile Number</TableCell>
            <TableCell className="table-cell">Resume</TableCell>
            <TableCell className="table-cell">Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {props.data.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell component="th" scope="row">{employee.image}</TableCell>
              <TableCell component="th" scope="row">{employee.firstName}</TableCell>
              <TableCell component="th" scope="row">{employee?.professional[0]?.department}</TableCell>
              <TableCell component="th" scope="row">{employee?.professional[0]?.designation}</TableCell>
              <TableCell component="th" scope="row">{employee.email}</TableCell>
              <TableCell component="th" scope="row">{employee.phone}</TableCell>
              <TableCell component="th" scope="row">{employee?.professional[0]?.resume}</TableCell>
              <TableCell component="th" scope="row"><CreateIcon onClick={() => editEmployee(employee)} /><DeleteIcon onClick={() => setStateData(true, employee.id)} /></TableCell>
            </TableRow>
          ))}
        </TableBody>

        <Dialog open={data.isOpen} onClose={() => setStateData(false, null)}>
          <DialogContent>
            <DialogContentText>
              Are you sure want to delete this employee?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setStateData(false, null)}>Cancel</Button>
            <Button onClick={() => deleteData(data.id)}>Ok</Button>
          </DialogActions>
        </Dialog>
      </Table>
    </TableContainer>
  )
}


