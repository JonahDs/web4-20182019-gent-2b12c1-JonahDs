import * as Actions from "../actions/filter.actions";

export type Action = Actions.FilterProducts;

const newState = (state, newData) => {
  return Object.assign({}, state, newData);
};

export function filterReducer(state: number = 0, action: Action) {
  switch (action.type) {
    case Actions.FILTER_PRODUCTS:
      return newState(state, { number: action.payload });
    default:
      return state;
  }
}
