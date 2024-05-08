import React, { useState, useEffect } from "react";
import "../styles/login.css";
import logo from "../images/logo.png";
import Form from "react-bootstrap/Form";
import countries from "../json/countries.json";
import axios from "axios";
import { Grid } from "@mui/material";
import { useFormik, Formik, Field } from "formik";
import * as Yup from "yup";
import TextField from "./FormsUI/TextField";
import SelectField from "./FormsUI/SelectField";
import DatePicker from "./FormsUI/DatePicker";
import SubmitButton from "./FormsUI/SubmitButton";
import { useNavigate } from "react-router-dom";
import Notification from "./DispayComponents/Notification";

// FORMIK
const INITIAL_FORM_STATE = {
  firstName: "",
  lastName: "",
  country: "",
  dob: "",
  email: "",
  password: "",
  confirmpwd: "",
};

// YUP
const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string().required("Required!"),
  lastName: Yup.string().required("Required!"),
  country: Yup.string().required("Required!"),
  dob: Yup.date().required("Required!"),
  email: Yup.string().email().required("Required!"),
  password: Yup.string().required("Required!"),
  confirmpwd: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required!"),
});

export default function Register() {
  const navigate = useNavigate();

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  return (
    <div className="login-main">
      {/* NOTIFICATION */}
      <Notification notify={notify} setNotify={setNotify} />

      <div className="login-container container register-container">
        <a href="/" className="logo-div">
          <img
            src={logo}
            className="img-fluid footer-logo logo-login"
            alt="Logo"
          />
        </a>

        <div className="login-form">
          <div className="login-lead">Register to CodeCraft</div>

          <Formik
            initialValues={{ ...INITIAL_FORM_STATE }}
            validationSchema={FORM_VALIDATION}
            onSubmit={async (values) => {
              await axios
                .post("http://localhost:8071/user/register", {
                  firstName: values.firstName,
                  lastName: values.lastName,
                  country: values.country,
                  dob: values.dob,
                  email: values.email,
                  password: values.password,
                })
                .then((res) => {
                  setNotify({
                    isOpen: true,
                    message: "User added successfully",
                    type: "success",
                  });
                })
                .catch((err) => {
                  if (
                    err.response &&
                    err.response.data &&
                    err.response.data.errorMessage
                  ) {
                    setNotify({
                      isOpen: true,
                      message: err.response.data.errorMessage,
                      type: "error",
                    });
                  }
                });
            }}
          >
            <Grid container sx={{}} spacing={2}>
              {/* 1st row */}

              <Grid item xs={6}>
                <Form.Label>First Name</Form.Label>
                <TextField name="firstName" placeholder="Enter first name" />
              </Grid>
              <Grid item xs={6}>
                <Form.Label>Last Name</Form.Label>
                <TextField name="lastName" placeholder="Enter last name" />
              </Grid>

              {/* 2nd row */}

              <Grid item xs={6}>
                <Form.Label>Country</Form.Label>
                <SelectField
                  name="country"
                  options={Object.fromEntries(
                    countries.map((country) => [country.name, country.name])
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Form.Label>Date of Birth</Form.Label>
                <DatePicker name="dob" />
              </Grid>

              {/* 3rd row */}

              <Grid item xs={12}>
                <Form.Label>Email</Form.Label>
                <TextField name="email" placeholder="Enter email" />
              </Grid>

              {/* 4th row */}

              <Grid item xs={12}>
                <Form.Label>Create Password</Form.Label>
                <TextField
                  name="password"
                  type="password"
                  placeholder="Enter password"
                />
              </Grid>
              <Grid item xs={12}>
                <Form.Label>Confirm Password</Form.Label>
                <TextField
                  name="confirmpwd"
                  type="password"
                  placeholder="Re-enter your password"
                />
              </Grid>

              <Grid item xs={12}>
                <SubmitButton
                  variant="bg-danger"
                  type="submit"
                  className="header-btn register browse-btn signin-btn register-btn"
                  style={{ marginBottom: "30px" }}
                >
                  Register
                </SubmitButton>

                <div className="signup-div form-label">
                  Already have an account? <a href="/login">Sign In</a>
                </div>
              </Grid>
            </Grid>
          </Formik>
        </div>
      </div>
    </div>
  );
}

