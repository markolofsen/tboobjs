import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';

import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';

import Divider from 'material-ui/Divider';
import Icon from 'material-ui/Icon';

import theme from './theme.scss'

const _ = require('lodash');

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

class RightMenu extends React.Component {

	state = {
		menu_coins: false,
		menu_trader: false,
	}


	handleClick = (value) => {
		this.setState({ [value]: !this.state[value] });
	};

	render() {
		const { classes } = this.props;

		return (
			<div>

				<ListItem button data-menulist-item onClick={() => this.handleClick('menu_coins')}>
					<ListItemIcon>
						<Icon>star</Icon>
					</ListItemIcon>
					<ListItemText inset primary="Favorite Coins"/>
					{this.state.menu_user ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
				</ListItem>
				<Collapse in={this.state.menu_coins} timeout="auto">
					...
				</Collapse>
				<Divider/>
				<ListItem button data-menulist-item onClick={() => this.handleClick('menu_trader')}>
					<ListItemIcon>
						<Icon>show_chart</Icon>
					</ListItemIcon>
					<ListItemText inset primary="Trading Data"/>
					{this.state.menu_trader ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
				</ListItem>
				<Collapse in={this.state.menu_trader} timeout="auto">
					<List component="div" disablePadding dense>
						<Link to="/p/dashboard/trader">
							<ListItem button>
								<ListItemText inset primary="My orders" />
								<ListItemSecondaryAction classes={{root: theme.menuTraderHint}}>
									0
								</ListItemSecondaryAction>
							</ListItem>
						</Link>
						{true==false && <div>
							<ListItem button>
								<ListItemText inset primary="Transactions" />
								<ListItemSecondaryAction classes={{root: theme.menuTraderHint}}>
									0
								</ListItemSecondaryAction>
							</ListItem>

							<ListItem button>
								<ListItemText inset primary="Active limits" />
								<ListItemSecondaryAction classes={{root: theme.menuTraderHint}}>
									0
								</ListItemSecondaryAction>
							</ListItem>
							<ListItem button>
								<ListItemText inset primary="Earning" />
								<ListItemSecondaryAction classes={{root: theme.menuTraderHint}}>
									$ 183
								</ListItemSecondaryAction>
							</ListItem>
						</div>}
					</List>
				</Collapse>

				<Divider/>

			</div>
		);
	}
}

RightMenu.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RightMenu);
