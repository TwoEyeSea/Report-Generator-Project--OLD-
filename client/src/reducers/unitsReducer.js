import { ADD_UNIT, DELETE_UNIT } from "../actions/types";

export default (state = { units: [] }, action) => {
  switch (action.type) {
    case ADD_UNIT:
      return { ...state, units: [...state.units, action.payload] };
    default:
      return state;
  }
};
