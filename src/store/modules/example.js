const TYPES = {
  EXAMPLE: 'EXAMPLE',
};

const initialState = {
  number: 5,
};

export const reducer = (state = initialState, { type, payload }) => {
  return state;
};

export const example = payload => ({ type: TYPES.EXAMPLE, payload });
