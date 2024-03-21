import React from "react";
import "../../styles/tutorials.css";
import "../../styles/home.css";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "react-bootstrap";
import html from "../../images/html.png";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "10px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  borderRadius: "10px",
  border: "1px solid var(--gray)",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "18ch",
      "&:focus": {
        width: "28ch",
      },
    },
  },
}));

export default function Tutorials() {
  return (
    <div className="mb-5">
      <div className="main-top">
        <div className="tutContainer">
          <div className="home-main container pageMain">
            <div className="topic topic-main pageTopic">
              Start Learning with Tutorials
            </div>
            <div>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search Tutorials"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </div>
            <div className="mt-5 mb-3 pageBtnGroup">
              <Button
                variant="outline-light"
                href="#"
                className="header-btn login reg-company-btn learn-more pageBtn"
              >
                All Languages
              </Button>
              <Button
                variant="outline-light"
                href="#"
                className="header-btn login reg-company-btn learn-more pageBtn"
              >
                Data Science
              </Button>
              <Button
                variant="outline-light"
                href="#"
                className="header-btn login reg-company-btn learn-more pageBtn"
              >
                Web Developmenet
              </Button>
              <Button
                variant="outline-light"
                href="#"
                className="header-btn login reg-company-btn learn-more pageBtn"
              >
                Machine Learning
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* BODY */}
      <div className="topic topic-intro pageIntro">
        SUGGESTED BASED ON YOUR LEARNING
      </div>
      <div className="cardList">
        <div className="pageCard anim">
          <img src={html} alt="Tutorial" className="tutLogo" />
          <div className="rightCard">
            <p className="cardTopic">HTML Course for Beginners</p>
            <p className="cardDesc">
              HTML Fundamentals: A Beginner's Guide to Web Development.
              Throughout this course, we'll start from the very basics, assuming
              no prior knowledge of HTML or coding.
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
                  View Tutorial
                </Button>
              </div>
            </Stack>
          </div>
        </div>
      </div>
      <div className="topic topic-intro pageIntro">MORE TURORIALS</div>
      <div className="pageCard anim">
        <img src={html} alt="Tutorial" className="tutLogo" />
        <div className="rightCard">
          <p className="cardTopic">HTML Course for Beginners</p>
          <p className="cardDesc">
            HTML Fundamentals: A Beginner's Guide to Web Development. Throughout
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
                View Tutorial
              </Button>
            </div>
          </Stack>
        </div>
      </div>{" "}
      <div className="pageCard anim">
        <img src={html} alt="Tutorial" className="tutLogo" />
        <div className="rightCard">
          <p className="cardTopic">HTML Course for Beginners</p>
          <p className="cardDesc">
            HTML Fundamentals: A Beginner's Guide to Web Development. Throughout
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
                View Tutorial
              </Button>
            </div>
          </Stack>
        </div>
      </div>
    </div>
  );
}
