export default class Styles {
  static baseTable = {
    display: 'table'
  }

  static baseRow = {
    display: 'table-row'
  }

  static baseHeader = {
    display: 'table-row',
    userSelect: 'none',
    MozUserSelect: 'none',
    MsUserSelect: 'none',
    WebkitUserSelect: 'none',
    WebkitTouchUserSelect: 'none',
  }

  static baseCol = {
    display: 'table-cell',
    minWidth: '50px',
    paddingRight: '10px'
  }

  static baseFilter = {
    display: 'block',
    margin: '0',
    appearance: 'none',
    border: 'none',
    borderBottom: 'solid 1px #c9c9c9',
    boxShadow: 'none',
    borderRadius: 'none',
    outline: 'none'
  }
}
