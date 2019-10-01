import React from 'react';
import './App.css';
 // import List from '@material-ui/core/List';
 // import ListItem from '@material-ui/core/ListItem';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
// import axios from 'axios';
// import Personas from './Servicios.js';

// import PropTypes from 'prop-types';

// class Links extends React.Component{
//   render(){
//     return(
//       <div>
//         <nav>
//           <ul>
//             <li> <Link to="/">Home</Link></li>
//             <li> <Link to="/about">About</Link></li>
//             <li> <Link to="/users">Users</Link></li>
//             <li> <Link to="/topics">Topics</Link></li>
//           </ul>
//         </nav>
//       </div>
//     );
//   }
// }

// class Rutas extends React.Component{
//   render(){
//     return(
//       <>
//         <Route path="/" exact component={Index} />
//         <Route path="/about" component={About} />
//         <Route path="/users" component={Users} />
//         <Route path="/topics" component={Topics} />
//       </>
//     );
//   }
// }

function Index(){
  return(
          <>
          <center>
            <h1>Bienvenido/a a ToDo List.</h1>
            <h2>Aquí encontrarás todos tus recordarios y alarmas para organizar
            mejor tu día a día.</h2>
          </center>
          </>
        );
}

function About(){
  return <> <center><h2>Esta es una aplicación creada en React. La aplicación
  ToDo List te permite anotar todas tus tareas por hacer, así como
  crear recordatorios y alarmas. </h2></center></>
}

function Lists(){
  return <> <h1>Lista</h1></>
}

function Topics({ match }) {
  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic({ match }) {
  // return <h3>Requested topic ID: {match.params.topicId}</h3>;
  return <h3>Este es un tópico </h3>

}


class Seccion extends React.Component{
  render(){
    const { style } = this.props;
    return(
          // <div style={{float: 'left', width: '20%', border: '3px solid black'}}>
          <div style={style}>
            {this.props.contenido}
          </div>

    );
  }
}

class App extends React.Component{
  render() {
    /* contenido del sidebar, que son los links */
    const styleLi = {margin:'5px'};
    const contenidoSidebar =
      <nav>
      <center>
        <ul style={{listStyle: 'none'}}>
          <li style={styleLi}> <Link to="/"><h1>Home</h1></Link></li>
          <li style={styleLi}> <Link to="/list"><h1>List</h1></Link></li>
          <li style={styleLi}> <Link to="/about"><h1>About</h1></Link></li>
          <li style={styleLi}> <Link to="/topics"><h1>Topics</h1></Link></li>
        </ul>
      </center>
      </nav>     ;

    /* contenido de la seccion principal, que son las rutas */
    const contenidoPrincipal =
    <div>
      <Route path="/" exact component={Index} />
      <Route path="/about" component={About} />
      <Route path="/list" component={Lists} />
      <Route path="/topics" component={Topics} />
    </div>;

    return (
      <>
      <header style={{width: '99%', backgroundColor: 'blue', padding: '4px'
      , color: 'white'}}>
        <center>
          <h1>ToDo List</h1>
        </center>
      </header>

      <Router>
        <Seccion name="sidebar" style={{float: 'left', width: '20%',
        height:'500px', background: 'lightblue', marginTop: '1%'
        , marginRight: '1%'}} contenido={contenidoSidebar} />

        <Seccion name="seccionPrincipal" style={{float: 'left', width: '77%'
        , height:'500px', background: 'lightblue', marginTop: '10px'
        , marginRight: '1%',paddingLeft:'10px'}}
        contenido={contenidoPrincipal} />
      </Router>
    </>
    )
  }
};


export default App;
