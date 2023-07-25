import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardBody, CardTitle, Row } from 'reactstrap';

import { getIncome } from 'store/actions';

import useTranslation from '../../hooks/useTranslation';
import IncomeChart from './IncomeChats/incomeChart';
import './sass/incomebyLevel.scss';
import './sass/notification.scss';

const IncomeByLevel = ({ income, onGetIncome }) => {
  const t = useTranslation();
  const structureLines = {
    1: t('dashboard_first_line'),
    2: t('dashboard_other_lines'),
  };

  const data = React.useMemo(() => {
    const partners = Object.values(income?.partners ?? {});
    const { basic = 0, investor = 0, investorPro = 0 } = income?.products ?? {};
    const totalProducts = +basic + +investor + +investorPro;
    const totalPartners = partners.reduce((acc, curr) => acc + +curr, 0);
    const total = totalProducts + totalPartners;

    const perc = (a, b) => (b === 0 ? 0 : Math.round((a / b) * 100));
    const round = (x) => +(+x).toFixed(2);

    return {
      total,
      partners: {
        totalPercent: perc(totalPartners, total),
        total: round(totalPartners),
        partners: partners.map((value, index) => ({
          id: index + 1,
          income: round(value),
          percent: perc(value, total),
        })),
      },
      products: {
        totalPercent: perc(totalProducts, total),
        total: round(totalProducts),
        products: [
          {
            name: t('dashboard_product.base'),
            income: round(basic),
            percent: perc(basic, total),
          },
          {
            name: t('dashboard_product.investor'),
            income: round(investor),
            percent: perc(investor, total),
          },
          {
            name: t('dashboard_product.investorPro'),
            income: round(investorPro),
            percent: perc(investorPro, total),
          },
        ],
      },
    };
  }, [income, t]);

  const { products, partners } = data;

  const [selectedMonth, setSelectedMont] = useState(new Date().getMonth());

  React.useEffect(() => {
    onGetIncome?.();
  }, [selectedMonth, onGetIncome]);

  let chartData, totalData;

  if (products && partners) {
    chartData = [
      ...partners.partners.map((el) => ({
        value: el.income,
        name: structureLines[el.id],
        key: 'fromPartners',
        percent: el.percent,
      })),
      ...products.products.map((el) => ({
        value: el.income,
        name: el.name,
        key: 'fromFinancialProducts',
        percent: el.percent,
      })),
    ];
    totalData = {
      total: data.total,
      product: {
        total: data.products.total,
        percent: data.products.totalPercent,
      },
      partners: {
        total: data.partners.total,
        percent: data.partners.totalPercent,
      },
    };
  }

  return (
    <Card className="same-height income__wrapper">
      <CardTitle>
        <div className="title">
          <h4 className="font-size-15">{t('dashboard_your_income')}</h4>
        </div>
      </CardTitle>
      <CardBody className="income__body_wrapper">
        <Row>{chartData && <IncomeChart chartData={chartData} totalData={totalData} />}</Row>
      </CardBody>
    </Card>
  );
};

IncomeByLevel.propTypes = {
  income: PropTypes.any,
  onGetIncome: PropTypes.func,
};

const mapStateToProps = (state) => ({
  income: state.Dashboard.income,
});

const mapDispatchToProps = (dispatch) => ({
  onGetIncome: () => dispatch(getIncome()),
});

export default connect(mapStateToProps, mapDispatchToProps)(IncomeByLevel);
