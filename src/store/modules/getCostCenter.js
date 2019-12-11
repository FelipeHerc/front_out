import config from '../../utils/config';

// Action Types
const TYPES = {
  GET_COSTCENTER: 'services/GET_COSTCENTER',
  GET_COSTCENTER_SUCCESS: 'services/GET_COSTCENTER_SUCCESS',
  GET_COSTCENTER_ERROR: 'services/GET_COSTCENTER_ERROR',
};

const initialState = {
  loadedCostCenter: false,
  loadingCostCenter: false,
  errorCostCenter: false,
  costCenter: [],
}

export const reducer = (
  state = initialState,
  { type, result }
) => {
  switch (type) {
    case TYPES.GET_COSTCENTER:
      return {
        ...state,
        loadingCostCenter: true,
        loadedCostCenter: false,
      };
    case TYPES.GET_COSTCENTER_SUCCESS:
      return {
        ...state,
        loadingCostCenter: false,
        loadedCostCenter: true,
        costCenter: result.data.data,
      };
    case TYPES.GET_CURRICULUM_ERROR:
      return {
        ...state,
        loadingCostCenter: false,
        loadedCostCenter: false,
        errorCostCenter: true,
      };

    default:
      return state;
  }
};

export const getAllCostCenter = () => {

  return (dispatch) => {
    dispatch({
      types: [
              TYPES.GET_COSTCENTER,
              TYPES.GET_COSTCENTER_SUCCESS,
              TYPES.GET_COSTCENTER_ERROR,
            ],
      promise: client => client.get(`${config.REACT_APP_BASE_URL}/costcenters`, { headers: { 'Access-Control-Allow-Origin': '*' } }),
    });
  };
};
