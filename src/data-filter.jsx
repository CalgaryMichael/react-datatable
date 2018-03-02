import React from 'react';
import PropTypes from 'prop-types';
import Styles from './styles.js';

export default class DataFilter extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
    focused: PropTypes.string,
    style: PropTypes.object,
    onFilter: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    placeHolderText: PropTypes.string
  }

  static defaultProps = {
    value: '',
    placeHolderText: 'Filter...',
    onFocus: () => {}
  }

  getStyle = () => {
    return Object.assign({}, this.props.style, Styles.baseFilter);
  }

  getClassName = () => {
    const className = 'dt-filter';
    if (this.props.focused) {
      return `${className} dt-filter-focused`;
    }
    return className
  }

  render() {
    const style = this.getStyle();
    const className = this.getClassName();

    return (
      <div>
        <input
          type='text'
          id={this.props.id}
          className={className}
          style={style}
          placeholder={this.props.placeHolderText}
          value={this.props.value}
          onChange={(e) => this.props.onFilter(e)}
          onFocus={(e) => this.props.onFocus(e)}
          onBlur={(e) => this.props.onFocus(e)} />
      </div>
    );
  }
}
