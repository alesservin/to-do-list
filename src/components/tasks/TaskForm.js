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

class SelectTarea extends React.Component{
  state = {
    idTypeSelected:"",
    tipos: [],
  }

  componentDidMount(){
    //si se recibió el idType como propiedad, se toma
    if (this.props.value) {
      this.setState({idTypeSelected : this.props.value});
    }

    // se toman todos los tipos
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

  handleChange = event => {
    const id = event.target.value;
    this.setState({ idTypeSelected: id });
    alert(this.state.idTypeSelected);
  };

  render(){
    return(
      <Select value={this.state.idTypeSelected} onChange={this.handleChange}
      displayEmpty name="type" style={{width:'150px'}}>
        // se toman todos los tipos
        { this.state.tipos.map(tipo =>(
          <MenuItem value={tipo.id}>{tipo.nombre}</MenuItem>
        ))
        }
      </Select>

    );
  }
}

class FormularioTareas extends React.Component{

  state = {
    taskId: '',
    name:'',
    description:'',
    idType: '',
    limitDate: '',

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
            , description: tarea.description, id_type: tarea.idType
          ,fechaLimite: tarea.limitDate });
        })
        .catch(err => {
          console.log('Error');
          console.log(err);
        })
    }
  }

  handleChange = date => {
    this.setState({
      limitDate: date
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    //
    // const user = {
    //   name: this.state.name
    // };
    //
    // axios.post(`https://jsonplaceholder.typicode.com/users`, { user })
    //   .then(res => {
    //     console.log(res);
    //     console.log(res.data);
    //   })
    alert('nuevo');
  }

  handleUpdate = event => {
     event.preventDefault();
    //
    // const user = {
    //   name: this.state.name
    // };
    //
    // axios.post(`https://jsonplaceholder.typicode.com/users`, { user })
    //   .then(res => {
    //     console.log(res);
    //     console.log(res.data);
    //   })
    alert('actualizar');
  }

  render(){
    const { match } = this.props;

    return(
      <>
        <Card>
          <CardContent>
            <form name="formTarea"
            onSubmit={match.params.taskId ? this.handleUpdate : this.handleSubmit }
            >
            <center>
              <h3>
                {match.params.taskId ? "Editar tarea"  : "Agregar nueva tarea"}
              </h3>
            </center>
              Nombre de la tarea: &nbsp;
              <TextField value={this.state.name} type="text" name="nombre" /> <br></br>
              Descripcion de la tarea: &nbsp;
              <TextField value={this.state.descripcion} type="text" name="descripcion" /> <br></br>
              Tipo de tarea: &nbsp;
              <SelectTarea value={this.state.idType} /> <br></br>
              Fecha limite:
              <DatePicker
              selected={this.state.limitDate}
              onChange={this.handleChange}
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
