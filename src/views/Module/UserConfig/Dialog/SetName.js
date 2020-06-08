import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Axios from "axios";
import {config} from "../../../../config"
export default function FormDialog(props) {
  const [open, setOpen] = React.useState(true);
  const [name, setName] = React.useState("");
  const handleChange = (event) =>{
    setName(event.target.value);
  }

  const handleClose = () => {
    // props.canceled();
    //set default name and submit data
    const newSendData = props.sendData;
    newSendData.name = "default";
    const createConfigURL = config.dbURl + config.api.getConfig;
      Axios.post(createConfigURL, newSendData)
      .then((response) => {
        if (response.data.data === "successful") {
          setOpen(false);
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleSetName = () => {
    // props.accepted(name);
    //set name and submit data
    const newSendData =  props.sendData;
    newSendData.name = name;
    const createConfigURL = config.dbURl + config.api.getConfig;
      Axios.post(createConfigURL, newSendData)
      .then((response) => {
        if (response.data.data === "successful") {
          setOpen(false);
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Set Config Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
                You can set the name to your config otherwise the system will use the default name.
          </DialogContentText>
          <TextField
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            margin="dense"
            id="name"
            label="Config Name"
            type="text"
            fullWidth
            onChange={handleChange}
            value = {name}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Use default name
          </Button>
          <Button onClick={handleSetName} color="primary">
            Choose this name
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}