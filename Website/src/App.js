import React, { Fragment } from "react";

import "./App.css";
import Navbar from "./components/layouts/navbar";
import Landing from "./components/layouts/landing";
const App = () => (
  <Fragment>
    <div className='App'>
      <Navbar></Navbar>
      <Landing></Landing>
    </div>
  </Fragment>
);
export default App;
