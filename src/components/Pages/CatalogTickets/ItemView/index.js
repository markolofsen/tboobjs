import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom'
import {Link} from 'react-router-dom';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Typography from 'material-ui/Typography';
// import Icon from 'material-ui/Icon';


import CountDown from '../../../CountDown/';
import RatingBar from '../../../RatingBar/';
import NumberFormat from 'react-number-format';
import {isBrowser, isMobile} from 'react-device-detect';

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
        const {data, discountCode} = this.props
        const {countdown} = this.state

        let routing_url = `/p/tickets/${data.slug}/`
        if(discountCode) {
            routing_url = `${routing_url}${discountCode}/`
        }

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
                            {data.location ?
                                <div data-el="location">
                                    <Icon>place</Icon>
                                    {data.location.city}
                                </div>
                            : ''}
                        </li>
                        <li data-li="price">
                            {data.bestprice && data.bestprice.price_discount ?
                                <ul>
                                    {isBrowser && data.discount_date &&
                                        <li data-li="countdown">
                                            <CountDown date={data.discount_date} />
                                        </li>}

                                    <li data-li="discount">
                                        <NumberFormat value={data.bestprice.price_discount} displayType={'text'} decimalScale={0} thousandSeparator={true} prefix='From € ' />
                                        <span> instead </span>
                                        <NumberFormat value={data.bestprice.price} displayType={'text'} decimalScale={0} thousandSeparator={true} prefix='€ ' />
                                    </li>
                                </ul>
                            :
                                data.bestprice && data.bestprice.price ?
                                    <ul>
                                        <li data-li="normalprice">
                                            <NumberFormat value={data.bestprice.price} displayType={'text'} decimalScale={0} thousandSeparator={true} prefix='From € ' />
                                        </li>
                                    </ul>
                                : ''
                            }
                        </li>
                    </ul>

                    <p data-el="description">
                        {data.description_short}
                    </p>


                    {data.reviews.counter ?
                    <ul className={theme.reviewsRating}>
                        <li>
                            <RatingBar rating={data.reviews.rating} />
                        </li>
                        <li>
                            <Link to={routing_url} data-link>
                                <NumberFormat value={data.reviews.counter} displayType={'text'} decimalScale={0} thousandSeparator={true} prefix='' /> reviews
                            </Link>
                        </li>
                    </ul>
                    : ''}

                </li>
            </ul>
        )
    }
}

ItemView.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ItemView));
