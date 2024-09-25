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
  
  const initialState = {
    images: [],
    loading: false,
    updating: false, // New flag to track update operation
    lastFetched: null,
    error: null
  };
  
  const imageReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_IMAGES_REQUEST:
        return {
          ...state,
          loading: true
        };
      case FETCH_IMAGES_SUCCESS:
        return {
          ...state,
          loading: false,
          images: action.payload,
          error: null
        };
      case FETCH_IMAGES_FAILURE:
        return {
          ...state,
          loading: false,
          lastFetched: Date.now(),
          error: action.payload
        };
      case ADD_IMAGE_REQUEST:
        return {
          ...state,
          loading: true
        };
      case ADD_IMAGE_SUCCESS:
        return {
          ...state,
          loading: false,
          images: [...state.images, action.payload],
          error: null
        };
      case ADD_IMAGE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      case UPDATE_IMAGE_REQUEST:
        return {
          ...state,
          updating: true // Set updating flag to true
        };
      case UPDATE_IMAGE_SUCCESS:
        return {
          ...state,
          updating: false, // Set updating flag to false
          images: state.images.map(image =>
            image.id === action.payload.id ? action.payload.updatedImage : image
          ),
          error: null
        };
      case UPDATE_IMAGE_FAILURE:
        return {
          ...state,
          updating: false, // Set updating flag to false
          error: action.payload
        };
      case DELETE_IMAGE_REQUEST:
        return {
          ...state,
          loading: true
        };
      case DELETE_IMAGE_SUCCESS:
        return {
          ...state,
          loading: false,
          images: state.images.filter(image => image.id !== action.payload),
          error: null
        };
      case DELETE_IMAGE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default imageReducer;
  