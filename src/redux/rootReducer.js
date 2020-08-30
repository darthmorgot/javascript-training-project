import {TABLE_RESIZE, CHANGE_TEXT, CHANGE_STYLE} from './types';

export function rootReducer(state, action) {
  // let prevState;
  let field;

  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'column' ? 'colState' : 'rowState';
      // prevState = state[field] || {};
      // prevState[action.data.id] = action.data.value;
      return {
        ...state,
        [field]: value(state, field, action)
      };
    case CHANGE_TEXT:
      field = 'dataState';
      // prevState = state[field] || {};
      // prevState[action.data.id] = action.data.value;
      return {
        ...state,
        currentText: action.data.value,
        [field]: value(state, field, action)
      };
    case CHANGE_STYLE:
      return {...state, currentStyles: action.data};
    default:
      return state;
  }
}

function value(state, field, action) {
  const val = state[field] || {};
  val[action.data.id] = action.data.value;

  return val;
}
