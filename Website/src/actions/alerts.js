import types from "./types";
import uuid from "uuid";

export const removeAlert = id => ({
  type: types.REMOVE_ALERT,
  id
});

export const setAlert = (msg, alertType) => {
  const id = uuid.v4(),
    alert = {
      type: types.SET_ALERT,
      alert: {
        id,
        msg,
        alertType
      }
    };
  setTimeout(() => {
    console.log("remove alert should be  triggered, Noooow");
  }, 2000);

  return alert;
};
