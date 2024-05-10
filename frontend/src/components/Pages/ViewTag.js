import React, { useState, useEffect } from "react";
import "../../styles/tutorials.css";
import "../../styles/home.css";
import "../../styles/tags.css";
import { Button } from "react-bootstrap";
import html from "../../images/html.png";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import pdf from "../../images/pdf.png";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import axios from "axios";
import { useParams } from "react-router-dom";
import TutorialLogo from "../ALA/TutorialLogo";

export default function ViewTag() {
  const [tags, setTags] = useState([]);
  const [tutorials, setTutorials] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");

    function viewTag() {
      axios
        .get("http://localhost:8071/ala/viewTag/" + id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setTags(res.data.tag);
          setTutorials(res.data.tutorials);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    viewTag();
  }, [id]);

  return (
    <div className="mb-5 ">
      <div className="main-top ">
        <div className="tutContainer ">
          <div className="home-main container pageMain">
            <div className="tutTopBar container mt-5">
              <Button
                variant="outline-light"
                onClick={() => window.history.back()}
                className="header-btn register viewTutBtn"
              >
                <ArrowBackIosNewIcon fontSize="small" className="me-1" />
                Back
              </Button>
            </div>
            <div className="topic topic-main pageTopic">{tags.tag}</div>
          </div>
        </div>
      </div>
      {/* BODY */}
      <div className="topic topic-intro pageIntro">TUTORIALS</div>

      <div className="cardList">
        {tutorials.map((tut, index) => (
          <div className="pageCard anim" key={index}>
            <TutorialLogo tags={tut.tags} />
            <div className="rightCard">
              <p className="cardTopic">{tut.heading}</p>
              <p className="cardDesc">{tut.description}</p>
              <Stack direction="row" spacing={2}>
                {tut.tags &&
                  tut.tags.slice(0, 3).map((tag, index) => (
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
                <div className="cardBtnArea">
                  <Button
                    variant="outline-light"
                    href={"/viewTutorial/" + tut._id}
                    className="header-btn register viewTutBtn"
                  >
                    View Tutorial
                  </Button>
                </div>
              </Stack>
            </div>
          </div>
        ))}
      </div>

      <div className="topic topic-intro pageIntro">RESOURCES</div>
      <div className="topic topic-intro pageIntro mt-4">VIDEOS</div>
      <Box sx={{ flexGrow: 1 }} className="container mt-4">
        <Grid container spacing={5}>
          {Array.from(Array(4)).map((_, index) => (
            <Grid item xs={12} sm={12} md={6} key={index}>
              <div className=" videoDiv">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/qz0aGYrrlhU?si=LOH3xqW6x5iCi9_I"
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
