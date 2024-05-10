import React, { useState, useEffect } from "react";
import "../../styles/tutorials.css";
import "../../styles/home.css";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "react-bootstrap";
import html from "../../images/html.png";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Notification from "../DispayComponents/Notification";

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
  const [tutorials, setTutorials] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const addToMyList = (tutorial) => {
    console.log(tutorial)
    const token = window.localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(
        "http://localhost:8071/mylist/create",
        {
          tutorialsRef: tutorial._id,
        },
        config
      )
      .then((res) => {
        setNotify({
          isOpen: true,
          message: "Tutorial added to your list successfully!",
          type: "success",
        });
        console.log(res.data);
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: err.response.data.message,
          type: "error",
        });
        console.error(err.response.data.message);
      });
  };

  useEffect(() => {
    function getTutorials() {
      axios
        .get("http://localhost:8071/ala/getTutorials")
        .then((res) => {
          setTutorials(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getTutorials();
  }, []);

  return (
    <div className="mb-5">
      <div className="main-top">
        <div className="tutContainer">
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
        {tutorials.map((tut, index) => (
          <div className="pageCard anim">
            <img src={html} alt="Tutorial" className="tutLogo" />
            <div className="rightCard">
              <p className="cardTopic">{tut.heading}</p>
              <p className="cardDesc">
                HTML Fundamentals: A Beginner's Guide to Web Development.
                Throughout this course, we'll start from the very basics,
                assuming no prior knowledge of HTML or coding.
              </p>
              <Stack direction="row" spacing={2}>
                {tut.tags &&
                  tut.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag.tagname}
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
                <Box sx={{ flexGrow: 1 }} />
                <Stack direction="row" alignItems="center">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      backgroundColor: "white",
                      border: "1px solid #7A288A",
                      "&:hover": {
                        // Add hover effect
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faHeart}
                      size="lg"
                      color="#7A288A"
                      cursor="pointer"
                      onClick={() => addToMyList(tut)}
                    />
                  </Box>
                  <Box sx={{ marginLeft: 2 }}>
                    <Button
                      variant="outline-light"
                      href={"/viewTutorial/" + tut._id}
                      className="header-btn register viewTutBtn"
                    >
                      View Tutorial
                    </Button>
                  </Box>
                </Stack>
              </Stack>
            </div>
          </div>
        ))}
      </div>

      <div
        className="topic topic-intro pageIntro"
        style={{ marginTop: "80px" }}
      >
        MORE TURORIALS
      </div>
      <div className="cardList">
        {tutorials.map((tut, index) => (
          <div className="pageCard anim">
            <img src={html} alt="Tutorial" className="tutLogo" />
            <div className="rightCard">
              <p className="cardTopic">{tut.heading}</p>
              <p className="cardDesc">
                HTML Fundamentals: A Beginner's Guide to Web Development.
                Throughout this course, we'll start from the very basics,
                assuming no prior knowledge of HTML or coding.
              </p>
              <Stack direction="row" spacing={2}>
                {tut.tags &&
                  tut.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag.tagname}
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
                <Box sx={{ flexGrow: 1 }} />
                <Stack direction="row" alignItems="center">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      backgroundColor: "white",
                      border: "1px solid #7A288A",
                      "&:hover": {
                        // Add hover effect
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faHeart}
                      size="lg"
                      color="#7A288A"
                      cursor="pointer"
                      onClick={() => addToMyList(tut)}
                    />
                  </Box>
                  <Box sx={{ marginLeft: 2 }}>
                    <Button
                      variant="outline-light"
                      href={"/viewTutorial/" + tut._id}
                      className="header-btn register viewTutBtn"
                    >
                      View Tutorial
                    </Button>
                  </Box>
                </Stack>
              </Stack>
            </div>
          </div>
        ))}
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
