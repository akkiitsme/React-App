import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, Button, CircularProgress } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid2";
import axios from "../../axios";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const EditCustomerPage = ({ id }) => {
  const [gender, setGender] = React.useState("");
  const [userStatus,setUserStatus] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dob, setDob] = useState(null);
  //const navigate = useNavigate();
  //const { id } = useParams(); 

  const [user, setUser] = useState({
    name: "",
    phoneNo: "",
    email: "",
    password: "",
    gender: "",
    dob: "",
    status: "",
  });

  useEffect(() => {
    // Fetch user data when the page loads
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/test/get-user/${id}`);
        const userData = response.data.body;
        setUser({
          name: userData.name,
          phoneNo: userData.phoneNo,
          email: userData.email,
          password: userData.password, 
          gender: userData.gender,
          dob: userData.dob,
          status: userData.status,
        });
        setGender(userData.gender);
        setDob(dayjs(userData.dob));
        setUserStatus(userData.status);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [id]);

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

  const handleUserStatus = (event) =>{
    setUserStatus(event.target.value);
    setUser({
        ...user,
        status: event.target.value,
      });
  }

  const handleDobChange = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
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
      console.log("update User : "+user)  
      const response = await axios.put(`/test/update-user/${id}`, user);
      console.log("User updated successfully:", response.data);
     // navigate("/dashboard");
    } catch (error) {
      console.error("Error while updating data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Typography variant="h4">Edit Customer</Typography>

      <Box component="form" sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={6} md={4}>
            <TextField
              type="text"
              required
              name="name"
              label="Name"
              margin="normal"
              value={user.name}
              placeholder="Enter your name"
              onChange={handleChange}
            />
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <TextField
              type="email"
              required
              name="email"
              autoComplete="email"
              value={user.email}
              label="Email"
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <TextField
              type="password"
              name="password"
              label="Password"
              value={user.password}
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <TextField
              type="number"
              required
              name="phoneNo"
              value={user.phoneNo}
              label="Mobile No"
              placeholder="Enter your 10 digit phone no"
              onChange={handleChange}
            />
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <FormControl sx={{ minWidth: 220, marginLeft: 1, marginBottom: 2 }}>
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

          <Grid xs={12} sm={6} md={4}>
            <FormControl sx={{ minWidth: 220, marginLeft: 1, marginBottom: 2 }}>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                name="status"
                value={userStatus}
                label="Status"
                onChange={handleUserStatus}
              >
                <MenuItem value={true}>Active</MenuItem>
                <MenuItem value={false}>Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6} md={4} sx={{ marginLeft: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]} sx={{ marginTop: -2, minWidth: 220 }}>
                <DatePicker label="Date of Birth" value={dob} onChange={handleDobChange} />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <Button
            sx={{ marginLeft: 1, marginBottom: 4 }}
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            {isSubmitting ? "Updating..." : "Update Customer"}
          </Button>
        </Grid>
      </Box>
    </Box>
  );
};

export default EditCustomerPage;
