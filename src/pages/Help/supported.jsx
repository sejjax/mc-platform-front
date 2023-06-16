import React from "react"
import PropTypes from "prop-types"
import CountryFlag from "pages/Team/components/CountryFlag"

import { UL, Grid } from "./styles/wrapper"

import { notAvailableState } from "./data"

const Supported = ({ info }) => {
  const { country = [], specialRegion = [], states = [] } = info

  return (
    <>
      <div>
        <p>TGT in not available to residents of</p>
        <UL>
          {country &&
            country.map(el => (
              <li key={el.code}>
                <CountryFlag countryCode={el.code} title={el.name} emoji />
              </li>
            ))}
          {specialRegion &&
            specialRegion.map(el => <li key={el.name}>{el.name}</li>)}
        </UL>
      </div>
      <div>
        <p>TGT is not available to residents of</p>
        <Grid>{states && states.map(el => <p key={el.name}>{el.name}</p>)}</Grid>
      </div>
    </>
  )
}

Supported.propTypes = {
  info: PropTypes.shape({
    country: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        code: PropTypes.string,
      })
    ),
    specialRegion: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
    states: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
  }),
}

export default Supported
