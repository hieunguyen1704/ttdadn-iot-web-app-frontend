import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
// import Box from '@material-ui/core/Box';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./action/auth";
import { Spin } from "antd";
import { navigate } from "@reach/router";
// import { config } from "../../../config";
// import { browserHistory } from 'react-router';
// import { RESET_ALERT } from './actionsType/actiontype'
import "./theme/LogIn.scss";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    // marginLeft: theme.spacing(70),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    // marginLeft: theme.spacing(70),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  actiondo: {
    // marginLeft: theme.spacing(60),
  },
}));

function SignIn() {
  const classes = useStyles();

  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();

  const alertState = useSelector((state) => state.alert);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  if (isAuthenticated) {
    navigate("data-info");
  }

  return (
    <Grid container spacing={3} className="flex-center">
      <Spin spinning={loading} tip="Loading...">
        <Container component="main" maxWidth="xs" md={6} xs={12}>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" align="center">
              Sign in
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={(e) => onSubmit(e)}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                onChange={(e) => onChange(e)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => onChange(e)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              {alertState.login && (
                <span
                  className="help-block"
                  style={{ color: "red", fontSize: 18 }}
                >
                  {alertState.login}
                </span>
              )}
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          {/* <Box mt={8}>
          <Copyright />
        </Box> */}
        </Container>
      </Spin>
    </Grid>
  );
}
export default SignIn;
