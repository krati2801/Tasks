import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { Formik } from "formik"
import uuid from 'react-uuid';
import * as Yup from "yup";

import Navbar from '../Navbar/Navbar';
import Input from '../Input/Input';

import './Employee.css'

const validationSchema = Yup.object().shape({
  companyName: Yup.string()
    .min(3, "Enter Company Name properly!")
    .max(50, "Enter Company Name properly!")
    .required("Company Name is required!"),

  position: Yup.string()
    .required("Position is required!"),

  totalYear: Yup.number().typeError('please enter year properly')
    .min(1, 'please enter year properly!')
    .max(2, 'please enter year properly!')
    .required("Total year is required!"),

  lastCTC: Yup.number().typeError('please enter CTC properly')
    .required("Last CTC is required!"),
});

export default function ExperienceDetails({ children, handleNext }) {
  const ref = useRef(null);
  const [newData, setData] = useState([]);
  const [isFormOpen, setOpen] = useState(false);
  const [verror, seterror] = useState(false);
  const { state } = useLocation();

  useEffect(() => {
    if(state && state.data && state.data.experience.length > 0) {
      setData(state.data.experience)
    }
  }, [])

  const initialValue = {
    companyName: '',
    position: '',
    totalYear: '',
    lastCTC: ''
  }

  function handleFormSubmit() {
    let data = {
      experience: newData
    }
    handleNext(data);
  }

  const openForm = () => {
    setOpen(true);
  };

  const deleteData = (id) => {
    setData(items => items.filter(x => x.id !== id))
  }
  const handleClick = async (resetForm) => {
    if (!await validationSchema.isValid(ref.current.values)) {
      seterror(true)
      return;

    }
    const data = {
      id: uuid(),
      ...ref.current.values
    }
  
    setData([...newData, data])
    setOpen(false)
    ref.current.setFieldValue(initialValue);
    resetForm()
  };
  return (
    <>
      <div className="show-error">Enter atlease one record!</div>
      <Formik initialTouched={{ field: true }}
        initialValues={initialValue} innerRef={ref} onSubmit={handleFormSubmit}>
        {
          ({ values, errors, handleChange, handleSubmit, resetForm }) => (
            <form onSubmit={handleSubmit}>
              <Navbar label="Add Experience" startIcon={< AddIcon />} onClick={openForm} />
              <TableContainer component={Paper}>
                <Table aria-label="caption table">
                  <TableHead>
                    <TableRow>
                      <TableCell className="table-cell">Company Name</TableCell>
                      <TableCell className="table-cell">Position</TableCell>
                      <TableCell className="table-cell">Total Year</TableCell>
                      <TableCell className="table-cell">Last CTC</TableCell>
                      <TableCell className="table-cell">Action</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {newData.length > 0 ?
                      newData.map((data, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">{data.companyName}</TableCell>
                          <TableCell component="th" scope="row">{data.position}</TableCell>
                          <TableCell component="th" scope="row">{data.totalYear}</TableCell>
                          <TableCell component="th" scope="row">{data.lastCTC}</TableCell>
                          <TableCell component="th" scope="row"><DeleteIcon onClick={() => deleteData(data.id)} /></TableCell>
                        </TableRow>
                      )) : ""}
                    {
                      isFormOpen ?
                        <TableRow>
                          <TableCell component="th" scope="row">
                            <Input label="Company Name" name="companyName" value={values.companyName}
                              error={verror} helperText={errors.companyName} onChange={handleChange} />
                          </TableCell>
                          <TableCell component="th" scope="row"><Input label="Position" name="position" value={values.position}
                            error={verror} helperText={errors.position} onChange={handleChange} /></TableCell>
                          <TableCell component="th" scope="row"><Input label="Total Year" name="totalYear" value={values.totalYear}
                            error={verror} helperText={errors.totalYear} onChange={handleChange} /></TableCell>
                          <TableCell component="th" scope="row"><Input label="Last CTC" name="lastCTC" value={values.lastCTC}
                            error={verror} helperText={errors.lastCTC} onChange={handleChange} /></TableCell>
                          <TableCell component="th" scope="row"><CheckIcon onClick={handleClick.bind(null, resetForm)} /><ClearIcon onClick={() => setOpen(false)} /></TableCell>
                        </TableRow>
                      : ""
                    }
                  </TableBody>
                </Table>
              </TableContainer>
              {children}
            </form>)}
      </Formik>
    </>
  )
}