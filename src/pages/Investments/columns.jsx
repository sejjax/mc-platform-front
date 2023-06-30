import React from 'react';

import {
  addHeaderFormatterToTableColumns,
  headerFormatterCenteredTitle,
} from 'helpers/table_helper';

import { t } from '../../i18n';

export const columns = addHeaderFormatterToTableColumns(
  [
    {
      dataField: 'date',
      text: t('tables_title.date'),
      sort: true,
      attrs: {
        'data-label': t('tables_title.date'),
      },
      formatter: (row) => {
        const date = new Date(row);
        return <div>{date.toLocaleDateString()}</div>;
      },
    },
    {
      dataField: 'product',
      text: t('tables_title.product'),
      sort: true,
      attrs: {
        'data-label': t('tables_title.product'),
      },
    },
    {
      dataField: 'currency_amount',
      text: t('common_amount'),
      sort: true,
      sortFunc: (a, b, order) => {
        if (order === 'asc') {
          return a - b;
        }
        return b - a;
      },
      attrs: {
        'data-label': t('common_amount'),
      },
      formatter: (row) => {
        const roundedValue = Math.ceil(+row * 1000) / 1000;
        return <div>{roundedValue}</div>;
      },
    },
    {
      dataField: 'apy',
      text: t('tables_title.yearly_percentage'),
      sort: true,
      attrs: {
        'data-label': t('tables_title.yearly_percentage'),
      },
      formatter: (row) => {
        return <div>{row}%</div>;
      },
    },
    {
      dataField: 'investment_period',
      sort: true,
      text: t('tables_title.investment_period'),
      attrs: {
        'data-label': t('tables_title.investment_period'),
      },
    },
    {
      dataField: 'payment_period',
      sort: true,
      text: t('tables_title.payment_period'),
      attrs: {
        'data-label': t('tables_title.payment_period'),
      },
    },
    {
      dataField: 'earn_amount',
      text: t('tables_title.amount_in_received'),
      sort: true,
      attrs: {
        'data-label': t('tables_title.amount_in_received'),
      },
      formatter: (row) => {
        const roundedValue = Math.ceil(row * 1000) / 1000;
        return <div>{roundedValue}</div>;
      },
      sortFunc: (a, b, order) => {
        if (order === 'asc') {
          return a - b;
        }
        return b - a;
      },
    },
    {
      attrs: {
        'data-label': t('tables_title.address'),
      },
      sort: true,
      dataField: 'wallet_addr',
      text: t('tables_title.address'),
      classes: 'wallet__addr_col',
    },
  ],
  headerFormatterCenteredTitle,
);
