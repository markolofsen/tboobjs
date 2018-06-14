import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import Icon from 'material-ui/Icon';
import Typography from 'material-ui/Typography';
import {apiDomain} from '../../config/init'

import theme from './theme.scss'


class BlockHeaderBg extends Component {


	render() {

        const {bgid, title, description, background} = this.props

        let bg_url = `url(${apiDomain}/media/material-bgs/jpg/${bgid}.jpg)`
		if(background) {
			bg_url = `url(${apiDomain}${background})`
		}

		return (
			<div>
                <div
					style={{backgroundImage: bg_url}}
					data-header-bg="primary" >
					<ul data-content-inner>
						<li data-li="title">
							<Typography color="inherit" variant="display4" gutterBottom>
								{title}
							</Typography>
						</li>
						<li data-li="description">
							<span dangerouslySetInnerHTML={{__html: description}} />
						</li>
					</ul>
				</div>
            </div>
		)
	}
}

BlockHeaderBg.propTypes = {
  bgid: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default BlockHeaderBg
