import React, { Component } from "react";
import { Link } from "react-router-dom";

export class navbar extends Component {
  render() {
    return (
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <Link className='navbar-brand' to='/'>
          Dev Network
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='#navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item active'>
              <Link to='/developers' className='nav-link'>
                {" "}
                Developers{" "}
              </Link>
            </li>

            <li className='nav-item dropdown'>
              <Link
                className='nav-link dropdown-toggle'
                to='/'
                id='navbarDropdown'
                role='button'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'>
                Dropdown
              </Link>
              <div className='dropdown-menu' aria-labelledby='navbarDropdown'>
                <Link className='dropdown-item' to='/register'>
                  Registrer
                </Link>
                <Link className='dropdown-item' to='/login'>
                  Login
                </Link>
                <div className='dropdown-divider'></div>
                <Link className='dropdown-item' to='developers'>
                  Developers page
                </Link>
              </div>
            </li>
          </ul>

          <form className='form-inline my-2 my-lg-3 ml-auto'>
            <input
              className='form-control mr-sm-2'
              type='search'
              placeholder='Search'
              aria-label='Search'
            />
            <button
              className='btn btn-outline-success my-2 my-sm-0'
              type='submit'>
              Search
            </button>
          </form>
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link to='/login' className='nav-link'>
                {" "}
                Login{" "}
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/register' className='nav-link'>
                {" "}
                Register{" "}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default navbar;
