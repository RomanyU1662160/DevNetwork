const init = {};

const exmpleReducer = (state = init, action) => {
  switch (action.type) {
    case "TEST": {
      console.log("Test Reducer");
      return { ...state, name: "Example Reducer " };
    }
    default: {
      return state;
    }
  }
};

export default exmpleReducer;
