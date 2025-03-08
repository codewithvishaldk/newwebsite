import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { IdentityContextProvider } from 'react-netlify-identity-widget';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

function App() {
  const url = process.env.REACT_APP_NETLIFY_IDENTITY_URL;

  return (
    <IdentityContextProvider url={url}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </IdentityContextProvider>
  );
}

export default App;