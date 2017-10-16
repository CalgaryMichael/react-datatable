import React from 'react';
import PropTypes from 'prop-types';

export default class DataRow extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    data: PropTypes.array.isRequired,
    onClick: PropTypes.func,
    colStyle: PropTypes.object,
    rowStyle: PropTypes.object,
    rowNum: PropTypes.number,
    showRowNum: PropTypes.bool
  }

  static defaultProps = {
    showRowNum: true
  }

  renderRow() {
    let cols = [];
    if (this.props.showRowNum) {
      cols.push(<div key={0}>{this.props.rowNum}</div>);
    }

    cols.push(this.props.data.map((col, index) => {
      let key = index;
      if (this.props.showRowNum) {
        key = index + 1;
      }
      return (
        <div key={key} style={this.props.colStyle}>
          {col}
        </div>
      )
    }));
    return cols;
  }

  render() {
    const row = this.renderRow();
    return (
      <div id={this.props.id} style={this.props.rowStyle}>
        {row}
      </div>
    )
  }
}
