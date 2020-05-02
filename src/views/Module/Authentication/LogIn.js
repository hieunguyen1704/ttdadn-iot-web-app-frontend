import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux'
import { login } from './action/auth'
import { message, Spin } from 'antd';
import { navigate } from "@reach/router";
import { config } from "../../../config";
import { browserHistory } from 'react-router';
import { RESET_ALERT } from './actionsType/actiontype'
function Copyright() {


  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    // marginLeft: theme.spacing(70),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    // marginLeft: theme.spacing(70),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  actiondo: {
    // marginLeft: theme.spacing(60),
  }
}));

function SignIn() {
  const classes = useStyles();

  const [formData, setFormData] = useState({})
  const userCurrent = useSelector(state => state.auth.user)

  const dispatch = useDispatch()

  const alertState = useSelector(state => state.alert)
  const authState = useSelector(state => state.auth)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const loading = useSelector(state => state.auth.loading);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    console.log("auth before login", isAuthenticated)
    dispatch(login(formData))
  }

  // useEffect(() => {
  //   dispatch({ type: RESET_ALERT })
  // }, [])
  useEffect(() => {
    console.log(isAuthenticated)
  }, [])

  // useEffect(() => {
  //   // alert(alertState)
  //   if (alertState.login) {
  //     alert(alertState.login);
  //   }
  // }, [alert])
  useEffect(() => {
    console.log(authState.user)
  }, [authState])
  if (isAuthenticated) {
    navigate("dashboard")
  }

  return (
    <Spin spinning={loading} tip='Loading...'>
      <Container component="main" maxWidth="xs" md={6} xs={12}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar} >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" align="center">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={(e) => onSubmit(e)} >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={e => onChange(e)}
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
              onChange={e => onChange(e)}
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
            {alertState.login && <span className="help-block">{alertState.login}</span>}
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
  );
}
export default SignIn;