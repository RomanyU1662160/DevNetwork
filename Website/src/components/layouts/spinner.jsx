import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { viewSpinner, hideSpinner } from "../../actions/spinner";
import { spinnerContext } from "../../contexts/SpinnerContext";

const Spinner = props => {
  const { loading } = useContext(spinnerContext);
  //const loading = props.loading;
  useEffect(() => {
    console.log(loading);
  });

  return (
    <>
      {loading ? (
        <div
          className='spinner-grow text-info text-center '
          role='status'
          style={{ width: 6 + "rem", height: 6 + "rem" }}>
          <span className='sr-only'>Loading...</span>
        </div>
      ) : null}
    </>
  );
};

const mapStateToProps = state => ({
  loading: state.spinnerReducer.loading
});

const mapDispatchToProps = {
  viewSpinner,
  hideSpinner
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Spinner);
