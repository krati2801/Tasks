import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from "@material-ui/core";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import ApiHandler from "../Helper/ApiHandler";
import TableStructure from './UI/Table/Table';
import Navbar from './UI/Navbar/Navbar';

export default function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [])

  async function deleteEmployee(id) {
    try {
      await new ApiHandler().delete(`/employee/${id}`);
      getData()
    }
    catch (error) {
      console.log("error:", error);
    }
  }

  async function getData() {
    try {
      let response = await new ApiHandler().post("/employee/list");
      setData(response.data.data.rows);
    }
    catch (error) {
      console.log("error:", error);
    }
  }

  const navigateHome = () => {
    navigate('/add-employee', { state: { modal_types: "ADD" } });
  };

  return (
    <>
      <Typography variant="h5" align="center" mt={10}>
        Employee Management System
      </Typography>

      <Navbar label="Employee" onClick={navigateHome} startIcon={< PersonAddIcon />} />

      <TableStructure data={data} deleteEmployee={deleteEmployee} />
    </>
  )
}
