import React from "react"
import PropTypes from "prop-types"
import errorImg from "assets/images/icons/status-error.svg"
import successImg from "assets/images/icons/status-success.svg"

const StatusMessage = ({ success }) => {
  return (
    <div
      className={`status__message_wrapper ${
        success
          ? "status__message_wrapper_success"
          : "status__message_wrapper_fail"
      }`}
    >
      <div className="status__message_img_wrapper">
        <img src={success ? successImg : errorImg} />
      </div>
      <div className="status__message_content_wrapper">
        {success ? "Success" : "Error"}
        <div>
          {success
            ? "User rights successfully updated"
            : "Failed to update user rights"}
        </div>
      </div>
    </div>
  )
}

StatusMessage.propTypes = {
  success: PropTypes.bool,
}

export default StatusMessage
