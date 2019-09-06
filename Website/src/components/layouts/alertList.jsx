import React from "react";
import Alert from "./alert";
import { connect } from "react-redux";

const alertList = props => {
  const { alerts } = props;

  if (alerts.length <= 0) return null;
  else {
    return (
      <div>
        {alerts.map(alert => {
          return <Alert key={alert.id} alert={alert}></Alert>;
        })}
      </div>
    );
  }
};
const mapStateToProps = state => ({
  alerts: state.alertReducer.alerts
});

export default connect(mapStateToProps)(alertList);
