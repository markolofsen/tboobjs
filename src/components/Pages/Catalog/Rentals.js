import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom'
import {Link} from 'react-router-dom';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Typography from 'material-ui/Typography';
// import Icon from 'material-ui/Icon';

import Preloader from '../../Preloader'


import theme from './theme.scss'

import {apiCatalogRentalsList} from '../../../utils/functions'
import ItemView from './ItemView/'

const styles = {
};


class Page extends Component {

    state = {
        data: false,
    }

    componentDidMount() {
        apiCatalogRentalsList().then(res => {
            if(!res.data.error) {
                this.setState({data: res.data.results})
            }
        })
    }


	render() {

        const {data} = this.state

        if(!data) {
            return <Preloader />
        }
		return (
            <div data-content-inner>
                <div className={theme.catalogWrapper}>
                    <Typography variant="display1" gutterBottom>
                        Vacation Rentals
                    </Typography>

        			{data.map((item, index) => {
                        return(<ItemView key={index} data={item} type="rentals" />)
                    })}
                </div>
            </div>
		)
	}
}

Page.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Page));
