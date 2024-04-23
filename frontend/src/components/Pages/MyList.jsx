import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { securityMiddleware } from '../../middleware/securityMiddleware';

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
        <Typography variant="h4" gutterBottom color={"#005597"}>
          My List
        </Typography>
        {dataList.map((item) => (
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
