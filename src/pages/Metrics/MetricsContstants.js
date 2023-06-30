import React from 'react';

import { roundToDynamicNumbers } from 'helpers/Utils';
import { addHeaderFormatterToTableColumns } from 'helpers/table_helper';

import CountryFlag from 'pages/Team/components/CountryFlag';

import { countryName } from 'constants/countries';

import { t } from '../../i18n';

export const metricsTableNavItems = ['day', 'week', 'month', 'year'];
export const metricsNavDisplayedTitles = {
  day: t('common_day'),
  week: t('common_week'),
  month: t('common_month'),
  year: t('common_year'),
};

export const projectsTable = addHeaderFormatterToTableColumns([
  {
    dataField: 'title',
    text: t('tables_title.title'),
    sort: true,
    attrs: {
      'data-label': t('tables_title.title'),
    },
  },
  {
    dataField: 'projectIncome',
    text: t('tables_title.revenue'),
    sort: true,
    attrs: {
      'data-label': t('tables_title.revenue'),
    },
    formatter(row) {
      return <>{roundToDynamicNumbers(row, 100)}</>;
    },
  },
  {
    dataField: 'amountToPay',
    text: t('tables_title.to_pay'),
    sort: true,
    attrs: {
      'data-label': t('tables_title.to_pay'),
    },
    formatter(row) {
      return <>{roundToDynamicNumbers(row, 100)}</>;
    },
  },
  {
    dataField: 'depositCount',
    text: t('tables_title.deposit_count'),
    sort: true,
    attrs: {
      'data-label': t('tables_title.deposit_count'),
    },
  },
  {
    dataField: 'projectPayments',
    text: t('tables_title.payments'),
    sort: true,
    attrs: {
      'data-label': t('tables_title.payments'),
    },
    formatter(row) {
      return <>{roundToDynamicNumbers(row, 100)}</>;
    },
  },
]);
export const usersTable = addHeaderFormatterToTableColumns([
  {
    dataField: 'fio',
    text: t('tables_title.full_name'),
    sort: true,
    attrs: {
      'data-label': t('tables_title.full_name'),
    },
  },
  {
    dataField: 'mobile',
    text: t('common_phone'),
    sort: true,
    attrs: {
      'data-label': t('common_phone'),
    },
  },
  {
    dataField: 'country',
    text: t('tables_title.country'),
    sort: true,
    attrs: {
      'data-label': t('tables_title.country'),
    },
    formatter(row) {
      return <CountryFlag countryCode={row} title={countryName[row]} />;
    },
  },
  {
    dataField: 'referralsCount',
    text: t('tables_title.partners_count'),
    sort: true,
    attrs: {
      'data-label': t('tables_title.partners_count'),
    },
  },
  {
    dataField: 'teamDeposit',
    text: t('team_profitability'),
    sort: true,
    attrs: {
      'data-label': t('team_profitability'),
    },
    formatter(row) {
      return <>{roundToDynamicNumbers(row, 100)}</>;
    },
  },
  {
    dataField: 'depositAmount',
    text: t('tables_title.funds_investment'),
    sort: true,
    attrs: {
      'data-label': t('tables_title.funds_investment'),
    },
    formatter(row) {
      return <>{roundToDynamicNumbers(row, 100)}</>;
    },
  },
  {
    dataField: 'productIncome',
    text: t('tables_title.products_income'),
    sort: true,
    attrs: {
      'data-label': t('tables_title.products_income'),
    },
    formatter(row) {
      return <>{roundToDynamicNumbers(row, 100)}</>;
    },
  },
  {
    dataField: 'referralsIncome',
    text: t('tables_title.partners_income'),
    sort: true,
    attrs: {
      'data-label': t('tables_title.partners_income'),
    },
    formatter(row) {
      return <>{roundToDynamicNumbers(row, 100)}</>;
    },
  },
]);

export const pageOptions = {
  sizePerPage: 100,
  custom: true,
  sizePerPageList: [
    {
      text: '10',
      value: 10,
    },
    {
      text: '25',
      value: 25,
    },
    {
      text: '50',
      value: 50,
    },
    {
      text: '100',
      value: 100,
    },
  ],
};
