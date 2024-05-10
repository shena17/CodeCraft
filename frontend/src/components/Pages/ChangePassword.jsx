import React, { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "react-bootstrap/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Notification from "../DispayComponents/Notification";



const ChangePassword = () => {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const location = useLocation();
  const navigate = useNavigate();
  const isForgotPassword = location.state?.isForgotPassword;
  const email = location.state?.email;


  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      verificationCode: "",
    },
    validationSchema: Yup.object({
      currentPassword:!isForgotPassword ?Yup.string().required("Current Password is required"): Yup.string(),
      newPassword: Yup.string()
        .required("New Password is required")
        .min(8, "Password must be at least 8 characters long"),
      confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
        verificationCode: isForgotPassword
        ? Yup.string().required("Verification Code is required")
        : Yup.string(), // Add validation only if isForgotPassword is true
    }),
    onSubmit: async (values) => {
      // Check if new password and confirm password match
      if (values.newPassword !== values.confirmPassword) {
        setNotify({
          isOpen: true,
          message: "New password and confirm password do not match",
          type: "error",
        });
      } else {
        let response;
        try {
          if(isForgotPassword){
            response = await forgotPasswordReset(
              email,
              values.verificationCode,
              values.newPassword
            );
          }else{
            response = await updatePassword(
              values.currentPassword,
              values.newPassword
            );
          }
          
          setNotify({
            isOpen: true,
            message: response.data.message,
            type: response.status === 200 ? "success" : "error",
          });

          if (isForgotPassword) {
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          }
        } catch (error) {
          console.error("Error updating password:", error);
          // Handle error if needed
        }
      }
    },
  });

  async function updatePassword(currentPassword, newPassword) {
    try {
      const token = window.localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const data = {
        currentPassword: currentPassword,
        newPassword: newPassword,
      };

      const response = await axios.post(
        "http://localhost:8071/user/update-password",
        data,
        config
      );

      return response; // You can handle the response as needed
    } catch (error) {
      // If the error response has a message property, it contains the error message from the backend
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return error.response; // Return the error message
      } else {
        throw error; // Throw the error if there's no specific error message from the backend
      }
    }
  }

  async function forgotPasswordReset(email,verificationCode, newPassword) {
    try {
      const data = {
        email:email,
        verificationCode: verificationCode,
        newPassword: newPassword,
      };
  
      const response = await axios.put(
        "http://localhost:8071/user/reset-password",
        data
      );
  
      return response; // You can handle the response as needed
    } catch (error) {
      // If the error response has a message property, it contains the error message from the backend
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return error.response; // Return the error message
      } else {
        throw error; // Throw the error if there's no specific error message from the backend
      }
    }
  }
  

  return (
    <Container maxWidth="md">
      <Notification notify={notify} setNotify={setNotify} />
     
      <Box display="flex" justifyContent="center">
        <Card
          sx={{
            marginTop: 15,
            marginBottom: 15,
            padding: 2,
            borderRadius: 2,
            boxShadow: "1px 4px 3px 1px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
            width: { xs: "90%", sm: "80%", md: "60%", lg: "50%" },
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              align="center"
              mt={1}
              style={{ color: "#005597", fontWeight: "bold" }}
            >
              Change Your Password
            </Typography>
            <Divider
              sx={{
                marginTop: 2,
                marginBottom: 2,
                backgroundColor: "#005597",
              }}
            />
            <Stack spacing={2} mt={5} mx="auto">
             
            {!isForgotPassword && ( 
              <TextField
                label="Current Password"
                variant="outlined"
                type="password"
                {...formik.getFieldProps("currentPassword")}
                error={
                  formik.touched.currentPassword &&
                  Boolean(formik.errors.currentPassword)
                }
                helperText={
                  formik.touched.currentPassword &&
                  formik.errors.currentPassword
                }
              />
            )}
             {isForgotPassword && ( // Conditionally render verification code field
                <TextField
                  label="Verification Code"
                  variant="outlined"
                  type="text"
                  {...formik.getFieldProps("verificationCode")}
                  error={
                    formik.touched.verificationCode &&
                    Boolean(formik.errors.verificationCode)
                  }
                  helperText={
                    formik.touched.verificationCode &&
                    formik.errors.verificationCode
                  }
                />
              )}
              <TextField
                label="New Password"
                variant="outlined"
                type="password"
                {...formik.getFieldProps("newPassword")}
                error={
                  formik.touched.newPassword &&
                  Boolean(formik.errors.newPassword)
                }
                helperText={
                  formik.touched.newPassword && formik.errors.newPassword
                }
              />
              <TextField
                label="Confirm Password"
                variant="outlined"
                type="password"
                {...formik.getFieldProps("confirmPassword")}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />
            </Stack>

            <Stack direction="row" justifyContent="center" mt={4}>
            <Button
            variant="bg-danger"
            type="submit"
            className="header-btn register browse-btn signin-btn"
            onClick={formik.handleSubmit}
          >
            Submit
          </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ChangePassword;
