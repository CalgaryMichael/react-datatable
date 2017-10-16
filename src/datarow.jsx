import React from 'react';
import PropTypes from 'prop-types';

export default class DataRow extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    data: PropTypes.array.isRequired,
    onClick: PropTypes.func,
    colStyle: PropTypes.object,
    rowStyle: PropTypes.object
  }

  renderRow() {
    return this.props.data.map((col, index) => {
      return (
        <div key={index} style={this.props.colStyle}>
          {col}
        </div>
      )
    })
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
