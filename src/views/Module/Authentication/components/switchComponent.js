import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useDispatch, useSelector } from 'react-redux'
import { switchbutton } from '../action/auth';
const IOSSwitch = withStyles((theme) => ({
    root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: theme.spacing(1),
    },
    switchBase: {
        padding: 1,
        '&$checked': {
            transform: 'translateX(16px)',
            color: theme.palette.common.white,
            '& + $track': {
                backgroundColor: '#52d869',
                opacity: 1,
                border: 'none',
            },
        },
        '&$focusVisible $thumb': {
            color: '#52d869',
            border: '6px solid #fff',
        },
    },
    thumb: {
        width: 24,
        height: 24,
    },
    track: {
        borderRadius: 26 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: theme.palette.grey[50],
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
}))(({ classes, ...props }) => {
    return (
        <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
            }}
            {...props}
        />
    );
});



export default function CustomizedSwitches() {
    const [state, setState] = React.useState({
        checkedB: true,
    });
    const user = useSelector(state => state.auth.user)
    const [isAdmin, setisAdmin] = useState(false)
    const [isAuto, setisAuto] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        if (user) {
            setisAdmin(user.isAdmin);
            setisAuto(user.autoOfAdmin);
            // setState({ ...state, checkedB: isAuto });
        }
    }, [user])
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        // console.log("before dispatch");
        dispatch(switchbutton());
        // console.log(event.target.checked);
    };

    return (
        <FormGroup>

            <FormControlLabel
                control={<IOSSwitch checked={isAuto} onChange={handleChange} name="checkedB" />}
                label="Auto"
                disabled={!isAdmin}
            />
        </FormGroup>
    );
}
