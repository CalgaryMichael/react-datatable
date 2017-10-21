import React from 'react';
import PropTypes from 'prop-types';
import DataRow from './datarow.jsx';
import DataHeader from './dataheader.jsx';
import Parser from './parser.js';
import Styles from './styles.js';

export default class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRow: null,
      sortedCol: 0,
      sortDirection: 'asc'
    };
  }

  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    data: PropTypes.object.isRequired,
    sortable: PropTypes.object,
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

  onSelect(rowNum, rowData) {
    this.setState({selectedRow: rowNum});
    this.props.onRowSelect(rowNum, rowData);
  }

  onHeaderSelect(colIndex) {
    let direction = 'asc';
    if (this.state.sortedCol === colIndex && this.state.sortDirection === 'asc') {
      direction = 'desc';
    }
    this.setState({
      sortedCol: colIndex,
      sortDirection: direction
    });
  }

  headings() {
    const headings = Parser.parseHeadings(this.props.data);
    if (headings == null) {
      return null;
    }

    return (
      <DataHeader
        data={headings}
        onClick={(index) => this.onHeaderSelect(index)}
        rowStyle={this.getRowStyle()}
        colStyle={this.getColStyle()}
        showRowNum={this.props.showRowNum} />
    )
  };

  rows() {
    const colStyle = this.getColStyle();
    const data = Parser.parseData(this.props.data, this.state.sortedCol, this.state.sortDirection);
    if (data == false) {
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
