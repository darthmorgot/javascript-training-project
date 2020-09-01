import {
  TABLE_RESIZE,
  CHANGE_TEXT,
  CHANGE_STYLE,
  APPLY_STYLE,
  CHANGE_TITLE
} from './types';

export function rootReducer(state, action) {
  // let prevState;
  let field;
  let val;

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
    case APPLY_STYLE:
      field = 'stylesState';
      val = state[field] || {};
      action.data.ids.forEach(id => {
        val[id] = {...val[id], ...action.data.value};
      });
      return {
        ...state,
        [field]: val,
        currentStyles: {...state.currentStyles, ...action.data.value}
      };
    case CHANGE_TITLE:
      return {...state, title: action.data};
    default:
      return state;
  }
}

function value(state, field, action) {
  const val = state[field] || {};
  val[action.data.id] = action.data.value;

  return val;
}
