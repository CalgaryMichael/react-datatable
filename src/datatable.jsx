import React from 'react';
import PropTypes from 'prop-types';
import DataRow from './datarow.jsx';
import Parser from './parser.js';

export default class DataTable extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    data: PropTypes.object.isRequired,
    sortable: PropTypes.object,
    paginate: PropTypes.bool,
    pageLimit: PropTypes.number,
    onRowSelect: PropTypes.func,
    showRowNum: PropTypes.bool,
    colStyle: PropTypes.object
  };

  static defaultProps = {
    id: 'dt',
    paginate: false,
    pageLimit: 10,
    showRowNum: true,
    colStyle: {
      display: 'table-cell',
      minWidth: '50px',
      paddingRight: '10px'
    }
  };

  outerBaseStyle = {
    display: 'table'
  }

  rowStyle = {
    display: 'table-row'
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
      return (
        <DataRow
          key={index}
          data={data}
          onClick={this.props.onRowSelect}
          rowStyle={this.rowStyle}
          colStyle={this.props.colStyle}
          rowNum={index}
          showRowNum={this.props.showRowNum} />
      )
    });
  }

  render() {
    const headings = this.headings();
    const rows = this.rows();

    return (
      <div id={this.props.id} className='dt-outer' style={this.outerBaseStyle}>
        {headings}
        {rows}
      </div>
    )
  };
}
