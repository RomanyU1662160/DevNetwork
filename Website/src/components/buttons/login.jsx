import React from "react";
import { Link } from "react-router-dom";
const loginbtn = () => {
  return (
    <>
      <Link
        to='/login'
        className='btn btn-outline-info btn-lg float-right ml-4'>
        Login
      </Link>
    </>
  );
};

export default loginbtn;
