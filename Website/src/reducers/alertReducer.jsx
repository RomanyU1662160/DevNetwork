import types from "../actions/types";

const init = {
  alerts: []
};

const alertReducer = (state = init, action) => {
  switch (action.type) {
    case types.SET_ALERT: {
      console.log(`${action.type} is trigeered`);

      return { ...state, alerts: state.alerts.concat(action.alert) };
    }
    case types.REMOVE_ALERT: {
      console.log(`${action.type} is trigeered`);
      return {
        ...state,
        alerts: state.alerts.filter(alert => {
          return alert.id !== action.id;
        })
      };
    }
    default: {
      return state;
    }
  }
};

export default alertReducer;
