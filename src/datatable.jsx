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

  getTableStyles() {
    return Object.assign({}, Styles.baseTable, this.props.baseTable);
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
        rowStyle={this.getRowStyle()}
        colStyle={this.getColStyle()}
        showRowNum={this.props.showRowNum} />
    )
  };

  rows() {
    const colStyle = this.getColStyle();
    const data = Parser.parseData(this.props.data);
    if (data == false) {
      return <span style={{textAlign: 'center'}}>No Data</span>;
    }
    return data.map((data, index) => {
      const key = this.props.showRowNum ? index + 1 : index;
      const rowStyle = this.state.selectedRow == key ? this.getSelectedRowStyle() : this.getRowStyle();
      return (
        <DataRow
          key={index}
          data={data}
          onClick={() => this.onSelect(key)}
          rowStyle={rowStyle}
          colStyle={colStyle}
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
