import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     '& > * + *': {
//       marginTop: theme.spacing(2),
//     },
//   },
// }));

export default function ErrorAlert(props) {
  // const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="row justify-content-center" style={{ width: "80vw" }}>
      <div className="col-lg-6 col-md-8 col-xs-10 col-12">
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" variant="filled">
            {props.message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
