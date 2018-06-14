import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom'
import {Link} from 'react-router-dom';
// import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
// import Icon from 'material-ui/Icon';

import {apiNewsList} from '../../../utils/functions'
import Preloader from '../../Preloader'

import theme from './theme.scss'

const styles = {
};



class Page extends Component {

    state = {
        data: false,
    }

    componentDidMount() {
        apiNewsList().then(res => {
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

                <Typography variant="display1" gutterBottom>
                    News
                </Typography>

                <ul>
                {data.map((item, index) => {
                    let url = `/p/news/${item.slug}/`
                    return (
                        <li key={index}>
                            <Link to={url} data-link>{item.title}</Link>
                        </li>
                    )
                })}
                </ul>
            </div>
        )
	}
}

Page.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Page));
