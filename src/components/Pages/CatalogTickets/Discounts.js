import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom'
import {Link} from 'react-router-dom';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
// import Icon from 'material-ui/Icon';

import {apiCatalogTicketsDiscountsList} from '../../../utils/functions'
import ItemView from './ItemView/'
import Preloader from '../../Preloader'
import BlockHeaderBg from '../../BlockHeaderBg/'
import theme from './theme.scss'

const styles = {
};



class Page extends Component {

    state = {
        data: false,
        discount_code: false,
        error_message: false,

        title: false,
        description: false,
        background: false,
    }

    componentDidMount() {
        const slug = this.props.match.params.slug
        apiCatalogTicketsDiscountsList(slug).then(res => {
            if(!res.data.error) {
                this.setState({
                    data: res.data.results,
                    discount_code: res.data.discount_code,
                    title: res.data.title,
                    description: res.data.description,
                    background: res.data.background,
                })
            } else {
                this.setState({error_message: res.data.message})
            }
        })
    }

	render() {
        const {data, discount_code, error_message, title, description, background} = this.state
        if(!data && !error_message) {
            return <Preloader />
        }
        if(error_message) {
            return (
                <div className={theme.catalogDiscountsWrapper}>
                    <div data-content-inner>
                        <div data-box className={theme.notFoundWrapper}>
                            <Typography variant="display3" align="center">
                                {error_message}
                            </Typography>
                            <div data-el="buttons">
                                <Link to={`/p/tickets/`} data-link="buttton">
                                    <Button variant="raised" color="primary">
                                        To go catalog
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div>

                <BlockHeaderBg
                    bgid={false}
                    title={title}
                    description={description}
                    background={background}
                    />

                <div data-content-inner>
                    <div className={theme.catalogWrapper}>
                        {data.map((item, index) => {
                            return(<ItemView key={index} data={item} discountCode={discount_code} />)
                        })}
                    </div>
                </div>

            </div>
        )
	}
}

Page.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Page));
