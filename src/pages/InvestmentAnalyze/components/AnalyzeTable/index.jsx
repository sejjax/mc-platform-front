import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { t } from '../../../../i18n';
import s from './AnalyzeTable.module.scss';

const roundNumber = (amount) => Number(Math.ceil(+amount * 1000) / 1000).toFixed(2);

const AnalyzeTable = ({ info }) => {
  const currency = useSelector((state) => state.Currency.currency);

  return (
    <div className={s.wrapper}>
      <div className={s.table}>
        <div className={classNames(s.item, s.yellow)}>
          <div className={s.label}>{t('investments_analyze_total_investments')}</div>
          <div className={s.value}>
            {roundNumber(info?.totalInvestments ?? 0)} {currency}
          </div>
        </div>
        <div className={classNames(s.item, s.yellow)}>
          <div className={s.label}>{t('investments_analyze_current_investments')}</div>
          <div className={s.value}>
            {roundNumber(info?.currentInvestments ?? 0)} {currency}
          </div>
        </div>
      </div>
      <div className={s.table}>
        <div className={classNames(s.item, s.green, s.fullWidth)}>
          <div className={s.textCenter}>{t('investments_analyze_final_profit')}</div>
        </div>
        <div className={classNames(s.item, s.green, s.fullWidth)}>
          <div className={s.textCenter}>
            {roundNumber(info?.finalProfit ?? 0)} {currency}
          </div>
        </div>
      </div>
      <div className={s.table}>
        <div className={classNames(s.item, s.blue)}>
          <div className={s.label}>{t('investments_analyze_total_income')}</div>
          <div className={s.value}>
            {roundNumber(info?.totalIncome ?? 0)} {currency}
          </div>
        </div>
        <div className={classNames(s.item, s.blue)}>
          <div className={s.label}>{t('investments_analyze_total_return')}</div>
          <div className={s.value}>
            {roundNumber(info?.totalInvestmentsReturn ?? 0)} {currency}
          </div>
        </div>
        <div className={classNames(s.item, s.blue)}>
          <div className={s.label}>{t('investments_analyze_total_payed')}</div>
          <div className={s.value}>
            {roundNumber(info?.totalPayed ?? 0)} {currency}
          </div>
        </div>
      </div>
      <div className={s.table}>
        <div className={classNames(s.item, s.lightGreen)}>
          <div className={s.label}>{t('investments_analyze_future_income')}</div>
          <div className={s.value}>
            {roundNumber(info?.futureIncome ?? 0)} {currency}
          </div>
        </div>
        <div className={classNames(s.item, s.lightGreen)}>
          <div className={s.label}>{t('investments_analyze_future_return')}</div>
          <div className={s.value}>
            {roundNumber(info?.futureInvestmentsReturn ?? 0)} {currency}
          </div>
        </div>
        <div className={classNames(s.item, s.lightGreen)}>
          <div className={s.label}>{t('investments_analyze_future_payed')}</div>
          <div className={s.value}>
            {roundNumber(info?.futurePayed ?? 0)} {currency}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyzeTable;
