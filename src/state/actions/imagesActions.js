const apiURL = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_GIPHY_APP_KEY;

export const FETCH_IMAGES_BEGIN = 'FETCH_IMAGES_BEGIN';
export const FETCH_IMAGES_SUCCESS = 'FETCH_IMAGES_SUCCESS';
export const FETCH_IMAGES_FAILURE = 'FETCH_IMAGES_FAILURE';

export function fetchImages(offset = 0, text) {
  const query =
    text.length === 0
      ? `${apiURL}/trending?api_key=${apiKey}&offset=${offset}`
      : `${apiURL}/search?api_key=${apiKey}&q=${text}`;
  return (dispatch) => {
    dispatch(fetchImagesBegin());
    return fetch(`${query}`)
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchImagesSuccess(json.data));
        return json.data;
      })
      .catch((error) => dispatch(fetchImagesFailure(error)));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const fetchImagesBegin = () => ({
  type: FETCH_IMAGES_BEGIN,
});

export const fetchImagesSuccess = (images) => ({
  type: FETCH_IMAGES_SUCCESS,
  payload: { images },
});

export const fetchImagesFailure = (error) => ({
  type: FETCH_IMAGES_FAILURE,
  payload: { error },
});

export default {
  fetchImages,
  fetchImagesBegin,
  fetchImagesSuccess,
  fetchImagesFailure,
};
