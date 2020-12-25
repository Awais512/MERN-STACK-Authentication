import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Activate from './pages/Activate';
import Forgot from './pages/Forgot';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Admin from './shared/Admin';
import AdminRoute from './shared/AdminRoute';
import Layout from './shared/Layout';
import Private from './shared/Private';
import PrivateRoute from './shared/PrivateRoute';

const App = () => {
  return (
    <Switch>
      <Layout>
        <Route path='/' component={Home} exact />
        <Route path='/signin' component={Signin} />
        <Route path='/signup' component={Signup} />
        <Route path='/auth/activate/:token' component={Activate} />
        <Route path='/forgot' component={Forgot} />
        <PrivateRoute path='/private' component={Private} />
        <AdminRoute path='/admin' component={Admin} />
      </Layout>
    </Switch>
  );
};

export default App;
