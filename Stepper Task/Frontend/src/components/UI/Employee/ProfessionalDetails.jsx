import {Box, Grid} from '@mui/material';
import { Formik } from "formik";
import * as Yup from "yup";
import { useLocation } from 'react-router-dom';

import Menu from '../Menu/Menu';
import Input from '../Input/Input';
import ButtonStructure from '../Button/Button';
import { years, Months } from '../../../Constants/constants';

import './Employee.css';

const validationSchema = Yup.object().shape({
  designation: Yup.string()
    .min(3, "Enter Designation properly!")
    .max(50, "Enter Designation properly!")
    .required("Designation is required!"),

  department: Yup.string()
    .min(2, "Too Short Department Name!")
    .max(50, "Too Long Department Name!")
    .required("Department is required!"),

  expInYears: Yup.string()
    .required("Experience is required!"),

  expInMonths: Yup.string()
    .required("Experience is required!"),

  currentLocation: Yup.string()
     .min(7, "Enter Location properly!")
     .required("Current Location is required!"),

  skills: Yup.string()
     .required("Skills is required!")
});

export default function ProfessionalDetails({ children, handleNext }) {
  const { state } = useLocation();
  const initialValue = {
    designation: state?.data?.professional[0] ? state.data.professional[0].designation : '',
    department: state?.data?.professional[0] ? state.data.professional[0].department : '',
    expInYears: state?.data?.professional[0] ? state.data.professional[0].expInYears : '',
    expInMonths: state?.data?.professional[0] ? state.data.professional[0].expInMonths : '',
    currentLocation: state?.data?.professional[0] ? state.data.professional[0].currentLocation : '',
    skills: state?.data?.professional[0] ? state.data.professional[0].skills : ''
  }

  function handleFormSubmit(values) {
    let data1 = {
      professional: [{
        designation: values.designation,
        department: values.department,
        expInYears: values.expInYears,
        expInMonths: values.expInMonths,
        currentLocation: values.currentLocation,
        skills: values.skills
      }]
    }
    handleNext(data1);
  }
  return (
    <>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {
          ({ values, errors, touched, handleChange, handleSubmit}) => (
          <form onSubmit={handleSubmit}>
              <div className="div2">
                <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '85ch' } }} noValidate autoComplete="off">
                  <Input label="Designation" name="designation" value={values.designation}
                    error={errors.designation && touched.designation ? true : false} helperText={errors.designation} onChange={handleChange} />
                  <Input label="Department" name="department" value={values.department}
                    error={errors.department && touched.department ? true : false} helperText={errors.department} onChange={handleChange} />
                </Box>
              </div>

              <div className="div2">
                <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '85ch' } }} noValidate autoComplete="off">
                  <Grid style={{ marginTop: '28px', marginLeft: '12px', fontSize: 'large', color: 'gray' }}>Experience:</Grid>
                  <Menu data={years} style={{ width: '25ch', marginLeft: '45px' }} label="Years" name="expInYears" value={values.expInYears}
                    error={errors.expInYears && touched.expInYears ? true : false} helperText={errors.expInYears} onChange={handleChange} />
                  <Menu data={Months} style={{ width: '25ch', marginLeft: '25px' }} label="Months" name="expInMonths" value={values.expInMonths}
                    error={errors.expInMonths && touched.expInMonths ? true : false} helperText={errors.expInMonths} onChange={handleChange} />
                  <Input label="Current Location" type="text" style={{ marginLeft: '19%' }} name="currentLocation" value={values.currentLocation}
                    error={errors.currentLocation && touched.currentLocation ? true : false} helperText={errors.currentLocation} onChange={handleChange} />
                </Box>
              </div>

              <div className="div2">
                <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '85ch' } }} noValidate autoComplete="off">
                  <Input label="Skills" type="text" name="skills" value={values.skills}
                    error={errors.skills && touched.skills ? true : false} helperText={errors.skills} onChange={handleChange} />
                  <ButtonStructure variant="contained" component="label" image="true" label="Upload Resume" style={{
                    height: '20%',
                    marginLeft: '100px'
                  }} />
                </Box>
              </div>
              {children}
            </form>
          )}
      </Formik>
    </>
  )
}