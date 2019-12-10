import config from '../../utils/config';

// Action Types
const TYPES = {
  GET_CITY: 'services/GET_CITY',
  GET_CITY_SUCCESS: 'services/GET_CITY_SUCCESS',
  GET_CITY_ERROR: 'services/GET_CITY_ERROR',
};

const initialState = {
  loadedCity: false,
  loadingCity: false,
  errorCity: false,
  city: [],
}

export const reducer = (
  state = initialState,
  { type, result }
) => {
  switch (type) {
    case TYPES.GET_CITY:
      return {
        ...state,
        loadingCity: true,
        loadedCity: false,
      };
    case TYPES.GET_CITY_SUCCESS:
      return {
        ...state,
        loadingCity: false,
        loadedCity: true,
        city: result.data.data,
      };
    case TYPES.GET_CURRICULUM_ERROR:
      return {
        ...state,
        loadingCity: false,
        loadedCity: false,
        errorCity: true,
      };

    default:
      return state;
  }
};

export const getAllCity = () => {

  return (dispatch) => {
    dispatch({
      types: [
              TYPES.GET_CITY,
              TYPES.GET_CITY_SUCCESS,
              TYPES.GET_CITY_ERROR,
            ],
      promise: client => client.get(`${config.REACT_APP_BASE_URL}/cities`, { headers: { 'Access-Control-Allow-Origin': '*' } }),
    });
  };
};
