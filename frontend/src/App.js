import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Activate from './pages/Activate';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Layout from './shared/Layout';

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/signin' component={Signin} />
        <Route path='/signup' component={Signup} />
        <Route path='/auth/activate/:token' component={Activate} />
      </Switch>
    </Layout>
  );
};

export default App;
