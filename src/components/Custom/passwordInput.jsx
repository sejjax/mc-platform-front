import React, { useState } from "react"
import { Button, Input, InputGroup, FormFeedback } from "reactstrap"
import PropTypes from "prop-types"

import eyesIcon from "assets/images/icons/eye.svg"

const PasswordInput = ({
  validation,
  name,
  placeholder,
  invalid,
  showPassword = false,
}) => {
  const [show, setShow] = useState(showPassword)

  const showHandler = () => {
    setShow(!show)
  }

  return (
    <InputGroup>
      <Input
        style={{
          position: "relative",
        }}
        name={name}
        id={name}
        value={validation.values[name] || ""}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        onChange={validation.handleChange}
        onBlur={validation.handleBlur}
        invalid={invalid}
      />
      <Button
        color="secondary"
        style={{
          backgroundColor: "#EFF2F7",
          border: "1px solid #CED4DA",
          borderLeft: "unset",
          zIndex: "0",
        }}
        onClick={showHandler}
      >
        <img src={eyesIcon} />
      </Button>
      {invalid ? (
        <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
      ) : null}
    </InputGroup>
  )
}

export default PasswordInput

PasswordInput.propTypes = {
  validation: PropTypes.shape({
    handleChange: PropTypes.func,
    handleBlur: PropTypes.func,
    values: PropTypes.any,
    touched: PropTypes.any,
    errors: PropTypes.any,
  }).isRequired,
  name: PropTypes.string.isRequired,
  showPassword: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  invalid: PropTypes.bool.isRequired,
}
