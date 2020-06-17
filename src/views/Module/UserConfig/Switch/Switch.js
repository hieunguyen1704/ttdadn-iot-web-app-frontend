import React, { useEffect, useRef} from "react";
import { withStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Axios from "axios";
import { config } from "../../../../config";
import "./Switch.scss";
const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#52d869",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff",
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
    transition: theme.transitions.create(["background-color", "border"]),
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
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
export default function CustomizedSwitches(props) {
  const [state, setState] = React.useState("");
  const [isDone, setIsDone] = React.useState(true);
  const prevState = usePrevious(state);

  const handleChange = (event) => {
    setState(event.target.checked);
  };
  useEffect(() => {
    let motorUrl = config.dbURl + config.api.motorState;
    Axios.get(motorUrl)
      .then((response) => {
        setState(response.data.data);
        // console.log(prevState);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);
  useEffect(() => {
    if (state !== "") {
      let publishValue = state ? 1 : 0;
      let publishUrl = config.dbURl + config.api.publish + publishValue;
      setIsDone(false);
      console.log(publishUrl);
      Axios.get(publishUrl)
        .then((response) => {
          console.log(response.data.data);
          if (props.isTurn !== response.data.data) {
            props.turnOn(response.data.data);
          }
          console.log("Previous State: " ,prevState);
          // if first time publish do not need to set time out
          if(prevState === "" || prevState === state){
            setIsDone(true);
          }else{
            setTimeout(() => {
              setIsDone(true);
            }, 5500);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [state]);

  return (
    <FormGroup>
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Off</Grid>
          <Grid item>
            <IOSSwitch
              checked={state}
              onChange={handleChange}
              name="state"
              disabled={!isDone}
              className={isDone ? "" : "disabled"}
            />
          </Grid>
          <Grid item>On</Grid>
        </Grid>
      </Typography>
    </FormGroup>
  );
}
