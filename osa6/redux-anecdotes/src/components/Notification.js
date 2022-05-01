import { connect } from "react-redux";

const Notification = (props) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    visibility: props.notification ? "visible" : "hidden",
  };
  return <div style={style}>{props.notification}</div>;
};

const mapStateToProps = (state) => {
  return { notification: state.notification.message };
};

const ConnectedNotification = connect(mapStateToProps)(Notification);
export default ConnectedNotification;
