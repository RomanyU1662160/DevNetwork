import React, { Fragment, useState } from "react";
import axios from "axios";
const Register = () => {
  const [formData, setFormdata] = useState({
    password: "",
    confirm: "",
    fname: "",
    lname: "",
    email: ""
  });
  formData.email =
    formData.fname && formData.lname
      ? `${formData.fname}.${formData.lname}@coveainsurance.co.uk`
      : "";

  const { fname, lname, password, confirm, email } = formData;

  const handleChange = e => {
    //console.log(email);
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };
  const handlesubmit = async e => {
    e.preventDefault();
    if (password !== confirm) {
      return console.log("password not matched ");
    }
    const dummyUser = {
      fname,
      lname,
      password,
      email
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const body = JSON.stringify(dummyUser);
      console.log("Body ::" + body);
      await console.log(body);
      const res = await axios.post("/api/users", body, config);
      console.log(res.data);
    } catch (error) {
      console.log("Error :: " + error.message);
    }
  };
  return (
    <div>
      <Fragment>
        {fname ? `Welcome:: ${fname}  ${lname} ` : ""}

        {/* <FontAwesomeIcon icon={fasfauser}></FontAwesomeIcon> */}
        <div className=' container  mt-5'>
          <form
            onSubmit={handlesubmit}
            method='post'
            className='col-md-6 offset-md-3 '>
            <div className='form-group row'>
              <div className='col-md-6'>
                <label htmlFor='fname' className='text-info'>
                  <i className='fas fa-user'></i> First name
                </label>
                {FormData.fname}
                <input
                  id='fname'
                  name='fname'
                  type='text'
                  className='form-control'
                  value={fname}
                  onChange={e => handleChange(e)}
                />
              </div>
              <div className='col-md-6'>
                <label htmlFor='lname' className='text-info'>
                  <i className='fas fa-user'></i> Last name
                </label>
                <input
                  id='lname'
                  name='lname'
                  type='text'
                  className='form-control'
                  value={lname}
                  onChange={e => handleChange(e)}
                />
              </div>
            </div>

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
                readOnly
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
                className='form-control'
                value={password}
                onChange={e => handleChange(e)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='confirm' className='text-info'>
                <i className='fas fa-user-lock'></i> Confirm Password
              </label>
              <input
                id='confirm'
                name='confirm'
                type='password'
                className='form-control'
                value={confirm}
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
              Register
            </button>
          </form>
        </div>
      </Fragment>
    </div>
  );
};

export default Register;
