import React, {Component} from 'react';
import PropTypes from 'prop-types';


import {GLOBAL_RESPONSE_STATUS} from '../../utils/functions'


import theme from './theme.scss'


class ConnectionChecker extends Component {

    state = {
        GLOBAL_RESPONSE_STATUS: true
    }

    timeout = false
    clearTimer = () => {
        var that = this
        clearTimeout(that.timeout)
    }

    componentWillUnmount () {
        this.clearTimer()
    }

    componentDidMount() {
        this.checkResponseStatus()
    }

    checkResponseStatus() {
        this.setState({GLOBAL_RESPONSE_STATUS}, () => {})

        this.timeout = setTimeout(() => {
            this.checkResponseStatus()
        }, 1000)
    }

	render() {
        const {GLOBAL_RESPONSE_STATUS} = this.state

		return (
			<div>
                {GLOBAL_RESPONSE_STATUS != true &&
                    <div className={theme.connectionBlock}>
                        <div>
                            <label>Error status:</label>
                            {GLOBAL_RESPONSE_STATUS}
                        </div>
                    </div>
                }
            </div>
		)
	}
}

ConnectionChecker.propTypes = {
  // title: PropTypes.string.isRequired,
};

export default ConnectionChecker
