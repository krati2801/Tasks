import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Formik } from "formik"
import * as Yup from "yup";

import Input from '../Input/Input';

const validationSchema = Yup.object().shape({
  joiningDate: Yup.date()
    .required("Joining Date is required!"),

  nextAppraiselDate: Yup.date()
    .required("Next Appraisel Date is required!"),

  currentCTC: Yup.number().typeError('please enter ctc properly')
    .min(500, 'please enter ctc properly')
    .required("Current CTC is required!")
});

export default function OrganizationDetails({ children, handleNext }) {
  const { state } = useLocation();
  const initialValue = {
    joiningDate: state?.data?.organization[0] ? state.data.organization[0].joiningDate : '',
    nextAppraiselDate: state?.data?.organization[0] ? state.data.organization[0].nextAppraiselDate : '',
    currentCTC: state?.data?.organization[0] ? state.data.organization[0].currentCTC : ''
  }

  function handleFormSubmit(values) {
    let data = {
      organization: [values]
    }
    handleNext(data);
  }
  return (
    <Formik
      initialValues={initialValue}
      validationSchema={validationSchema}
      onSubmit={(values) => handleFormSubmit(values)}
    >
      {
        ({ values, errors, touched, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit} className='px-3'>
            <div className="div2">
              <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '85ch' } }} noValidate autoComplete="off">
                <Input label="Joining Date" InputLabelProps={{ shrink: true, required: true }} type="date" name="joiningDate" value={values.joiningDate}
                  error={errors.joiningDate && touched.joiningDate ? true : false} helperText={errors.joiningDate} onChange={handleChange} />
                <Input label="Next Appraisel Date" name="nextAppraiselDate" InputLabelProps={{ shrink: true, required: true }} type="date" value={values.nextAppraiselDate}
                  error={errors.nextAppraiselDate && touched.nextAppraiselDate ? true : false} helperText={errors.nextAppraiselDate} onChange={handleChange} />
              </Box>
            </div>

            <div className="div2">
              <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '85ch' } }} noValidate autoComplete="off">
                <Input label="Current CTC" type="text" name="currentCTC" value={values.currentCTC}
                  error={errors.currentCTC && touched.currentCTC ? true : false} helperText={errors.currentCTC} onChange={handleChange} />
              </Box>
            </div>
            {children}
          </form>
        )}
    </Formik>
  )
}