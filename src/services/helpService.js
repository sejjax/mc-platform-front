import axios from 'axios';

const STRAPI_URL = process.env.REACT_APP_STRAPI_URL;
export async function getHelpInfo() {
  try {
    const response = await axios.get(`${STRAPI_URL}/page-help`);

    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
}
