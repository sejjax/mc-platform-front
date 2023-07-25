import { get } from 'helpers/api_helper';

export const fetchInvestments = async (payload) => {
  return await get(
    `user/deposit?pagination=${payload.pagination || ''}&filters=${payload.filters}&locale=${
      payload.locale || 'en'
    }`,
  );
};

export const fetchInvestmentsSummary = async () => {
  return await get('user/deposit/investment-summary');
};
