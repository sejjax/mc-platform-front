import React, { FC, ReactElement } from 'react';

import { formatMoney } from 'helpers/dollarsUS';

import { t } from '../../i18n';
import './GoalChecker.scss';

/**
 * @typedef {object} Props
 * @property {number} [startPoint=0] - start point for goal, default is 0
 * @property {number} endPoint - goal of this checker
 * @property {number} completedPoint - already completed
 */

/**
 * @component
 * @type {FC<Props>}
 * @returns {ReactElement}
 */
export const GoalChecker = ({ completedPoint, endPoint, startPoint = 0 }) => {
  return (
    <div className="goal__checker">
      <div className="goal__checker_amount">{formatMoney(startPoint)}</div>
      <div className="goal__checker_amount">{formatMoney(endPoint)}</div>
      <div className="goal__checker_level_line">
        <div
          className="level__line_first"
          style={{
            width: `${(completedPoint / endPoint) * 100}%`,
          }}></div>
      </div>
      <div className="goal__checker_amount">
        {t('goal_checker_done', { value: formatMoney(completedPoint) })}
      </div>
      <div className="goal__checker_amount">
        {t('goal_checker_remaining', {
          value: formatMoney(endPoint - completedPoint, undefined, false),
        })}
      </div>
    </div>
  );
};
