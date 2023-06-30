import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import PropTypes from 'prop-types';

import { t } from '../../i18n';
import './scss/projectTimer.scss';

const calculateTimeLeft = (endDate) => {
  const difference = new Date(endDate) - new Date();
  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
};

const ProjectTimer = ({ endDate }) => {
  const [time, setTime] = useState(calculateTimeLeft(endDate));
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateTimeLeft(endDate));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-2 project__timer">
      <div className="text-end ">{t('common_still_collect_time')}</div>
      <div className="timer__wrapper">
        <div className="timer__element_wrapper">
          <span className="timer__element">{time.days}</span>
          <span className="timer__element_name">{t('common_days')}</span>
        </div>
        <span>:</span>
        <div className="timer__element_wrapper">
          <span className="timer__element">{time.hours}</span>
          <span className="timer__element_name">{t('common_hours')}</span>
        </div>
        <span>:</span>
        <div className="timer__element_wrapper">
          <span className="timer__element">{time.minutes}</span>
          <span className="timer__element_name">{t('common_minutes')}</span>
        </div>
        <span>:</span>
        <div className="timer__element_wrapper">
          <span className="timer__element">{time.seconds}</span>
          <span className="timer__element_name">{t('common_seconds')}</span>
        </div>
      </div>
    </div>
  );
};

ProjectTimer.propTypes = {
  endDate: PropTypes.string,
};

export default ProjectTimer;
