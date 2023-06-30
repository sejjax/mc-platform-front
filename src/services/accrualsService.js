import { get } from 'helpers/api_helper';

export const fetchAccurals = async (type) => {
  const data = await get(`calculations/${type}`);
  return data;
};
