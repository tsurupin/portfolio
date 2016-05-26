import React, { Component } from 'react';
import DatePicker from 'material-ui/DatePicker';

export default class DatePickerWrapper extends Component {

  constructor(props) {
    super(props);
  }

  onChange(e, date) {
    if (this.props.onChange) {
      this.props.onChange(date);
    }
  }

  render() {
    return <DatePicker {...this.props} onChange={this.onChange.bind(this)}/>
  }
}