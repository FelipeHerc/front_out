import config from '../../utils/config';

// Action Types
const TYPES = {
  GET_CEL: 'services/GET_CEL',
  GET_CEL_SUCCESS: 'services/GET_CEL_SUCCESS',
  GET_CEL_ERROR: 'services/GET_CEL_ERROR',
};

const initialState = {
  loadedCel: false,
  loadingCel: false,
  errorCel: false,
  cel: [],
}

export const reducer = (
  state = initialState,
  { type, result }
) => {
  switch (type) {
    case TYPES.GET_CEL:
      return {
        ...state,
        loadingCel: true,
        loadedCel: false,
      };
    case TYPES.GET_CEL_SUCCESS:
      return {
        ...state,
        loadingCel: false,
        loadedCel: true,
        cel: result.data.data,
      };
    case TYPES.GET_CURRICULUM_ERROR:
      return {
        ...state,
        loadingCel: false,
        loadedCel: false,
        errorCel: true,
      };

    default:
      return state;
  }
};

export const getAllCel = () => {

  return (dispatch) => {
    dispatch({
      types: [
              TYPES.GET_CEL,
              TYPES.GET_CEL_SUCCESS,
              TYPES.GET_CEL_ERROR,
            ],
      promise: client => client.get(`${config.REACT_APP_BASE_URL}/cels`, { headers: { 'Access-Control-Allow-Origin': '*' } }),
    });
  };
};
