import React, { Component } from "react";
import Loginbtn from "../buttons/login";
import Registerbtn from "../buttons/register";

export default class landing extends Component {
  render() {
    return (
      <>
        <div className='jumbotron bg-dark'>
          <h1 className='text-info  text-center mb-5'>Welcome to DevNetwork</h1>

          <div className='jumbotron bg-dark '>
            <h1 className='display-5 text-left text-muted'>
              Network for Devs{" "}
            </h1>
            <p className='lead text-left text-warning'> Devs </p>
            <hr className='my-4' />
            <p className='lead  text-info '>
              A new way for developers to communicate and knows each other
              skills
            </p>
            <Loginbtn> </Loginbtn>
            <Registerbtn> </Registerbtn>
          </div>
        </div>
      </>
    );
  }
}
