import React from 'react';
import PropTypes from 'prop-types';
import DataEntry from './dataentry.jsx'

export default class DataHeader extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    data: PropTypes.array.isRequired,
    onClick: PropTypes.func,
    rowStyle: PropTypes.object,
    colStyle: PropTypes.object,
    showRowNum: PropTypes.bool
  }

  static defaultProps = {
    rowStyle: {},
    colStyle: {}
  }

  renderEntry(content, index) {
    return (
      <DataEntry
        key={index}
        id={`heading-${index}`}
        className={'dt-head'}
        style={this.props.colStyle}>
        {content}
      </DataEntry>
     );
  }

  renderRow() {
    return this.props.data.map((head, index) => {
      const key = this.props.showRowNum ? index + 1 : index;
      return this.renderEntry(head, key);
    });
  }

  render() {
    const row = this.renderRow();
    let numCol = null;
    if (this.props.showRowNum) {
      numCol = this.renderEntry('Row', 0);
    }

    return (
      <div id={this.props.id}
           style={this.props.rowStyle}
           className={'dt-heading-row'}
           onClick={this.props.onClick}>
        {numCol}
        {row}
      </div>
    );
  }
}
