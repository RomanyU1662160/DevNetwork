import types from "../actions/types";

const init = {
  isAuth: false,
  loading: false,
  user: null,
  token: localStorage.getItem("token")
};

const authReducer = (state = init, action) => {
  switch (action.type) {
    case types.REGISTER: {
      console.log(`${action.type} is trigeered`);
      return {
        ...state,
        loading: true,
        user: action.user
      };
    }
    case types.REGISTER_SUCCESS: {
      console.log(`${action.type} is trigeered`);
      return {
        ...state,
        loading: false,
        user: action.data,
        isAuth: true
      };
    }

    default:
      return state;
  }
};

export default authReducer;
