import React from "react";
import "../../styles/tutorials.css";
import "../../styles/home.css";
import "../../styles/tags.css";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "react-bootstrap";
import html from "../../images/html.png";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import c from "../../images/c.svg";
import cpp from "../../images/c++.svg";
import csharp from "../../images/csharp.svg";
import java from "../../images/java.svg";
import php from "../../images/php.svg";
import python from "../../images/python.svg";
import html5 from "../../images/html5.png";
import css from "../../images/css.png";
import javascript from "../../images/javascript.png";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

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

export default function Tags() {
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
            <div className="topic topic-main pageTopic">#Browse Tags</div>
            <div>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search for Hashtags"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </div>
          </div>
        </div>
      </div>
      {/* BODY */}
      <div className="topic topic-intro pageIntro">PROGRAMMING LANGUAGES</div>
      <div className="langList ">
        <Box
          sx={{
            flexGrow: 1,
          }}
          className="container mt-4"
        >
          <Grid
            container
            spacing={3}
            sx={{
              flexGrow: 1,
              textAlign: "center",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Grid item xs={6} sm={4} md={2}>
              <div className="langAnim langBox">
                <img src={html5} alt="language" className="langIcon" />
                <p className="langName">HTML</p>
              </div>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <div className="langAnim langBox">
                <img src={css} alt="language" className="langIcon" />
                <p className="langName">CSS</p>
              </div>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <div className="langAnim langBox">
                <img src={javascript} alt="language" className="langIcon" />
                <p className="langName">JS</p>
              </div>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <div className="langAnim langBox">
                <img src={c} alt="language" className="langIcon" />
                <p className="langName">C</p>
              </div>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <div className="langAnim langBox">
                <img src={cpp} alt="language" className="langIcon" />
                <p className="langName">C++</p>
              </div>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <div className="langAnim langBox">
                <img src={csharp} alt="language" className="langIcon" />
                <p className="langName">C#</p>
              </div>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <div className="langAnim langBox">
                <img src={java} alt="language" className="langIcon" />
                <p className="langName">Java</p>
              </div>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <div className="langAnim langBox">
                <img src={php} alt="language" className="langIcon" />
                <p className="langName">PHP</p>
              </div>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <div className="langAnim langBox">
                <img src={python} alt="language" className="langIcon" />
                <p className="langName">Python</p>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>

      <div className="topic topic-intro pageIntro">OTHER TAGS</div>
      <div className="tagDiv container mt-4">
        {Array.from(Array(6)).map((_, index) => (
          <div className="tagList">
            <Chip
              label="Web Development"
              component="a"
              href="/viewTag"
              variant="outlined"
              clickable
              sx={{
                padding: "5px",
                color: "var(--pink)",
                borderColor: "var(--pink)",
              }}
              className="anim mb-3"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
