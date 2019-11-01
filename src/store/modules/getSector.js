// Action Types
const TYPES = {
  GET_SECTOR: 'services/GET_SECTOR',
  GET_SECTOR_SUCCESS: 'services/GET_SECTOR_SUCCESS',
  GET_SECTOR_ERROR: 'services/GET_SECTOR_ERROR',
};

const initialState = {
  loadedSector: false,
  loadingSector: false,
  errorSector: false,
  sector: [],
}

export const reducer = (
  state = initialState,
  { type, result }
) => {
  switch (type) {
    case TYPES.GET_SECTOR:
      return {
        ...state,
        loadingSector: true,
        loadedSector: false,
      };
    case TYPES.GET_SECTOR_SUCCESS:
      return {
        ...state,
        loadingSector: false,
        loadedSector: true,
        sector: result.data.data,
      };
    case TYPES.GET_CURRICULUM_ERROR:
      return {
        ...state,
        loadingSector: false,
        loadedSector: false,
        errorSector: true,
      };

    default:
      return state;
  }
};

export const getAllSector = () => {

  return (dispatch) => {
    dispatch({
      types: [
              TYPES.GET_SECTOR,
              TYPES.GET_SECTOR_SUCCESS,
              TYPES.GET_SECTOR_ERROR,
            ],
      promise: client => client.get('http://localhost:3000/sectors', { headers: { 'Access-Control-Allow-Origin': '*' } }),
    });
  };
};
