import React from "react";
import { Link } from "react-router-dom";
const loginbtn = () => {
  return (
    <>
      <Link to='/register' className='btn btn-outline-info btn-lg float-right'>
        {" "}
        Register{" "}
      </Link>
    </>
  );
};

export default loginbtn;
