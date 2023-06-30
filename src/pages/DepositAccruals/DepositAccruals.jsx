import React, { useEffect } from 'react';

import withForbiddenWithoutBuyingPackage from 'hocs/withForbiddenWithoutBuyingPackage';
import { MetaTags } from 'react-meta-tags';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'reactstrap';

import { fetchAccruals } from 'store/accruals/actions';

import Breadcrumbs from '../../components/Common/Breadcrumb';
import SharedAccrualsPage from 'components/SharedAcrrualsPage/SharedAccrualsPage';

import { t } from '../../i18n';
import { DISPLAYED_KEY_NAMES, columns } from './columns';

const DepositAccruals = () => {
  const items = useSelector((state) => state.Accruals.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAccruals('deposit'));
  }, []);

  return (
    <div className="page-content">
      <MetaTags>
        <title>{t('project_accruals_meta_title')}</title>
      </MetaTags>
      <Container fluid>
        <Breadcrumbs
          title="Metrics"
          hasBreadcrumbItem={false}
          breadcrumbItem={t('project_accruals_title')}
        />
        <SharedAccrualsPage
          items={items}
          columns={columns}
          displayedKeyNames={DISPLAYED_KEY_NAMES}
        />
      </Container>
    </div>
  );
};

export default withForbiddenWithoutBuyingPackage(DepositAccruals);
