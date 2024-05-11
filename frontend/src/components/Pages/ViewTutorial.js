import React, { useState, useEffect } from "react";
import "../../styles/tutorials.css";
import "../../styles/home.css";
import { Button } from "react-bootstrap";
import html from "../../images/html.png";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import pdf from "../../images/pdf.png";
import axios from "axios";
import { useParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import TutorialLogo from "../ALA/TutorialLogo";

export default function ViewTutorial() {
  const [tutorials, setTutorials] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");

    function viewTag() {
      axios
        .get("http://localhost:8071/ala/viewTutorial/" + id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setTutorials(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    viewTag();
  }, [id]);

  return (
    <div className="mb-5">
      <div className="main-top">
        <div className="tutContainer">
          <div className="home-main container pageMain">
            <div
              className="tutTopBar container mt-5"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button
                variant="outline-light"
                onClick={() => window.history.back()}
                className="header-btn register viewTutBtn"
              >
                <ArrowBackIosNewIcon fontSize="small" className="me-1" />
                Back
              </Button>
            </div>
            {/* <img src={html} alt="Tutorial" className="viewTutLogo mt-5" /> */}
            <div className="mt-5 viewTutLogo">
              <TutorialLogo tags={tutorials.tags} />
            </div>
            <div className="topic topic-main pageTopic mb-0 mt-3">
              {tutorials.heading}
            </div>
            <Stack direction="row" spacing={2} className="mt-3">
              {tutorials &&
                tutorials.tags &&
                tutorials.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag.tag}
                    component="a"
                    href={"/viewTag/" + tag._id}
                    variant="outlined"
                    clickable
                    size="small"
                    sx={{
                      padding: "5px",
                      color: "var(--pink)",
                      borderColor: "var(--pink)",
                    }}
                  />
                ))}
            </Stack>
            <p className="cardDesc mt-4 viewTutDesc">{tutorials.description}</p>
          </div>
        </div>
      </div>
      {/* BODY */}
      <div className="topic topic-intro pageIntro mt-4">VIDEOS</div>
      <Box sx={{ flexGrow: 1 }} className="container mt-4">
        <Grid container spacing={5}>
          {tutorials &&
            tutorials.videos &&
            tutorials.videos.map((video, index) => (
              <Grid item xs={12} sm={12} md={6} key={index}>
                <div className="videoDiv">
                  <iframe
                    width="560"
                    height="315"
                    src={video}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
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
