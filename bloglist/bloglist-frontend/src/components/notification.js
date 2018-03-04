import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message, type }) => {
  const style = {
    border: type==="error" ? '3px solid red' : '3px solid green'
  }
  if (message === null) {
    return null
  }
  return (
    <div className={type} style={style} >
      {message}
    </div>
  )
}

Notification.propTypes = {
  type: PropTypes.string.isRequired
}

export default Notification