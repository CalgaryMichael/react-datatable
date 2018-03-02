export const has = Object.prototype.hasOwnProperty;

export const convertCamelCase = (str) => {
  let result = str.replace(/([A-Z])/g, " $1").replace(/_/, ' ');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export const unique = (arr) => {
    // removes all repeated elements in an array
    return arr.filter(function (value, index, self) {
        return self.indexOf(value) === index;
    });
};
