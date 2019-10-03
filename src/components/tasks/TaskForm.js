import React from 'react';

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
  render(){
    return(
      <>
        <Card>
          <CardContent>
            <form name="formTarea">
            <center><h3>Agregar nueva tarea</h3></center>
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
