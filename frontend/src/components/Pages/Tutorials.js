import React, { useState, useEffect } from "react";
import "../../styles/tutorials.css";
import "../../styles/home.css";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "react-bootstrap";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import { Link } from "@mui/material";
import TutorialLogo from "../ALA/TutorialLogo";

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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "32ch",
      },
    },
  },
}));

export default function Tutorials() {
  const [tutorials, setTutorials] = useState([]);
  const [filteredTutorials, setFilteredTutorials] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearch, setIsSearch] = useState(false);
  const [suggested, setSuggested] = useState([]);
  const [suggestions, setSuggestions] = useState(false);
  const token = localStorage.getItem("token");
  const tutorialsPerPage = 6;

  // Function to handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Compact view by default, only show 2 tutorials
  const [compactView, setCompactView] = useState(true);

  // Toggle between compact and expanded view
  const toggleView = () => {
    setCompactView(!compactView);
  };

  const [clicked, setClicked] = useState(false);

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

  useEffect(() => {
    function getSuggested() {
      axios
        .get("http://localhost:8071/ala/getAla", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setSuggested(res.data);
          setSuggestions(true);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    getSuggested();
  }, []);

  // Function to filter tutorials based on search query
  const filterTutorials = () => {
    const filtered = tutorials.filter((tutorial) => {
      const headingMatch = tutorial.heading
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const descriptionMatch = tutorial.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const tagMatch = tutorial.tags.some((tag) =>
        tag.tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return headingMatch || descriptionMatch || tagMatch;
    });
    setFilteredTutorials(filtered);
  };

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchInputFocus = () => {
    setIsSearch(true);
  };

  // Function to handle search input blur
  const handleSearchInputBlur = () => {
    setIsSearch(false);
  };

  useEffect(() => {
    // Call filterTutorials function whenever the search query changes
    filterTutorials();
  }, [searchQuery, tutorials]);

  // Calculate the index range of tutorials to display based on the current page
  const indexOfLastTutorial = currentPage * tutorialsPerPage;
  const indexOfFirstTutorial = indexOfLastTutorial - tutorialsPerPage;
  const currentTutorials = filteredTutorials.slice(
    indexOfFirstTutorial,
    indexOfLastTutorial
  );

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
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onFocus={handleSearchInputFocus}
                  onBlur={handleSearchInputBlur}
                />
              </Search>
            </div>
          </div>
        </div>
      </div>

      {/* BODY */}

      {isSearch ? (
        <div className="cardList">
          <div className="topic topic-intro pageIntro">
            SEARCH FOR TUTORIALS
          </div>
          {currentTutorials.map((tut, index) => (
            <div className="pageCard anim">
              {/* <img src={html} alt="Tutorial" className="tutLogo" /> */}
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
      ) : (
        <>
          {" "}
          {suggestions ? (
            <>
              {" "}
              <div className="topic topic-intro pageIntro">
                SUGGESTED BASED ON YOUR LEARNING
              </div>
              <div className="cardList">
                {suggested.slice(0, compactView ? 2 : 5).map((tut, index) => (
                  <div className="pageCard anim">
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
              {suggested.length > 2 && (
                <div className="mt-3 text-center">
                  <Link
                    onClick={toggleView}
                    sx={{ cursor: "pointer", textDecoration: "none" }}
                  >
                    {compactView ? "See More" : "See Less"}
                  </Link>
                </div>
              )}
            </>
          ) : null}
          <div
            className="topic topic-intro pageIntro"
            style={{ marginTop: "80px" }}
          >
            MORE TUTORIALS
          </div>
          <div className="cardList">
            {currentTutorials.map((tut, index) => (
              <div className="pageCard anim">
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
        </>
      )}

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-5">
        <Pagination
          count={Math.ceil(filteredTutorials.length / tutorialsPerPage)}
          color="primary"
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}
