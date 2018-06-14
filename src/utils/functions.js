import cookielib from 'react-cookies';
import axios from 'axios';
const _ = require('lodash');

import {apiDomain, apiEndpoint} from '../config/init'



function apiCaller(url, post=false) {
    
    console.log(`${apiEndpoint}/${url}`)
    
    let data = false
    if(post) {
        data = axios.post(`${apiEndpoint}/${url}`, post).then(response => {
    		return response
    	})
    } else {
        data = axios.get(`${apiEndpoint}/${url}`).then(response => {
    		return response
    	})
    }

    return data
}


// SETTINGS
export function apiSystemSettings() {
	return apiCaller(`system/settings/`)
}




// NEWS
export function apiNewsList() {
    return apiCaller(`news/list/`)
}
export function apiNewsDetail(id) {
    return apiCaller(`news/detail/${id}/`)
}

// TICKETS
export function apiCatalogTicketsDiscountsList(slug) {
    return apiCaller(`catalog/tickets/discounts/${slug}/`)
}
export function apiCatalogTicketsList(slug) {
    return apiCaller(`catalog/tickets/list/${slug}/`)
}
export function apiCatalogTicketsDetail(id, discount_code) {
    return apiCaller(`catalog/tickets/detail/${id}/${discount_code}/`)
}
export function apiCatalogTicketsBooking(post) {
    return apiCaller(`catalog/tickets/booking/`, post)
}

// PROFILE
export function apiProfileDetail(id) {
    return apiCaller(`profile/${id}/`)
}

// PROPERTY: REALTY
export function apiCatalogRealtyList() {
    return apiCaller(`catalog/realty/list/`)
}
export function apiCatalogRealtyDetail(id) {
    return apiCaller(`catalog/realty/detail/${id}/`)
}

// PROPERTY: RENTALS
export function apiCatalogRentalsList() {
    return apiCaller(`catalog/rentals/list/`)
}

export function apiCatalogRentalsDetail(id) {
    return apiCaller(`catalog/rentals/detail/${id}/`)
}

export function apiCatalogRentalsBooking(post) {
    return apiCaller(`catalog/rentals/booking/`, post)
}



// SUPPORT
export function apiContactForm(request) {
	return apiCaller(`support/contactform/`)
}



// AUTH
export function apiTokenAuth() {
    const url = `${apiEndpoint}/accounts/user-profile/`
    const token = cookie('get', 'token')
    return axios.get(url).then((response) => {
        if(response.status == 200) {
            let r = response.data.user
            r['token'] = token
            return r
        } else {
            cookie('delete', 'token')
            return false
        }
    })
}


export function apiPasswordSubmit(uid, token, request) {
    const url = `${apiEndpoint}/accounts/reset/${uid}/${token}/`
	return axios.post(url, request).then((response) => {
		return response
    })
}


export function apiPasswordReset(request) {
    const url = `${apiEndpoint}/accounts/password_reset/`
	return axios.post(url, request).then((response) => {
		return response
    })
}

export function apiSignupVerify(token) {
    const url = `${apiEndpoint}/accounts/verify/${token}/`
	return axios.get(url).then((response) => {
		return response
    })
}

export function apiSignup(request) {
    const url = `${apiEndpoint}/accounts/register/`
    console.log(url)

	return axios.post(url, request).then((response) => {
		return response
    })
}

export function apiSignin(request) {
    const url = `${apiEndpoint}/accounts/login/`
	return axios.post(url, request).then((response) => {
		return response
    })
}





// UTILS
export function cookie(type, payload) {
    switch (type) {
    	case 'get':
            let value = cookielib.load(payload)
            if(typeof(value) === 'undefined' || value === 'undefined') {
                value = false
            }
    		return value
        case 'set':
            cookielib.save(payload[0], payload[1], {path: '/'})

            // Hack for authorization
            if(payload[0] == 'token') {
                axios.defaults.headers.common['Authorization'] = `Token ${payload[1]}`;
            }

            return true
        case 'delete':
            cookielib.remove(payload, {path: '/'})
            return true
    	default:
    		return false
    }
}


// PAGE TITLE FUNC()

export function pageTitleByPath(path=false, sitename=false) {

    let titles_arr = [
        // {
        //     title: 'Home',
        //     path: '/',
        //     exact: true,
        // },
        {
            title: 'Auth',
            path: '/p/login',
            exact: false,
        },
        {
            title: 'SingUp',
            path: '/p/signup',
            exact: false,
        },
    ]

    for (let i=0; i < titles_arr.length; i++) {
        if(!titles_arr[i].exact && path.indexOf(titles_arr[i].path) !=-1) {
            document.title = titles_arr[i].title
            break
        } else if(titles_arr[i].exact && path == titles_arr[i].path) {
            document.title = titles_arr[i].title
        } else {
            document.title = sitename
        }
    }

}
function pageTitle(title=false) {
    document.title = title ? title : '...'
    return true
}


let CURRENT_AUDIO = false
export function soundsCollection(song, play) {
    let sound_url = `${apiDomain}/media/sounds/${song}.mp3`

    if(CURRENT_AUDIO.paused || CURRENT_AUDIO.currentTime >= 0) {
        CURRENT_AUDIO.pause()
    } else {
        CURRENT_AUDIO = new Audio(sound_url)
    }
    if(play) {
        // CURRENT_AUDIO.play()
    } else {
        CURRENT_AUDIO.pause()
        CURRENT_AUDIO = false
    }
}



// Token for API Authorization
export let GLOBAL_RESPONSE_STATUS = true
function applyAxiosSettings() {
    axios.defaults.headers.common['Authorization'] = `Token ${cookie('get', 'token')}`;
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    axios.interceptors.response.use(response => {
        // soundsCollection('connection_error', false)

        GLOBAL_RESPONSE_STATUS = true

        if(response.data.meta && typeof response.data.meta.title !== 'undefined') {
            pageTitle(response.data.meta.title)
        }

        return response;
    }, error => {

        // soundsCollection('connection_error', true)

        if (!error.response) {
            // console.log('Network error!')
            GLOBAL_RESPONSE_STATUS = 'Network error!'
        } else {
            console.log(error.response.status)
            GLOBAL_RESPONSE_STATUS = error.response.status
            return error.response
        }
        return Promise.reject(error.response);
    })


} applyAxiosSettings()
