import React from 'react';
import './App.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import axios from 'axios';

import Personas from './Servicios.js';

function Index(){
  return <> <h1>Home</h1> <Personas /> </>
}

function About(){
  return <> <h1>About</h1></>
}

function Users(){
  return <> <h1>Users</h1></>
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
  return <h3>Este es un tópico</h3>

}



class App extends React.Component{

  render() {
    return (

      <Router>
        <div>
          <nav>
            <ul>
              <li> <Link to="/">Home</Link></li>
              <li> <Link to="/about/">About</Link></li>
              <li> <Link to="/users/">Users</Link></li>
              <li> <Link to="/topics">Topics</Link></li>
            </ul>
          </nav>

          <Route path="/" exact component={Index} />
          <Route path="/about/" component={About} />
          <Route path="/users/" component={Users} />
          <Route path="/topics" component={Topics} />
        </div>
      </Router>



      // se muestra el componente Personas, cuyos datos fueron extraídos de una api (servicio)
      //<Personas />

    )
  }
}

export default App;
