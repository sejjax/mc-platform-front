import React, { useCallback, useMemo, useState } from 'react';

import PropTypes from 'prop-types';
import Cropper from 'react-easy-crop';
import { useDispatch } from 'react-redux';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

import { uploadPhoto, uploadPhotoError } from 'store/auth/photo/upload/actions';

import getCroppedImg from './cropImage';

const PhotoEditorModal = ({ toggle, isOpen, photo, photoType, setPhotoPreview }) => {
  const dispatch = useDispatch();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    const formData = new FormData();

    try {
      const croppedImage = await getCroppedImg(photo, photoType, croppedAreaPixels);
      const photoPreview = await getCroppedImg(photo, photoType, croppedAreaPixels, true);

      setPhotoPreview(photoPreview);

      formData.append('photo', croppedImage, croppedImage.name);
    } catch (e) {
      toggle(false);
      setPhotoPreview(null);
      dispatch(uploadPhotoError('Incorrect image format'));

      return false;
    }

    if (formData.has('photo')) {
      dispatch(uploadPhoto(formData));
    } else {
      dispatch(uploadPhotoError('Incorrect image format'));
      setPhotoPreview(null);
    }

    toggle(false);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalBody>
        <div className="modal-header">
          <h5 className="modal-title mt-0" id="myModalLabel">
            Edit Photo
          </h5>
          <button
            type="button"
            onClick={() => {
              toggle(false);
              setPhotoPreview(null);
            }}
            className="close"
            data-dismiss="modal"
            aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div
            style={{
              minHeight: '400px',
            }}>
            <Cropper
              image={photo}
              crop={crop}
              zoom={zoom}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              aspect={1}
              cropSize={{
                width: 250,
                height: 250,
              }}
              showGrid={false}
              cropShape="round"
            />
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            onClick={() => {
              toggle(false);
              setPhotoPreview(null);
            }}
            className="btn btn-secondary "
            data-dismiss="modal">
            Close
          </button>
          <button onClick={handleSave} type="button" className="btn btn-primary ">
            Save changes
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

PhotoEditorModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  photo: PropTypes.string,
  photoType: PropTypes.string,
  setPhotoPreview: PropTypes.func,
};

export default PhotoEditorModal;
