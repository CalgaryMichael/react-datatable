import React from 'react';
import PropTypes from 'prop-types';
import Styles from './styles.js';

export default class DataFilter extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    style: PropTypes.object,
    onFilter: PropTypes.func.isRequired,
    text: PropTypes.string
  }

  static defaultProps = {
    text: 'Filter...'
  }

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      focused: false
    };
  }

  getStyle = () => {
    return Object.assign({}, this.props.style, Styles.baseFilter);
  }

  getClassName = () => {
    const className = 'dt-filter';
    if (this.state.focused) {
      return `${className} dt-filter-focused`;
    }
    return className
  }

  onFilter = (event) => {
    const value = event.target.value;
    this.setState({value});
    this.props.onFilter(value);
  }

  onFocus = () => {
    this.setState({
      focused: !this.state.focused
    });
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
          placeholder={this.props.text}
          value={this.state.value}
          onChange={this.onFilter}
          onFocus={this.onFucs}
          onBlur={this.onFocus} />
      </div>
    );
  }
}