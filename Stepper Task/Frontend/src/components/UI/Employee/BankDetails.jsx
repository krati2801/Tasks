import Box from '@mui/material/Box';
import { Formik } from "formik"
import * as Yup from "yup";
import { useLocation } from 'react-router-dom';

import Input from '../Input/Input';

const validationSchema = Yup.object().shape({
  bankName: Yup.string()
    .min(3, "Enter bank name properly!")
    .max(20, "Enter bank name properly!")
    .required("Bank Name is required!"),

  accountName: Yup.string()
    .min(2, "Too Short Account Name!")
    .max(50, "Too Long Account Name!")
    .required("Account Name is required!"),

  accountNumber: Yup.number()
    .required("Account Number is required!")
    .min(100000, "Invalid Account number!")
    .max(999999999999, "Invalid number!")
    .integer()
    .typeError("please enter digits only!"),

  IFSCCode: Yup.string()
    .min(7, "Invalid IFSC Code!")
    .required("IFSC Code is required!"),

  aadharNumber: Yup.number()
    .typeError("please enter digits only!")
    .min(100000000000, "Invalid Aadhar Number!")
    .max(999999999999, "Invalid Aadhar Number!")
    .required("Aadhar Number is required!"),

  panNumber: Yup.string()
    .min(7, "Invalid Pancard Number!")
    .required("Pan Number is required!")
});

export default function BankDetails({ children, handleNext }) {
  const { state } = useLocation();
  const initialValue = {
    bankName: state?.data?.bankName ? state.data.bankName : '',
    accountName: state?.data?.accountName ? state.data.accountName : '',
    accountNumber: state?.data?.accountNumber ? state.data.accountNumber : '',
    IFSCCode: state?.data?.IFSCCode ? state.data.IFSCCode : '',
    aadharNumber: state?.data?.aadharNumber ? state.data.aadharNumber : '',
    panNumber: state?.data?.panNumber ? state.data.panNumber : ''
  }

  function handleFormSubmit(values) {
    handleNext(values);
  }

  return (
    <>
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
                  <Input label="Bank Name" name="bankName" type="text" value={values.bankName}
                    error={errors.bankName && touched.bankName ? true : false} helperText={errors.bankName} onChange={handleChange} />
                  <Input label="Account Name" name="accountName" type="text" value={values.accountName}
                    error={errors.accountName && touched.accountName ? true : false} helperText={errors.accountName} onChange={handleChange} />
                </Box>
              </div>

              <div className="div2">
                <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '85ch' } }} noValidate autoComplete="off">
                  <Input label="Bank Account Number" type="text" name="accountNumber" value={values.accountNumber}
                    error={errors.accountNumber && touched.accountNumber ? true : false} helperText={errors.accountNumber} onChange={handleChange} />
                  <Input label="IFSC Code" type="text" name="IFSCCode" value={values.IFSCCode}
                    error={errors.IFSCCode && touched.IFSCCode ? true : false} helperText={errors.IFSCCode} onChange={handleChange} />
                </Box>
              </div>

              <div className="div2">
                <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '85ch' } }} noValidate autoComplete="off">
                  <Input label="Aadhar Card Number" type="text" name="aadharNumber" value={values.aadharNumber}
                    error={errors.aadharNumber && touched.aadharNumber ? true : false} helperText={errors.aadharNumber} onChange={handleChange} />
                  <Input label="Pan Card Number" type="text" name="panNumber" value={values.panNumber}
                    error={errors.panNumber && touched.panNumber ? true : false} helperText={errors.panNumber} onChange={handleChange} />
                </Box>
              </div>
              {children}
            </form>
          )}
      </Formik>
    </>
  )
}