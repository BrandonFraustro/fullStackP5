import React from "react";
import './Notifications.css'

const Notification = (props) => {
  const success = props.message[1]
  const error = props.message[0]

  if (success) {
    return(
      <div className="notification">
          {success}
      </div>
    )
  } else if(error) {
    return(
      <div className="error">
          {error}
      </div>
    )
  } else {
    return null
  }
}

export default Notification