import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function HistoryConfig(props) {
  const classes = useStyles();
  if (props.history.length > 0) {
    return (
      <Grid container spacing={3} className="flex-center">
        <Grid item md={10} xs={12}>
          <h1>History Config</h1>
        </Grid>
        <Grid item md={10} xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="History Config">
              <TableHead>
                <TableRow>
                  <Hidden mdDown>
                    <StyledTableCell>ID</StyledTableCell>
                  </Hidden>
                  <StyledTableCell align="right">
                    Temperature&nbsp;(°C)
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    Humidity&nbsp;(%)
                  </StyledTableCell>
                  <StyledTableCell align="right">Light</StyledTableCell>
                  <Hidden mdDown>
                    <StyledTableCell align="right">Time</StyledTableCell>
                  </Hidden>
                  <StyledTableCell align="right">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.history.map((el, index) => (
                  <StyledTableRow key={index}>
                    <Hidden mdDown>
                      <StyledTableCell component="th" scope="row">
                        {index + 1}
                      </StyledTableCell>
                    </Hidden>

                    <StyledTableCell align="right">
                      {el.tempeThreshold}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {el.humidThreshold}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {el.lightThreshold}
                    </StyledTableCell>
                    <Hidden mdDown>
                      <StyledTableCell align="right">
                        {el.createdAt}
                      </StyledTableCell>
                    </Hidden>
                    <StyledTableCell align="right">
                      <IconButton
                        aria-label="delete"
                        style={{ color: "#d63031" }}
                        onClick= {()=>props.verifyDelete(index)}
                        // onClick={() => {
                            // if(props.deleting){
                            //   props.deleted(index)
                            // }
                            // return props.displayAlert
                            // if(window.confirm('Delete the this config?')){
                            //   props.deleted(index)
                            // }
                          //  }}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        aria-label="check"
                        style={{ color: "#27ae60" }}
                        onClick={() => props.checked(index)}
                      >
                        <CheckIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid container spacing={3} className="flex-center">
      <Grid item md={10} xs={12}>
        <h1>Please Choose Setting</h1>
      </Grid>
    </Grid>
  );
}
