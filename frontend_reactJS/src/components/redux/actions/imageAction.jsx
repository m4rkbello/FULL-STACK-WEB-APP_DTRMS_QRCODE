/* eslint-disable no-unused-vars */
import MarkBelloAPI from '../../../services/Api.jsx';
import {
  FETCH_IMAGES_REQUEST,
  FETCH_IMAGES_SUCCESS,
  FETCH_IMAGES_FAILURE,
  ADD_IMAGE_REQUEST,
  ADD_IMAGE_SUCCESS,
  ADD_IMAGE_FAILURE,
  UPDATE_IMAGE_REQUEST,
  UPDATE_IMAGE_SUCCESS,
  UPDATE_IMAGE_FAILURE,
  DELETE_IMAGE_REQUEST,
  DELETE_IMAGE_SUCCESS,
  DELETE_IMAGE_FAILURE
} from '../../redux/types/imageTypes.jsx';

// Action creators for fetching images

export const fetchImages = () => async dispatch => {
  try {
    dispatch({ type: FETCH_IMAGES_REQUEST });
    // Perform async operation, e.g., fetch data from an API
    const users = await MarkBelloAPI.get('/api/images');
    dispatch({
      type: FETCH_IMAGES_SUCCESS,
      payload: users
    });
  } catch (error) {
    dispatch({
      type: FETCH_IMAGES_FAILURE,
      payload: error.message
    });
  }
};



const fetchImagesRequest = () => ({
  type: FETCH_IMAGES_REQUEST
});

const fetchImagesSuccess = (images) => ({
  type: FETCH_IMAGES_SUCCESS,
  payload: images
});

const fetchImagesFailure = (error) => ({
  type: FETCH_IMAGES_FAILURE,
  payload: error
});

// Action creators for adding image
export const addImage = (image) => {
  return async (dispatch) => {
    dispatch(addImageRequest());
    try {
      const response = await fetch('/api/images', {
        method: 'POST',
        body: JSON.stringify(image),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      dispatch(addImageSuccess(data));
    } catch (error) {
      dispatch(addImageFailure(error.message));
    }
  };
};

const addImageRequest = () => ({
  type: ADD_IMAGE_REQUEST
});

const addImageSuccess = (image) => ({
  type: ADD_IMAGE_SUCCESS,
  payload: image
});

const addImageFailure = (error) => ({
  type: ADD_IMAGE_FAILURE,
  payload: error
});

// Action creators for updating image
export const updateImage = (id, updatedImage) => {
  return async (dispatch) => {
    dispatch(updateImageRequest());
    try {
      const response = await fetch(`/api/images/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedImage),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      dispatch(updateImageSuccess(id, data));
    } catch (error) {
      dispatch(updateImageFailure(error.message));
    }
  };
};

const updateImageRequest = () => ({
  type: UPDATE_IMAGE_REQUEST
});

const updateImageSuccess = (id, updatedImage) => ({
  type: UPDATE_IMAGE_SUCCESS,
  payload: { id, updatedImage }
});

const updateImageFailure = (error) => ({
  type: UPDATE_IMAGE_FAILURE,
  payload: error
});

// Action creators for deleting image
export const deleteImage = (id) => {
  return async (dispatch) => {
    dispatch(deleteImageRequest());
    try {
      await fetch(`/api/images/${id}`, {
        method: 'DELETE'
      });
      dispatch(deleteImageSuccess(id));
    } catch (error) {
      dispatch(deleteImageFailure(error.message));
    }
  };
};

const deleteImageRequest = () => ({
  type: DELETE_IMAGE_REQUEST
});

const deleteImageSuccess = (id) => ({
  type: DELETE_IMAGE_SUCCESS,
  payload: id
});

const deleteImageFailure = (error) => ({
  type: DELETE_IMAGE_FAILURE,
  payload: error
});
