import React, { useEffect, useState } from "react"
import { Card, CardBody, CardTitle } from "reactstrap"

// RangeSlider
import Nouislider from "nouislider-react"
import PropTypes from "prop-types"

import "./scss/risk-range-slider.scss"

import { getRisks as onGetRisks } from "store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"
import { map } from "lodash"


const RangeSlider = props => {
  const dispatch = useDispatch()

  const { risks } = useSelector(state => ({
    risks: state.Risk.risks,
  }))

  const [slider, setSlider] = useState(0)
  const [risk, setRisk] = useState(null)

  // useEffect(() => {
  //   dispatch(onGetRisks())
  // }, [dispatch])

  useEffect(() => {
    setRisk(
      risks.find(({ code }, index) => {
        if (props?.risk?.code === code) {
          setSlider(index)
          return true
        }
      })
    )
  }, [risks, props?.risk])

  return (
    <React.Fragment>
      {risk && (
        <Card className={"rrs-risks"}>
          <CardBody>
            {risk?.name && (
              <CardTitle
                className={"rrs-title"}
              >{`${risk.name} risk`}</CardTitle>
            )}
            <Nouislider
              accessibility
              disabled={props?.disabled}
              start={slider}
              step={1}
              range={{
                min: 0,
                max: risks.length - 1 || 1,
              }}
              cssPrefix="rrs-"
              onSlide={(values, handle, unencodedValues) => {
                setSlider(unencodedValues[0])
              }}
            />
            <div className={"rrs-labels"}>
              {map(risks, (current, index) => (
                <span className={"rrs-label"} key={index}>
                  {current?.name}
                </span>
              ))}
            </div>
            <div className={"rrs-content"}>{risk?.description}</div>
          </CardBody>
        </Card>
      )}
    </React.Fragment>
  )
}

export default RangeSlider

RangeSlider.propTypes = {
  risk: PropTypes.object,
  disabled: PropTypes.bool,
}
