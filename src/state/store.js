import Dispatcher from './dispatcher.js';
import { ACTION_TYPES } from './actions.js';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'CHANGE_EVENT';

export class Storage extends EventEmitter {
  storage = new Map();
  _headings = [];

  initializeState(data) {
    this.storage.set('data', data);
    this.storage.set('filter', null);
    this.storage.set('selectedRow', null);
    this.storage.set('sortedCol', null);
    this.storage.set('sortedDirection', 'asc');
    this.emitChange();
  }

  getState() {
    const keys = [
      'data',
      'filter',
      'selectedRow',
      'sortedCol',
      'sortedDirection'
    ];

    return keys.reduce((obj, key) => {
      obj[key] = this.storage.get(key);
      return obj;
    }, {});
  }

  setSelectedRow(rowNum) {
    this.storage.set("selectedRow", rowNum);
    this.emitChange();
  }

  setSelectedHeader(colIndex) {

  }

  setSortedDirection(colIndex) {

  }

  setFilter(value) {

  }

  dispatchCallback = (payload) => {
    // console.log(`DISPATCH: ${payload.actionType}`);
    // console.log(payload);
    switch (payload.actionType) {
      case ACTION_TYPES.SELECT_ROW:
        this.setSelectedRow(payload.rowNum);
        break;
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
    window['Storage'] = ActionStore;
}
export default ActionStore;
