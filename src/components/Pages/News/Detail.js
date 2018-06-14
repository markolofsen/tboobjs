import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom'
import {Link} from 'react-router-dom';
// import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
// import Icon from 'material-ui/Icon';

import {apiNewsDetail, apiCatalogTicketsList} from '../../../utils/functions'
import Preloader from '../../Preloader'
import ShowMore from '../../ShowMore'
import ItemView from '../CatalogTickets/ItemView/'

import theme from './theme.scss'

const styles = {
};



class Page extends Component {

    state = {
        news: false,
        data: false,
    }

    componentDidMount() {

        const offer_id = this.props.match.params.slug
        apiNewsDetail(offer_id).then(res => {
            if(!res.data.error) {
                this.setState({news: res.data.results})
            }
        })

        apiCatalogTicketsList().then(res => {
            if(!res.data.error) {
                this.setState({data: res.data.results})
            }
        })
    }

	render() {
        const {news, data} = this.state

        return (
            <div data-content-inner>
                <div className={theme.newsWrapper}>

                    {!news ? <Preloader /> :
                        <div>
                            <Typography variant="display1" gutterBottom>
                                {news.title}
                            </Typography>

                            <p>
                                <ShowMore text={news.description} height={230} />
                            </p>
                        </div>
                    }

                    {!data ? <Preloader /> :
                        <div>
                            <Typography variant="display1" gutterBottom>
                                Things To Do
                            </Typography>

                			{data.map((item, index) => {
                                return(<ItemView key={index} data={item} />)
                            })}
                        </div>
                    }

                </div>

            </div>
        )
	}
}

Page.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Page));
