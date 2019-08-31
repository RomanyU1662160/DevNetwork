import React, { Fragment, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormdata] = useState({
    email: "",
    password: ""
  });
  const { email, password } = formData;
  const handleChange = e => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const user = {
      email,
      password
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const body = await JSON.stringify(user);
      const res = await axios.post("/api/auth", body, config);
      return console.log(res.data);
    } catch (error) {
      console.log("ERROR ::: " + error.message);
    }

    console.log(user);
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
      </div>
      <div className='alert'>
        <Link to='/api/users'> Sign up </Link>
      </div>
    </Fragment>
  );
};

export default LoginForm;
