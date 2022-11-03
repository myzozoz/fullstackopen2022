import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: !props.notification ? 'none' : 'block',
  }
  return <div style={style}>{props.notification}</div>
}

const mapStateToProps = (state) => {
  return {
    notification: state.notifications,
  }
}

export default connect(mapStateToProps)(Notification)
