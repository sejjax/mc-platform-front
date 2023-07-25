import React, { useEffect, useState } from 'react';

import withForbiddenWithoutBuyingPackage from 'hocs/withForbiddenWithoutBuyingPackage';
import { Trans } from 'react-i18next';
import { MetaTags } from 'react-meta-tags';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'reactstrap';

import { fetchAccruals, fetchAccrualsIncome } from 'store/accruals/actions';

import Breadcrumbs from '../../components/Common/Breadcrumb';
import SharedAccrualsPage from 'components/SharedAcrrualsPage/SharedAccrualsPage';

import useTranslation from '../../hooks/useTranslation';
import { DISPLAYED_KEY_NAMES, columns } from './columns';

const DepositAccruals = () => {
  const t = useTranslation();
  const currency = useSelector((state) => state.Currency.currency);
  const items = useSelector((state) => state.Accruals.items);
  const income = useSelector((state) => state.Accruals.income);
  const language = useSelector((state) => state.Layout.language);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    startDate: '',
    endDate: '',
    sendet: false,
    nulled: false,
    pageNumber: 1,
    size: 25,
  });
  const [sort, setSort] = useState({});

  useEffect(() => {
    if (filter?.startDate && filter?.endDate) {
      dispatch(
        fetchAccruals({
          type: 'deposit',
          filters: JSON.stringify({
            dateFrom: new Date(filter.startDate).toISOString(),
            dateTo: new Date(filter.endDate).toISOString(),
            status: [
              filter?.sendet ? 'sent' : null,
              filter?.nulled ? 'nulled' : null,
              'error',
              'waiting',
            ].filter((item) => !!item),
            ...(filter?.productId > 0 && { productId: Number(filter.productId) }),
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
  }, [dispatch, filter, sort, language]);

  useEffect(() => {
    dispatch(fetchAccrualsIncome());
  }, [dispatch]);

  return (
    <div className="page-content min-vh-100">
      <MetaTags>
        <title>{t('project_accruals_meta_title')}</title>
      </MetaTags>
      <Container fluid>
        <div className="d-flex align-items-center justify-content-between summary-wrapper">
          <Breadcrumbs
            title="Metrics"
            hasBreadcrumbItem={false}
            breadcrumbItem={t('project_accruals_title')}
          />
          <div>
            <div className="summary align-items-start">
              <div>
                <div className="summary-item">
                  <Trans
                    i18nKey="accruals_income_current_week"
                    components={{ text: <p /> }}
                    values={{
                      amount: income?.currentWeekIncome || 0,
                      currency,
                    }}
                  />
                </div>
                <div className="summary-item">
                  <Trans
                    i18nKey="accruals_income_current_month"
                    components={{ text: <p /> }}
                    values={{
                      amount: income?.currentMonthIncome || 0,
                      currency,
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="summary-item">
                  <Trans
                    i18nKey="accruals_income_next_month"
                    components={{ text: <p /> }}
                    values={{
                      amount: income?.nextMonthIncome || 0,
                      currency,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <SharedAccrualsPage
          items={items?.items || []}
          columns={columns(t, setSort)}
          displayedKeyNames={DISPLAYED_KEY_NAMES}
          depositType="deposit"
          setFilter={setFilter}
          filter={filter}
          accrualsType="deposit"
          setSort={setSort}
          totalPages={items?.totalPagesCount}
        />
      </Container>
    </div>
  );
};

export default withForbiddenWithoutBuyingPackage(DepositAccruals);
