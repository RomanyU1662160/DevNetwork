import React, { Fragment } from "react";
import "./App.css";
import Navbar from "./components/layouts/navbar";
import Landing from "./components/layouts/landing";
import Developers from "./components/Developers";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./components/auth/Login";
import RegisterPage from "./components/auth/Register";
//Redux & redux-saga staff

import { Provider } from "react-redux";
import store from "./store2";

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Fragment>
        <Navbar></Navbar>
        <div className=' '>
          <Route exact path='/' component={Landing} />
          <div className='container-fluid'>
            <Switch>
              <Route exact path='/login' component={LoginPage} />
              <Route exact path='/register' component={RegisterPage} />
              <Route exact path='/developers' component={Developers}></Route>
            </Switch>
          </div>
        </div>
      </Fragment>
    </BrowserRouter>
  </Provider>
);
export default App;
