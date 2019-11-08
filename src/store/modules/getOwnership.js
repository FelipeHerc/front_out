// Action Types
const TYPES = {
  GET_OWNERSHIP: 'services/GET_OWNERSHIP',
  GET_OWNERSHIP_SUCCESS: 'services/GET_OWNERSHIP_SUCCESS',
  GET_OWNERSHIP_ERROR: 'services/GET_OWNERSHIP_ERROR',
};

const initialState = {
  loadedOwnership: false,
  loadingOwnership: false,
  errorOwnership: false,
  ownership: [],
}

export const reducer = (
  state = initialState,
  { type, result }
) => {
  switch (type) {
    case TYPES.GET_OWNERSHIP:
      return {
        ...state,
        loadingOwnership: true,
        loadedOwnership: false,
      };
    case TYPES.GET_OWNERSHIP_SUCCESS:
      return {
        ...state,
        loadingOwnership: false,
        loadedOwnership: true,
        ownership: result.data.data,
      };
    case TYPES.GET_CURRICULUM_ERROR:
      return {
        ...state,
        loadingOwnership: false,
        loadedOwnership: false,
        errorOwnership: true,
      };

    default:
      return state;
  }
};

export const getAllOwnership = () => {

  return (dispatch) => {
    dispatch({
      types: [
              TYPES.GET_OWNERSHIP,
              TYPES.GET_OWNERSHIP_SUCCESS,
              TYPES.GET_OWNERSHIP_ERROR,
            ],
      promise: client => client.get('http://localhost:3000/possesions', { headers: { 'Access-Control-Allow-Origin': '*' } }),
    });
  };
};
