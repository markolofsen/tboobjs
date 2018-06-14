import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';

import ListSubheader from 'material-ui/List/ListSubheader';
import List, {ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction} from 'material-ui/List';
// import Collapse from 'material-ui/transitions/Collapse';

import Divider from 'material-ui/Divider';
import Icon from 'material-ui/Icon';


const _ = require('lodash');

import theme from './theme.scss'



class MenuGenerator extends React.Component {

	state = {
		menu: false
	}

	componentDidMount() {
		this.setState({menu: this.props.data})
	}

	handleClick = () => {
		// this.setState({ open: !this.state.open });
	};

	render() {
		const { label } = this.props
		const { menu } = this.state

		if(!menu) {
			return <div />
		}

		return (
			<List
				component="nav"
				subheader={<ListSubheader component="div" data-menu-label>{label}</ListSubheader>}
				>

				{menu.map((item, index) => {
					// if(!item) {
					// 	return (
					// 		<Divider key={index} />
					// 	)
					// }
					if(typeof item.submenu != 'undefined') {
						return (
							<div key={index}>
								<Link to={item.link}>
									<ListItem button data-menulist-item>
										<ListItemIcon>
											<Icon>{item.icon}</Icon>
										</ListItemIcon>
										<ListItemText inset primary={item.label} />
									</ListItem>
								</Link>
								{item.submenu.map((subitem, subindex) => {
									let sublink = `/p/tickets/categories/${subitem.slug}/`
									return (
										<div key={`subitem-${index}-${subindex}`}>
											<Link to={sublink} data-menulist-submenu>
												<ListItem button dense>
													<ListItemText primary={subitem.label} />
													<ListItemSecondaryAction data-menulist-hint>
														{subitem.hint}
													</ListItemSecondaryAction>
												</ListItem>
											</Link>
										</div>
									)
								})}
							</div>
						)
					} else {
						return (
							<Link to={item.link} key={index}>
								<ListItem button data-menulist-item>
									<ListItemIcon>
										<Icon>{item.icon}</Icon>
									</ListItemIcon>
									<ListItemText primary={item.label}/>
								</ListItem>
							</Link>
						)
					}
				})}

			</List>
		)
	}
}



// import style from './theme';
const styles = theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		background: theme.palette.background.paper
	},
	nested: {
		paddingLeft: theme.spacing.unit * 4
	},
});

class MenuComponent extends React.Component {

	state = {};


	render() {

		const {user, config} = this.props

		const menu_public_top = [
			{
				icon: 'home',
				link: '/',
				label: 'Home'
			},
			// false,
		];
		const menu_public_bottom = [
			// false,
			{
				icon: 'help',
				link: '/p/support/',
				label: 'Support',
			},
		];
		// const menu_public = [
			// {
			// 	icon: 'home',
			// 	link: '/',
			// 	label: 'Home',
			// },
			// {
			// 	icon: 'insert_emoticon',
			// 	link: '/p/tickets/',
			// 	label: 'Things To Do',
			// },
			// {
			// 	icon: 'local_hotel',
			// 	link: '/p/rentals/',
			// 	label: 'Vacantion Rentals',
			// },
			// {
			// 	icon: 'place',
			// 	link: '/p/realty/',
			// 	label: 'Realty',
			// },
			// {
			// 	label: 'divider',
			// },
			// {
			// 	icon: 'help',
			// 	link: '/p/support/',
			// 	label: 'Support',
			// },
		// ]

		if(!config.site_settings.menu || config.site_settings.menu.length == 0) {
			return <div />
		}

		return (
			<div className={theme.leftMenu}>
				<MenuGenerator data={menu_public_top} label="Menu" />
				<Divider />
				<MenuGenerator data={config.site_settings.menu} label="" />
				<Divider />
				<MenuGenerator data={menu_public_bottom} label="" />
			</div>
		);
	}
}

MenuComponent.propTypes = {
	classes: PropTypes.object.isRequired
};

// export default withStyles(styles)(LeftMenu);


export default
withRouter(
	(connect(
		(mapStateToProps) => (mapStateToProps),
		dispatch => ({
			// onSelectCoins: (payload) => {
			// 	dispatch({type: 'SELECT_COINS', payload})
			// },
		})
	))
	(withStyles(styles)(MenuComponent))
);
