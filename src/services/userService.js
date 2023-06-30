import { API_AUTH_ERROR, API_UNKNOWN_ERROR } from 'constants/layout';

import getUserPhoto from '../helpers/GetUserPhoto';
import { get, patch, post, postFormData } from '../helpers/api_helper';
import { t } from '../i18n';

class UserService {
  async userUpdate(body) {
    const payload = {
      ...body,
      country: body.country.value ?? '',
    };

    try {
      const response = await patch('/auth/me', payload);

      if (response.status >= 200 && response.status <= 299) {
        return response.data;
      }
    } catch (error) {
      if (error.response && error.response.data?.statusCode === 400) {
        throw t('common_invalid_data_error');
      }

      if (error.response && error.response.data?.statusCode === 401) {
        throw API_AUTH_ERROR;
      }

      throw API_UNKNOWN_ERROR;
    }
  }

  async getProfile() {
    return await get('users/me/profile');
  }

  async uploadPhoto(body) {
    try {
      const response = await postFormData('/users/me/upload', body);

      if (response.status >= 200 && response.status <= 299) {
        return response.data;
      }
    } catch (error) {
      if (error.response && error.response.data?.statusCode === 400) {
        throw t('user_profile_photo_upload_error_invalid_data');
      }

      if (error.response && error.response.data?.statusCode === 401) {
        throw API_AUTH_ERROR;
      }

      if (error.response && error.response.data?.statusCode === 413) {
        throw t('user_profile_photo_upload_error_max_size');
      }

      throw t('user_profile_photo_upload_unknown_error');
    }
  }

  async getPhoto() {
    try {
      return await getUserPhoto();
    } catch (e) {
      throw t('user_profile_photo_download_error');
    }
  }

  async updateWalletNumber(walletNumber) {
    const response = await post('/users/me/defaultWallet', {
      default_wallet_address: walletNumber,
    });
    return response.data;
  }

  async getDashBoardIncomeData() {
    const response = await get('/users/me/income');
    return response.data;
  }

  async setAgreement(agreement) {
    const response = await post('/users/me/agreement', {
      agreement,
    });
    return response.data;
  }
}

// eslint-disable-next-line
export default new UserService();
