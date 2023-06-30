import { useEffect } from 'react';

import {
  getDisabledProjectTimeDifference,
  removeDisabledProjectTime,
} from 'helpers/DisabledProject/DisabledProject';
import { useDispatch, useSelector } from 'react-redux';

import { setProjectButtonCondition } from 'store/actions';

export const useProjectInvestmentTimeout = () => {
  const isButtonsDisabled = useSelector(
    (state) => state.Project.isDepositButtonDisabledByInvestment,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isButtonsDisabled) {
      const timeDifference = getDisabledProjectTimeDifference();
      if (timeDifference > 0 && timeDifference <= 1000 * 60 * 2) {
        const timeout = setTimeout(() => {
          dispatch(setProjectButtonCondition(false));
          removeDisabledProjectTime();
        }, timeDifference);
        return () => clearTimeout(timeout);
      } else {
        dispatch(setProjectButtonCondition(false));
      }
    }
  }, [isButtonsDisabled]);
};
