import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "../../styles/dashboard.css";
import { styled, alpha } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: alpha(theme.palette.common.black, 0.1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: "300px",
  marginBottom: "20px",
  borderRadius: "10px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    maxWidth: "100%",
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
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function createData(id, name, date, time, paid) {
  return { id, name, date, time, paid };
}

const rows = [
  createData("2008", "Shenal de Silva", "2023/06/15", "20:00", "February"),
  createData("2555", "Sithum", "2023/06/15", "18:30", "January"),
  createData("2008", "Shenal de Silva", "2023/06/15", "20:00", "February"),
  createData("2555", "Sithum", "2023/06/15", "18:30", "January"),
  createData("2008", "Shenal de Silva", "2023/06/15", "20:00", "February"),
  createData("2555", "Sithum", "2023/06/15", "18:30", "January"),
  createData("2008", "Shenal de Silva", "2023/06/15", "20:00", "February"),
  createData("2555", "Sithum", "2023/06/15", "18:30", "January"),
  createData("2008", "Shenal de Silva", "2023/06/15", "20:00", "February"),
  createData("2555", "Sithum", "2023/06/15", "18:30", "January"),
  createData("2008", "Shenal de Silva", "2023/06/15", "20:00", "February"),
  createData("2555", "Sithum", "2023/06/15", "18:30", "January"),
  createData("2008", "Shenal de Silva", "2023/06/15", "20:00", "February"),
  createData("2555", "Sithum", "2023/06/15", "18:30", "January"),
  createData("2008", "Shenal de Silva", "2023/06/15", "20:00", "February"),
  createData("2555", "Sithum", "2023/06/15", "18:30", "January"),
  createData("2008", "Shenal de Silva", "2023/06/15", "20:00", "February"),
  createData("2555", "Sithum", "2023/06/15", "18:30", "January"),
  createData("2008", "Shenal de Silva", "2023/06/15", "20:00", "February"),
  createData("2555", "Sithum", "2023/06/15", "18:30", "January"),
];

// Styled table
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#dcdcdc",
    color: theme.palette.common.black,
    fontSize: "1rem",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function Home() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </div>
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          borderRadius: "10px",
          boxShadow: "0px 0px 15px lightgray",
        }}
      >
        <TableContainer sx={{ maxHeight: "75vh" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ paddingLeft: "25px" }}>
                  ID
                </StyledTableCell>
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">Attended Date</StyledTableCell>
                <StyledTableCell align="right">Attended Time</StyledTableCell>
                <StyledTableCell align="right">Paid Month</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:hover": { backgroundColor: "var(--tb-hover)" },
                      cursor: "pointer",
                    }}
                  >
                    <TableCell
                      className="tableText"
                      component="th"
                      scope="row"
                      sx={{ paddingLeft: "25px" }}
                    >
                      <p className="tableBody"> {row.id}</p>
                    </TableCell>
                    <TableCell
                      className="tableText"
                      style={{
                        paddingLeft: 0,
                        minWidth: "200px",
                      }}
                      align="right"
                    >
                      <p className="tableBody"> {row.name}</p>
                    </TableCell>
                    <TableCell className="tableText" align="right">
                      <p className="tableBody"> {row.date}</p>
                    </TableCell>
                    <TableCell className="tableText" align="right">
                      <p className="tableBody">{row.time} </p>
                    </TableCell>
                    <TableCell className="tableText" align="right">
                      <p className="tableBody">{row.paid} </p>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
