import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Download from "@mui/icons-material/Download";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Notification from "../DispayComponents/Notification";
import { useNavigate } from "react-router-dom";
import { securityMiddleware } from '../../middleware/securityMiddleware';
import jsPDF from "jspdf";
import { Input } from "@mui/base";
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons';
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

const NoteCard = ({ note, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTopic, setUpdatedTopic] = useState(note.topic);
  const [updatedDescription, setUpdatedDescription] = useState(
    note.description
  );

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setUpdatedTopic(note.topic);
    setUpdatedDescription(note.description);
  };

  const handleSaveEdit = async () => {
    const response = await onEdit(note, updatedTopic, updatedDescription);
    if (response === true) {
      setIsEditing(false);  
    }
  };

  const handleDelete = async () => {
    onDelete(note);
  };


  const handleDownloadPDF = () => {
    const doc = new jsPDF();
  
    // Set initial y position for the table
    let yPos = 20;

 
  
    // Header row
    doc.setFillColor(33, 150, 243); // Blue background color
    doc.setTextColor(0, 0, 0); // Black font color
    doc.rect(10, yPos, 90, 10, 'F'); // Topic title rectangle
    doc.rect(100, yPos, 90, 10, 'F'); // Description title rectangle
    doc.setFont('helvetica', 'bold');
    doc.text("Topic", 15, yPos + 8); // Topic title
    doc.text("Description", 105, yPos + 8); // Description title
    yPos += 10;
  
    // Body rows
   
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0); // Black text color
      doc.setFillColor(255, 255, 255); // White background color
      doc.rect(10, yPos, 90, 10, 'F'); // Topic cell rectangle
      doc.rect(100, yPos, 90, 10, 'F'); // Description cell rectangle
      doc.text(note.topic, 15, yPos + 8); // Topic cell text
      
       // Split the description into lines to fit in the cell
    const descriptionLines = doc.splitTextToSize(note.description, 80);

    const descriptionCellHeight = descriptionLines.length * 7; // Assuming each line height is 7

    descriptionLines.forEach((line, index) => {
      const padding = 3; // Padding from the top of the cell
      const lineHeight = 7; // Line height
      const lineYPos = yPos + 8 + padding + (lineHeight * index);
      doc.text(line, 105, lineYPos);
    });

    yPos += descriptionCellHeight > 10 ? descriptionCellHeight : 10;
    
    ;
  
    doc.save("notes.pdf");
  };
  

  return (
    <Card sx={{ marginBottom: '1rem' }} >
      <CardContent>
        {isEditing ? (
          <>
            <TextField
              label="Topic"
              value={updatedTopic}
              onChange={(e) => setUpdatedTopic(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
            <Box display="flex" justifyContent="center">
              <Button onClick={handleSaveEdit} color="primary">
                Save
              </Button>
              <Button onClick={handleCancelEdit}>Cancel</Button>
            </Box>
          </>
        ) : (
          <>
            <Typography variant="h6" component="div" color={"#005597"}>
              {note.topic}
            </Typography>
            <Typography variant="body2">{note.description}</Typography>
            <Box display="flex" justifyContent="flex-end" sx={{ gap: "1rem" }}>
              <IconButton
                sx={{
                  backgroundColor: "#6F4FFA",
                  "&:hover": {
                    backgroundColor: "#8D75FC",
                  },
                  borderRadius: "1rem",
                  fontSize: "0.6rem",
                }}
                onClick={handleEdit}
              >
                <EditIcon sx={{ color: "white" }} />
              </IconButton>
              <IconButton
                sx={{
                  backgroundColor: "#6F4FFA",
                  "&:hover": {
                    backgroundColor: "#B43535",
                  },
                  borderRadius: "1rem",
                  fontSize: "0.6rem",
                }}
                onClick={handleDownloadPDF}
              >
                <Download sx={{ color: "white" }} />
              </IconButton>
                
              <IconButton
                sx={{
                  backgroundColor: "#E44C4C",
                  "&:hover": {
                    backgroundColor: "#B43535",
                  },
                  borderRadius: "1rem",
                  fontSize: "0.6rem",
                }}
                onClick={handleDelete}
              >
                <DeleteIcon sx={{ color: "white" }} />
              </IconButton>


            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

const NoteForm = ({ onAddNote }) => {
  const formik = useFormik({
    initialValues: {
      topic: "",
      description: "",
    },
    validationSchema: Yup.object({
      topic: Yup.string().required("Topic is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const response = await onAddNote(values);
      if (response === true) {
        resetForm();
      }
    },
  });

  return (
    <Box display="flex" justifyContent="center" marginBottom={2}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Topic"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("topic")}
          error={formik.touched.topic && Boolean(formik.errors.topic)}
          helperText={formik.touched.topic && formik.errors.topic}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          {...formik.getFieldProps("description")}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#6F4FFA",
            "&:hover": {
              backgroundColor: "#8D75FC",
            },
            borderRadius: "1rem",
            fontSize: "0.6rem",
          }}
          startIcon={<AddIcon />}
        >
          Add Note
        </Button>
      </form>
    </Box>
  );
};

const Note = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [notes, setNotes] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    const isAuthUser = securityMiddleware();
    if (!isAuthUser) {
      navigate("/login");
      return;
    }
  }, [navigate]);


  useEffect(() => {
    async function fetchNotes() {
      try {
        const token = window.localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          "http://localhost:8071/note/all",
          config
        );
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    }
    fetchNotes();
  }, []);




  
  const handleNotification = (response) => {
    let messageType = "";
    if (response.status === 200) {
      messageType = "success";
    } else if (response.status === 400 || response.status === 404) {
      messageType = "error";
    } else {
      messageType = "info";
    }
    setNotify({
      isOpen: true,
      message: response.data.message,
      type: messageType,
    });
  };

  const handleRefreshNotes = async () => {
    try {
      const token = window.localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        "http://localhost:8071/note/all",
        config
      );
      setNotes(response.data);
    } catch (error) {
      console.error("Error refreshing notes:", error);
    }
  };

  const handleOnAddNote = async (values) => {
    try {
      const token = window.localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        "http://localhost:8071/note/create",
        {
          topic: values.topic,
          description: values.description,
        },
        config
      );

      handleRefreshNotes();
      handleNotification(response);
      return true;
    } catch (error) {
      console.error("Error creating note:", error);
      handleNotification(error.response);
      return false;
    }
  };

  const handleOnEditNote = async (note, updatedTopic, updatedDescription) => {
    try {
      const token = window.localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        `http://localhost:8071/note/update`,
        {
          id: note._id,
          topic: updatedTopic,
          description: updatedDescription,
        },
        config
      );
      handleRefreshNotes();
      handleNotification(response);
      return true;
    } catch (error) {
      console.error("Error updating note:", error);
      handleNotification(error.response);
      return false;
    }
  };

  const handleOnDeleteNote = async (note) => {
    try {
      const token = window.localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(
        `http://localhost:8071/note/delete/${note._id}`,
        config
      );
      handleRefreshNotes();
      handleNotification(response);
    } catch (error) {
      console.error("Error deleting note:", error);
      handleNotification(error.response);
    }
  };


  useEffect(() => {
    // Filter notes based on search term
    const filtered = notes.filter((note) =>
      note.topic.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [searchTerm, notes]);

  const handleSearch = (event) => {
    
    setSearchTerm(event.target.value);
  };

  

    

  return (
    <Container maxWidth="md">
      <Container style={{ height: "8rem" }} />
      <Box bgcolor="white" mb={10} boxShadow={4} p={3} borderRadius={4}>
        <Typography variant="h4" gutterBottom color={"#005597"}>
          My Notes
        </Typography>
        
        <Notification notify={notify} setNotify={setNotify} />
        <NoteForm onAddNote={handleOnAddNote} />
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search Notes"
            inputProps={{ "aria-label": "search" }}
            onChange={handleSearch}
          />
        </Search>
          
        <div style={{ marginTop: "20px" }}>
          {filteredNotes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            onEdit={handleOnEditNote}
            onDelete={handleOnDeleteNote}
          />
        ))}

      </div>
       
      </Box>
      
    </Container>

    
  );
};

export default Note;
