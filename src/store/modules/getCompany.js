import config from '../../utils/config';

// Action Types
const TYPES = {
  GET_COMPANY: 'services/GET_COMPANY',
  GET_COMPANY_SUCCESS: 'services/GET_COMPANY_SUCCESS',
  GET_COMPANY_ERROR: 'services/GET_COMPANY_ERROR',
};

const initialState = {
  loadedCompany: false,
  loadingCompany: false,
  errorCompany: false,
  company: [],
}

export const reducer = (
  state = initialState,
  { type, result }
) => {
  switch (type) {
    case TYPES.GET_COMPANY:
      return {
        ...state,
        loadingCompany: true,
        loadedCompany: false,
      };
    case TYPES.GET_COMPANY_SUCCESS:
      return {
        ...state,
        loadingCompany: false,
        loadedCompany: true,
        company: result.data.data,
      };
    case TYPES.GET_CURRICULUM_ERROR:
      return {
        ...state,
        loadingCompany: false,
        loadedCompany: false,
        errorCompany: true,
      };

    default:
      return state;
  }
};

export const getAllCompany = () => {

  return (dispatch) => {
    dispatch({
      types: [
              TYPES.GET_COMPANY,
              TYPES.GET_COMPANY_SUCCESS,
              TYPES.GET_COMPANY_ERROR,
            ],
      promise: client => client.get(`${config.REACT_APP_BASE_URL}/companies`, { headers: { 'Access-Control-Allow-Origin': '*' } }),
    });
  };
};
