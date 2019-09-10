import types from "./types";

export const register = (fname, lname, email, password) => {
  return {
    type: types.REGISTER,
    payload: {
      user: {
        fname,
        lname,
        email,
        password
      }
    }
  };
};
export const registerSuccess = data => {
  return {
    type: types.REGISTER_SUCCESS,
    payload: {
      data
    }
  };
};
