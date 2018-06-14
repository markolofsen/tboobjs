// @flow weak

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';


import ReactMomentCountDown from 'react-moment-countdown';
import moment from 'moment';

import theme from './theme.scss'

const styles = {};

class Block extends Component {

	state = {
		value: false
	}


	render() {

		const {value} = this.state
        const {date, ...other} = this.props

		const dateInFuture = moment(date);

		return (
			<div {...other}>
				<ReactMomentCountDown toDate={dateInFuture} sourceFormatMask='YYYY-MM-DD HH:mm:ss' />
			</div>
		)
	}
}

Block.propTypes = {
	classes: PropTypes.object.isRequired,
	date: PropTypes.string.isRequired
};

export default withStyles(styles)(Block);
