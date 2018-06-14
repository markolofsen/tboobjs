// @flow weak

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import Collapse from 'material-ui/transitions/Collapse';
import ContactForm from './index'


import theme from './theme.scss'

const styles = {
};

class Block extends Component {

    state = {
		open: false,
    }

	switcher = () => {
        this.setState({open: !this.state.open}, () => {})
        console.log(this.state.open)
    }

	render() {

		const {open} = this.state
        return (
            <div data-contact-widget={open}>
                <ul data-widget="header" onClick={this.switcher}>
                    <li>
                        <Icon>chat</Icon>
                    </li>
                    <li>
                        <Typography variant="button">
                             Online support
                        </Typography>
                    </li>
                </ul>

                <Collapse in={open} collapsedHeight={0} data-widget="body">
                    <ContactForm />
                </Collapse>
            </div>
        )
	}
}

Block.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Block);
