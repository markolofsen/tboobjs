import * as constants from '../constants'
const _ = require('lodash');
import {BrowserView, isMobile} from 'react-device-detect';

const initialState = {
	menu_left: false,
	menu_right: false,
	site_settings: {
        sitename: false,
        slogan: false,
        year: false,
        google_map_api_key: false,
		links: [],
		menu: [],
		homepage: '/',
		leftmenu_active: true,
    }
}

function windowResize() {
	setTimeout(function() {
		window.dispatchEvent(new Event('resize'));
	}, 300);
}

export default function configUpdate(state = initialState, {type, payload}) {

	// console.log('-------------//')
	// console.log(type)
	// console.log(payload)

	switch (type) {

		case 'SITE_SETTINGS':
			state.site_settings = payload
			return {
				...state
			}

		case 'HIDE_ALL_MENUS':
			state.menu_left = false
			state.menu_right = false
			windowResize();
            return {
				...state
			}

		case 'LEFT_MENU_TOGGLE':
			if (payload == 'toggle') {
				state.menu_left = !state.menu_left
			} else {
				state.menu_left = payload
			}

			// if(state.menu_left && isMobile) {
			if (state.menu_left) {
				window.scrollTo(0, 0);
			}
			windowResize();
            return {
				...state
			}

		case 'RIGHT_MENU_TOGGLE':
			if (payload == 'toggle') {
				state.menu_right = !state.menu_right
			} else {
				state.menu_right = payload
			}
			// if(state.menu_left && isMobile) {
			if (state.menu_right) {
				window.scrollTo(0, 0);
			}
			windowResize();
            return {
				...state
			}

		default:
			return state
	}
}
