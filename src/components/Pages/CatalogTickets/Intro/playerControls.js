/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable react/no-multi-comp */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {withRouter} from 'react-router';
import {withStyles} from 'material-ui/styles';
import {connect} from 'react-redux';

import {FormControlLabel} from 'material-ui/Form';
import Switch from 'material-ui/Switch';
// import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';


import theme from './theme.scss';


const styles = mui => ({
  buttonApproved: {
      width: '100%',
      display: 'block',
  },
});

class PlayerControls extends Component {

    

	render() {
		const {
			played,
			duration,
			playing,
			muted,
			loop,
			volume,
			playbackRate
		} = this.props.state

		return (
            <ul className={theme.playerControls}>
                <li>
                    <Button variant="raised" onClick={this.props.playPause} aria-label="Play">
                        {playing
                            ? <Icon>pause</Icon>
                            : <Icon>play_arrow</Icon>}
                    </Button>
                </li>
                <li className={theme.playerControlsNoMobile}>
                    <Button variant="raised" onClick={this.props.toggleMuted} aria-label="Volume">
                        {muted
                            ? <Icon>volume_mute</Icon>
                            : <Icon>volume_up</Icon>}
                    </Button>
                </li>
            </ul>
		)
	}
}

PlayerControls.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlayerControls);
