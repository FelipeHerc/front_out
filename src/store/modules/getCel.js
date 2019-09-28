// Action Types
const TYPES = {
  GET_CEL: 'services/GET_CEL',
  GET_CEL_SUCCESS: 'services/GET_CEL_SUCCESS',
  GET_CEL_ERROR: 'services/GET_CEL_ERROR',
};

const initialState = {
  loaded: false,
  loading: false,
  error: false,
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
        loading: true,
        loaded: false,
      };
    case TYPES.GET_CEL_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        cel: result.data.data,
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

export const getAllCel = () => {

  return (dispatch) => {
    dispatch({
      types: [
              TYPES.GET_CEL,
              TYPES.GET_CEL_SUCCESS,
              TYPES.GET_CEL_ERROR,
            ],
      promise: client => client.get('http://localhost:3000/cels', { headers: { 'Access-Control-Allow-Origin': '*' } }),
    });
  };
};
