import React, { useEffect } from "react";
import { Container, Box, Typography, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MyListImage from "../../images/mylist_image.svg";
import NotebookImage from "../../images/notebook_image.svg";
import ProfileImage from "../../images/profile_image.svg";
import { securityMiddleware } from "../../middleware/securityMiddleware";

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = (route) => {
    navigate(route);
  };

  useEffect(() => {
    const isAuthUser = securityMiddleware();
    if (!isAuthUser) {
      navigate("/login");
      return;
    }
  }, [navigate]);

  return (
    <Container maxWidth="md">
      <Container style={{ height: "8rem" }} />
      <Box bgcolor="white" mb={10} boxShadow={4} p={3} borderRadius={4}>
        <Typography variant="h4" gutterBottom color={"#005597"}></Typography>
        <Container sx={{ marginBottom: "1rem" }}>
          <CardContent>
            <Typography
              sx={{ textAlign: "center" }}
              variant="h6"
              component="div"
              color={"#005597"}
            >
              WELCOME ! {/* Replace "User" with the actual user's name */}
            </Typography>
            {/* Row with three cards */}
            <Box display="flex" justifyContent="space-between" mt={3} gap={2}>
              {/* Card 1 */}

              {/* Card 2 */}
              <Card
                sx={{
                  flex: 1,
                  cursor: "pointer",
                  "&:hover": {
                    boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.5)", // Hover effect
                  },
                }}
                onClick={() => handleCardClick("/note")}
                elevation={4}
              >
                <img
                  src={NotebookImage} // Replace with actual image source
                  style={{ height: 150, width: "100%" }}
                  alt="Notebook"
                />
                {/* Label */}
                <Typography variant="subtitle1" align="center">
                  Notebook
                </Typography>
              </Card>
              {/* Card 3 */}
              <Card
                sx={{
                  flex: 1,
                  cursor: "pointer",
                  "&:hover": {
                    boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.5)", // Hover effect
                  },
                }}
                onClick={() => handleCardClick("/profile")}
                elevation={4}
              >
                <img
                  src={ProfileImage} // Replace with actual image source
                  style={{ height: 150, width: "100%" }}
                  alt="Profile"
                />
                {/* Label */}
                <Typography variant="subtitle1" align="center">
                  Profile
                </Typography>
              </Card>
            </Box>
          </CardContent>
        </Container>
      </Box>
    </Container>
  );
};

export default UserDashboard;
