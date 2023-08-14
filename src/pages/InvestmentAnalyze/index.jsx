import React, { useEffect } from 'react';

import withForbiddenWithoutBuyingPackage from 'hocs/withForbiddenWithoutBuyingPackage';
import { MetaTags } from 'react-meta-tags';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'reactstrap';

import { fetchInvestmentsAnalysis } from 'store/investments/actions';

import Breadcrumbs from '../../components/Common/Breadcrumb';
import AnalyzeTable from './components/AnalyzeTable';
import AnalyzeChart from './components/chart';

import { t } from '../../i18n';

const InvestmentAnalyze = () => {
  const dispatch = useDispatch();
  const investmentInfo = useSelector((state) => state.Investments.investmentAnalysis);

  useEffect(() => {
    dispatch(fetchInvestmentsAnalysis());
  }, [dispatch]);

  return (
    <div className="page-content min-vh-100">
      <MetaTags>
        <title>{t('sidebar_investments_analyze_label')}</title>
      </MetaTags>
      <Container fluid>
        <Breadcrumbs
          title="Metrics"
          hasBreadcrumbItem={false}
          breadcrumbItem={t('investments_analyze_title')}
        />

        <AnalyzeTable info={investmentInfo} />
        <AnalyzeChart data={investmentInfo.graphicData} />
      </Container>
    </div>
  );
};

export default withForbiddenWithoutBuyingPackage(InvestmentAnalyze);
