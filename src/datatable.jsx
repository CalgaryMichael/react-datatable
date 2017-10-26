import React from 'react';
import PropTypes from 'prop-types';
import Parser from './parser.js';
import Styles from './styles.js';
import DataRow from './datarow.jsx';
import DataHeader from './dataheader.jsx';
import DataFilter from './datafilter.jsx';

export default class DataTable extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    data: PropTypes.object.isRequired,
    filterable: PropTypes.bool,
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
    filterable: true,
    sortable: true,
    unsortableCol: null,
    onRowSelect: () => {},
    rowStyle: {},
    colStyle: {}
  };

  constructor(props) {
    super(props);
    this._headings = null;
    this.state = {
      selectedRow: null,
      sortedCol: null,
      sortDirection: 'asc',
      filter: null
    };
  }

  getStyle = () => {
    return Object.assign({}, this.props.tableStyle, Styles.baseTable);
  }

  onRowSelect = (rowData) => {
    this.setState({selectedRow: rowData[0]});
    this.props.onRowSelect(rowData);
  }

  onHeaderSelect = (colIndex) => {
    if (this.props.sortable) {
      const colHeader = this._headings[colIndex];
      if (this.props.unsortableCol === null ||
          this.props.unsortableCol.includes(colIndex) ||
          this.props.unsortableCol.includes(colHeader)) {
        let direction = null
        if (this.state.sortedCol === null) {
          const { sortedIndex, direction } = this.getSortedCol();
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

  onFilter = (value) => {
    this.setState({
      filter: value
    });
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

  renderFilter() {
    if (this.props.filterable) {
      return (
        <DataFilter
          text={this.props.filterText}
          onFilter={this.onFilter} />
      )
    }
  }

  renderHeadings() {
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
        onClick={this.onHeaderSelect}
        rowStyle={this.props.rowStyle}
        colStyle={this.props.colStyle}
        showRowNum={this.props.showRowNum} />
    )
  };

  renderRows() {
    const { sortedIndex, direction } = this.getSortedCol();
    let data = Parser.parseData(this.props.data, sortedIndex, direction);
    if (this.props.filterable && this.state.filter) {
      data = Parser.filter(data, this.state.filter);
    }

    if (data == null || data === []) {
      return <span style={{textAlign: 'center'}}>No Data</span>;
    }

    return data.map((row, index) => {
      return (
        <DataRow
          key={index}
          data={row}
          selected={this.state.selectedRow === row[0]}
          onClick={() => this.onRowSelect(row)}
          rowStyle={this.props.rowStyle}
          colStyle={this.props.colStyle}
          rowNum={index}
          showRowNum={this.props.showRowNum} />
      )
    });
  }

  render() {
    const style = this.getStyle();
    const filter = this.renderFilter();
    const heading = this.renderHeadings();
    const rows = this.renderRows();

    return (
      <div id={this.props.id} className='dt-outer'>
        {filter}
        <div className='dt-table' style={style}>
          {heading}
          {rows}
        </div>
      </div>
    )
  };
}
