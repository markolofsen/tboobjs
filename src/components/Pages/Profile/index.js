import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom'
// import {Link} from 'react-router-dom';
// import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
// import Icon from 'material-ui/Icon';

import Preloader from '../../Preloader'
import {apiProfileDetail} from '../../../utils/functions'
import ProfileBlock from './ProfileBlock'
import ItemView from '../Catalog/ItemView/'

import theme from './theme.scss'

const styles = {
};



class PageProfile extends Component {

    state = {
        profile: false,
        data_rentals: false,
        data_realty: false,
    }

    componentDidMount() {
        const {match} = this.props
        const profile_id = match.params.id
        apiProfileDetail(profile_id).then(res => {
            if(!res.data.error) {
                this.setState({
                    profile: res.data.profile,
                    data_rentals: res.data.data_rentals,
                    data_realty: res.data.data_realty,
                })
            }
            // console.log(this.state.data)
            console.log(res)
        })
    }



	render() {
        const {profile, data_rentals, data_realty} = this.state

        if(!profile) {
            return <Preloader />
        }
        return (
            <div data-content-inner>
                <div className={theme.profileWrapper}>
                    <ProfileBlock data={profile} />

                    {data_rentals ?
                        <div className={theme.catalogBlock}>
                            <Typography variant="display1" gutterBottom>
                                Vacation Rentals
                            </Typography>
                            {data_rentals.map((item, index) => {
                                return (
                                    <ItemView data={item} type="rentals" key={index} />
                                )
                            })}
                        </div>
                    : ''}

                    {data_realty ?
                        <div className={theme.catalogBlock}>
                            <Typography variant="display1" gutterBottom>
                                Realty
                            </Typography>
                            {data_realty.map((item, index) => {
                                return (
                                    <ItemView data={item} type="realty" key={index} />
                                )
                            })}
                        </div>
                    : ''}
                </div>
            </div>
        )
	}
}

PageProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(PageProfile));
