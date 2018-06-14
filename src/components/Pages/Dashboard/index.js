import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom'
import {Link} from 'react-router-dom';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
// import Icon from 'material-ui/Icon';


import theme from './theme.scss'

import {apiDomain, confSite} from '../../../config/init'

const styles = {
};

class PageDashboard extends Component {

    state = {
    }

    openLink(label) {

        window.open(confSite.links[label])

    }

	render() {
		return (
            <div>
    			PageDashboard
            </div>
		)
	}
}

PageDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(PageDashboard));
