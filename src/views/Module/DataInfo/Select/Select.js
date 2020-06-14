import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
    minWidth: 150,
  },
}));

export default function ControlledOpenSelect(props) {
  const classes = useStyles();
  const [mode, setMode] = React.useState("10");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setMode(event.target.value);
    props.changed(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      <FormControl className={classes.formControl}>
        <InputLabel id="mode-select-label">Select Mode</InputLabel>
        <Select
          labelId="mode-select-label"
          id="mode-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={mode}
          onChange={handleChange}
        >
          <MenuItem value={"10"}>10 Min</MenuItem>
          <MenuItem value={"30"}>30 Min</MenuItem>
          <MenuItem value={"60"}>Hour</MenuItem>
          <MenuItem value={"300"}>5 Hour</MenuItem>
          <MenuItem value={"720"}>12 Hour</MenuItem>
          <MenuItem value={"1440"}>Day</MenuItem>
          <MenuItem value={"10080"}>Week</MenuItem>
          <MenuItem value={"302400"}>Month</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
