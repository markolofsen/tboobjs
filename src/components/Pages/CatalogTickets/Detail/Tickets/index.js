import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import ExpansionPanel, {ExpansionPanelSummary, ExpansionPanelDetails} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';


import DatePicker from '../DatePicker'
import ShowMore from '../../../../ShowMore'
import FormButton from '../../../../BlockForm/FormButton'
import FormSelect from '../../../../BlockForm/FormSelect'
import NumberFormat from 'react-number-format';
import BookingSelector from '../BookingSelector'
import ModalCustomerForm from '../ModalCustomerForm/'
import CountDown from '../../../../CountDown/';
import {isBrowser, isMobile} from 'react-device-detect';

import theme from './theme.scss'

const styles = theme => ({
	panelExpanded: {
		"& > div": {
			overflow: 'inherit',
		},
	},
});

class Tickets extends Component {

	state = {
		expanded: null,
		datepicker: false,
	};


	handleChange = panel => (event, expanded) => {
		this.setState({
			expanded: expanded ? panel : false,
		});
	};

	callbackBookingPersons = () => {
		console.log('ok')
	}

	callbackDatepicker = (datepicker) => {
		this.setState({datepicker})

		// console.log(this.state.datepicker)
	}


	submitBookingForm = (event, item) => {
		event.stopPropagation()
        event.preventDefault()

		const {datepicker} = this.state

		let data = {
			offer_id: this.props.offerId,
			ticket: item,
			prices: this.refBookingSelector.getState(),
			date: datepicker,
			time: this.refTimePicker ? this.refTimePicker.getState() : false,
			language: this.refLanguagePicker ? this.refLanguagePicker.getState() : false,
			discount_code: item.discount_code,
		}

		this.refModalCustomerForm.loadData(data)

	}


	renderContent(item) {
		const {datepicker} = this.state

		return (
			<div>
				<div className={theme.ticketDescription}>
					<ShowMore text={item.description} height={60}/>
				</div>

				<ul className={theme.ticketDetails}>

					{item.duration &&
					<li>
						<label>Duration:</label>
						<div>
							{item.duration}
						</div>
					</li>}

					{item.include.length > 0 &&
					<li>
						<label>Included:</label>
						<div>
							{item.include.join(', ')}
						</div>
					</li>}

					{item.languages.length > 0 &&
					<li>
						<label>Languages:</label>
						<div>
							{item.languages.join(', ')}
						</div>
					</li>}

					{isBrowser && item.bestprice && item.bestprice.expires &&
						<li data-li="countdown">
							<label>End of promo:</label>
							<div>
								<CountDown date={item.bestprice.expires} />
							</div>
						</li>}

				</ul>

				<form onSubmit={(e) => this.submitBookingForm(e, item)} >
					<ul className={theme.bookingForm}>

						<li>
							<BookingSelector
								onChange={this.callbackBookingPersons}
								data={item.prices_fields}
								addon={item.prices_addon}
								onRef={ref => (this.refBookingSelector = ref)}
								/>
						</li>
						<li data-li="date">
							<DatePicker data={item.available_dates} onChange={this.callbackDatepicker} />
						</li>
						{datepicker && datepicker.times.length > 0 ?
							<li data-li="time">
								<FormSelect
									options={datepicker.times}
									defaultValue='Time'
									onRef={ref => (this.refTimePicker = ref)}
									 />
							</li>
						: ''}
						{datepicker != false && item.languages && item.languages.length > 0?
							<li data-li="languages">
								<FormSelect
									options={item.languages}
									defaultValue='Language'
									onRef={ref => (this.refLanguagePicker = ref)}
									 />
							</li>
						: ''}
						<li data-li="button">
							<FormButton
								disabled={false}
								type="submit"
								label="Book!"
								fullWidth
								/>
						</li>
					</ul>
				</form>


			</div>

		)
	}

    render() {
        const {classes, data} = this.props
		const { expanded } = this.state;


        return (
            <div className={theme.ticketsWrapper}>

                <Typography variant="headline" gutterBottom>
                    Tickets
                </Typography>

				<ModalCustomerForm onRef={ref => (this.refModalCustomerForm = ref)} />

                {data.map((item, index) => {
					let expanded_id = `panel-${index}`

					let expanded_default = expanded == expanded_id || data.length == 1 ? true : false
                    return (
                        <ExpansionPanel key={index} expanded={expanded_default} defaultExpanded={expanded_default} onChange={this.handleChange(expanded_id)}
							classes={{
								expanded: classes.panelExpanded
							}}
							>
							<ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
								<ul className={theme.ticketHeading}>
									<li>
										{item.title}
									</li>
									<li>
										<Typography>

											{item.bestprice && item.bestprice.price && item.bestprice.discount_price
											? <span data-color="danger">
													<NumberFormat value={item.bestprice.discount_price} displayType={'text'} decimalScale={0} thousandSeparator={true} prefix='From € ' />
													<span style={{margin: '0 5px'}}>instead</span>
													<NumberFormat value={item.bestprice.price} displayType={'text'} decimalScale={0} thousandSeparator={true} prefix='€ ' />
												</span>
											:
												item.bestprice.price ?
													<NumberFormat value={item.bestprice.price} displayType={'text'} decimalScale={0} thousandSeparator={true} prefix='From € ' />
												: ''
											}
										</Typography>
									</li>
								</ul>
							</ExpansionPanelSummary>

                            <ExpansionPanelDetails>
                                <div style={{
									display: 'block',
									width: '100%',
								}}>

									{expanded_default && this.renderContent(item)}

                                </div>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )
                })}

            </div>
        )
    }
}

Tickets.propTypes = {
	classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired
};

export default withStyles(styles)(Tickets);
