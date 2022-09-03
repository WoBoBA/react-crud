//rfce
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Button, TextField, Typography, Grid } from "@mui/material";
import Navbar from "./Navbar";

function Profile() {
  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://www.mecallapi.com/api/auth/user", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "ok") {
          setUser(result.user);
          setIsLoaded(false);
        } else if (result.status === "forbidden") {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: "error",
          }).then((value) => {
            navigate("/login");
          });
        }
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  /* <div>
        <div>{user.fname}</div>
        <div>{user.lname}</div>
        <div>{user.username}</div>
        <div>{user.email}</div>
        <img src={user.avatar} alt={user.username} width={100} />
        <div>
          <button onClick={logout}>logout</button>
        </div>
      </div> */

  if (isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <React.Fragment>
        <Navbar />
        <CssBaseline />
        <Container maxWidth="sm" sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom component="div">
            Profile
          </Typography>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="fname"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  disabled
                  value={user.fname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="lname"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  disabled
                  value={user.lname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="username"
                  label="Username"
                  variant="outlined"
                  fullWidth
                  disabled
                  value={user.username}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="email"
                  label="E-Mail"
                  variant="outlined"
                  fullWidth
                  disabled
                  value={user.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="avatar"
                  label="Avatar"
                  variant="outlined"
                  fullWidth
                  disabled
                  value={user.avatar}
                />
              </Grid>
            </Grid>
          </form>
        </Container>
      </React.Fragment>
    );
  }
}

export default Profile;
