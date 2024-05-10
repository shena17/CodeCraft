import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { securityMiddleware } from '../../middleware/securityMiddleware';
import Tutorials from '../Pages/ViewTutorial';
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";



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
  width: "40%",
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


const MyListCard = ({ note, onCodeButtonClick }) => {
  return (
    <Box sx={{ marginBottom: "1rem" }}>
      <Box bgcolor="white" boxShadow={4} p={3} borderRadius={4}>
        <Typography variant="h6" component="div" color={"#005597"}>
          {note.topic}
        </Typography>
        <Typography variant="body2">{note.description}</Typography>
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

const MyList = () => {
  const [dataList, setDataList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthUser = securityMiddleware();
    if (!isAuthUser) {
      navigate("/login");
      return;
    }
    // Mock data generation
    const mockData = [
      {
        _id: 1,
        topic: "Topic 1",
        description: "Description 1",
      },
      {
        _id: 2,
        topic: "Topic 2",
        description: "Description 2",
      },
      {
        _id: 3,
        topic: "Topic 3",
        description: "Description 3",
      },
    ];
  
    setDataList(mockData);
  }, [navigate]); // Include navigate in the dependency array
  

  const handleCodeButtonClick = (item) => {
    // Emit the item data or perform any other action
    console.log(item);
  };

  return (
    <Container maxWidth="md">
      <Container style={{ height: "8rem" }} />
      <Box bgcolor="white" mb={10} boxShadow={4} p={3} borderRadius={4}>
            
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search Tutorials"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              

        <div style={{ marginTop: "20px" }}>

        {dataList.map((item) => (
          <MyListCard
            key={item._id}
            note={item}
            onCodeButtonClick={handleCodeButtonClick}
          />
        ))}

        </div>  
      </Box>
    </Container>
  );
};

export default MyList;
