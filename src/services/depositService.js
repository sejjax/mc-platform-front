import { get, post } from 'helpers/api_helper';

export const sendDeposit = async (body) => {
  return (await post('transactions', body)).data;
};

export const fetchInvestorProAmount = () => get('user/deposit/investor_pro_amount');
