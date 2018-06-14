import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom'
import {Link} from 'react-router-dom';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Typography from 'material-ui/Typography';
// import Icon from 'material-ui/Icon';

import NumberFormat from 'react-number-format';
import theme from './theme.scss'


const styles = {
};


class ItemView extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        const {data, type} = this.props

        let routing_url = type == 'rentals' ? '/p/rentals' : '/p/realty'
        routing_url = `${routing_url}/${data.id}/`

        return (
            <ul data-box className={theme.itemBox}>
                <li data-li="preview">
                    {data.image_preview &&
                        <Link to={routing_url}>
                            <img src={data.image_preview} />
                        </Link>
                    }
                </li>
                <li data-li="details">
                    <ul data-ul="header">
                        <li>
                            <Typography variant="title">
                                <Link to={routing_url} data-link>{data.title}</Link>
                            </Typography>
                        </li>
                        <li data-li="price">
                            {type == 'rentals' ?
                                <div>
                                    From <NumberFormat value={data.best_price ? data.best_price : 0} displayType={'text'} decimalScale={0} thousandSeparator={true} prefix='€ ' /> / day
                                </div>
                            :
                                <div>
                                    <NumberFormat value={data.price ? data.price : 0} displayType={'text'} decimalScale={0} thousandSeparator={true} prefix='€ ' />
                                </div>
                            }
                        </li>
                    </ul>
                    {type == 'rentals' ?
                        <ul data-ul="info">
                            <li>
                                <Icon>group</Icon>
                                {data.data.max_guest} guests
                            </li>
                            <li>
                                <Icon>360</Icon>
                                {data.data.rooms} rooms
                            </li>

                            <li>
                                <Icon>hotel</Icon>
                                {data.data.beds.total} beds
                            </li>
                            <li>
                                <Icon>pool</Icon>
                                {data.data.bathrooms} bathrooms
                            </li>
                        </ul>
                    :
                        <ul data-ul="info">
                            <li>
                                <Icon>360</Icon>
                                {data.data.rooms} rooms
                            </li>
                            <li>
                                <Icon>pool</Icon>
                                {data.data.bathrooms} bathrooms
                            </li>
                            <li>
                                <Icon>rounded_corner</Icon>
                                {data.data.size} m&sup2;
                            </li>
                            <li>
                                <Icon>directions_run</Icon>
                                {data.data.toilets} toilets
                            </li>
                        </ul>
                    }

                    <p data-el="description">
                        {data.description_short}
                    </p>

                    {data.contacts ?
                        <div data-el="profile">
                            Seller <Link to={`/p/profile/${data.contacts.username}`} data-link>{data.contacts.name}</Link>
                        </div>
                    : ''}
                </li>
            </ul>
        )
    }
}

ItemView.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default withRouter(withStyles(styles)(ItemView));
