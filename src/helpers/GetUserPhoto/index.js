import getAuthUser from 'helpers/GetAuthUser';
import getImageReader from 'helpers/GetImageReader';
import { getImage } from 'helpers/api_helper';

const getUserPhoto = async () => {
  const { photo } = getAuthUser();

  try {
    const photoBlob = await getImage(photo.path);
    const result = await getImageReader(photoBlob);
    return result;
  } catch (error) {
    return null;
  }
};

export default getUserPhoto;
