import React from 'react';
import PropTypes from 'prop-types';
import Styles from './styles.js'
import DataEntry from './data-entry.jsx'

export default class DataHeader extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    data: PropTypes.array.isRequired,
    onClick: PropTypes.func,
    sortedCol: PropTypes.number,
    sortDirection: PropTypes.string,
    rowStyle: PropTypes.object,
    entryStyle: PropTypes.object,
    showRowNum: PropTypes.bool
  }

  static defaultProps = {
    sortDirection: '',
    rowStyle: {},
    entryStyle: {}
  }

  getStyle = () => {
    return Object.assign({}, this.props.rowStyle, Styles.baseRow);
  }

  getEntryStyle = (index) => {
    const calcSortStyle  = (direction) => {
      if (direction === 'asc') {
        if (this.props.entryStyle.asc) {
          return this.props.entryStyle.asc;
        }
        else {
          return this.props.entryStyle[':asc'];
        }
      }
      else if (direction === 'desc') {
        if (this.props.entryStyle.asc) {
          return this.props.entryStyle.desc;
        }
        else {
          return this.props.entryStyle[':desc'];
        }
      }
    }

    let style = this.props.entryStyle;
    if (!this.props.showRowNum) {
      if (index === 0 || index == null) {
        style = this.props.entryStyle;
      }
    }
    else {
      if (this.props.sortedCol == null && index === 0) {
        style = calcSortStyle('asc');
      }
      else if (this.props.sortedCol === index) {
        style = calcSortStyle(this.props.sortDirection);
      }
    }
    return Object.assign({}, style, Styles.baseHeader);
  }

  getClassName = (index) => {
    const className = 'dt-head';
    const uninitializedCol = this.props.showRowNum && this.props.sortedCol == null && index === 0;
    if (this.props.sortedCol == index || uninitializedCol) {
      return `${className} dt-sorted-${this.props.sortDirection}`;
    }
    return className;
  }

  renderEntry(content, index) {
    const style = this.getEntryStyle(index);
    const className = this.getClassName(index);

    return (
      <DataEntry
        key={index}
        id={`heading-${index}`}
        className={className}
        onClick={() => this.props.onClick(index)}
        style={style}>
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
    const style = this.getStyle();
    const row = this.renderRow();

    return (
      <div id={this.props.id}
           style={style}
           className={'dt-heading-row'}>
        {row}
      </div>
    );
  }
}
