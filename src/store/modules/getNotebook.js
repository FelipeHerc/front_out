// Action Types
const TYPES = {
  GET_NOTEBOOK: 'services/GET_NOTEBOOK',
  GET_NOTEBOOK_SUCCESS: 'services/GET_NOTEBOOK_SUCCESS',
  GET_NOTEBOOK_ERROR: 'services/GET_NOTEBOOK_ERROR',
};

const initialState = {
  loadedNotebook: false,
  loadingNotebook: false,
  errorNotebook: false,
  notebook: [],
}

export const reducer = (
  state = initialState,
  { type, result }
) => {
  switch (type) {
    case TYPES.GET_NOTEBOOK:
      return {
        ...state,
        loadingNotebook: true,
        loadedNotebook: false,
      };
    case TYPES.GET_NOTEBOOK_SUCCESS:
      return {
        ...state,
        loadingNotebook: false,
        loadedNotebook: true,
        notebook: result.data.data,
      };
    case TYPES.GET_CURRICULUM_ERROR:
      return {
        ...state,
        loadingNotebook: false,
        loadedNotebook: false,
        errorNotebook: true,
      };

    default:
      return state;
  }
};

export const getAllNotebook = () => {

  return (dispatch) => {
    dispatch({
      types: [
              TYPES.GET_NOTEBOOK,
              TYPES.GET_NOTEBOOK_SUCCESS,
              TYPES.GET_NOTEBOOK_ERROR,
            ],
      promise: client => client.get('http://localhost:3000/notebooks', { headers: { 'Access-Control-Allow-Origin': '*' } }),
    });
  };
};
