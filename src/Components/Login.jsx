import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { TextField } from "@mui/material";
import { apiUrl } from "../setup.js";
import { useOutletContext } from "react-router-dom";

export default function Login() {
  const [open, setOpen] = useState(false);
  const [resp, setResp] = useState(null);
  const [loggedIn, setLoggedIn] = useOutletContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const reqBody = {
      username: data.get("username"),
      password: data.get("password"),
    };

    const response = await fetch(apiUrl + "login/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(reqBody),
    });

    const respJson = await response.json();
    console.log(respJson);

    setOpen(true);
    setLoggedIn(respJson.status === "success");
    setResp(respJson);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const LoginAlert = React.forwardRef(({ resp }, ref) => {
    if (resp.status === "success") {
      return (
        <Alert severity="success" sx={{ width: "100%" }} ref={ref}>
          You have successfully logged in!
        </Alert>
      );
    } else if (resp.status === "fail") {
      return (
        <Alert severity="warning" sx={{ width: "100%" }} ref={ref}>
          Login failed: please check your username and password
        </Alert>
      );
    } else {
      return (
        <Alert severity="error" sx={{ width: "100%" }} ref={ref}>
          Login failed: server error
        </Alert>
      );
    }
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <LoginAlert resp={resp} />
        </Snackbar>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
