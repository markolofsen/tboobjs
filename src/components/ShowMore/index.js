// @flow weak

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom'
import Collapse from 'material-ui/transitions/Collapse';

import theme from './theme.scss'

const styles = {
};

class Block extends Component {

    state = {
		open: false,
    }

	switcher = () => {
        this.setState({open: !this.state.open})
    }

	render() {

		const {open} = this.state
		const {text, height} = this.props

		let height_ = height ? height : 120

        if(text.length < 300) {
            return (
                <div className={theme.contentFormat}>
                    <div dangerouslySetInnerHTML={{__html: text}} />
                </div>
            )
        }
        return (
            <div>
				<div className={theme.contentFormat}>
	                <Collapse in={open} collapsedHeight={`${height_}px`}>
	                    <div className={theme.contentFormat} dangerouslySetInnerHTML={{__html: text}} />
	                </Collapse>

	                <div data-el="more">
                        <span onClick={this.switcher}>
                            Read more...
                        </span>
                    </div>
	            </div>
            </div>
        )
	}
}

Block.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
};

export default withRouter(withStyles(styles)(Block));
