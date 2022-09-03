import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import { ButtonGroup } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Navbar from "./Navbar";

export default function Users() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const UserGet = () => {
    fetch("https://www.mecallapi.com/api/users")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  const UserUpdate = (id) => {
    window.location = "/update/" + id;
  };

  const UserDelete = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: id,
    });

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://www.mecallapi.com/api/users/delete", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        alert(result["message"]);
        if (result["status"] === "ok") {
          UserGet();
          localStorage.removeItem("token");
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    UserGet();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <React.Fragment>
        <Navbar />
        <CssBaseline />
        <Container maxWidth="lg" sx={{ p: 2 }}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" sx={{ p: 2 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Users
                </Typography>
              </Box>
              {/*              <Box>
                <Link href="/create">
                  <Button variant="contained">Create</Button>
                </Link>
              </Box> */}
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="center">Avatar</TableCell>
                    <TableCell align="center">First Name</TableCell>
                    <TableCell align="center">Last Name</TableCell>
                    <TableCell align="center">Username</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <TableRow
                      key={item.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {item.id}
                      </TableCell>
                      <TableCell align="center">
                        <Box display="flex" justifyContent="center">
                          <Avatar alt={item.username} src={item.avatar} />
                        </Box>
                      </TableCell>
                      <TableCell align="center">{item.fname}</TableCell>
                      <TableCell align="center">{item.lname}</TableCell>
                      <TableCell align="center">{item.username}</TableCell>
                      <TableCell align="right">
                        <ButtonGroup
                          variant="outlined"
                          aria-label="outlined button group"
                        >
                          <Button
                            onClick={() => UserUpdate(item.id)}
                            startIcon={<EditIcon />}
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => UserDelete(item.id)}
                            startIcon={<DeleteIcon />}
                          >
                            Delete
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </React.Fragment>
    );
  }
}
