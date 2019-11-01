// Action Types
const TYPES = {
  GET_POSSESION: 'services/GET_POSSESION',
  GET_POSSESION_SUCCESS: 'services/GET_POSSESION_SUCCESS',
  GET_POSSESION_ERROR: 'services/GET_POSSESION_ERROR',
};

const initialState = {
  loaded: false,
  loading: false,
  error: false,
  possesion: [],
}

export const reducer = (
  state = initialState,
  { type, result }
) => {
  switch (type) {
    case TYPES.GET_POSSESION:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case TYPES.GET_POSSESION_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        possesion: result.data.data,
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
              TYPES.GET_POSSESION,
              TYPES.GET_POSSESION_SUCCESS,
              TYPES.GET_POSSESION_ERROR,
            ],
      promise: client => client.get('http://localhost:3000/possesions', { headers: { 'Access-Control-Allow-Origin': '*' } }),
    });
  };
};
