import React, { useState } from "react";
import { Box, TextField, Typography, Button, CircularProgress } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from  '@mui/material/Grid2';
import { useNavigate } from "react-router-dom";
import axios from "../../axios";

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const AddCustomerPage = () => {
  const [gender, setGender] = React.useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dob, setDob] = useState(null); 
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    phoneNo: "",
    email: "",
    password: "",
    gender: "",
    dob: "",
    status: true
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleGender = (event) => {
    setGender(event.target.value);
    setUser({
      ...user,
      gender: event.target.value,
    });
  };

  const handleDobChange = (date) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD'); 
    setDob(date);
    setUser({
      ...user,
      dob: formattedDate, 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      console.log("user : ", user);
       const response = await axios.post('/test/add-user', user);
       console.log('User added successfully:', response.data);
       navigate("/dashboard");
    } catch (error) {
      console.error("Error while adding data: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Typography variant="h4">Add Customer</Typography>
      
        <Box component="form" sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid  xs={12} sm={6} md={4}>
                <TextField
                    type="text"
                    required
                    name="name"
                    label="Name"
                    margin="normal"
                    autoFocus
                    placeholder="Enter your name"
                    onChange={handleChange}
                />
                </Grid>

                <Grid  xs={12} sm={6} md={4} >
                <TextField
                    type="email"
                    required
                    name="email"
                    autoComplete="email"
                    label="Email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                />
                </Grid>

                <Grid  xs={12} sm={6} md={4} >
                <TextField
                    type="password"
                    required
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                />
                </Grid>

                <Grid  xs={12} sm={6} md={4} >
                <TextField
                    type="number"
                    required
                    name="phoneNo"
                    label="Mobile No"
                    placeholder="Enter your 10 digit phone no"
                    onChange={handleChange}
                />
                </Grid>

                <Grid xs={12} sm={6} md={4} >
                    <FormControl sx={{ minWidth: 220, marginLeft: 1, marginBottom: 2}}>
                        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        name="gender"
                        value={gender}
                        label="Gender"
                        onChange={handleGender}
                        >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} sm={6} md={4} sx={{marginLeft:1}} >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker', 'DatePicker']} sx={{marginTop:-2,minWidth: 220}}>
                            <DatePicker label="Date of Birth" value={dob} onChange={handleDobChange}/>  
                        </DemoContainer>
                    </LocalizationProvider>
                </Grid>
          </Grid>
          <Grid  xs={12} sm={6} md={4} >
          <Button sx={{ marginLeft: 1 ,marginBottom:4 }}
            type="submit"
            variant="contained"
            color="success"
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            {isSubmitting ? "Adding in..." : "Add Customer"}
          </Button>
            
          </Grid>
          
        </Box>

    </Box>
  );
};

export default AddCustomerPage;
