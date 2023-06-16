import React from "react"
import PropTypes from "prop-types"

import { Agency } from "./styles/licenses"

const Row = ({ data }) => {
  const { stateAgency = {}, name = "", license = "" } = data

  const {
    agensyName = "",
    address = "",
    index = "",
    mobile = "",
    coordinate = "",
  } = stateAgency

  return (
    <>
      <p>
        <strong>{name}</strong>
      </p>
      <p>{license}</p>
      <Agency>
        <p>
          <strong>{agensyName}</strong>
        </p>
        <p>{address}</p>
        <p>{index}</p>
        <p>
          <a href={`tel:${mobile}`}>{mobile}</a>
        </p>
        <p>
          <a href="">{coordinate}</a>
        </p>
      </Agency>
    </>
  )
}

export default Row

Row.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    license: PropTypes.string,
    stateAgency: PropTypes.shape({
      agensyName: PropTypes.string,
      address: PropTypes.string,
      index: PropTypes.string,
      mobile: PropTypes.string,
      coordinate: PropTypes.string,
    }),
  }),
}
