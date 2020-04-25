import React from "react";
import Button from "@material-ui/core/Button";
const ButtonArea = (props) => {

  return (
    <div className='flex-center'>
      <Button variant="contained" color="primary" type="submit" style={{marginRight: 20}}>
        Apply
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={props.reset}
        style={{marginLeft: 20}}
      >
        Reset
      </Button>
    </div>
  );
};
export default ButtonArea;
