import React from "react";
import { withStyles, makeStyles, useTheme } from "@material-ui/core/styles";
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
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import PropTypes from "prop-types";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
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

const useStyles12 = makeStyles(() => ({
  root1: {
    flexShrink: 0,
    // marginLeft: theme.spacing(2.5),
  },
}));
function TablePaginationActions(props) {
  const classes = useStyles12();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root1}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function HistoryConfig(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // const emptyRows =
  //   rowsPerPage -
  //   Math.min(rowsPerPage, props.history.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (props.history.length > 0) {
    return (
      <Grid container spacing={3} className="flex-center">
        <Grid item md={10} xs={12}>
          <h4 style={{marginTop: 25}}>History Config</h4>
        </Grid>
        <Grid item md={10} xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="History Config">
              <TableHead>
                <TableRow>
                  <Hidden mdDown>
                    <StyledTableCell>ID</StyledTableCell>
                  </Hidden>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Temp(°C)</StyledTableCell>
                  <StyledTableCell align="center">Humid(%)</StyledTableCell>
                  <StyledTableCell align="center">Light</StyledTableCell>

                  <Hidden mdDown>
                    <StyledTableCell align="center">Time</StyledTableCell>
                  </Hidden>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? props.history.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : props.history
                ).map((el, index) => (
                  <StyledTableRow key={el.id}>
                    <Hidden mdDown>
                      <StyledTableCell component="th" scope="row">
                        {index + 1}
                      </StyledTableCell>
                    </Hidden>
                    <StyledTableCell align="center">{el.name}</StyledTableCell>
                    <StyledTableCell align="center">
                      {el.tempeThreshold}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {el.humidThreshold}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {el.lightThreshold}
                    </StyledTableCell>
                    
                    <Hidden mdDown>
                      <StyledTableCell align="center">
                        {/* change to local time */}
                        {new Date(el.createdAt).toLocaleString("en-US", {
                          timeZone: "Asia/Jakarta",
                        })}
                      </StyledTableCell>
                    </Hidden>
                    <StyledTableCell align="center">
                      <IconButton
                        aria-label="delete"
                        style={{ color: "#d63031" }}
                        onClick={() => props.verifyDelete(el.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        aria-label="check"
                        style={{ color: "#27ae60" }}
                        onClick={() => props.checked(el.id, el.name)}
                      >
                        <CheckIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}

                {/* {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )} */}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={3}
                    count={props.history.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { "aria-label": "rows per page" },
                      native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
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
