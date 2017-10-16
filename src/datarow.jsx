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
    showRowNum: PropTypes.bool,
    isHeading: PropTypes.bool
  }

  static defaultProps = {
    showRowNum: true,
    isHeading: false
  }

  rowModulus() {
    const modulus = ['even', 'odd'];
    let number = this.props.rowNum;
    if (this.props.showRowNum) {
      number += 1;
    }
    return modulus[number % 2];
  }

  renderHeading() {
    const getHeading = function (content, style, index) {
      return (
        <div key={index}
             id={`heading-${index}`}
             className={'dt-head'}
             style={style}>
          {content}
        </div>
      )
    }
    let headingList = [];
    if (this.props.showRowNum) {
      headingList.push(getHeading('Row', this.props.colStyle, 0));
    }

    headingList.push(this.props.data.map((head, index) => {
      let key = index;
      if (this.props.showRowNum) {
        key = index + 1;
      }
      return getHeading(head, this.props.colStyle, key);
    }));
    return headingList;
  }

  renderRow() {
    const getRow = function(content, style, index) {
      return (
        <div key={index} style={style}>
          {content}
        </div>
      );
    }
    let cols = [];
    if (this.props.showRowNum) {
      cols.push(getRow((this.props.rowNum + 1), this.props.colStyle, 0));
    }

    cols.push(this.props.data.map((col, index) => {
      let key = index;
      if (this.props.showRowNum) {
        key = index + 1;
      }
      return getRow(col, this.props.colStyle, key);
    }));
    return cols;
  }

  render() {
    let className = `dt-row dt-row-${this.rowModulus()}`;
    let row = this.renderRow();
    if (this.props.isHeading) {
      className = `dt-header`;
      row = this.renderHeading();
    }

    return (
      <div id={this.props.id} style={this.props.rowStyle} className={className}>
        {row}
      </div>
    )
  }
}
