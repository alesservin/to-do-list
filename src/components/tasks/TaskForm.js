import React from 'react';
import axios from 'axios';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class SelectTarea extends React.Component{
  state = {
    age: '',
    name: 'hai',
    labelWidth: 0,
  };
  render(){
    return(
      <Select
        value={this.state.age}
        onChange={this.handleChange}
        displayEmpty
        name="age"

      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>

    );
  }
}

class FormularioTareas extends React.Component{

  state :{
    nombre:'',
    descripcion:'',

  }

  componentDidMount(){
      const { match } = this.props;
      const taskId = match.params.taskId;

    //si existe el taskId, se obtiene el task por su idea
    if (taskId) {
      console.log('existe taskId; ' + match.params.taskId);
      // se toma el taskId
      axios.get('/ws/rest/tasks/' + taskId)
        .then(res => {
          const tareas = res.data; // se obtiene las tareas
          this.setState({ rows: tareas,tasksQuantity:cantidadTareas });
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
            <form name="formTarea">

            <center>

              <h3>
                {match.params.taskId ? "Editar tarea"  : "Agregar nueva tarea"}
              </h3>
            </center>
              Nombre de la tarea: &nbsp;
              <TextField type="text" name="nombre" /> <br></br>
              Descripcion de la tarea: &nbsp;
              <TextField type="text" name="descripcion" /> <br></br>
              Tipo de tarea: &nbsp;
              <SelectTarea />

            </form>
          </CardContent>
        </Card>
      </>
    );
  }
}

export default FormularioTareas;
