import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import DateTextField from "../FormsUI/DateTextField";
import countries from "../../json/countries.json";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Notification from "../DispayComponents/Notification";
import { useNavigate } from "react-router-dom";
import { securityMiddleware } from '../../middleware/securityMiddleware';

const UpdateAccount = () => {
  const navigate = useNavigate();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    const isAuthUser = securityMiddleware();
    if (!isAuthUser) {
      navigate("/login");
      return;
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      country: "",
      dateOfBirth: "",
      email: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      country: Yup.string().required("Country is required"),
      dateOfBirth: Yup.date().required("Date of Birth is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await updateUser(values);
        setNotify({
          isOpen: true,
          message: response.data.message,
          type: response.status === 200 ? "success" : "error",
        });
      } catch (error) {
        console.error("Error updating account:", error);
      }
    },
  });

  // Function to update user information
  const updateUser = async (userData) => {
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
      const response = await axios.put(
        `http://localhost:8071/user/update`,
        {
          firstName: userData.firstName,
          lastName: userData.lastName,
          country: userData.country,
          dob: userData.dateOfBirth,
          email: userData.email,
        },
        config
      );

      return response; // Return the updated user data if successful
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
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await getUser();
        const date = new Date(userData.dob);
        const formattedDate = date.toISOString().split("T")[0];
        // Set user data to formik
        formik.setValues({
          firstName: userData.firstName,
          lastName: userData.lastName,
          country: userData.country,
          dateOfBirth: formattedDate,
          email: userData.email,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error if needed
      }
    }

    fetchData(); // Call the async function
  }, []);

  async function getUser() {
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

      const response = await axios.get(
        "http://localhost:8071/user/get",
        config
      );

      return response.data.user;
    } catch (error) {
      console.error(error);
      throw error;
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
            boxShadow: "1px 1px 2px 1px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#fff",
            width: { xs: "90%", sm: "80%", md: "60%", lg: "70%" },
          }}
        >
          <CardContent>
            <Avatar
              alt="Profile Picture"
              src="/path/to/profile-image.jpg"
              sx={{ width: 100, height: 100, margin: "auto" }}
            />
            <Divider
              sx={{
                marginTop: 2,
                marginBottom: 2,
                backgroundColor: "#3D0142",
              }}
            />
            <Stack spacing={2} mt={2}>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ marginTop: 8 }}
              >
                <TextField
                  label="First Name"
                  variant="outlined"
                  sx={{ flex: 1, height: 64 }} // Set a fixed height for the TextField
                  {...formik.getFieldProps("firstName")}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
                <TextField
                  label="Last Name"
                  variant="outlined"
                  sx={{ flex: 1, height: 64 }} // Set a fixed height for the TextField
                  {...formik.getFieldProps("lastName")}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Stack>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ marginTop: 8 }}
              >
                <Stack sx={{ flex: 1, height: 64 }}>
                  <Typography mb={1}>Country</Typography>
                  <TextField
                    select
                    variant="outlined"
                    {...formik.getFieldProps("country")}
                    error={
                      formik.touched.country && Boolean(formik.errors.country)
                    }
                    helperText={formik.touched.country && formik.errors.country}
                  >
                    {countries.map((country) => (
                      <MenuItem key={country.code} value={country.name}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
                <Stack sx={{ flex: 1, height: 64 }}>
                  <DateTextField
                    value={formik.values.dateOfBirth}
                    hint="Date of Birth"
                    onErrorChanged={(error) => console.log("Error:", error)}
                    onDateChanged={(date) =>
                      formik.setFieldValue("dateOfBirth", date)
                    }
                  />
                </Stack>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ marginTop: 8 }}
            >
              <TextField
                label="Email"
                variant="outlined"
                sx={{ flex: 1, height: 64 }} // Set a fixed height for the TextField
                {...formik.getFieldProps("email")}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Stack>

            <Stack direction="row" justifyContent="center" mt={4}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#6F4FFA",
                  "&:hover": {
                    backgroundColor: "#8D75FC",
                  },
                  borderRadius: "1rem",
                  fontSize: "0.8rem",
                  height: "3rem",
                  width: "100%",
                }}
                onClick={formik.handleSubmit}
              >
                Update
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default UpdateAccount;
