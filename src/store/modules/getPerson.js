// Action Types
const TYPES = {
  GET_PERSON: 'services/GET_PERSON',
  GET_PERSON_SUCCESS: 'services/GET_PERSON_SUCCESS',
  GET_PERSON_ERROR: 'services/GET_PERSON_ERROR',

  POST_PERSON: 'services/POST_PERSON',
  POST_PERSON_SUCCESS: 'services/POST_PERSON_SUCCESS',
  POST_PERSON_ERROR: 'services/POST_PERSON_ERROR',
};

const initialState = {
  loadedPerson: false,
  loadingPerson: false,
  errorPerson: false,
  person: [],
}

export const reducer = (
  state = initialState,
  { type, result }
) => {
  switch (type) {
    case TYPES.GET_PERSON:
      return {
        ...state,
        loadingPerson: true,
        loadedPerson: false,
      };
    case TYPES.GET_PERSON_SUCCESS:
      return {
        ...state,
        loadingPerson: false,
        loadedPerson: true,
        person: result.data.data,
      };
    case TYPES.GET_CURRICULUM_ERROR:
      return {
        ...state,
        loadingPerson: false,
        loadedPerson: false,
        errorPerson: true,
      };
      case TYPES.POST_PERSON:
        return {
          ...state,
          loadingPerson: true,
          loadedPerson: false,
        };
      case TYPES.POST_PERSON_SUCCESS:
        return {
          ...state,
          loadingPerson: false,
          loadedPerson: true,
        };
      case TYPES.POST_CURRICULUM_ERROR:
        return {
          ...state,
          loadingPerson: false,
          loadedPerson: false,
          errorPerson: true,
        };

    default:
      return state;
  }
};

export const getAllPerson = () => {
  return (dispatch) => {
    dispatch({
      types: [
              TYPES.GET_PERSON,
              TYPES.GET_PERSON_SUCCESS,
              TYPES.GET_PERSON_ERROR,
            ],
      promise: client => client.get('http://localhost:3000/owners', { headers: { 'Access-Control-Allow-Origin': '*' } }),
    });
  };
};
