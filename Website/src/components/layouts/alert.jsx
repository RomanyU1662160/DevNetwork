import React from "react";
import { connect } from "react-redux";
import { removeAlert } from "../../actions/alerts";

const alert = props => {
  const alert = props.alert ? props.alert : null;
  console.log(alert.alertType);
  return (
    <>
      <div className={`alert alert-${alert.alertType}`} role='alert'>
        {alert.msg}
        <button
          className=' close text-danger float-right'
          onClick={() => props.removeAlert(alert.id)}>
          X
        </button>
        <span className='float-right mr-5'>{alert.id}</span>
      </div>
    </>
  );
};

// const mapStateToProps = state => ({
//   alerts: state.alertReducer.alerts,
//   alertType: state.alertReducer.alertType
// });

const mapDispatchToProps = {
  removeAlert
};

export default connect(
  null,
  mapDispatchToProps
)(alert);
