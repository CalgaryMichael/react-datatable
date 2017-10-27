import React from 'react';
import PropTypes from 'prop-types';
import Styles from './styles.js';

export default class DataEntry extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object
  }

  static defaultProps = {
    className: 'dt-entry'
  }

  getStyle = () => {
    return Object.assign({}, this.props.style, Styles.baseCol);
  }

  render() {
    const style = this.getStyle();
    return (
      <div id={this.props.id}
           className={this.props.className}
           style={style}
           onClick={this.props.onClick}>
        {this.props.children}
      </div>
    )
  }
}
