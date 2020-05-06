import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
// import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux'
import { register } from './action/auth'
import { message, Spin } from 'antd';
import { RESET_ALERT } from './actionsType/actiontype';
import validateInput from './share/signup'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Register() {
    const classes = useStyles();

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    })
    const [errors, setErrors] = useState({})
    const [messageReturn, setMessageReturn] = useState('')
    // dispatch
    const dispatch = useDispatch()

    // selectState from reducer
    const alert = useSelector(state => state.alert)
    const loading = useSelector(state => state.auth.loading)

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const isValid = () => {
        const { errors, isValid } = validateInput(user);
        if (!isValid) {
            setErrors(errors)
        }
        return isValid;
    }

    useEffect(() => {
        if (alert.register) {
            if (alert.isSuccess) {
                setMessageReturn("Register Successfully");
            } else {
                setMessageReturn("Register Failed")
            }
        }
    }, [alert])

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(user)
        if (isValid()) {
            dispatch(register(user));
        }
    }


    return (
        <Spin spinning={loading} tip='Loading...'>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                </Typography>
                    <form className={classes.form} noValidate onSubmit={e => onSubmit(e)}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoFocus
                            onChange={e => onChange(e)}
                        />
                        {errors.username && <span className="help-block">{errors.username}</span>}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={e => onChange(e)}

                        />
                        {errors.email && <span className="help-block">{errors.username}</span>}

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
                        {errors.password && <span className="help-block">{errors.password}</span>}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password2"
                            label="Confirm Password"
                            type="password"
                            onChange={e => onChange(e)}
                        />
                        {errors.password2 && <span className="help-block">{errors.password2}</span>}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Register
                    </Button>
                        {messageReturn && <span className="help-block">{messageReturn}</span>}

                        <Grid item>
                            <Link href="/login" variant="body2">
                                {"Sign In"}
                            </Link>
                        </Grid>
                    </form>
                </div>
            </Container>
        </Spin>
    );
}