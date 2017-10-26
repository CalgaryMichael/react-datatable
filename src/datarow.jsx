import React from 'react';
import PropTypes from 'prop-types';
import Styles from './styles.js';
import DataEntry from './dataentry.jsx';

export default class DataRow extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    data: PropTypes.array.isRequired,
    selected: PropTypes.bool,
    onClick: PropTypes.func,
    colStyle: PropTypes.object,
    rowStyle: PropTypes.object,
    rowNum: PropTypes.number,
    showRowNum: PropTypes.bool
  };

  static defaultProps = {
    selected: false,
    showRowNum: true,
    rowStyle: {},
    colStyle: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      hovered: false
    }
  }

  onHover = () => {
    this.setState({
      hovered: !this.state.hovered
    });
  }

  getStyle = () => {
    let style = {};
    if (this.props.selected) {
      style = {
        backgroundColor: 'blue',
        color: 'white'
      };
    }
    else if (this.state.hovered) {
      style = {
        backgroundColor: 'red',
      };
    }
    return Object.assign(style, this.props.rowStyle, Styles.baseRow);
  }

  getClassName = () => {
    let className = `dt-row dt-row-${this.rowModulus()}`;
    if (this.props.selected) {
      return `${className} dt-row-selected`;
    }
    else if (this.state.hovered) {
      return `${className} dt-row-hovered`;
    }
    return className
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
    const rowNum = this.props.data[0]
    return (
      <DataEntry
        key={index}
        id={`row-${rowNum}-col-${index}`}
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
    const className = this.getClassName();
    const style = this.getStyle();
    const row = this.renderRow();

    return (
      <div id={this.props.id}
           style={style}
           className={className}
           onClick={this.props.onClick}
           onMouseEnter={this.onHover}
           onMouseLeave={this.onHover}>
        {row}
      </div>
    )
  }
}
