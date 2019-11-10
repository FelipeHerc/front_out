import config from '../../utils/config';

// Action Types
const TYPES = {
  GET_STAT: 'services/GET_STAT',
  GET_STAT_SUCCESS: 'services/GET_STAT_SUCCESS',
  GET_STAT_ERROR: 'services/GET_STAT_ERROR',
};

const initialState = {
  loadedStat: false,
  loadingStat: false,
  errorStat: false,
  stat: [],
}

export const reducer = (
  state = initialState,
  { type, result }
) => {
  switch (type) {
    case TYPES.GET_STAT:
      return {
        ...state,
        loadingStat: true,
        loadedStat: false,
      };
    case TYPES.GET_STAT_SUCCESS:
      return {
        ...state,
        loadingStat: false,
        loadedStat: true,
        stat: result.data.data,
      };
    case TYPES.GET_CURRICULUM_ERROR:
      return {
        ...state,
        loadingStat: false,
        loadedStat: false,
        errorStat: true,
      };

    default:
      return state;
  }
};

export const getAllStat = () => {

  return (dispatch) => {
    dispatch({
      types: [
              TYPES.GET_STAT,
              TYPES.GET_STAT_SUCCESS,
              TYPES.GET_STAT_ERROR,
            ],
      promise: client => client.get(`${config.REACT_APP_BASE_URL}/stats`, { headers: { 'Access-Control-Allow-Origin': '*' } }),
    });
  };
};
