import React, { createContext, useState } from "react";

export const spinnerContext = createContext();

const SpinnerContextProvider = props => {
  const [loading, setLoading] = useState(false);

  const viewSpinner = () => {
    console.log("viewSpinner is triggered");
    return setLoading(true);
  };

  const hideSpinner = () => {
    console.log("HideSpinner is triggered");
    return setLoading(false);
  };

  return (
    <spinnerContext.Provider value={{ loading, viewSpinner, hideSpinner }}>
      {props.children}
    </spinnerContext.Provider>
  );
};

export default SpinnerContextProvider;
