import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import {connect} from 'react-redux'
import {login} from '../../actions/user'
import BlockForm from '../../components/BlockForm'
import FormField from '../../components/BlockForm/FormField'
import FormButton from '../../components/BlockForm/FormButton'

import {cookie, apiSignin, apiSignup, apiPasswordReset, apiPasswordSubmit} from '../../utils/functions'



import theme from './theme.scss'



const styles = mui => ({
  buttonSubmit: {
      display: 'block',
      width: '100%',
      padding: '15px 20px',
      marginTop: 15,
  }
});


export class LoginContainer extends Component {

    state = {
        username: '',
        email: '',
        password: '',
        password_2: '',
        new_password: '',
        new_password_2: '',
        errors: {
            username: false,
            email: false,
            password: false,
            password_2: false,
            first_name: false,
            last_name: false,
            invite_code: false,
            new_password: false,
            new_password_2: false,
            non_field_errors: false,
        },
        form_disabled: false,
        form_type: 'signin',
        password_reset_token: false,
    }

    componentWillMount() {
        // PAST EMAIL FROM COOKIE
        let get_cookie_email = cookie('get','email')
        let get_cookie_username = cookie('get','username')

        if(get_cookie_email) {
            this.setState({email: get_cookie_email}, () => {})
        }
        if(get_cookie_username) {
            this.setState({username: get_cookie_username}, () => {})
        }
    }

    componentDidMount() {
        this.checkPasswordResetRequest()

        // console.log(this.props.match)
        if(this.props.match.path == '/p/signup') {
            this.setState({form_type: 'signup'}, () => {})
        }
    }

    checkPasswordResetRequest() {
        const {match} = this.props
		let password_reset_uid = match ? match.params.password_reset_uid : false
        let password_reset_token = match ? match.params.password_reset_token : false

        if(password_reset_uid && password_reset_token) {
            this.setState({
                form_type: 'password_reset_form',
                password_reset_uid: password_reset_uid,
                password_reset_token: password_reset_token,
            })
        }
    }


    changeFormType = (type) => {
        this.setState({form_type: type}, () => {})
    }

    formSubmitSignin = (event) => {
        if(event) {
            event.preventDefault()
        }

        const {email, password, errors} = this.state
        this.setState({form_disabled: true}, () => {})

        apiSignin({email, password}).then((response) => {

            if(response.status == 400) {
                let d = response.data
                let newState = Object.assign({}, errors);
                _.keys(newState).map((item, index) => {
                    newState[item] = false
                })
                newState.non_field_errors = d.non_field_errors[0];
                this.setState({errors: newState}, () => {});
            } else if(response.status == 200) {
                this.props.login({
                    name: email,
                    isAdmin: false,
                    token: response.data.token,
                    email: email,
                })
            } else {
                alert('Error status: '+response.status)
            }

            this.setState({form_disabled: false}, () => {});

        }, () => {})

	}
    formSubmitSignup = (event) => {
        event.preventDefault()

        const {username, email, password, password_2, errors} = this.state
        this.setState({form_disabled: true}, () => {})

        let request = {
            username: username,
            email: email,
            password: password,
            password_2: password_2,
            first_name: username,
            last_name: username,
            // invite_code: '',
        }
        apiSignup(request).then((response) => {

            let d = response.data

            let newState = Object.assign({}, errors);
            _.keys(newState).map((item, index) => {
                newState[item] = false
            })

            if(response.status == 400) {
                _.keys(d).map((item, index) => {
                    newState[item] = d[item][0];
                })
                this.setState({errors: newState}, () => {});
                console.log('ERRORS')
            } else {
                console.log('SUCCESS')
                this.setState({form_type: 'signup_confirmation'}, () => {})
            }

            this.setState({form_disabled: false}, () => {});

        }, () => {})

    }

    formSubmitPasswordReset = (event) => {
        event.preventDefault()

        const {email, errors} = this.state
        this.setState({form_disabled: true}, () => {})

        let request = {
            email: email,
        }
        apiPasswordReset(request).then((response) => {

            this.setState({
                form_type: 'password_reset_message',
                form_disabled: false,
            }, () => {})

        }, () => {})

	}
    formSubmitPassword = (event) => {
        event.preventDefault()

        const {new_password, new_password_2, password_reset_uid, password_reset_token, errors} = this.state

        this.setState({form_disabled: true}, () => {})

        let request = {
            new_password: new_password,
            new_password_2: new_password_2,
        }

        apiPasswordSubmit(password_reset_uid, password_reset_token, request).then((response) => {
            // console.log(response)
            let d = response.data

            let newState = Object.assign({}, errors);
            _.keys(newState).map((item, index) => {
                newState[item] = false
            })

            if(response.status == 400) {
                _.keys(d).map((item, index) => {
                    newState[item] = d[item][0];
                })
                this.setState({
                    errors: newState,
                    form_disabled: false
                }, () => {});

                console.log('ERRORS')
            } else {
                console.log('SUCCESS')
                this.setState({
                    form_type: 'signin',
                    password: new_password,
                }, () => {})
                this.formSubmitSignin()
            }

        }, () => {})
    }


    handleChangeInput = (event, name) => {
        this.setState({
            [name]: event.target.value,
        });
    };


    confirmEmail = (url) => {
        this.setState({form_type: 'signin'}, () => {})
        window.open(`http://${url}`)
    }

    renderFormSignupConfirmation() {
        const {classes} = this.props
        const {username, email} = this.state

        let email_domain = email.split('@')[1]

        return (
            <BlockForm bgid={29} title="Confirmation">
                <ul className={theme.confirmWrapper}>
                    <li data-li="message">
                        <span data-el="username">{username}</span> check {email} <span data-nowrap>and confirm registration.</span>
                    </li>
                    <li>
                        <FormButton
                            disabled={false}
                            type="button"
                            label={email_domain}
                            onClick={() => this.confirmEmail(email_domain)}
                            fullWidth
                            />
                    </li>
                </ul>
            </BlockForm>
        )

    }

    renderFormSignin() {
        const {classes} = this.props
        const {form_disabled, errors} = this.state

        return (
            <BlockForm bgid={29} title="Sign in">

                <form onSubmit={(event) => this.formSubmitSignin(event)}>

                    <ul data-list="form">
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
                                state_value={this.state.password}
                                state_name="password"
                                placeholder="Password"
                                type="password"
                                required={true}
                                disabled={form_disabled}
                                error={errors.password}
                                onChange={this.handleChangeInput}
                                 />
                        </li>
                        {errors.non_field_errors && <li data-li="error">{errors.non_field_errors}</li>}
                        <li>
                            <FormButton
                                disabled={form_disabled}
                                type="submit"
                                label="Sign In"
                                fullWidth
                                />
                        </li>
                        <li data-li="footer">
                            <ul>
                                <li>
                                    <span data-link onClick={() => this.changeFormType('signup')}>New registration</span>
                                </li>
                                <li>
                                    <span data-link onClick={() => this.changeFormType('password_reset')}>Reset password</span>
                                </li>
                            </ul>
                        </li>
                    </ul>

                </form>
            </BlockForm>
        )
    }

    renderFormSignup() {
        const {classes} = this.props
        const {form_disabled, errors} = this.state

        return (
            <BlockForm bgid={29} title="Registration">
                <form onSubmit={(event) => this.formSubmitSignup(event)}>
                    <ul data-list="form">
                        <li>
                            <FormField
                                state_value={this.state.username}
                                state_name="username"
                                placeholder="Username"
                                type="text"
                                required={true}
                                disabled={form_disabled}
                                error={errors.username}
                                onChange={this.handleChangeInput}
                                 />
                        </li>
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
                                state_value={this.state.password}
                                state_name="password"
                                placeholder="Password"
                                type="password"
                                required={true}
                                disabled={form_disabled}
                                error={errors.password}
                                onChange={this.handleChangeInput}
                                 />
                        </li>
                        <li>
                            <FormField
                                state_value={this.state.password_2}
                                state_name="password_2"
                                placeholder="Repeat password"
                                type="password"
                                required={true}
                                disabled={form_disabled}
                                error={errors.password_2}
                                onChange={this.handleChangeInput}
                                 />
                        </li>
                        <li>
                            <FormButton
                                disabled={form_disabled}
                                type="submit"
                                label="Sign Up"
                                fullWidth
                                />
                        </li>
                        <li data-li="footer">
                            <ul>
                                <li>
                                    <span data-link onClick={() => this.changeFormType('signin')}>Sign in</span>
                                </li>
                                <li>
                                    <span data-link onClick={() => this.changeFormType('password_reset')}>Password recovery</span>
                                </li>
                            </ul>
                        </li>
                    </ul>

                </form>
            </BlockForm>
        )
    }

    renderFormPasswordReset() {
        const {classes} = this.props
        const {form_disabled, errors} = this.state

        return (
            <BlockForm bgid={29} title="Password recovery">

                <form onSubmit={(event) => this.formSubmitPasswordReset(event)}>

                    <ul data-list="form">
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
                            <FormButton
                                disabled={form_disabled}
                                type="submit"
                                label="Reset password"
                                fullWidth
                                />
                        </li>
                        <li data-li="footer">
                            <ul>
                                <li>
                                    <span data-link onClick={() => this.changeFormType('signup')}>New registration</span>
                                </li>
                                <li>
                                    <span data-link onClick={() => this.changeFormType('signin')}>Sign in</span>
                                </li>
                            </ul>
                        </li>
                    </ul>

                </form>
            </BlockForm>
        )
    }

    openEmailRecovery = (url) => {
        this.setState({form_type: 'signin'}, () => {})
        window.open(`http://${url}`)
    }

    renderFormPasswordResetMessage() {
        const {classes} = this.props
        const {email} = this.state

        let email_domain = email.split('@')[1]

        return (
            <BlockForm bgid={29} title="Done!">
                <ul data-list="form" className={theme.confirmWrapper}>
                    <li data-li="message">
                        Link for password recovery was sent to {email}
                    </li>
                    <li>
                        <FormButton
                            disabled={false}
                            type="button"
                            label={email_domain}
                            onClick={() => this.openEmailRecovery(email_domain)}
                            fullWidth
                            />
                    </li>
                    <li data-li="footer">
                        <span data-link onClick={() => this.changeFormType('signin')}>Sign in</span>
                    </li>
                </ul>
            </BlockForm>
        )
    }

    renderFormPasswordResetForm() {
        const {classes} = this.props
        const {form_disabled, errors} = this.state

        return (
            <BlockForm bgid={29} title="New password">

                <form onSubmit={(event) => this.formSubmitPassword(event)}>

                    <ul data-list="form">
                        <li>
                            <FormField
                                state_value={this.state.new_password}
                                state_name="new_password"
                                placeholder="New password"
                                type="password"
                                required={true}
                                disabled={form_disabled}
                                error={errors.new_password}
                                onChange={this.handleChangeInput}
                                 />
                        </li>
                        <li>
                            <FormField
                                state_value={this.state.new_password_2}
                                state_name="new_password_2"
                                placeholder="Repeat password"
                                type="password"
                                required={true}
                                disabled={form_disabled}
                                error={errors.new_password_2}
                                onChange={this.handleChangeInput}
                                 />
                        </li>
                        {errors.non_field_errors && <li data-li="error">{errors.non_field_errors}</li>}
                        <li>
                            <FormButton
                                disabled={form_disabled}
                                type="submit"
                                label="Change password"
                                fullWidth
                                />
                        </li>
                        <li data-li="footer">
                            <ul>
                                <li>
                                    <span data-link onClick={() => this.changeFormType('signin')}>Sign in</span>
                                </li>
                                <li>
                                    <span data-link onClick={() => this.changeFormType('password_reset')}>Password recovery</span>
                                </li>
                            </ul>
                        </li>
                    </ul>

                </form>
            </BlockForm>
        )
    }

	render() {
        const {form_type} = this.state

		return (
			<div className={theme.authWrapper}>

                {form_type == 'signin' && this.renderFormSignin()}
                {form_type == 'signup' && this.renderFormSignup()}
                {form_type == 'signup_confirmation' && this.renderFormSignupConfirmation()}
                {form_type == 'password_reset' && this.renderFormPasswordReset()}
                {form_type == 'password_reset_message' && this.renderFormPasswordResetMessage()}
                {form_type == 'password_reset_form' && this.renderFormPasswordResetForm()}


			</div>
		)
	}

}

LoginContainer.propTypes = {
	login: PropTypes.func.isRequired
  // init: PropTypes.object.isRequired,
};


export default connect(null, {login})(withStyles(styles)(LoginContainer))
