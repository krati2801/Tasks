import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Stepper, Step, StepLabel } from '@mui/material';
import { Typography } from "@material-ui/core";

import ApiHandler from "../../../Helper/ApiHandler";
import { steps } from '../../../Constants/constants';
import ButtonStructure from '../Button/Button';
import PersonalDetails from './PersonalDetails';
import BankDetails from './BankDetails';
import EducationDetails from './EducationDetails';
import ProfessionalDetails from './ProfessionalDetails';
import ExperienceDetails from './ExperienceDetails';
import OrganizationDetails from './OrganizationDetails';

import './Employee.css';

export default function Employee() {
  const [data, setData] = useState();
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const { state } = useLocation();

  let CustomComp;

  switch (activeStep) {
    case 1: {
      CustomComp = BankDetails
      break;
    }

    case 2: {
      CustomComp = ProfessionalDetails
      break;
    }

    case 3: {
      CustomComp = EducationDetails
      break;
    }

    case 4: {
      CustomComp = ExperienceDetails
      break;
    }

    case 5: {
      CustomComp = OrganizationDetails
      break;
    }

    default: {
      CustomComp = PersonalDetails
    }
  }

  const handleNext = (newData) => {
    let employeeData = { ...data, ...newData }
    setData(employeeData)
    if (activeStep === steps.length - 1) {
      if (state.modal_types) {
        addData(employeeData);
      } else {
        editData(employeeData)
      }
    }
    else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  async function addData(data){
    try {
      let response = await new ApiHandler().post("/employee/add", data);
      setData(response.data.data.rows);
      navigate('/');
    }
    catch (error) {
      console.log("error:", error);
    }
  }

  async function editData(data) {
    try {
      data.isEdit = true
      await new ApiHandler().post(`/employee/add`, data);
      navigate('/');
    }
    catch (error) {
      console.log("error:", error);
    }
  }

  return (
    <div>
      <Box>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <Typography className="typography" align="center" variant="h6">
          {steps[activeStep]}
        </Typography>

        <CustomComp handleNext={handleNext} label={activeStep === steps.length - 1 ? 'Finish' : 'Next'}>
          <div style={{ marginTop: "50px", width: "fit-content", marginLeft: "15px" }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <ButtonStructure color="inherit" sx={{ mr: 1 }} label="Back" onClick={handleBack} />
              <Box sx={{ flex: '1 1 auto' }} />
              <ButtonStructure type="submit" className="btn btn-primary mx-2" label={activeStep === steps.length - 1 ? 'Finish' : 'Next'} />
            </Box>
          </div>
        </CustomComp>
      </Box>
    </div>
  )
}