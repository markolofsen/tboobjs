import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Icon from 'material-ui/Icon';

import theme from './theme.scss'


const styles = {
};

class Block extends Component {

    render() {

        const {rating, size} = this.props

        if(!rating && rating != 0) {
            return <div />
        }

        const stars = Array(rating).keys();
        const stars_borders = Array(5-rating).keys();

        return (
            <ul className={theme.ratingWrapper} data-size={size}>
                {[...Array.from(stars)].map((item, index) => {
                    return (
                        <li key={index}><Icon>star</Icon></li>
                    )
                })}
                {[...Array.from(stars_borders)].map((item, index) => {
                    return (
                        <li key={index}><Icon>star_border</Icon></li>
                    )
                })}
            </ul>
        )
    }
}

Block.propTypes = {
  classes: PropTypes.object.isRequired,
  // rating: PropTypes.number.isRequired,
};

export default withStyles(styles)(Block);
