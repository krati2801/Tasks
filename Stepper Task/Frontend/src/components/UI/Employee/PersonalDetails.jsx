import uuid from 'react-uuid';
import moment from 'moment';
import { Formik } from 'formik';
import * as Yup from "yup";
import Box from '@mui/material/Box';
import Button from '@material-ui/core/Button';
import { useLocation } from 'react-router-dom';

import Input from '../Input/Input';

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Firstname is required!"),

  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Lastname is required!"),

  phone: Yup.string()
    .required("Phone number is required!")
    .min(
      10,
      "Invalid phone number!"
    ),

  email: Yup.string().email().required("Email is required!"),
  dateOfBirth: Yup.date().required("DateOfBirth is required!").test("dateOfBirth", "Please choose a valid date of birth", (value) => {
    return moment().diff(moment(value), "years") >= 10;
  }),
  presentAddress: Yup.string().min(10, "please enter proper address!").required("present address is required!"),
  permanentAddress: Yup.string().min(10, "please enter proper address!").required("permanent address is required!")
});

export default function PersonalDetails({ children, handleNext }) {
  const { state } = useLocation();

  const initialValue = {
    id: state?.data?.id ? state.data.id : uuid(),
    firstName: state?.data?.firstName ? state.data.firstName : '',
    middleName: state?.data?.middleName ? state.data.middleName : '',
    lastName: state?.data?.lastName ? state.data.lastName : '',
    dateOfBirth: state?.data?.dateOfBirth ? state.data.dateOfBirth : '',
    phone: state?.data?.phone ? state.data.phone : '',
    email: state?.data?.email ? state.data.email : '',
    image: state?.data?.image ? state.data.image : '',
    presentAddress: state?.data?.presentAddress ? state.data.presentAddress : '',
    permanentAddress: state?.data?.permanentAddress ? state.data.permanentAddress : ''
  }

  function handleFormSubmit(values) {
    handleNext(values);
  }

  return (
    <>
      <Formik initialValues={initialValue} validationSchema={validationSchema} onSubmit={(values) => handleFormSubmit(values)}>
        {
          ({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <div className="div1">
                <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '55ch' } }} noValidate autoComplete="off">
                  <Input label="First Name" type="text" name="firstName" value={values.firstName}
                    error={errors.firstName && touched.firstName ? true : false} helperText={errors.firstName} onChange={handleChange} />
                  <Input label="Middle Name" type="text" name="middleName" value={values.middleName} onChange={handleChange} />
                  <Input label="Last Name" type="text" name="lastName" value={values.lastName}
                    error={errors.lastName && touched.lastName ? true : false} helperText={errors.lastName} onChange={handleChange} />
                </Box>
              </div>

              <div className="div2">
                <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '55ch' } }} noValidate autoComplete="off">
                  <Input label="Email" type="text" name="email" value={values.email}
                    error={errors.email && touched.email ? true : false} helperText={errors.email} onChange={handleChange} />
                  <Input label="Mobile Number" type="text" name="phone" value={values.phone}
                    error={errors.phone && touched.phone ? true : false} helperText={errors.phone} onChange={handleChange} />
                  <Input label="Date of Birth" InputLabelProps={{ shrink: true, required: true }} type="date" name="dateOfBirth" value={values.dateOfBirth}
                    error={errors.dateOfBirth && touched.dateOfBirth ? true : false} helperText={errors.dateOfBirth} onChange={handleChange} />
                </Box>
              </div>

              <input accept="image/*" type="file" id="select-image" style={{ display: 'none' }} name="image"
                onChange={(event) => {
                  setFieldValue("image", event.currentTarget.files[0]);
                }}
              />

              <div className="div1">
                <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '85ch' } }}>
                  <label htmlFor="select-image">
                    <Button variant="contained" color="primary" component="span">
                      Upload Image
                    </Button>
                  </label>
                  {values.image && (<label style={{ margin: 10 }}>{values.image.name}</label>)}
                </Box>
              </div>

              <div className="div2">
                <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '85ch' } }} noValidate autoComplete="off">
                  <Input label="Present Address" type="text" name="presentAddress" value={values.presentAddress}
                    error={errors.presentAddress && touched.presentAddress ? true : false} helperText={errors.presentAddress} onChange={handleChange} />
                  <Input label="Permanent Address" type="text" name="permanentAddress" value={values.permanentAddress}
                    error={errors.permanentAddress && touched.permanentAddress ? true : false} helperText={errors.permanentAddress} onChange={handleChange} />
                </Box>
              </div>
               {children}
            </form>
          )
        }
      </Formik>
    </>
  )
}