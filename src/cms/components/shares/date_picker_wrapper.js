import React, { Component } from 'react';
import DatePicker from '../../../../node_modules/material-ui/lib/date-picker/date-picker';

export default class DatePickerWrapper extends Component {

  constructor(props) {
    super(...props);
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