import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { securityMiddleware } from '../../middleware/securityMiddleware';
import axios from 'axios';
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const MyListCard = ({ note, onCodeButtonClick }) => {
  return (
    <Box sx={{ marginBottom: "1rem" }}>
      <Box bgcolor="white" boxShadow={4} p={3} borderRadius={4}>
        <Typography variant="h6" component="div" color={"#005597"}>
          {note[0].heading}
        </Typography>
        <Typography variant="body2">{note[0].description}</Typography>
        <Box display="flex" justifyContent="flex-end">
        <Button
            onClick={() => onCodeButtonClick(note)}
            sx={{
              backgroundColor: "#6F4FFA",
              "&:hover": {
                backgroundColor: "#8D75FC",
              },
              borderRadius: "1rem",
              fontSize: "0.6rem",
              color: "white"
            }}
          >
            View Tutorial
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

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

const MyList = () => {
  const [tutorialList, setTutorialList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthUser = securityMiddleware();
    if (!isAuthUser) {
      navigate("/login");
      return;
    }
    const token = window.localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios.get('http://localhost:8071/mylist/all', config)
      .then(response => {
        setTutorialList(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [navigate]); // Include navigate in the dependency array
  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCodeButtonClick = (item) => {
    // Emit the item data or perform any other action
    console.log(item[0]);
  };

  let filteredList = tutorialList;
  if (searchQuery) {
    filteredList = tutorialList.filter((item) => {
      const searchTerm = searchQuery.toLowerCase();
      return (
        (item[0].heading && item[0].heading.toLowerCase().includes(searchTerm)) ||
        (item[0].description && item[0].description.toLowerCase().includes(searchTerm))
      );
    });
  }

  return (
    <Container maxWidth="md">
      <Container style={{ height: "8rem" }} />
      <Box bgcolor="white" mb={10} boxShadow={4} p={3} borderRadius={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center" margin={3}>
          <Typography variant="h4" gutterBottom color={"#005597"}>
            My List
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Tutorials"
              inputProps={{ "aria-label": "search" }}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Search>
        </Box>
        {filteredList.map((item) => (
          <MyListCard
            key={item._id}
            note={item}
            onCodeButtonClick={handleCodeButtonClick}
          />
        ))}
      </Box>
    </Container>
  );
};

export default MyList;
