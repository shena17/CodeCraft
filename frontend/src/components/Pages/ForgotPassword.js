import React, { useState } from "react";
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
import PopupNotification from '../DispayComponents/PopupNotification';
import { faEnvelope,faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {
  const [notify, setNotify] = useState({
    isOpen: false,
    topic:"Check Your Email",
    message: "Check Your Email",
    icon: faEnvelope,
    iconColor: "#005597",
    isSuccess : false
  });

  const handleClose = () => {
    setNotify({
      ...notify,
      isOpen: false
    });

    if(notify.isSuccess){
      handleChangePassword();
    }
  };
  const navigate = useNavigate();

  const handleChangePassword = () => {
    navigate("/changePassword", { state: { isForgotPassword: true,email:formik.values.email } });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await sendPasswordVerificationMail(values.email);
        // Here you can implement the logic to send a reset password link to the provided email
        setNotify({
          ...notify,
          topic: response.status === 200 ? "Check Your Email" : "Error",
          message: response.status === 200 ? "Your request has been received. We've sent an email to your registered address with a verification code to change your password." : "Failed to send verification mail. Please try again later.",
          icon: response.status === 200 ? faEnvelope : faExclamationCircle,
          iconColor: response.status === 200 ? "#005597" : "red",
          isOpen: true,
          isSuccess: response.status === 200 ? true : false
        });
      } catch (error) {
        console.error("Error sending verification code:", error);
        setNotify({
          ...notify,
          topic: "Error",
          message: error.message,
          icon: faExclamationCircle,
          iconColor: "red",
          isOpen: true,
          
        });
      }
    },
    
  });


  const sendPasswordVerificationMail = async (email) => {
    try {
      // Make a POST request to the backend endpoint
      const response = await axios.post('http://localhost:8071/verification/send', { email });
  
      // Handle success response
      console.log('Message sent:', response.data.message);
      return response;
    } catch (error) {
      // Handle error response
      console.error('Error sending verification mail:', error.response.data.error);
      throw new Error( error.response.data.error);
    }
  };

  return (
    <Container maxWidth="md">
      <PopupNotification
        isOpen={notify.isOpen}
        onClose={handleClose}
        iconName={notify.icon}
        topic={notify.topic}
        text={notify.message}
        iconColor={notify.iconColor}
      />
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
              Forgot Password
            </Typography>
            <Divider
              sx={{
                marginTop: 2,
                marginBottom: 2,
                backgroundColor: "#005597",
              }}
            />
            <Stack spacing={2} mt={5} mx="auto">
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                {...formik.getFieldProps("email")}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
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

export default ForgotPassword;
