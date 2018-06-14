import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
// import Button from 'material-ui/Button';
import {Link} from 'react-router-dom';

import BlockForm from '../../components/BlockForm'
import FormButton from '../../components/BlockForm/FormButton'

import Preloader from '../../components/Preloader'

import theme from './theme.scss'

import {apiSignupVerify} from '../../utils/functions'

const styles = {
};

class Verify extends Component {

	state = {
		verify_code: false,
	}

	componentDidMount() {

		const {match} = this.props
		let token = match ? match.params.token : false

		if(token) {
			apiSignupVerify(token).then((response) => {

				this.setState({verify_code: response.status}, () => {})

				// response.status codes
				// 204 token already confirmed
				// 500 token does not exist
				// 200 success

	        }, () => {})
		}
	}

	render() {

		const {classes} = this.props
		const {verify_code} = this.state

		return (
			<div>
                <BlockForm bgid={29} title="Verification">

					{!verify_code && <Preloader />}
					{verify_code &&
						<ul className={theme.verifyWrapper}>
							<li data-li="message">
								{verify_code == 200 && 'Email confirmed!'}
								{verify_code == 204 && 'Email already confirmed'}
								{verify_code == 500 && 'Confirmation code does not exist'}
							</li>
							<li>
								<Link to="/p/login">
                                    <FormButton
                                        disabled={false}
                                        type="button"
                                        label="Login"
                                        fullWidth
                                        />
								</Link>
							</li>
						</ul>
					}

                </BlockForm>
            </div>
		)
	}
}

export default withStyles(styles)(Verify)
