import React from "react";
import "../../styles/tutorials.css";
import "../../styles/home.css";
import "../../styles/community.css";
import { Button } from "react-bootstrap";
import html from "../../images/html.png";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function CommunityForum() {
  return (
    <div className="mb-5">
      <div className="main-top">
        <div className="tutContainer">
          <div className="home-main container pageMain">
            <div className="tutTopBar container mt-5 askQuest">
              <Button
                variant="outline-light"
                onClick={() => window.history.back()}
                className="header-btn register viewTutBtn "
              >
                <ArrowBackIosNewIcon fontSize="small" className="me-1" />
                Back
              </Button>
              <Button
                variant="outline-light"
                onClick={() => window.history.back()}
                className="header-btn register viewTutBtn "
              >
                Ask a Question
              </Button>
            </div>
            <div className="topic topic-main pageTopic">All Questions</div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="topic topic-intro pageIntro mb-5">
        RECENTLY ASKED QUESTIONS
      </div>
      <div className="cardList">
        {Array.from(Array(6)).map((_, index) => (
          <div className="pageCard  questCard">
            <div className="rightCard anim innerCard">
              <div className="questTop mb-3">
                <p className="cardTopic">HTML Course for Beginners</p>
                <Chip
                  label="0 Answers"
                  component="a"
                  href="#basic-chip"
                  variant="outlined"
                  clickable
                  size="small"
                  sx={{
                    padding: "5px",
                    color: "var(--green)",
                    borderColor: "var(--green)",
                    marginLeft: "35px",
                  }}
                />
              </div>
              <p className="cardDesc">
                HTML Fundamentals: A Beginner's Guide to Web Development.
                Throughout this course, we'll start from the very basics,
                assuming no prior knowledge of HTML or coding. HTML
                Fundamentals: A Beginner's Guide to Web Development. Throughout
                this course, we'll start from the very basics, assuming no prior
                knowledge of HTML or coding.
              </p>
              <Stack direction="row" spacing={2}>
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
                <div className="cardBtnArea">
                  <Button
                    variant="outline-light"
                    href="/viewTutorial"
                    className="header-btn register viewTutBtn"
                  >
                    Answer
                  </Button>
                </div>
              </Stack>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
