import React from 'react';
import axios from 'axios';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class FormularioTareas extends React.Component{
  state = {
    taskId: '',
    name:'',
    description:'',
    idType: '',
    limitDate: '',
    tipos: [],
  };

  componentDidMount(){
      const { match } = this.props;
      const taskId = match.params.taskId;

    //si existe el taskId, se obtiene el task por su idea
    if (taskId) {
      // se toma el taskId
      axios.get('/ws/rest/tasks/' + taskId)
        .then(res => {
          const tarea = res.data; // se obtiene las tareas
          this.setState({ taskId: tarea.id, name: tarea.name,
          description: tarea.description, idType: tarea.type.id,
          limitDate: tarea.limitDate });

        })
        .catch(err => {
          console.log('Error');
          console.log(err);
        })
    }

    // se toman todos los tipos de tareas
    axios.get('/ws/rest/types/')
      .then(res => {
        const tipos = res.data; // se obtiene las tareas
        let vecTipos = tipos.map(tipo => (
          { id: tipo.id, nombre: tipo.nombre }
        ));
        //se pasa el vector
        this.setState({tipos:vecTipos}) ;
      })
      .catch(err => {
        console.log('Error');
        console.log(err);
      })

  }

  handleChange = date => {
    this.setState({
      limitDate: date,
    })

  };

  handleChangeTxt = field => (e) => {

    switch (field) {
      case 'nombre':
        this.setState({name: e.target.value});
        break;
      case 'descripcion':
        this.setState({description: e.target.value});
        break;
      case 'tipo':
        const id = e.target.value;
        this.setState({ idType: id });
        break;
      case 'fechaLimite':
        this.setState({limitDate: e.target.value});
        break;
      default:
        break;

    }

  };

  handleSubmit = event => {
    const {match} = this.props;
    let tipo = null ;
    let tareaNueva = {};
    tareaNueva = {
      name:this.state.name,
      description:this.state.description,
      type: tipo,
      limitDate: moment(this.state.limitDate).format('YYYY-MM-DD'),
    };

    event.preventDefault(); // previene que se recargue la pagina

    //se obtiene por medio de un servicio, el objeto task
    axios.get('/ws/rest/types/' + this.state.idType)
      .then(res => {
        tipo = {type: res.data}; // se obtiene la tarea
        // se reemplaza el tipo anterior(en null), con el actual
        tareaNueva = Object.assign(tareaNueva,tipo);

        // se existe tasksId, se actualiza o agrga un nuevvo registro
        if (match.params.taskId) {
            // SE ACTUALIZA EL REGISTRO
            axios.put('/ws/rest/tasks/' + match.params.taskId, tareaNueva )
              .then(response => {
                // this.setState({ friends: response.data });
                alert('Actualizado con éxito');

              })
              .catch(error => {
                console.log(error);
                alert('Error: no se ha podido actualizar el registro');
              });
        }
        else // si no hay taskId
        {
          // SE GUARDA UN NUEVOO REGISTRO
          axios.post('/ws/rest/tasks/', tareaNueva )
            .then(res => {
              alert('Registrado con éxito');

            })
            .catch(err => {
              console.log('Error');
              console.log(err);
              alert('Ha ocurrido un error y no se ha podido guardar el registro');
            })
        }
      })
      .catch(err => {
        console.log('Error');
        console.log(err);
      })

  }

  render(){
    const { match } = this.props;
    const { classes } = this.props;

    return(
      <>
        <Card>
          <CardContent>
            <form name="formTarea"
            onSubmit={this.handleSubmit } >
            <center>
              <h3>
                {match.params.taskId ? "Editar tarea"  : "Agregar nueva tarea"}
              </h3>
            </center>

            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Paper className={classes.paper} >
                  Nombre de la tarea: &nbsp;
                  <TextField value={this.state.name} isRequired type="text" name="nombre"
                  onChange={this.handleChangeTxt('nombre')}
                  style={{width:'80%'}} /> <br></br>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper} >
                  Descripcion de la tarea: &nbsp;
                  <TextField value={this.state.description} type="text" name="descripcion"
                  onChange={this.handleChangeTxt('descripcion')}
                  style={{width:'80%'}} /> <br></br>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper} >
                  Tipo de tarea: &nbsp;
                  <Select value={this.state.idType} onChange={this.handleChangeTxt('tipo')}
                  displayEmpty name="tipo" style={{width:'80%'}}>
                    // se toman todos los tipos
                    { this.state.tipos.map(tipo =>(
                      <MenuItem value={tipo.id}>{tipo.nombre}</MenuItem>
                    ))
                    }
                  </Select> <br></br>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  Fecha limite:
                  <DatePicker
                  style={{width:'80%'}}
                  selected={this.state.limitDate}
                  onChange={this.handleChange} name="fechaLimite"
                  />
                <br></br>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Button variant="contained"> <Link to='/tasks'>Cancelar
                  </Link> </Button> &nbsp;
                  <Button variant="contained" type="submit">Guardar</Button>
                </Paper>
              </Grid>
            </Grid>
            </form>
          </CardContent>
        </Card>
      </>
    );
  }
}

FormularioTareas.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormularioTareas);
