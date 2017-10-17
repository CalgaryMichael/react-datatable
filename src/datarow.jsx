import React from 'react';
import PropTypes from 'prop-types';
import Styles from './styles.js';

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
    isHeading: false,
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

  renderHeading() {
    const style = this.props.colStyle;
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
      headingList.push(getHeading('Row', style, 0));
    }

    headingList.push(this.props.data.map((head, index) => {
      const key = this.props.showRowNum ? index + 1 : index;
      return getHeading(head, style, key);
    }));
    return headingList;
  }

  renderRow() {
    const style = this.props.colStyle;
    const getRow = function(content, style, index) {
      return (
        <div key={index} style={style}>
          {content}
        </div>
      );
    }
    let cols = [];
    if (this.props.showRowNum) {
      cols.push(getRow(this.props.rowNum, style, 0));
    }

    cols.push(this.props.data.map((col, index) => {
      const key = this.props.showRowNum ? index + 1 : index;
      return getRow(col, style, key);
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
      <div id={this.props.id}
           style={this.props.rowStyle}
           className={className}
           onClick={this.props.onClick}>
        {row}
      </div>
    )
  }
}
