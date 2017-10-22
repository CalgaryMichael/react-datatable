import React from 'react';
import PropTypes from 'prop-types';
import DataRow from './datarow.jsx';
import DataHeader from './dataheader.jsx';
import Parser from './parser.js';
import Styles from './styles.js';

export default class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this._headings = null;
    this.state = {
      selectedRow: null,
      sortedCol: null,
      sortDirection: 'asc'
    };
  }

  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    data: PropTypes.object.isRequired,
    sortable: PropTypes.bool,
    unsortableCol: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
    ),
    defaultSortedCol: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        PropTypes.string
      ),
      PropTypes.shape({
        column: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        direction: PropTypes.string
      })
    ]),
    paginate: PropTypes.bool,
    pageLimit: PropTypes.number,
    onRowSelect: PropTypes.func,
    showRowNum: PropTypes.bool,
    tableStyle: PropTypes.object,
    rowStyle: PropTypes.object,
    colStyle: PropTypes.object
  };

  static defaultProps = {
    paginate: false,
    pageLimit: 10,
    showRowNum: true,
    sortable: true,
    unsortableCol: null,
    onRowSelect: () => {},
    rowStyle: {},
    colStyle: {}
  };

  getTableStyles() {
    return Object.assign({}, this.props.baseTable, Styles.baseTable);
  }

  getRowStyle() {
    return Object.assign({}, this.props.rowStyle, Styles.baseRow);
  }

  getSelectedRowStyle() {
    let selectedRowStyle = {
      backgroundColor: 'blue',
      color: 'white'
    }
    return Object.assign(selectedRowStyle, this.props.rowStyle, Styles.baseRow);
  }

  getColStyle() {
    return Object.assign({}, this.props.colStyle, Styles.baseCol);
  }

  getSortedCol() {
    function determineIndex(value, headings) {
      return typeof value === 'string' ? headings.indexOf(value) : value;
    }

    let sortedIndex = 0;
    let direction = 'asc';
    if (this.state.sortedCol == null) {
      if (this._headings == null) {
        this._headings = Parser.parseHeadings(this.props.data);
      }

      if (this.props.defaultSortedCol instanceof Array) {
        sortedIndex = determineIndex(this.props.defaultSortedCol[0], this._headings);
        direction = this.props.defaultSortedCol[1];
      }
      else if (this.props.defaultSortedCol instanceof Object) {
        sortedIndex = determineIndex(this.props.defaultSortedCol.column, this._headings);
        direction = this.props.defaultSortedCol.direction;
      }
      else {
        sortedIndex = determineIndex(this.props.defaultSortedCol, this._headings);
      }
    }
    else {
      sortedIndex = this.state.sortedCol;
      direction = this.state.sortDirection;
    }
    return { sortedIndex, direction };
  }

  onSelect(rowNum, rowData) {
    this.setState({selectedRow: rowNum});
    this.props.onRowSelect(rowNum, rowData);
  }

  onHeaderSelect(colIndex) {
    if (this.props.sortable) {
      const colHeader = this._headings[colIndex];
      if (this.props.unsortableCol === null ||
          this.props.unsortableCol.includes(colIndex) ||
          this.props.unsortableCol.includes(colHeader)) {
        let direction = null
        if (this.state.sortedCol === null) {
          let { sortedIndex, direction } = this.getSortedCol();
          if (sortedIndex === colIndex && direction === 'asc') {
            direction = 'desc';
          }
        }
        else {
          direction = 'asc';
          if (this.state.sortedCol === colIndex && this.state.sortDirection === 'asc') {
            direction = 'desc';
          }
        }
        this.setState({
          sortedCol: colIndex,
          sortDirection: direction
        });
      }
    }
  }

  headings() {
    if (this._headings == null) {
      const headings = Parser.parseHeadings(this.props.data);
      if (headings == null) {
        return null;
      }
      this._headings = headings;
    }

    return (
      <DataHeader
        data={this._headings}
        onClick={(index) => this.onHeaderSelect(index)}
        rowStyle={this.getRowStyle()}
        colStyle={this.getColStyle()}
        showRowNum={this.props.showRowNum} />
    )
  };

  rows() {
    const colStyle = this.getColStyle();
    const { sortedIndex, direction } = this.getSortedCol();
    const data = Parser.parseData(this.props.data, sortedIndex, direction);
    if (data == null) {
      return <span style={{textAlign: 'center'}}>No Data</span>;
    }

    return data.map((row, index) => {
      const rowStyle = this.state.selectedRow == index ? this.getSelectedRowStyle() : this.getRowStyle();
      return (
        <DataRow
          key={index}
          data={row}
          onClick={() => this.onSelect(index, row)}
          rowStyle={rowStyle}
          colStyle={colStyle}
          rowNum={index}
          showRowNum={this.props.showRowNum} />
      )
    });
  }

  render() {
    const style = this.getTableStyles();
    const heading = this.headings();
    const rows = this.rows();

    return (
      <div id={this.props.id} className='dt-table' style={style}>
        {heading}
        {rows}
      </div>
    )
  };
}
