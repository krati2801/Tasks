import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { Formik } from "formik";
import uuid from 'react-uuid';
import * as Yup from "yup";

import Navbar from '../Navbar/Navbar';
import Input from '../Input/Input';

import './Employee.css'

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Enter name properly!")
    .max(50, "Enter name properly!")
    .required("Name is required!"),

  universityName: Yup.string()
    .min(2, "Too Short University Name!")
    .max(50, "Too Long University Name!")
    .required("University Name is required!"),

  yearOfPassing: Yup.string().typeError('please enter year properly')
    .min(4, 'please enter year properly!')
    .max(4, 'please enter year properly!')
    .required("Passing year is required!"),

  result: Yup.string()
    .required("Result is required!"),
});


export default function EducationDetails({ children, handleNext }) {
  const ref = useRef(null);
  const { state } = useLocation();
  const [newData, setData] = useState([]);
  const [error, showError] = useState(false);
  const [isFormOpen, setOpen] = useState(false);
  const [verror, seterror] = useState(false)

  const initialValue = {
    name: '',
    universityName: '',
    yearOfPassing: '',
    result: ''
  }

  useEffect(() => {
    if (state && state.data && state.data.education.length > 0) {
      setData(state.data.education)
    }
  }, [])

  const openForm = () => {
    setOpen(true);
  };

  const deleteData = (id) => {
    setData(items => items.filter(x => x.id !== id))
  }

  function handleFormSubmit() {
    if (newData.length === 0) {
      showError(true)
      return;
    }
    let data = {
      education: newData
    }
    handleNext(data);
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
      <Formik initialTouched={{
        field: true,
      }}
        initialValues={initialValue} innerRef={ref} onSubmit={handleFormSubmit}>
        {
          ({ values, errors, handleChange, handleSubmit, resetForm }) => (
            <form onSubmit={handleSubmit}>
              <Navbar label="Add Education" startIcon={< AddIcon />} onClick={openForm} />
              <TableContainer component={Paper}>
                <Table aria-label="caption table">
                  <TableHead>
                    <TableRow>
                      <TableCell className="table-cell">Education Name</TableCell>
                      <TableCell className="table-cell">University Name</TableCell>
                      <TableCell className="table-cell">Result</TableCell>
                      <TableCell className="table-cell">Year Of Passing</TableCell>
                      <TableCell className="table-cell">Action</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {newData.length > 0 ?
                      newData.map((data, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">{data.name}</TableCell>
                          <TableCell component="th" scope="row">{data.universityName}</TableCell>
                          <TableCell component="th" scope="row">{data.result}</TableCell>
                          <TableCell component="th" scope="row">{data.yearOfPassing}</TableCell>
                          <TableCell component="th" scope="row"><DeleteIcon onClick={() => deleteData(data.id)} /></TableCell>
                        </TableRow>
                      )) : ""}
                    {
                      isFormOpen ?
                        <TableRow>
                          <TableCell component="th" scope="row">
                            <Input label="Education Name" name="name" value={values.name}
                              error={verror} helperText={errors.name} onChange={handleChange} />
                          </TableCell>
                          <TableCell component="th" scope="row"><Input label="University Name" name="universityName" value={values.universityName}
                            error={verror} helperText={errors.universityName} onChange={handleChange} /></TableCell>
                          <TableCell component="th" scope="row"><Input label="Result" name="result" value={values.result}
                            error={verror} helperText={errors.result} onChange={handleChange} /></TableCell>
                          <TableCell component="th" scope="row"><Input label="Year Of Passing" name="yearOfPassing" value={values.yearOfPassing}
                            error={verror} helperText={errors.yearOfPassing} onChange={handleChange} /></TableCell>
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