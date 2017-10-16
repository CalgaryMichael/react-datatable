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
    colStyle: PropTypes.object
  };

  static defaultProps = {
    id: 'dt',
    paginate: false,
    pageLimit: 10,
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

  headings () {
    const headings = Parser.parseHeadings(this.props.data);
    if (headings === null) {
      return null;
    }
    return headings.map((head, index) => {
      return (
        <div key={index}
             id={`heading-${index}`}
             className={'dt-head'}
             style={this.props.colStyle}>
          <span>{head}</span>
        </div>
      )
    });
  };

  rows () {
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
          colStyle={this.props.colStyle} />
      )
    });
  }

  render() {
    const headings = this.headings();
    const rows = this.rows();

    return (
      <div id={this.props.id} className='dt-outer' style={this.outerBaseStyle}>
        <div id={`${this.props.id}-headings`} style={this.rowStyle}>
          {headings}
        </div>
        {rows}
      </div>
    )
  };
}
