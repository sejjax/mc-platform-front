/* eslint-disable react/jsx-no-undef */
import React from 'react';

import {
  addHeaderFormatterToTableColumns,
  headerFormatterCenteredTitle,
} from 'helpers/table_helper';
import i18next from 'i18next';

import ShortWallet from 'components/SharedAcrrualsPage/components/ShortWallet';

export const DISPLAYED_KEY_NAMES = {
  payment_date: i18next.t('tables_title.date'),
  partnerFullName: i18next.t('tables_title.partner_name'),
  partnerId: i18next.t('tables_title.partner_id'),
  wallet_addr: i18next.t('tables_title.address'),
  amount: i18next.t('tables_title.amount'),
  percent: i18next.t('tables_title.percentage'),
  accrual_type: i18next.t('tables_title.type'),
  product: i18next.t('tables_title.product'),
  status: i18next.t('tables_title.status'),
  packageLevel: i18next.t('tables_title.package_number'),
};

export const columns = (t, setSort) =>
  addHeaderFormatterToTableColumns(
    [
      {
        dataField: 'payment_date',
        text: t('tables_title.date'),
        sort: true,
        attrs: {
          'data-label': t('tables_title.date'),
        },
        formatter: (row) => {
          return <div>{row.split('-').reverse().join('.')}</div>;
        },
        onSort: (field, order) => {
          setSort((prev) => ({ ...prev, [field]: order.toUpperCase() }));
        },
      },
      {
        dataField: 'wallet_addr',
        sort: true,
        text: t('tables_title.address'),
        attrs: {
          'data-label': t('tables_title.address'),
        },
        classes: 'wallet__addr_col',
        formatter: (cell, row) => <ShortWallet id={row.id} wallet={cell} />,
        onSort: (field, order) => {
          setSort((prev) => ({ ...prev, [field]: order.toUpperCase() }));
        },
      },
      {
        dataField: 'product.guid',
        text: t('tables_title.package_number'),
        sort: true,
        attrs: {
          'data-label': t('tables_title.package_number'),
        },
        onSort: (field, order) => {
          setSort((prev) => ({ ...prev, id: order.toUpperCase() }));
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
        sortFunc: (a, b, order) => {
          if (order === 'asc') {
            return a - b;
          }
          return b - a;
        },
        onSort: (field, order) => {
          setSort((prev) => ({ ...prev, [field]: order.toUpperCase() }));
        },
      },
      {
        sort: true,
        dataField: 'percent',
        text: t('tables_title.percentage'),
        attrs: {
          'data-label': t('tables_title.percentage'),
        },
        formatter: (row) => {
          return <div>{row}%</div>;
        },
        onSort: (field, order) => {
          setSort((prev) => ({ ...prev, [field]: order.toUpperCase() }));
        },
      },
      {
        dataField: 'accrual_type',
        sort: true,
        text: t('tables_title.type'),
        attrs: {
          'data-label': t('tables_title.type'),
        },
        formatter: (row) => {
          const values = {
            product: t('tables_title.product_type'),
            referral: t('tables_title.referral'),
            upgrade: t('tables_title.upgrade'),
            passive: t('tables_title.passive'),
          };
          return <div>{values[row]}</div>;
        },
        onSort: (field, order) => {
          setSort((prev) => ({ ...prev, [field]: order.toUpperCase() }));
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
          setSort((prev) => ({ ...prev, [field]: order.toUpperCase() }));
        },
      },
      {
        dataField: 'status',
        text: t('tables_title.status'),
        sort: true,
        onSort: (field, order) => {
          setSort((prev) => ({ ...prev, [field]: order.toUpperCase() }));
        },
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
      },
    ],
    headerFormatterCenteredTitle,
  );
