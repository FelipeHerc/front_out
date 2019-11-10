import config from '../../utils/config';

// Action Types
const TYPES = {
  GET_CHIP: 'services/GET_CHIP',
  GET_CHIP_SUCCESS: 'services/GET_CHIP_SUCCESS',
  GET_CHIP_ERROR: 'services/GET_CHIP_ERROR',
};

const initialState = {
  loadedChip: false,
  loadingChip: false,
  errorChip: false,
  chip: [],
}

export const reducer = (
  state = initialState,
  { type, result }
) => {
  switch (type) {
    case TYPES.GET_CHIP:
      return {
        ...state,
        loadingChip: true,
        loadedChip: false,
      };
    case TYPES.GET_CHIP_SUCCESS:
      return {
        ...state,
        loadingChip: false,
        loadedChip: true,
        chip: result.data.data,
      };
    case TYPES.GET_CURRICULUM_ERROR:
      return {
        ...state,
        loadingChip: false,
        loadedChip: false,
        errorChip: true,
      };

    default:
      return state;
  }
};

export const getAllChip = () => {

  return (dispatch) => {
    dispatch({
      types: [
              TYPES.GET_CHIP,
              TYPES.GET_CHIP_SUCCESS,
              TYPES.GET_CHIP_ERROR,
            ],
      promise: client => client.get(`${config.REACT_APP_BASE_URL}/chips`, { headers: { 'Access-Control-Allow-Origin': '*' } }),
    });
  };
};
