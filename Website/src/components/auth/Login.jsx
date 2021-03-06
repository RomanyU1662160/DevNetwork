import React, { Fragment, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { setAlert } from "../../actions/alerts";
import { connect } from "react-redux";

const LoginForm = props => {
  const [formData, setFormdata] = useState({
    email: "",
    password: ""
  });
  const { email, password } = formData;
  const { setAlert } = props;
  const handleChange = e => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(formData.email);
    if (!formData.email) {
      setAlert("Email cannot be null", "danger");
    }
    if (!formData.password) {
      setAlert("Password cannot be null", "danger");
    }
  };
  return (
    <Fragment>
      <div className=' container  mt-5'>
        <form
          onSubmit={e => handleSubmit(e)}
          method='post'
          className='col-md-6 offset-md-3 '>
          <div className='form-group '>
            <label htmlFor='email' className='text-info'>
              <i className='fas fa-envelope'></i> Email
            </label>
            <input
              id='email'
              name='email'
              type='text'
              className='form-control'
              value={email}
              onChange={e => handleChange(e)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password' className='text-info'>
              <i className='fas fa-user-lock'></i> Password
            </label>
            <input
              id='password'
              name='password'
              type='password'
              value={password}
              className='form-control'
              onChange={e => handleChange(e)}
            />
          </div>
          <div className='form-group'>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='checkbox'
                id='rememberme'
                name='rememberme'
              />
              <label className='form-check-label' htmlFor='gridCheck'>
                Check me out
              </label>
            </div>
          </div>
          <button type='submit' className='btn btn-lg btn-info float-right'>
            Sign in
          </button>
        </form>
        <div className='alert'>
          <p className='float-left btn text-info'>
            Don't have an acoount ?{" "}
            <Link to='/register' className='btn btn-link '>
              {" "}
              Sign up
            </Link>{" "}
          </p>
        </div>
      </div>
      <div className='alert'></div>
    </Fragment>
  );
};

const mapDispatchToProps = {
  setAlert
};

export default connect(
  null,
  mapDispatchToProps
)(LoginForm);
