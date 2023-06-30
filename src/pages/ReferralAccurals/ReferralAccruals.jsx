// import Table from "components/Table/Table"
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

export const ReferralAccruals = () => {
  const items = useSelector((state) => state.Accruals.items);
  const dispatch = useDispatch();

  const formattedItems = items.map(({ userPartner, ...otherFields }) => ({
    ...otherFields,
    referralPartnerId: userPartner?.partnerId ?? '',
    referralFullName: userPartner?.fullName ?? '',
  }));

  useEffect(() => {
    dispatch(fetchAccruals('referrals'));
  }, []);

  return (
    <div className="page-content">
      <MetaTags>
        <title>{t('referrals_meta_title')}</title>
      </MetaTags>
      <Container fluid>
        <Breadcrumbs
          title="Metrics"
          hasBreadcrumbItem={false}
          breadcrumbItem={t('sidebar_referral_accruals_label')}
        />
        <SharedAccrualsPage
          items={formattedItems}
          columns={columns}
          displayedKeyNames={DISPLAYED_KEY_NAMES}
        />
      </Container>
    </div>
  );
};

export default withForbiddenWithoutBuyingPackage(ReferralAccruals);
