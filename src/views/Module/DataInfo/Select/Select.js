/* eslint-disable jsx-a11y/no-onchange */
import React from "react";
import './Select.scss';
// import { makeStyles } from "@material-ui/core/styles";
// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(3),
//     minWidth: 150,
//   },
// }));

export default function ControlledOpenSelect(props) {
  // const classes = useStyles();
  const [mode, setMode] = React.useState("5");
  // const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setMode(event.target.value);
    props.changed(event.target.value);
  };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  return (
    <div style={{ display: "flex", justifyContent: "center"}}>
      <form id="form">
        <div className="form-group">
          <label htmlFor="mode-select">Select Mode</label>
          <select
            onChange={handleChange}
            value={mode}
            className="form-control"
            id="mode-select"
          >
            <option value={"5"}>5 Min</option>
            <option value={"10"}>10 Min</option>
            <option value={"30"}>30 Min</option>
            <option value={"300"}>Hour</option>
            <option value={"720"}>12 Hour</option>
            <option value={"1440"}>Day</option>
            <option value={"10080"}>Week</option>
            <option value={"302400"}>Month</option>
          </select>
        </div>
      </form>
    </div>
  );
}
