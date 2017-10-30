import Dispatcher from './dispatcher.js';
import { ACTION_TYPES } from './actions.js';
import { EventEmitter } from 'events';

const CHANGE_EVENT = "CHANGE_EVENT";

export class Storage {
  constructor(props) {
    super(props);
    this.storage = new Map([
      ["data", TABLE_DATA],
      ["filter", null],
      ["selectedRow", null],
      ["sortedCol", null],
      ["sortedDirection", null]
    ]);
  }

  getState() {
    const keys = [
      "data",
      "filter",
      "selectedRow",
      "sortedCol",
      "sortedDirection"
    ];

    return keys.reduce((obj, key) => {
      obj[key] = this.storage.get(key);
      return obj;
    }, {});
  }

  dispatchCallback = (payload) => {
    //console.log(`DISPATCH: ${payload.actionType}`);
    //console.log(payload);
    switch (payload.actionType) {
      // case ACTION_TYPES.x:
      //   call a method in this file
      //   break;
      default:
        console.log(`Unexpected action: ${payload.actionType}`);
        break;
      }
    }

  emitChange = () => {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener = (callback) => {
    this.on(CHANGE_EVENT, callback);
  };

  removeChangeListener = (callback) => {
    this.removeListener(CHANGE_EVENT, callback);
  };
}

const ActionStore = new Storage();
ActionStore.dispatchToken = Dispatcher.register(ActionStore.dispatchCallback);

if (typeof window !== 'undefined') {
    window["Storage"] = ActionStore;
}
export default ActionStore;
