import React from 'react';
import PropTypes from 'prop-types';
import Styles from './styles.js'
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

  getStyle = () => {
    return Object.assign({}, this.props.rowStyle, Styles.baseRow);
  }

  renderEntry(content, index) {
    return (
      <DataEntry
        key={index}
        id={`heading-${index}`}
        className={'dt-head'}
        onClick={() => this.props.onClick(index)}
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
