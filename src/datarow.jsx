import React from 'react';
import PropTypes from 'prop-types';
import Styles from './styles.js';
import DataEntry from './dataentry.jsx';

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
    showRowNum: true,
    rowStyle: {},
    colStyle: {}
  }

  rowModulus() {
    const modulus = ['even', 'odd'];
    let number = this.props.rowNum;
    if (this.props.showRowNum) {
      number += 1;
    }
    return modulus[number % 2];
  }

  renderEntry(content, index) {
    return (
      <DataEntry
        key={index}
        id={`row-${this.props.rowNum}-col-${index}`}
        className={`dt-entry`}
        style={this.props.colStyle}>
        {content}
      </DataEntry>
     );
  }

  renderRow() {
    return this.props.data.map((head, index) => {
      if (this.props.showRowNum || (!this.props.showRowNum && index != 0)) {
        return this.renderEntry(head, index);
      }
    });
  }

  render() {
    const className = `dt-row dt-row-${this.rowModulus()}`;
    const row = this.renderRow();
    let numCol = null;

    return (
      <div id={this.props.id}
           style={this.props.rowStyle}
           className={className}
           onClick={this.props.onClick}>
        {numCol}
        {row}
      </div>
    )
  }
}
