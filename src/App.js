import React from 'react';
import Home from './components/Home';
import Details from './components/Details';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/:id' children={<Details />} />
        <Route path='/' children={<Home />} />
      </Switch>
    </Router>
  );
}

export default App;
