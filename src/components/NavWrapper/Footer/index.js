import React, {Component} from 'react';

import {Link} from 'react-router-dom';
// import Typography from 'material-ui/Typography';
// import {confSite} from '../../../config/init.js'

import theme from './theme.scss'

export default class Footer extends Component {

    state = {}

	render() {
        const {config} = this.props
		return (
			<div className={theme.wrapper}>
                <div data-content-inner>
                    <ul>
                        <li data-li="logotype">
                            <h3>
                                {config.site_settings.sitename}
                            </h3>
                            <p>{config.site_settings.slogan}</p>
                        </li>
                        <li data-li="menu">
                            <ul>
                                {config.site_settings.menu.map((item, index) => {
                                    if (item) {
                                        return (
                                            <li key={index}>
                                                <Link to={item.link}>{item.label}</Link>
                                            </li>
                                        )
                                    }
                                })}
                            </ul>
                            <ul>
                                <li>
                                    <Link to={`/p/news/`}>News</Link>
                                </li>
                                <li>
                                    <Link to={`/p/support/`}>Support</Link>
                                </li>
                                <li>
                                    <a href={`/admin/`} target="_blank">Partners cabinet</a>
                                </li>
                            </ul>
                            <ul>
                                {config.site_settings.links.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <a href={item.link} target="_blank">{item.label}</a>
                                        </li>
                                    )
                                })}
                            </ul>
                            <div>
                                <div data-el="gototop" onClick={() => window.scrollTo(0,0)}>
                                    Go to top
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div data-el="copyright">
                        Copyright © {this.props.config.site_settings.year} All rights reserved. {this.props.config.site_settings.sitename}
                    </div>
                </div>
            </div>
		)
	}
}
