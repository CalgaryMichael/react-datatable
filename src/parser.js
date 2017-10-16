const has = Object.prototype.hasOwnProperty;

export default class Parser {
  static parseData (dataObj) {
    let data = null;
    if (has.call(dataObj, 'data')) {
      data = []
      if (dataObj.data instanceof Array) {
        for (let row of dataObj.data) {
          data.push(row);
        }
      }
      else if (dataObj.data instanceof Object) {
        for (let row in dataObj.data) {
          data.push(row);
        }
      }
      else {
        data = null;
      }
    }
    return data
  }

  static parseHeadings (dataObj) {
    let headings = null;
    if (has.call(dataObj, 'headings')) {
      headings = dataObj.headings;
    }
    else if (dataObj.data instanceof Object) {
      headings = Object.keys(dataObj);
    }
    return headings;
  }
}
