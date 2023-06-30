import getAuthToken from 'helpers/GetAuthToken';
import getAuthUser from 'helpers/GetAuthUser';

const updateAuthUser = async (payload) => {
  try {
    const accessToken = getAuthToken();
    const user = getAuthUser();

    const update = payload.accessToken
      ? { ...payload }
      : { accessToken, user: { ...user, ...payload } };

    if (localStorage.getItem('authUser')) {
      localStorage.setItem('authUser', JSON.stringify(update));
    } else {
      sessionStorage.setItem('authUser', JSON.stringify(update));
    }
  } catch (error) {
    throw error;
  }
};

export default updateAuthUser;
