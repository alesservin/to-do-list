import React from 'react';
import axios from 'axios';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

class FormularioTareas extends React.Component{

  state = {
    taskId: '',
    name:'',
    description:'',
    idType: '',
    limitDate: '',
    tipos: [],
  }

  componentDidMount(){
      const { match } = this.props;
      const taskId = match.params.taskId;

    //si existe el taskId, se obtiene el task por su idea
    if (taskId) {
      // se toma el taskId
      axios.get('/ws/rest/tasks/' + taskId)
        .then(res => {
          const tarea = res.data; // se obtiene las tareas
          this.setState({ taskId: tarea.id, name: tarea.name
            , description: tarea.description, idType: tarea.idType
          ,fechaLimite: tarea.limitDate });
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
      limitDate: date
    });
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
    event.preventDefault(); // previene que se recargue la pagina

    //se obtiene por medio de un servicio, el objeto task
    axios.get('/ws/rest/types/' + this.state.idType)
      .then(res => {
        tipo = res.data; // se obtiene la tareas
        console.log(tipo);
      })
      .catch(err => {
        console.log('Error');
        console.log(err);
      })

    // se existe tasksId
    if (match.params.taskId) {
      // se actualiza el registro
        alert('nuevo registro');

    }
    else // si no hay taskId
    {
      // se guarda un nuevo registro
      alert('nuevo registro');
      const tareaNueva = {
        name:this.state.name,
        description:this.state.description,
        type: tipo,
        limitDate: this.state.limitDate,
      };

      axios.post('/ws/rest/tasks/', tareaNueva )
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
        .catch(err => {
          console.log('Error');
          console.log(err);
        })
    }

  }

  render(){
    const { match } = this.props;

    return(
      <>
        <Card>
          <CardContent>
            <form name="formTarea"
            onSubmit={this.handleSubmit }
            >
            <center>
              <h3>
                {match.params.taskId ? "Editar tarea"  : "Agregar nueva tarea"}
              </h3>
            </center>
              Nombre de la tarea: &nbsp;
              <TextField value={this.state.name} type="text" name="nombre"
              onChange={this.handleChangeTxt('nombre')} /> <br></br>
              Descripcion de la tarea: &nbsp;
              <TextField value={this.state.descripcion} type="text" name="descripcion" /> <br></br>
              Tipo de tarea: &nbsp;
              <Select value={this.state.idType}
              onChange={this.handleChangeTxt('tipo')}
              displayEmpty name="tipo" style={{width:'150px'}}>
                // se toman todos los tipos
                { this.state.tipos.map(tipo =>(
                  <MenuItem value={tipo.id}>{tipo.nombre}</MenuItem>
                ))
                }
              </Select> <br></br>
              Fecha limite:
              <DatePicker
              selected={this.state.limitDate}
              onChange={this.handleChange} name="fechaLimite"
            />
            <br></br>
            <Button variant="contained"> <Link to='/tasks'>Cancelar
            </Link> </Button>
            <Button variant="contained" type="submit">Guardar</Button>
            </form>
          </CardContent>
        </Card>
      </>
    );
  }
}

export default FormularioTareas;
