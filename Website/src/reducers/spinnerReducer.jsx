import types from "../actions/types";
const init = {
  loading: false
};

const spinnerReducer = (state = init, action) => {
  switch (action.type) {
    case types.VIEW_SPINNER:
      console.log(`${action.type} is trigeered`);
      return { ...state, loading: true };

    case types.HIDE_SPINNER:
      console.log(`${action.type} is trigeered`);
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default spinnerReducer;
