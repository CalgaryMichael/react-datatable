import React from 'react';
import PropTypes from 'prop-types';
import DataRow from './datarow.jsx';
import Parser from './parser.js';
import Styles from './styles.js';

export default class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRow: null
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
    id: 'dt',
    paginate: false,
    pageLimit: 10,
    showRowNum: true,
    onRowSelect: () => {},
    rowStyle: {},
    colStyle: {}
  };

  selectedRowStyle = {
    display: 'table-row',
    backgroundColor: 'blue',
    color: 'white'
  }

  getTableStyles() {
    return Object.assign({}, Styles.baseTable, this.props.baseTable);
  }

  onSelect(rowNum) {
    this.setState({selectedRow: rowNum});
    this.props.onRowSelect();
  }

  headings() {
    const headings = Parser.parseHeadings(this.props.data);
    if (headings == null) {
      return null;
    }

    return (
      <DataRow
        data={headings}
        isHeading={true}
        rowStyle={this.rowStyle}
        colStyle={this.props.colStyle}
        showRowNum={this.props.showRowNum} />
    )
  };

  rows() {
    const data = Parser.parseData(this.props.data);
    if (data == false) {
      return <span style={{textAlign: 'center'}}>No Data</span>;
    }
    return data.map((data, index) => {
      const key = this.props.showRowNum ? index + 1 : index;
      const rowStyle = this.state.selectedRow == key ? this.selectedRowStyle : this.props.rowStyle;
      return (
        <DataRow
          key={index}
          data={data}
          onClick={() => this.onSelect(key)}
          rowStyle={rowStyle}
          colStyle={this.props.colStyle}
          rowNum={key}
          showRowNum={this.props.showRowNum} />
      )
    });
  }

  render() {
    const style = this.getTableStyles();
    const headings = this.headings();
    const rows = this.rows();

    return (
      <div id={this.props.id} className='dt-table' style={style}>
        {headings}
        {rows}
      </div>
    )
  };
}
