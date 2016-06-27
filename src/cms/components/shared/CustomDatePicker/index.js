import React, { Component } from 'react';
import DatePicker from 'material-ui/DatePicker';

export default class CustomDatePicker extends Component {

  constructor(props) {
    super(props);
  }

  onChange(e, date) {
    if (this.props.onChange) {
      this.props.onChange(date);
    }
  }

  render() {
    let props;
    if (this.props.value) {
      props = {...this.props, value: new Date(this.props.value)}
    } else {
      props = this.props
    }

    return <DatePicker {...props} onChange={this.onChange.bind(this)} />
  }
}