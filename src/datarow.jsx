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

  getColStyle() {
    return Object.assign({}, this.props.colStyle, Styles.baseCol);
  }

  getRowStyle() {
    return Object.assign({}, this.props.rowStyle, Styles.baseRow);
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
    const colStyle = this.getColStyle();
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
      headingList.push(getHeading('Row', colStyle, 0));
    }

    headingList.push(this.props.data.map((head, index) => {
      const key = this.props.showRowNum ? index + 1 : index;
      return getHeading(head, colStyle, key);
    }));
    return headingList;
  }

  renderRow() {
    const colStyle = this.getColStyle();
    const getRow = function(content, style, index) {
      return (
        <div key={index} style={style}>
          {content}
        </div>
      );
    }
    let cols = [];
    if (this.props.showRowNum) {
      cols.push(getRow(this.props.rowNum, colStyle, 0));
    }

    cols.push(this.props.data.map((col, index) => {
      const key = this.props.showRowNum ? index + 1 : index;
      return getRow(col, colStyle, key);
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
    let style = this.getRowStyle();
    return (
      <div id={this.props.id}
           style={style}
           className={className}
           onClick={this.props.onClick}>
        {row}
      </div>
    )
  }
}
