import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom'
// import {Link} from 'react-router-dom';
// import Button from 'material-ui/Button';
// import Typography from 'material-ui/Typography';
// import Icon from 'material-ui/Icon';



import theme from './theme.scss'

const styles = {
};



class PageHome extends Component {

    state = {
    }


	render() {

        return (
            <div />
        )
	}
}

PageHome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(PageHome));
