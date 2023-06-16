import React from "react"
import { FormFeedback, Input } from "reactstrap"
import PropTypes from "prop-types"

const InputWithError = ({ name, formik, ...properties }) => {
  return (
    <>
      <Input
        type="text"
        name={name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        invalid={formik.touched[name] && formik.errors[name] ? true : false}
        {...properties}
      />

      {formik.touched[name] && formik.errors[name] ? (
        <FormFeedback type="invalid">{formik.errors[name]}</FormFeedback>
      ) : null}
    </>
  )
}

InputWithError.propTypes = {
  name: PropTypes.string,
  formik: PropTypes.any,
}
export default InputWithError
