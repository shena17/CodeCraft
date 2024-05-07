import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import axios from "axios";
import { securityMiddleware } from "../../middleware/securityMiddleware";
import Notification from "../DispayComponents/Notification";

export default function Profile() {
  const [values, setValues] = useState({});
  const navigate = useNavigate();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const updateValue = (key, value) => {
    setValues((prevValues) => {
      if (value === null || value.length === 0 || value === "") {
        const updatedValues = { ...prevValues };
        delete updatedValues[key];
        return updatedValues;
      } else {
        return { ...prevValues, [key]: value };
      }
    });
  };
  useEffect(() => {
    const isAuthUser = securityMiddleware();
    if (!isAuthUser) {
      navigate("/login");
      return;
    }
  }, [navigate]);

  // Mock handle functions
  const handleChangePassword = () => {
    navigate("/changePassword", { state: { isForgotPassword: false } });
  };

  const handleUpdateAccount = () => {
    navigate("/updateAccount");
  };

  const handleDeleteAccount = async () => {
    const response = await deleteUser();
    setNotify({
      isOpen: true,
      message: response.data.message,
      type: response.status === 200 ? "success" : "error",
    });

    if (response.status === 200) {
      window.localStorage.removeItem("LoggedIn");
      window.localStorage.removeItem("token");
      window.location.reload();
    }
  };

  const deleteUser = async () => {
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

      // Make a DELETE request
      const response = await axios.delete(
        "http://localhost:8071/user/deleteUser",
        config
      );

      return response;
    } catch (error) {
      return error.response;
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await getUser();
        // Update user information using real data
        const name = `${userData.firstName} ${userData.lastName}`;
        const date = new Date(userData.dob);
        const formattedDate = date.toISOString().split("T")[0];
        updateValue("name", name);
        updateValue("country", userData.country);
        updateValue("dateOfBirth", formattedDate);
        updateValue("email", userData.email);
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
    <Box display="flex" justifyContent="center">
      <Notification notify={notify} setNotify={setNotify} />
      <Card
        sx={{
          marginTop: 15,
          marginBottom: 15,
          maxWidth: { xs: "90%", sm: "80%", md: "60%", lg: "50%" },
          borderRadius: 2,
          boxShadow: "1px 4px 3px 1px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
        }}
      >
        <CardContent>
          <Avatar
            alt="Profile Picture"
            src="./person-circle.svg"
            sx={{ width: 100, height: 100, margin: "auto" }}
          />
          <Typography
            variant="h5"
            component="div"
            align="center"
            mt={2}
            style={{ color: "#005597" }}
          >
            {values.name}
          </Typography>
          <Divider
            sx={{ marginTop: 2, marginBottom: 2, backgroundColor: "#005597" }}
          />{" "}
          {/* Separator line */}
          <Stack spacing={1} mx={2} mt={3}>
            <Stack direction="row" spacing={1}>
              <Typography
                style={{ flex: 1, fontWeight: "bold", color: "#002b6b" }} // Darker shade of blue
                variant="body1"
              >
                <span style={{ fontWeight: "bold", color: "#002b6b" }}>
                  Country:
                </span>
              </Typography>
              <Typography
                style={{ flex: 2, fontWeight: "bold", color: "#002b6b" }} // Darker shade of blue
                variant="body1"
              >
                {values.country}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Typography
                style={{ flex: 1, fontWeight: "bold", color: "#002b6b" }} // Darker shade of blue
                variant="body1"
              >
                <span style={{ fontWeight: "bold", color: "#002b6b" }}>
                  Date of Birth:
                </span>
              </Typography>
              <Typography
                style={{ flex: 2, fontWeight: "bold", color: "#002b6b" }} // Darker shade of blue
                variant="body1"
              >
                {values.dateOfBirth}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Typography
                style={{ flex: 1, fontWeight: "bold", color: "#002b6b" }} // Darker shade of blue
                variant="body1"
              >
                <span style={{ fontWeight: "bold", color: "#002b6b" }}>
                  Email:
                </span>
              </Typography>
              <Typography
                style={{ flex: 2, fontWeight: "bold", color: "#002b6b" }} // Darker shade of blue
                variant="body1"
              >
                {values.email}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="center" mt={4} spacing={2}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#6F4FFA",
                "&:hover": {
                  backgroundColor: "#8D75FC",
                },
                borderRadius: "1rem",
                fontSize: "0.6rem",
                height: "3rem",
                width: "15rem",
              }}
              onClick={handleChangePassword}
            >
              Change Password
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "#6F4FFA",
                "&:hover": {
                  backgroundColor: "#8D75FC",
                },
                borderRadius: "1rem",
                fontSize: "0.6rem",
                height: "3rem",
                width: "15rem",
              }}
              onClick={handleUpdateAccount}
            >
              Update Account
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{
                borderRadius: "1rem",
                fontSize: "0.6rem",
                height: "3rem",
                width: "15rem",
              }}
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
