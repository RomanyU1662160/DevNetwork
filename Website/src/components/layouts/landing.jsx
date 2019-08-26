import React, { Component } from "react";

export default class landing extends Component {
  render() {
    return (
      <>
        <div className='jumbotron bg-dark '>
          <h1 className='text-info  text-center'> Welcome to DevNetwork</h1>
          <h1 className='display-5 text-muted'>Network for Devs </h1>
          <p className='lead text-warning'> Devs </p>
          <hr className='my-4' />
          <p className='lead text-muted '>
            A new way for developers to communicate and knows each other skills
          </p>
          <a
            className='btn btn-outline-info btn-lg float-right ml-4'
            href='#'
            role='button'>
            Register
          </a>
          <a
            className='btn btn-outline-info btn-lg float-right'
            href='#'
            role='button'>
            Login
          </a>
        </div>
      </>
    );
  }
}
