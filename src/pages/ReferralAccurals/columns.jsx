/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';

import {
  addHeaderFormatterToTableColumns,
  headerFormatterCenteredTitle,
} from 'helpers/table_helper';
import i18next from 'i18next';
import moment from 'moment/moment';

import ShortWallet from 'components/SharedAcrrualsPage/components/ShortWallet';

export const DISPLAYED_KEY_NAMES = {
  payment_date: 'Дата',
  referralFullName: 'Имя партнера',
  referralPartnerId: 'ID партнера',
  wallet_addr: 'Адрес кошелька',
  amount: 'Количество',
  percent: 'Процент',
  accrual_type: 'Тип',
  product: 'Продукт',
  status: 'Статус',
};

export const columns = (t, setSort) => [
  {
    dataField: 'payment_date',
    sort: true,
    text: i18next.t('tables_title.date'),
    attrs: {
      'data-label': t('tables_title.date'),
    },
    formatter: (row) => {
      return <div>{moment(row).format('DD.MM.YYYY')}</div>;
    },
    onSort: (field, order) => {
      setSort({ [field]: order.toUpperCase() });
    },
    headerFormatter: headerFormatterCenteredTitle,
  },
  {
    dataField: 'referralFullName',
    sort: true,
    text: t('tables_title.partner_name'),
    attrs: {
      'data-label': t('tables_title.partner_name'),
    },
    onSort: (field, order) => {
      setSort({ [field]: order.toUpperCase() });
    },
  },
  {
    dataField: 'referralPartnerId',
    sort: true,
    text: t('tables_title.partner_id'),
    attrs: {
      'data-label': t('tables_title.partner_id'),
    },
    onSort: (field, order) => {
      setSort({ [field]: order.toUpperCase() });
    },
  },
  {
    dataField: 'wallet_addr',
    text: t('tables_title.address'),
    sort: true,
    attrs: {
      'data-label': t('tables_title.address'),
    },
    classes: 'wallet__addr_col',
    formatter: (cell, row) => <ShortWallet id={row.id} wallet={cell} />,
    onSort: (field, order) => {
      setSort({ [field]: order.toUpperCase() });
    },
  },
  {
    dataField: 'amount',
    text: t('tables_title.amount'),
    sort: true,
    attrs: {
      'data-label': t('tables_title.amount'),
    },
    formatter: (row) => {
      const roundedValue = Math.ceil(row * 1000) / 1000;
      return <div className="text-bold">{roundedValue} USDT</div>;
    },
    onSort: (field, order) => {
      setSort({ [field]: order.toUpperCase() });
    },
    sortFunc: (a, b, order) => {
      if (order === 'asc') {
        return a - b;
      }
      return b - a;
    },
  },
  {
    dataField: 'percent',
    text: t('tables_title.percentage'),
    sort: true,
    attrs: {
      'data-label': t('tables_title.percentage'),
    },
    formatter: (row) => {
      return <div>{row}%</div>;
    },
    onSort: (field, order) => {
      setSort({ [field]: order.toUpperCase() });
    },
    sortFunc: (a, b, order) => {
      if (order === 'asc') {
        return a - b;
      }
      return b - a;
    },
  },
  {
    dataField: 'accrual_type',
    text: t('tables_title.type'),
    sort: true,
    attrs: {
      'data-label': t('tables_title.type'),
    },
    formatter: (row) => {
      const values = {
        product: t('tables_title.product_type'),
        referral: t('tables_title.referral_income'),
        upgrade: t('tables_title.upgrade'),
        passive: t('tables_title.passive'),
      };
      return <div>{values[row]}</div>;
    },
    onSort: (field, order) => {
      setSort({ [field]: order.toUpperCase() });
    },
  },
  {
    dataField: 'product',
    text: t('tables_title.product'),
    sort: true,
    attrs: {
      'data-label': t('tables_title.product'),
    },
    formatter: (row) => {
      return <div>{row.product}</div>;
    },
    onSort: (field, order) => {
      setSort({ [field]: order.toUpperCase() });
    },
  },
  {
    dataField: 'status',
    text: t('tables_title.status'),
    sort: true,
    attrs: {
      'data-label': t('tables_title.status'),
    },
    formatter: (row) => {
      const values = {
        sent: t('tables_title.sent'),
        waiting: t('tables_title.waiting'),
        error: t('tables_title.error'),
        nulled: t('tables_title.nulled'),
      };
      return <div>{values[row]}</div>;
    },
    formatExtraData: localStorage.getItem('I18N_LANGUAGE'),
    onSort: (field, order) => {
      setSort({ [field]: order.toUpperCase() });
    },
  },
];
