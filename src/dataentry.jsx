import React from 'react';
import PropTypes from 'prop-types';

export default class DataEntry extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object
  }

  render() {
    return (
      <div id={this.props.id}
           className={this.props.className}
           style={this.props.style}
           onClick={this.props.onClick}>
        {this.props.children}
      </div>
    )
  }
}
