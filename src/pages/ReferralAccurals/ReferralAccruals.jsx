// import Table from "components/Table/Table"
import React, { useEffect, useState } from 'react';

import withForbiddenWithoutBuyingPackage from 'hocs/withForbiddenWithoutBuyingPackage';
import { MetaTags } from 'react-meta-tags';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'reactstrap';

import { fetchAccruals } from 'store/accruals/actions';

import Breadcrumbs from '../../components/Common/Breadcrumb';
import SharedAccrualsPage from 'components/SharedAcrrualsPage/SharedAccrualsPage';

import useTranslation from '../../hooks/useTranslation';
import { DISPLAYED_KEY_NAMES, columns } from './columns';
import { getAccrualsType } from './utils';

export const ReferralAccruals = () => {
  const t = useTranslation();
  const items = useSelector((state) => state.Accruals.items);
  const language = useSelector((state) => state.Layout.language);
  const dispatch = useDispatch();
  const [isPassiveAccruals, setIsPassiveAccruals] = useState(false);
  const [filter, setFilter] = useState({
    startDate: '',
    endDate: '',
    sendet: false,
    nulled: false,
    pageNumber: 1,
    size: 25,
  });
  const [sort, setSort] = useState({ payment_date: 'ASC' });

  const formattedItems = items?.items?.map(({ userPartner, ...otherFields }) => ({
    ...otherFields,
    referralPartnerId: userPartner?.partnerId ?? '',
    referralFullName: userPartner?.fullName ?? '',
  }));

  useEffect(() => {
    if (filter?.startDate && filter?.endDate) {
      dispatch(
        fetchAccruals({
          type: 'referrals',
          filters: JSON.stringify({
            dateFrom: new Date(filter.startDate).toISOString(),
            dateTo: new Date(filter.endDate).toISOString(),
            accrual_type: getAccrualsType(isPassiveAccruals),
            status: [
              filter?.sendet ? 'sent' : null,
              filter?.nulled ? 'nulled' : null,
              'error',
              'waiting',
            ].filter((item) => !!item),
          }),
          pagination: JSON.stringify({
            take: filter?.size,
            skip: (filter?.pageNumber - 1) * filter?.size,
          }),
          orderBy: JSON.stringify(sort),
          locale: language,
        }),
      );
    }
  }, [dispatch, filter, isPassiveAccruals, sort, language]);

  return (
    <div className="page-content  min-vh-100">
      <MetaTags>
        <title>{t('referrals_meta_title')}</title>
      </MetaTags>
      <Container fluid>
        <Breadcrumbs
          title="Metrics"
          hasBreadcrumbItem={false}
          breadcrumbItem={t(
            isPassiveAccruals
              ? 'sidebar_passive_accruals_label'
              : 'sidebar_referral_accruals_label',
          )}
        />
        <SharedAccrualsPage
          items={formattedItems || []}
          columns={columns(t, setSort)}
          displayedKeyNames={DISPLAYED_KEY_NAMES}
          accrualsType="referrals"
          isPassiveAccruals={isPassiveAccruals}
          setIsPassiveAccruals={setIsPassiveAccruals}
          setFilter={setFilter}
          filter={filter}
          totalPages={items?.totalPagesCount}
        />
      </Container>
    </div>
  );
};

export default withForbiddenWithoutBuyingPackage(ReferralAccruals);
