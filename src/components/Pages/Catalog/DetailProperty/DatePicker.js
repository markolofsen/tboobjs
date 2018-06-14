import React, {Component} from 'react';
import PropTypes from 'prop-types';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
const _ = require('lodash');
import {isBrowser, isMobile} from 'react-device-detect';

class DatePicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null,
            focusedInput: null,
            // totalDays: 0,
        };
    }


    isDayBlocked = (day) => {
        const { data } = this.props;
        if(_.includes(data, day.format('YYYY-MM-DD'))) {
            return true
        }
    }


    isOutsideRange = (day) => {
        let prev = moment().add(1, 'days');
        let next = moment().add(1, 'years');
        if(prev.diff(day) > 0 || day.diff(next) > 0) {
            return true
        }
    }


    onDatesChange = ({ startDate, endDate }) => {
        this.setState({ startDate, endDate });

        if(startDate && endDate) {
            let totalDays = endDate.diff(startDate, 'days')
            // this.setState({totalDays})

            let arr = {
                totalDays: totalDays,
                startDate: startDate.format('YYYY-MM-DD'),
                endDate: endDate.format('YYYY-MM-DD'),
            }
            this.props.callback(arr)
            // console.log(arr)
        }
    }


    render() {

        const {startDate, endDate, totalDays} = this.state

        return (
            <div>
                <DateRangePicker
                  startDateId="startDate"
                  endDateId="endDate"
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  focusedInput={this.state.focusedInput}
                  onFocusChange={(focusedInput) => { this.setState({ focusedInput })}}
                  isDayBlocked={this.isDayBlocked}
                  onDatesChange={this.onDatesChange}
                  isOutsideRange={this.isOutsideRange}
                  numberOfMonths={isBrowser ? 2 : 1}
                  firstDayOfWeek={1}
                  block
                />
            </div>
        )
    }
}




DatePicker.propTypes = {
  data: PropTypes.object.isRequired,
};

export default DatePicker;
