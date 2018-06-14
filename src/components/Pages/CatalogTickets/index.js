import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom'
// import {Link} from 'react-router-dom';
// import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
// import Icon from 'material-ui/Icon';

import BottomScrollListener from 'react-bottom-scroll-listener';
import {apiCatalogTicketsList} from '../../../utils/functions'
import ItemView from './ItemView/'
import Intro from './Intro/'
import Preloader from '../../Preloader'

import theme from './theme.scss'

const styles = {
};



class Page extends Component {

    state = {
        data: false,
        meta: false,
    }



    componentDidMount() {
        this.loadCatalog()
    }

    componentWillReceiveProps(nextProps) {
        const {match} = nextProps
        if(typeof match.params.category != 'undefined') {
            if(match.params.category != this.props.match.params.category) {
                this.loadCatalog(match.params.category)
            }
        }
    }

    loadCatalog = (category=false) => {
        if(!category) {
            const {match} = this.props
            category = typeof match.params.category != 'undefined' ? match.params.category : false
        }


        this.setState({
            data: false,
            data_limit: 10,
            meta: false,
        }, () => {})

        apiCatalogTicketsList(category).then(res => {
            if(!res.data.error) {
                this.setState({
                    data: res.data.results,
                    meta: res.data.meta
                }, () => {})
            }
        })
    }


    scrollCallback = () => {
        this.setState({data_limit: this.state.data_limit + 10}, () => {})
    }

	render() {

        const {data, data_limit, meta} = this.state

        return (
            <div className={theme.catalogBackground}>
                {typeof this.props.match.params.category == 'undefined' && <Intro url={`/media/videos/intro.mp4`} />}

                <div>
                    <div data-content-inner>
                        <div className={theme.catalogWrapper}>
                            <Typography variant="display1" data-tag="h1">
                                {!data ? <Preloader color="white" /> : meta.title }
                            </Typography>

                            {data &&
                                <div>
                        			{data.map((item, index) => {
                                        if(index < data_limit) {
                                            return(<ItemView key={index} data={item} />)
                                        }
                                    })}
                                    {data_limit < data.length && <Preloader color="white" />}
                                </div>}

                        </div>
                    </div>
                    <BottomScrollListener onBottom={this.scrollCallback} offset={600} debounce={0} />
                </div>
            </div>
        )
	}
}

Page.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Page));
