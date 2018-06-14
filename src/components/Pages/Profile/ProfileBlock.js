import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom'
// import {Link} from 'react-router-dom';
// import Button from 'material-ui/Button';
import {Link} from 'react-router-dom';
import Typography from 'material-ui/Typography';
// import Icon from 'material-ui/Icon';


import theme from './theme.scss'

const styles = {
};



class ProfileBlock extends Component {

    state = {

    }


    renderProfile() {
        const {data} = this.props

        if(!data) {
            return <div />
        }

        return (
            <ul className={theme.profileBlock} data-box="new">
                {data.avatar ?
                    <li data-li="avatar">
                        <Link to={`/p/profile/${data.username}/`}>
                            <img src={data.avatar} />
                        </Link>
                    </li>
                : ''}
                <li>
                    <ul>
                        <li data-li="name">
                            <Typography variant="title">
                                <Link to={`/p/profile/${data.username}`} data-link>{data.name}</Link>
                            </Typography>
                        </li>
                        <li>{data.languages.join(', ')}</li>
                    </ul>
                </li>
                <li data-li="phone">{data.phone}</li>
                <li>
                    <ul data-ul="details">
                        {data.facebook && <li><a href={data.facebook} target="_blank" data-link="underlined">{`${data.name} at Facebook`}</a></li>}
                        <li>{data.email}</li>
                    </ul>
                </li>
            </ul>
        )
    }

	render() {
        return (
            <div className={theme.profileWrapper}>
                {this.renderProfile()}
            </div>
        )
	}
}

ProfileBlock.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ProfileBlock));
