import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import FormField from '../BlockForm/FormField'
import FormButton from '../BlockForm/FormButton'

import {apiContactForm} from '../../utils/functions'

import theme from './theme.scss'

class Block extends Component {

	state = {
		email: '',
		message: '',
		errors: {
			email: '',
			message: '',
		},
		form_disabled: false,
		form_type: 'form',
	}


	formSubmit = (event) => {
		event.preventDefault()

		const {email, message, errors} = this.state

		this.setState({form_disabled: true})
		let request = {email, message}
		apiContactForm(request).then((response) => {
			console.log(response)

			let d = response.data
			if(d.error) {
				let newState = Object.assign({}, errors);
                _.keys(newState).map((item, index) => {
                    newState[item] = false
                })
                _.keys(d.errors).map((item, index) => {
                    newState[item] = d.errors[item][0];
                })
                this.setState({errors: newState}, () => {});
			} else {
				this.setState({form_type: 'complete'}, () => {})
			}

			this.setState({form_disabled: false})
		})
	}

	handleChangeInput = (event, name) => {
        this.setState({
            [name]: event.target.value,
        });
    };

	switchState = () => {
		this.setState({
			form_type: 'form',
			form_disabled: false,
			message: '',
		})
	}

	renderSupportForm() {
		// const {classes} = this.props
        const {form_disabled, errors} = this.state

		return (
			<div>
				<form onSubmit={(event) => this.formSubmit(event)}>

					<ul className={theme.supportWrapperForm}>
						<li>
							<FormField
								state_value={this.state.email}
								state_name="email"
								placeholder="Email Address"
								type="email"
								required={true}
								disabled={form_disabled}
								error={errors.email}
								onChange={this.handleChangeInput}
								 />
						</li>
						<li>
							<FormField
								state_value={this.state.message}
								state_name="message"
								placeholder="Your message"
								type="text"
								multiline={true}
								required={true}
								disabled={form_disabled}
								error={errors.message}
								onChange={this.handleChangeInput}
								 />
						</li>
						<li>
                            <FormButton
                                disabled={form_disabled}
                                type="submit"
                                label="Send"
                                fullWidth
                                />
                        </li>
					</ul>

				</form>
			</div>
		)
	}

	renderSupportFormComplete() {
		return (
			<div className={theme.supportWrapperFormCompleted}>
				<div>
					<h4 data-tag="h4">Message was sent</h4>
					<Button variant="raised" onClick={this.switchState}>
						Send new
					</Button>
				</div>
			</div>
		)
	}


	render() {

		const {form_type} = this.state

		return (
			<div className={theme.supportWrapper}>
				{form_type == 'form' && this.renderSupportForm()}
				{form_type == 'complete' && this.renderSupportFormComplete()}
            </div>
		)
	}
}

export default Block
