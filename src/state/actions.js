import Dispatcher from './dispatcher.js';
import ActionStore from './store.js';

export const ACTION_TYPES = {
  SELECT_ROW: 'SELECT_ROW'
};

export function selectRow(rowData) {
  Dispatcher.dispatch({
    actionType: ACTION_TYPES.SELECT_ROW,
    rowNum: rowData[0]
  })
}


export const ReactActions = {};

// Expose the actions to the old JS so that we can modify the state in a safe way
if (typeof window !== 'undefined') {
    window['ReactActions'] = ReactActions;
}
