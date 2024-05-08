import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";

// Import images
import ourStoryImage from "../../images/story.jpg";
import ourMissionImage from "../../images/mission.jpg";
import logoImage from "../../images/logo.png";

const TypewriterText = ({ text }) => {
  const [animatedText, setAnimatedText] = useState(text[0] || ""); // Set initial value to the first character of text, or an empty string if text is empty

  useEffect(() => {
    let timer;
    let currentIndex = 1; // Start from the second character

    const typeAnimation = () => {
      if (currentIndex < text.length) {
        setAnimatedText((prevText) => prevText + text.charAt(currentIndex));
        currentIndex++;
        timer = setTimeout(typeAnimation, 50); // Adjust the typing speed here
      }
    };

    // Reset currentIndex when the text prop changes
    currentIndex = 1;

    typeAnimation();

    return () => clearTimeout(timer);
  }, [text]);

  return (
    <Typography variant="h4" align="center" color="primary" py={4} gutterBottom>
      {animatedText}
    </Typography>
  );
};

const AboutUs = () => {
  return (
    <Container maxWidth="md">
      <Box py={12} display="flex" flexDirection="column" alignItems="center">
        {/* Our Story Section */}
        <Box width="100%">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={4}
          >
            <img
              src={logoImage}
              alt="Logo"
              style={{ maxWidth: "50%", height: "auto" }}
            />
          </Box>
          <TypewriterText text="Discover Our Story and Mission" />
          <Typography variant="h4" align="center" color="primary" gutterBottom>
            Our Story
          </Typography>
          <Box display="flex" justifyContent="center" width="100%">
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} md={12}>
                <Card
                elevation={5}
                  sx={{
                    borderRadius:10,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    height: "100%",
                    minWidth: { xs: "350px", md: "450px" }, // Increased minimum width
                    width: "100%", // Set card width to 100%
                    transition: "transform 0.3s ease-in-out", // Animation for hover
                    "&:hover": { transform: "scale(1.02)" }, // Hover effect
                    // Ensure this style overrides any conflicting styles
                    "&.MuiCard-root": {
                      flexBasis: "auto !important", // Override potential flexbox issues
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      flex: 1,
                      bgcolor: "background.paper",
                      padding: "1.5rem",
                    }}
                  >
                    <Typography variant="body1" color="textPrimary">
                      To make coding accessible to all. Through dedication and
                      innovation, we created an educational coding environment
                      tailored for beginners. Our journey is one of empowerment,
                      as we strive to equip individuals with the skills they
                      need to succeed in an increasingly digital world. Join us
                      as we continue to shape the future, one
                      keystroke at a time.
                    </Typography>
                  </CardContent>
                  <CardMedia
                    component="img"
                    height="250"
                    image={ourStoryImage}
                    alt="Our Story"
                    sx={{
                      borderRadius: 10,
                      padding: 2,
                      flex: 1,
                      objectFit: "cover",
                      transition: "transform 0.8s ease-in-out", // Animation for hover
                      "&:hover": { transform: "scale(1.1)" }, // Hover effect
                      // Ensure this style overrides any conflicting styles
                      "&.MuiCard-root": {
                        flexBasis: "auto !important", // Override potential flexbox issues
                      },
                    }} // Crop image for focus
                  />
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* Our Mission Section */}
        <Box width="100%" mt={8}>
          <Typography variant="h4" align="center" color="primary" gutterBottom>
            Our Mission
          </Typography>
          <Box display="flex" justifyContent="center" width="100%">
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} md={12}>
                <Card
                elevation={5}
                
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignContent: "center",
                    borderRadius:10,
                    height: "100%",
                    width: "100%", // Set card width to 100%
                    transition: "transform 0.3s ease-in-out", // Animation for hover
                    "&:hover": { transform: "scale(1.02)" }, // Hover effect
                    "&.MuiCard-root": {
                      flexBasis: "auto !important", // Override potential flexbox issues
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="250"
                    image={ourMissionImage}
                    alt="Our Mission"
                    sx={{
                      flex: 1,
                      borderRadius: 10,
                      padding: 2,
                      objectFit: "cover",
                      transition: "transform 0.8s ease-in-out", // Animation for hover
                      "&:hover": {
                        transform: "scale(1.1)",
                      }, // Hover effect
                      // Ensure this style overrides any conflicting styles
                      "&.MuiCard-root": {
                        flexBasis: "auto !important", // Override potential flexbox issues
                      },
                    }}
                  />
                  <CardContent
                    sx={{
                      flex: 1,
                      bgcolor: "background.paper",
                      padding: "1.5rem",
                    }}
                  >
                    <Typography variant="body1" color="textPrimary">
                      Our mission is to provide a platform for individuals to
                      learn, practice, and master coding skills. We believe in
                      empowering aspiring coders and fostering a vibrant coding
                      community.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default AboutUs;
