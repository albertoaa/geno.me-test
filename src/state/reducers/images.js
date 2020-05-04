import {
  FETCH_IMAGES_BEGIN,
  FETCH_IMAGES_SUCCESS,
  FETCH_IMAGES_FAILURE,
} from '../actions/imagesActions';

const initialState = {
  trending: [],
  loading: false,
  error: null,
};

const images = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_IMAGES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_IMAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        trending: [...action.payload.images],
      };

    case FETCH_IMAGES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        trending: [],
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
};

export default images;
