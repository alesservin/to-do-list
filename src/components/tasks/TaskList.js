import React from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Moment from 'react-moment';


const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

let counter = 0;
function createData(name, calories, fat) {
  counter += 1;
  return { id: counter, name, calories, fat };
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class TablaTareas extends React.Component {
  state = {
    rows: [],
    page: 0,
    rowsPerPage: 2,
    tasksQuantity: 0,
  };

  componentDidMount(){
      // axios.get('/ws/rest/tasks/')
    axios.get('/ws/rest/tasks/paginationAndQuantity',
    {params: {page: this.state.page + 1,size: this.state.rowsPerPage}})
      .then(res => {
        const tareas = res.data.tasks; // se obtiene las tareas
        const cantidadTareas = res.data.quantity; //tomar la cantidad de tareas
        this.setState({ rows: tareas,tasksQuantity:cantidadTareas });
      })
      .catch(err => {
        console.log('Error');
        console.log(err);
      })
    }

  handleChangePage = (event, page) => {
    axios.get('/ws/rest/tasks/paginationAndQuantity',
    {params: {page: page + 1,size: this.state.rowsPerPage}})
      .then(res => {
        const tareas = res.data.tasks; // se obtiene las tareas
        const cantidadTareas = res.data.quantity; //tomar la cantidad de tareas

        this.setState({ rows: tareas,page: page,tasksQuantity:cantidadTareas });

      })
      .catch(err => {
        console.log('Error');
        console.log(err);
      })

  };

  handleChangeRowsPerPage = event => {
    const page = 0;
    this.setState({ page: page, rowsPerPage: event.target.value });

    const tamanhoDePagina = event.target.value;

    axios.get('/ws/rest/tasks/paginationAndQuantity',
    {params: {page: page + 1,size: tamanhoDePagina}})
      .then(res => {
        const tareas = res.data.tasks;
        const cantidadTareas = res.data.quantity; //tomar la cantidad de tareas

        this.setState({rows: tareas, tasksQuantity: cantidadTareas });

      })
      .catch(err => {
        console.log('Error');
        console.log(err);
      })

  };

  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell align="right">Descripcion</TableCell>
                <TableCell align="right">Fecha límite</TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
            {this.state.rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row"> {row.name} </TableCell>
                  <TableCell component="th" scope="row">
                    {row.type.nombre}
                  </TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">
                    <Moment format="DD/MM/YYYY HH:MM">{row.limitDate}</Moment>
                  </TableCell>
                </TableRow>
              ))
            }
              {/*emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )*/}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  // rowsPerPageOptions={[this.state.rowsPerPage, this.state.rowsPerPage * 2, this.state.rowsPerPage *3]}
                  rowsPerPageOptions={[2, 5, 10]}
                  colSpan={3}
                  count={this.state.tasksQuantity} //la cantidad total de tareas
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

TablaTareas.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TablaTareas);



 // export default Lista;
