import React from 'react';
import PropTypes from 'prop-types';
import Styles from './styles.js';

export default class DataFilter extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    style: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    text: PropTypes.string
  }

  static defaultProps = {
    text: 'Filter...'
  }

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      selected: false
    };
  }

  getStyle() {
    return Object.assign({}, this.props.style, Styles.baseFilter);
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({
      value: value
    });
    this.props.onChange(value);
  }

  handleFocus() {
    this.setState({
      selected: !this.state.selected
    });
  }

  render() {
    const style = this.getStyle();
    let className = 'dt-filter';
    if (this.state.selected) {
      className += ' dt-filter-selected';
    }

    return (
      <div>
        <input
          type='text'
          id={this.props.id}
          className={className}
          style={style}
          placeholder={this.props.text}
          value={this.state.value}
          onChange={(event) => this.handleChange(event)}
          onFocus={() => this.handleFocus()}
          onBlur={() => this.handleFocus()} />
      </div>
    );
  }
}
