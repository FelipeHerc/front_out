import config from '../../utils/config';

// Action Types
const TYPES = {
  GET_EQUIP: 'services/GET_EQUIP',
  GET_EQUIP_SUCCESS: 'services/GET_EQUIP_SUCCESS',
  GET_EQUIP_ERROR: 'services/GET_EQUIP_ERROR',
};

const initialState = {
  loadedEquip: false,
  loadingEquip: false,
  errorEquip: false,
  equip: [],
}

export const reducer = (
  state = initialState,
  { type, result }
) => {
  switch (type) {
    case TYPES.GET_EQUIP:
      return {
        ...state,
        loadingEquip: true,
        loadedEquip: false,
      };
    case TYPES.GET_EQUIP_SUCCESS:
      return {
        ...state,
        loadingEquip: false,
        loadedEquip: true,
        equip: result.data.data,
      };
    case TYPES.GET_CURRICULUM_ERROR:
      return {
        ...state,
        loadingEquip: false,
        loadedEquip: false,
        errorEquip: true,
      };

    default:
      return state;
  }
};

export const getAllEquip = () => {

  return (dispatch) => {
    dispatch({
      types: [
              TYPES.GET_EQUIP,
              TYPES.GET_EQUIP_SUCCESS,
              TYPES.GET_EQUIP_ERROR,
            ],
      promise: client => client.get(`${config.REACT_APP_BASE_URL}/equips`, { headers: { 'Access-Control-Allow-Origin': '*' } }),
    });
  };
};

export const getAllEquipByStatus = (status) => {

  return (dispatch) => {
    dispatch({
      types: [
              TYPES.GET_EQUIP,
              TYPES.GET_EQUIP_SUCCESS,
              TYPES.GET_EQUIP_ERROR,
            ],
      promise: client => client.get(`${config.REACT_APP_BASE_URL}/equips?status=${status}`, { headers: { 'Access-Control-Allow-Origin': '*' } }),
    });
  };
};