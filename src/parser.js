const has = Object.prototype.hasOwnProperty;

export default class Parser {
  static parseData (dataObj, sortIndex=0, sortDirection='asc') {
    function comparator (a, b) {
      let indexA = a[sortIndex],
          indexB = b[sortIndex];
      if (indexA instanceof String) {
        indexA = indexA.toLowerCase();
      }
      else if (indexB instanceof String) {
        indexB = indexB.toLowerCase();
      }

      if (sortDirection === 'asc') {
        if (indexA < indexB) return -1;
        if (indexA > indexB) return 1;
      }
      else {
        if (indexA < indexB) return 1;
        if (indexA > indexB) return -1;
      }
      return 0;
    }

    let data = null;
    if (has.call(dataObj, 'data')) {
      data = []
      if (dataObj.data instanceof Array) {
        let index = 1;
        for (let row of dataObj.data) {
          let numberedRow = row.slice();
          numberedRow.unshift(index);
          data.push(numberedRow);
          index++;
        }
      }
      else {
        data = null;
      }
    }

    return data == null ? data : data.sort(comparator);
  }

  static parseHeadings (dataObj) {
    let headings = null;
    if (has.call(dataObj, 'headings')) {
      headings = dataObj.headings.slice();
    }
    else if (dataObj.data instanceof Object) {
      headings = Object.keys(dataObj);
    }
    headings.unshift('Row');
    return headings;
  }

  static filter(data, filterValue) {
    let filteredData = [];
    for (let row of data) {
      for (let entry of row) {
        if (typeof entry === 'string') {
          entry = entry.toLowerCase();
          if (entry.includes(filterValue.toLowerCase())) {
            filteredData.push(row);
            break;
          }
        }
        else if (typeof entry === 'number' && !Number.isNaN(filterValue)) {
          if (entry == filterValue) {
            filteredData.push(row);
            break;
          }
        }
      }
    }
    return filteredData;
  }
}
