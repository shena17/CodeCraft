import React, { useState } from "react";
import "../styles/login.css";
import logo from "../images/logo.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import Notification from "./DispayComponents/Notification";
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  // VALIDATIONS
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      setValidated(true);
      try {
        await axios
          .post("http://localhost:8071/user/login", {
            email: formData.email,
            password: formData.password,
          })
          .then((res) => {
            window.localStorage.setItem("token", res.data);
            window.localStorage.setItem("LoggedIn", true);
            sessionStorage.setItem("showmsg", "1");
            const token = res.data;
            // Parse the token to access its properties
            const decodedToken = jwtDecode(token);
            // Check if the role is admin
            if (decodedToken.role === "admin") {
              // Navigate to admin home page
              navigate("/admin/home");
            } else {
              // Navigate to default page
              navigate("/");
            }
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
      } catch (err) {
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
      }
    }
  };

  return (
    <div className="login-main">
      {/* NOTIFICATION START*/}
      <Notification notify={notify} setNotify={setNotify} />
      {/* NOTIFICATION END*/}

      <div className="login-container container">
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
          <div className="login-lead">Login to CodeCraft</div>
          <Form.Group
            className="form-group"
            controlId="validationCustomUsername"
          >
            <Form.Label>Email</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="mail@example.com"
                aria-describedby="inputGroupPrepend"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email address.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group className="form-group" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password here"
                aria-describedby="inputGroupPrepend"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter the password.
              </Form.Control.Feedback>
            </InputGroup>
            <div className="forgot-pwd-div">
              <a href="/forgotpwd" className="form-label">
                Forgot password?
              </a>
            </div>
          </Form.Group>

          <Button
            variant="bg-danger"
            type="submit"
            className="header-btn register browse-btn signin-btn"
          >
            Sign in
          </Button>

          <div className="signup-div form-label">
            Don't have an account? <a href="/register">Sign up </a>
          </div>
        </Form>
      </div>
    </div>
  );
}
