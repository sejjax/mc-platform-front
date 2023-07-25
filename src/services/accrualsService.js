import { get } from 'helpers/api_helper';

export const fetchAccurals = async (payload) => {
  const accrual_type = payload.accrual_type ? `&accrual_type=${payload.accrual_type}` : '';
  const pagination = payload.pagination ? `&pagination=${payload.pagination}` : '';
  const status = payload.status ? `&status=${payload.status}` : '';
  const orderBy = payload.orderBy ? `&orderBy=${payload.orderBy}` : '';

  return await get(
    `calculations/${payload.type}?filters=${
      payload.filters
    }${pagination}${accrual_type}${orderBy}&locale=${payload.locale || 'en'}`,
  );
};

export const fetchAccrualsIncome = async () => {
  return await get(`calculations/income-for-period`);
};
