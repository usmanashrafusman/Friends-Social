import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRef } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./State/index";
import LoadingGif from "../Componenets/Images/giphy.gif";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="/">
        F R I E N D S
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

const theme = createTheme();

const Input = styled("input")({
  display: "none",
});

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { inputChangeSignup } = bindActionCreators(actionCreators, dispatch);
  const user = useSelector((state) => state.inputChange);
  const inputRef = useRef(null);
  const [loadingStatus, setLoadingStatus] = useState(false);

  const [obj, setObj] = useState({
    errorFirstName: false,
    errorLastName: false,
    errorGender: false,
    errorEmail: false,
    errorPass: false,
    text: " ",
  });

  const data = (id, subID, key, autoComp) => {
    if (obj[key]) {
      return (
        <TextField
          onChange={changeHandle}
          autoComplete={autoComp}
          name={id}
          required
          error
          fullWidth
          id={id}
          label={subID}
          autoFocus
          helperText={obj.text}
          type={id === "password" ? "password" : ""}
        />
      );
    } else {
      return (
        <TextField
          onChange={changeHandle}
          autoComplete={autoComp}
          name={id}
          required
          fullWidth
          id={id}
          label={subID}
          autoFocus
          helperText=" "
          type={id === "password" ? "password" : ""}
        />
      );
    }
  };

  const genderCol = () => {
    if (obj.errorGender) {
      return "red";
    } else {
      return "secondary";
    }
  };

  const changeHandle = (e) => {
    if (e.target.id === "") {
      inputChangeSignup("gender", e.target.value);
    } else {
      inputChangeSignup(e.target.id, e.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container id="main-form" component="main" maxWidth="xs">
          {loadingStatus && (
            <div className="loadingGif">
              <img src={LoadingGif} alt="loading" />
            </div>
          )}
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  {data(
                    "firstName",
                    "First Name",
                    "errorFirstName",
                    "given-name"
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  {data(
                    "lastName",
                    "Last Name",
                    "errorLastName",
                    "family-name"
                  )}
                </Grid>
                <Grid item xs={12}>
                  {data("email", "Email Address", "errorEmail", "email")}
                </Grid>
                <Grid item xs={12}>
                  {data("password", "Password", "errorPass", "new-password")}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Gender </FormLabel>
                    <RadioGroup
                      row
                      aria-label="gender"
                      id="gender"
                      onChange={changeHandle}
                      sx={{
                        color: genderCol(),
                      }}
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                    </RadioGroup>
                    <p className="error">
                      {obj.errorGender ? "Please Select Your Gender" : " "}
                    </p>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} className="upload">
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <label htmlFor="contained-button-file">
                      <Input
                        accept="image/*"
                        id="contained-button-file"
                        ref={inputRef}
                        multiple
                        type="file"
                        name="userPhoto"
                      />
                      <Button variant="contained" component="span">
                        Upload Photo
                      </Button>
                    </label>
                  </Stack>
                </Grid>
              </Grid>
              <Button
                onClick={() => {
                  dispatch(
                    actionCreators.signUpuser(
                      user,
                      navigate,
                      inputRef,
                      setObj,
                      setLoadingStatus
                    )
                  );
                }}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}
