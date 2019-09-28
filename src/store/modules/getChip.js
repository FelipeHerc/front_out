// Action Types
const TYPES = {
  GET_CHIP: 'services/GET_CHIP',
  GET_CHIP_SUCCESS: 'services/GET_CHIP_SUCCESS',
  GET_CHIP_ERROR: 'services/GET_CHIP_ERROR',
};

const initialState = {
  loaded: false,
  loading: false,
  error: false,
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
        loading: true,
        loaded: false,
      };
    case TYPES.GET_CHIP_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        chip: result.data.data,
      };
    case TYPES.GET_CURRICULUM_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: true,
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
      promise: client => client.get('http://localhost:3000/chips', { headers: { 'Access-Control-Allow-Origin': '*' } }),
    });
  };
};
