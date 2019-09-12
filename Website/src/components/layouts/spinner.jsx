import React from "react";
import { connect } from "react-redux";
import { viewSpinner, hideSpinner } from "../../actions/spinner";

const Spinner = props => {
  const loading = props.loading;

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
