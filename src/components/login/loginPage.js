import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../auth/authService";
import {TextField,Button,Box,Card,Typography,InputAdornment,IconButton,CircularProgress} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { SitemarkIcon } from "./CustomIcons.tsx";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add submitting state
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Select authentication state to check if the user is authenticated
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const onSubmit = async (data) => {
    setIsSubmitting(true); 
    try {
      await dispatch(login(data));
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsSubmitting(false); 
    }
  };

  // If authentication is successful, redirect to the dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card
        sx={{ minWidth: 350, boxShadow: 3 }}
        style={{ padding: "30px", borderRadius: "10px" }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <SitemarkIcon />
          <Typography variant="h4">Login</Typography>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Box>
              <TextField
                placeholder="your@email.com"
                autoComplete="email"
                label="Username"
                autoFocus
                fullWidth
                margin="normal"
                {...register("username", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                error={!!errors.username}
                helperText={errors.username ? errors.username.message : ""}
              />
              <TextField
                label="Password"
                placeholder="password"
                type={showPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                {...register("password", { required: "Password is required" })}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isSubmitting} // Disable button when submitting
                startIcon={isSubmitting ? <CircularProgress size={20} /> : null}>
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </Box>
          </form>
        </Box>
      </Card>
    </div>
  );
};

export default LoginPage;
