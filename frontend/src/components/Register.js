import React, { useState, useEffect, useMemo } from "react";
import "../styles/login.css";
import logo from "../images/logo.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Row, Col } from "react-bootstrap";
import countries from "../json/countries.json";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

export default function Register() {
  //Validation
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const validateForm = () => {
    const { companyName, country, address, email, password, confirmPwd } = form;

    const newErrors = {};

    if (!companyName || companyName === "") {
      newErrors.companyName = "Enter your company name!";
    }

    if (!country || country === "") newErrors.country = "Choose a country!";

    if (!address || address === "") newErrors.address = "Enter the address!";

    if (!email || email === "") {
      newErrors.email = "Enter the email!";
    } else if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      newErrors.email = "Invalid email address";
    }

    // if (!username || username === "") {
    //   newErrors.username = "Create a username!";
    // } else if (username.length < 4 || username.length > 15) {
    //   newErrors.username = "Username should be of length 4 - 15 characters";
    // } else if (!username.match(/^[a-z0-9_\@\.]+$/)) {
    //   newErrors.username =
    //     "Usernames can only have lowercase letters, numbers, dots, @ & underscores";
    // }

    if (!password || password === "") {
      newErrors.password = "Create a password!";
    } else if (
      !password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/)
    ) {
      newErrors.password =
        "Password should contain at least one digit and one special character [7 - 15 characters]";
    }

    if (!confirmPwd || confirmPwd === "") {
      newErrors.confirmPwd = "Confirm your password";
    } else if (confirmPwd !== password) {
      newErrors.confirmPwd = "Password you entered does not match";
    }

    setValidated(true);
    return newErrors;
  };

  //Error state
  const [show, setShow] = useState(false);
  const [regError, setRegError] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setValidated(true);

      //SEND DATA TO FORM
      const { companyName, country, address, email, password } = form;

      const newCompany = {
        companyName,
        country,
        address,
        email,
        password,
      };

      axios
        .post("https://work-from-home-backend.onrender.com", newCompany)
        .then((res) => {
          window.location.href = "/login";
        })
        .catch((res) => {
          setShow(true);
          setRegError(res.data);
        });
    }
  };

  // placeholder

  const [selected, setSelected] = useState(false);

  return (
    <div className="login-main">
      <div className="login-container container register-container">
        <a href="/" className="logo-div">
          <img
            src={logo}
            className="img-fluid footer-logo logo-login"
            alt="Logo"
          />
        </a>

        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="login-form"
        >
          <div className="login-lead">Register your Company</div>

          {/* ERROR MSG */}
          {show ? (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
              <Alert.Heading>Registration Failed</Alert.Heading>
              <p className="mt-4">{regError}</p>
            </Alert>
          ) : (
            ""
          )}

          <Form.Group className="form-group" controlId="validationCustom01">
            <Form.Label>Company name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter company name"
              value={form.companyName}
              onChange={(e) => setField("companyName", e.target.value)}
              isInvalid={!!errors.companyName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.companyName}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Country */}

          <Row className="country-input">
            <Form.Group
              as={Col}
              className="form-group"
              controlId="validationCustom04"
            >
              <Form.Label>Country</Form.Label>

              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  setField("country", e.target.value);
                  setSelected(true);
                }}
                required
                isInvalid={!!errors.country}
                className={
                  selected ? "select-placeholder option " : "select-placeholder"
                }
              >
                <option key="blankChoice" hidden value="">
                  Select a country
                </option>

                {countries.map((country) => {
                  return (
                    <option key={country.code} value={country.name}>
                      {country.name}
                    </option>
                  );
                })}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.country}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              className="form-group"
              controlId="validationCustom05"
            >
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address"
                required
                value={form.address}
                onChange={(e) => setField("address", e.target.value)}
                isInvalid={!!errors.country}
              />
              <Form.Control.Feedback type="invalid">
                {errors.address}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Form.Group
            className="form-group"
            controlId="validationCustomUsername"
          >
            <Form.Label>Email</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="email"
                placeholder="mail@example.com"
                aria-describedby="inputGroupPrepend"
                required
                value={form.email}
                onChange={(e) => {
                  setField("email", e.target.value);
                }}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* <Form.Group className="form-group" controlId="validationCustom06">
            <Form.Label>Create Username</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="company@123"
              value={form.username}
              onChange={(e) => {
                setField("username", e.target.value);
              }}
              isInvalid={!!errors.username}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group> */}

          <Form.Group className="form-group" controlId="formBasicPassword">
            <Form.Label>Create Password</Form.Label>

            <Form.Control
              type="password"
              placeholder="Enter password here"
              aria-describedby="inputGroupPrepend"
              required
              value={form.password}
              onChange={(e) => setField("password", e.target.value)}
              isInvalid={!!errors.password}
            />

            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="form-group" controlId="formBasicPassword01">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm your password"
              aria-describedby="inputGroupPrepend"
              required
              value={form.confirmPwd}
              onChange={(e) => setField("confirmPwd", e.target.value)}
              isInvalid={!!errors.confirmPwd}
            />

            <Form.Control.Feedback type="invalid">
              {errors.confirmPwd}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            onClick={handleSubmit}
            variant="bg-danger"
            type="submit"
            className="header-btn register browse-btn signin-btn"
          >
            Register Company
          </Button>

          <div className="signup-div form-label">
            Already have an account? <a href="/login">Sign In</a>
          </div>
        </Form>
      </div>
    </div>
  );
}
