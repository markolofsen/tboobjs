// @flow weak

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux';

// import {isBrowser, isMobile} from 'react-device-detect';
import GoogleMapReact from 'google-map-react'
// import {googleMapApiKey} from '../../config/init';



import theme from './theme.scss'

const styles = {
};


const AnyReactComponent = ({text}) => <div>{text}</div>;

class Block extends Component {

    state = {
		open: false,
    }

    _onChildMouseEnter = (key, childProps) => {
        console.log(childProps)
        // const markerId = childProps.marker.get('id');
        // const index = this.props.markers.findIndex(m => m.get('id') === markerId);
        // if (this.props.onMarkerHover) {
        //   this.props.onMarkerHover(index);
        // }
      }

    renderMap() {
        const {data, config} = this.props
        // let data = {
        //     lat: 28.2723377,
		// 	lng: -16.6512628,
        // }

        // Tenerife point
        const defaultCenter = {
            lat: 28.2723377,
			lng: -16.6512628,
        }

        let defaultZoom = 9

        let api_key = config.site_settings.google_map_api_key ? config.site_settings.google_map_api_key : false

        // console.log('defaultCenter')
        // console.log(defaultCenter)
        // draggable: !("ontouchend" in document),

        if(!api_key) {
            return <div />
        }
		return (
            <div className={theme.googleMap}>

                <GoogleMapReact
                    defaultCenter={defaultCenter}
                    defaultZoom={defaultZoom}
                    options={{
                        scrollwheel: false,
                        draggable: true,
                    }}
                    bootstrapURLKeys={{
                        key: api_key,
                        language: 'en',
                    }}
                    onChildMouseEnter={this._onChildMouseEnter}
                    >
                    <div className={theme.mapMarker} lat={data.lat} lng={data.lng}>
                       <AnyReactComponent text={''} />
                    </div>
                </GoogleMapReact>
            </div>
		)
    }

	render() {

        return (
            <div>
				{this.renderMap()}
            </div>
        )
	}
}

Block.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default
withRouter(
	(connect(
		(mapStateToProps) => (mapStateToProps),
		dispatch => ({
			// onSelectCoins: (payload) => {
			// 	dispatch({type: 'SELECT_COINS', payload})
			// },
		})
	))
	(withStyles(styles)(Block))
);
