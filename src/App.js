import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Index from './components/Home.js';
import About from './components/About.js';
import TablaTareas from './components/tasks/TaskList.js';
import FormularioTareas from './components/tasks/TaskForm.js';

// function Lists({match}){
//   return (
//     <>
//       <h1>Lista de tareas</h1>
//       <center>
//       </center>
//       <TablaTareas />
//     </>
//   );
// }

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

function Tasks({match}){
  return(
    <>
      <Route exact path={`${match.path}/new`} component={FormularioTareas} />
      <Route exact path={`${match.path}/edit/:taskId`}
      component={FormularioTareas} />
      <Route exact path={`${match.path}`} component={TablaTareas} />
    </>
  );
}


class Seccion extends React.Component{
  render(){
    const { style } = this.props;
    return(
          // <div style={{float: 'left', width: '20%', border: '3px solid black'}}>
          <Card  style={style}>
            <CardContent>
              {this.props.contenido}
            </CardContent>
          </Card >

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
          <li style={styleLi}> <Link to="/tasks"><h1>List</h1></Link></li>
          <li style={styleLi}> <Link to="/about"><h1>About</h1></Link></li>
          {/*<li style={styleLi}> <Link to="/topics"><h1>Topics</h1></Link></li>*/}
        </ul>
      </center>
      </nav>     ;

    /* contenido de la seccion principal, que son las rutas */
    const contenidoPrincipal =
    <div>
      <Route path="/" exact component={Index} />
      <Route path="/about" component={About} />
      <Route path="/tasks" component={Tasks} />
      <Route path="/topics" component={Topics} />
    </div>;

    return (
      <>
      <Card style={{width: '99%', backgroundColor: 'blue', padding: '4px'
      , color: 'white'}}>
      <header >
        <center>
          <h1>ToDo List</h1>
        </center>
      </header>
      </Card>

      <Router>
        <Seccion name="sidebar" style={{float: 'left', width: '20%',
        height:'100%', background: 'lightblue', marginTop: '1%'
        , marginRight: '1%'}} contenido={contenidoSidebar} />

        <Seccion name="seccionPrincipal" style={{float: 'left', width: '77%'
        , height:'100%', background: 'lightblue', marginTop: '10px'
        , marginRight: '1%',paddingLeft:'10px'}}
        contenido={contenidoPrincipal} />
      </Router>
    </>
    )
  }
};


export default App;
