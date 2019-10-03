import React from 'react';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'

class Personas extends React.Component{
  state = {
    people: []
  }

   componentDidMount(){
     axios.get(`https://swapi.co/api/people`)
       .then(res => {
         const persons = res.data.results;
         this.setState({ people: persons });
       })
       .catch(err => {
         console.log('Error');
         console.log(err);
       })
      //  console.log(`fuera del then -> ${this.state.people} `);
  }

  render(){
    return(
      <List>
        { this.state.people.map(person => <ListItem key={person.name}>
          <ListItemText primary={person.name} secondary={person.gender} />
          </ListItem>
        )}
      </List>
    )
  }
}


export default Personas;
