/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable react/no-multi-comp */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {withRouter} from 'react-router';
import {withStyles} from 'material-ui/styles';
import {connect} from 'react-redux';

import {FormControlLabel} from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';

import Duration from './Duration';

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
			<div>
				<ul className={theme.playerControls}>
					<li>
						<ul className={theme.playerControlsButtons}>
							<li>
								<IconButton aria-label="Play" onClick={this.props.playPause}>
									{playing
										? <Icon>pause</Icon>
										: <Icon>play_arrow</Icon>}
								</IconButton>
							</li>
							<li className={theme.playerControlsNoMobile}>
								<IconButton aria-label="Fullscreen" onClick={this.props.onClickFullscreen}>
									<Icon>fullscreen</Icon>
								</IconButton>
							</li>
							<li className={theme.playerControlsNoMobile}>
								<IconButton aria-label="Play" onClick={this.props.toggleMuted}>
									{muted
										? <Icon>volume_mute</Icon>
										: <Icon>volume_up</Icon>}
								</IconButton>
							</li>
						</ul>
					</li>
					<li className={theme.playerControlsDuration}>
						<Duration seconds={played * duration}/>
						/
						<Duration seconds={duration}/>
					</li>
					<li className={theme.playerControlsNoMobile}>
						<FormControlLabel control={< Switch checked = {
							playbackRate == 3
								? true
								: false
						}
						onChange = {
							(event, checked) => this.props.setPlaybackRate(checked)
						} />} label="Faster"/>

						<FormControlLabel control={< Switch checked = {
							loop
						}
						onChange = {
							this.props.toggleLoop
						} />} label="Loop"/>
					</li>
				</ul>

			</div>
		)
	}
}

PlayerControls.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlayerControls);
