import * as types from './types';

const initialState = {
  data: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SLOT_INIT_SPACE_TYPE: {
      return { ...state, data: action.data };
    }

    case types.SLOT_PARK_VEHICLE_TYPE: {
      const dataCopy = state.data;
      const { row, col } = action.data;
      Object.assign(dataCopy[row][col], action.data);
      return { ...state, data: dataCopy };
    }

    case types.SLOT_UNPARK_VEHICLE_TYPE: {
      const dataCopy = state.data;
      const { occupied, row, col } = action.data;
      if (occupied) {
        Object.assign(dataCopy[row][col], {
          ...action.data,
          occupied: false,
          start: null,
          vsize: null,
        });
      }
      return { ...state, data: dataCopy };
    }

    case types.SLOT_MAP_TYPE: {
      break;
    }

    default:
      return state;
  }
};

export default reducer;
