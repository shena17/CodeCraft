import React from "react";
import "../../styles/tutorials.css";
import "../../styles/home.css";
import { Button } from "react-bootstrap";
import html from "../../images/html.png";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import pdf from "../../images/pdf.png";

export default function ViewTutorial() {
  return (
    <div className="mb-5">
      <div className="main-top">
        <div className="tutContainer">
          <div className="home-main container pageMain">
            <div className="tutTopBar container mt-4">
              <Button
                variant="outline-light"
                onClick={() => window.history.back()}
                className="header-btn register viewTutBtn"
              >
                <ArrowBackIosNewIcon fontSize="small" className="me-1" />
                Back
              </Button>
            </div>
            <img src={html} alt="Tutorial" className="viewTutLogo mt-4" />
            <div className="topic topic-main pageTopic mb-0 mt-3">
              HTML Course for Beginners
            </div>
            <Stack direction="row" spacing={2} className="mt-3">
              <Chip
                label="HTML"
                component="a"
                href="#basic-chip"
                variant="outlined"
                clickable
                size="small"
                sx={{
                  padding: "5px",
                  color: "var(--pink)",
                  borderColor: "var(--pink)",
                }}
              />
              <Chip
                label="Web Development"
                component="a"
                href="#basic-chip"
                variant="outlined"
                clickable
                size="small"
                sx={{
                  padding: "5px",
                  color: "var(--pink)",
                  borderColor: "var(--pink)",
                }}
              />
            </Stack>
            <p className="cardDesc mt-4 viewTutDesc">
              HTML Fundamentals: A Beginner's Guide to Web Development.
              Throughout this course, we'll start from the very basics, assuming
              no prior knowledge of HTML or coding.
            </p>
          </div>
        </div>
      </div>
      {/* BODY */}
      <div className="topic topic-intro pageIntro mt-4">VIDEOS</div>
      <Box sx={{ flexGrow: 1 }} className="container mt-4">
        <Grid container spacing={5}>
          {Array.from(Array(4)).map((_, index) => (
            <Grid item xs={12} sm={12} md={6} key={index}>
              <div className=" videoDiv">
                <iframe
                  width="480"
                  height="270"
                  src="https://www.youtube.com/embed/5EzBFudsqRY?si=hvsadwKXpVdSQyGg"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  className="anim"
                  style={{ borderRadius: "15px" }}
                ></iframe>
              </div>
            </Grid>
          ))}
        </Grid>
      </Box>

      <div className="topic topic-intro pageIntro mt-5">DOCUMENTS</div>
      <Box sx={{ flexGrow: 1 }} className="container mt-3">
        <Grid container spacing={5}>
          {Array.from(Array(4)).map((_, index) => (
            <Grid item xs={12} sm={12} md={6} key={index}>
              <div className="videoDiv">
                <div className="anim tutDoc">
                  <p className="cardTopic mb-0">HTML Course for Beginners</p>
                  <img src={pdf} alt="Tutorial" className="viewTutLogo mt-4" />
                  <div className="tutDocBtns mt-3">
                    <Button
                      variant="outline-light"
                      //   onClick={() => window.history.back()}
                      className="header-btn register viewTutBtn me-2 mx-2"
                    >
                      Download PDF
                    </Button>
                    <Button
                      variant="outline-light"
                      //   onClick={() => window.history.back()}
                      className="header-btn register viewTutBtn me-2 mx-2"
                    >
                      View PDF
                    </Button>
                  </div>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
