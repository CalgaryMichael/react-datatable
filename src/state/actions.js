import Dispatcher from './dispatcher.js';
import ActionStore from './store.js';

export const ACTION_TYPES = {

};

export function action() {
  Dispatcher.dispatch({
    actionType: ACTION_TYPES.example
  })
}


export const ReactActions = {};

// Expose the actions to the old JS so that we can modify the state in a safe way
if (typeof window !== 'undefined') {
    window["ReactActions"] = ReactActions;
}
