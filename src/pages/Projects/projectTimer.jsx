import React from "react"
import "./scss/projectTimer.scss"
import { useEffect } from "react"
import { useState } from "react"

import PropTypes from "prop-types"

const calculateTimeLeft = endDate => {
  const difference = new Date(endDate) - new Date()
  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }
  return {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  }
}

const ProjectTimer = ({ endDate }) => {
  const [time, setTime] = useState(calculateTimeLeft(endDate))
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateTimeLeft(endDate))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mt-2 project__timer">
      <div className="text-end ">До окончания сбора осталось:</div>
      <div className="timer__wrapper">
        <div className="timer__element_wrapper">
          <span className="timer__element">{time.days}</span>
          <span className="timer__element_name">дней</span>
        </div>
        <span>:</span>
        <div className="timer__element_wrapper">
          <span className="timer__element">{time.hours}</span>
          <span className="timer__element_name">часов</span>
        </div>
        <span>:</span>
        <div className="timer__element_wrapper">
          <span className="timer__element">{time.minutes}</span>
          <span className="timer__element_name">минут</span>
        </div>
        <span>:</span>
        <div className="timer__element_wrapper">
          <span className="timer__element">{time.seconds}</span>
          <span className="timer__element_name">секунд</span>
        </div>
      </div>
    </div>
  )
}

ProjectTimer.propTypes = {
  endDate: PropTypes.string,
}

export default ProjectTimer
