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

export default function ControlledOpenSelect() {
  const classes = useStyles();
  const [mode, setMode] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setMode(event.target.value);
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
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"min"}>Minute</MenuItem>
          <MenuItem value={"hour"}>Hour</MenuItem>
          <MenuItem value={"day"}>Day</MenuItem>
          <MenuItem value={"month"}>Month</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
