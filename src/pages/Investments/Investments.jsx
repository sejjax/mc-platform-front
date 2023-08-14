import React, { useEffect, useMemo, useState } from 'react';

import withForbiddenWithoutBuyingPackage from 'hocs/withForbiddenWithoutBuyingPackage';
import { Trans } from 'react-i18next';
import { MetaTags } from 'react-meta-tags';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, Container, Input, Label } from 'reactstrap';

import { fetchInvestments, fetchInvestmentsSummary } from 'store/investments/actions';

import Breadcrumbs from '../../components/Common/Breadcrumb';
import PaginationComponent from '../../components/PaginationComponent';
import DepositDetailsModal from './components/DepositDetailsModal/DepositDetailsModal';
import Table from 'components/AnotherTable/Table';

import useTranslation from '../../hooks/useTranslation';
import { columns } from './columns';

const Investments = () => {
  const t = useTranslation();
  const language = useSelector((state) => state.Layout.language);
  const currency = useSelector((state) => state.Currency.currency);
  const items = useSelector((state) => state.Investments.items);
  const investmentSummary = useSelector((state) => state.Investments.investmentSummary);
  const [isOpenId, setIsOpenId] = useState(false);
  const [showClosed, setShowClosed] = useState(false);
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({});

  const filteredItems = useMemo(() => {
    const data = [...(items?.items || [])];

    if (showClosed) {
      return data;
    } else {
      return data.filter((item) => !item.isClosed);
    }

    return [];
  }, [items, showClosed]);

  useEffect(() => {
    dispatch(fetchInvestments());
    dispatch(fetchInvestmentsSummary());
  }, [dispatch]);

  useEffect(() => {
    if (pagination?.pageNumber) {
      dispatch(
        fetchInvestments({
          pagination: JSON.stringify({
            take: pagination?.size,
            skip: (pagination?.pageNumber - 1) * pagination?.size,
          }),
          filters: JSON.stringify({
            isClosed: showClosed,
          }),
          locale: language,
        }),
      );
    }
  }, [dispatch, language, pagination, showClosed]);

  return (
    <div className="page-content">
      <MetaTags>
        <title>{t('investments_meta_title')}</title>
      </MetaTags>
      <Container fluid>
        <div className="d-flex align-items-center justify-content-between">
          <Breadcrumbs
            title="Metrics"
            hasBreadcrumbItem={false}
            breadcrumbItem={t('sidebar_investments_label')}
          />
          <div className="text-end d-flex justify-content-center">
            <div className="summary">
              <div>
                <div className="summary-item">
                  <Trans
                    i18nKey="investments_summary_total_amount"
                    components={{ text: <p /> }}
                    values={{
                      amount: investmentSummary?.totalInvestedAmount || '-',
                      currency,
                    }}
                  />
                </div>
                <div className="summary-item">
                  <Trans
                    i18nKey="investments_summary_total_payed"
                    components={{ text: <p /> }}
                    values={{
                      amount: investmentSummary?.totalPayedAmount || '-',
                      currency,
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="summary-item">
                  <Trans
                    i18nKey="investments_summary_current_amount"
                    components={{ text: <p /> }}
                    values={{
                      amount: investmentSummary?.currentInvestmentAmount || '-',
                      currency,
                    }}
                  />
                </div>
                <div className="summary-item">
                  <Trans
                    i18nKey="investments_summary_pay_ready_amount"
                    components={{ text: <p /> }}
                    values={{
                      amount: investmentSummary?.payReadyAmount || '-',
                      currency,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Card>
          <CardBody>
            <div className="d-flex w-100 justify-content-end">
              <div style={{ marginLeft: 'auto' }}>
                <Label>
                  <Input
                    type="checkbox"
                    checked={showClosed}
                    onChange={(event) => setShowClosed(event.target.checked)}
                    className="me-1"
                  />
                  {t('investments_show_closed')}
                </Label>
              </div>
            </div>
            <Table
              keyField="id"
              columns={columns(t, setIsOpenId)}
              data={filteredItems}
              custom={{
                classes: 'table__adaptive_bordered_between text-center',
                defaultSorted: [{ dataField: 'date', order: 'asc' }],
              }}
            />
            <PaginationComponent
              active={pagination?.pageNumber}
              setPagination={setPagination}
              total={items?.totalPagesCount}
            />
          </CardBody>
        </Card>
      </Container>
      <DepositDetailsModal isOpenId={isOpenId} setIsOpenId={setIsOpenId} />
    </div>
  );
};

export default withForbiddenWithoutBuyingPackage(Investments);
