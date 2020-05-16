import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
export default function AlertDialog(props) {
  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = React.useState(true);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };
 
//   console.log(props);

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={props.opened}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        // onClose={true}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure to delete this config?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Once you delete, there is no way to restore it unless you create new one.
          And then, we will apply your last config become to current config.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.disagreed} color="primary">
            Disagree
          </Button>
          <Button onClick={props.agreed} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}