import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import {Link} from 'react-router-dom';

import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';

import LeftMenu from './LeftMenu'
import RightMenu from './RightMenu'
import Auth from './Auth'
import Footer from './Footer';

// import NumberFormat from 'react-number-format';
import {confSite} from '../../config/init.js'

import style from './theme.scss'

const drawerWidthLeft = 250;
const drawerWidthRight = 360;

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    // marginTop: theme.spacing.unit * 3,
    zIndex: 1,
    overflow: 'hidden',
  },
  list: {
      height: '100%',
      '& a': {
          textDecoration: 'none',
      }
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    // position: 'absolute',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShiftLeft: {
      // marginLeft: drawerWidth,
      // width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create([
          'width', 'margin'
      ], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen
      })
  },
  appBarShiftRight: {
      // marginRight: drawerWidthMetamask,
      // width: `calc(100% - ${drawerWidthMetamask}px)`,
      transition: theme.transitions.create([
          'width', 'margin'
      ], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen
      })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaperLeft: {
      position: 'relative',
      height: '100%',
      minHeight: '100vh',
      maxWidth: drawerWidthLeft,
      width: drawerWidthLeft,
      transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen
      }),
  },
  drawerPaperRight: {
      display: 'none',
      position: 'relative',
      height: '100%',
      minHeight: '100vh',
      width: drawerWidthRight,
      border: 0,
      borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
      zIndex: theme.zIndex.drawer + 99,
      // zIndex: '9999',
      transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen
      }),
  },
  drawerPaperClose: {
    width: 60,
    // display: 'none',
    // overflowX: 'hidden',
    zIndex: theme.zIndex.drawer - 1,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    "@media screen and (max-width: 960px)": {
        maxWidth: 0,
        border: 0,
        overflowX: 'hidden',
    },
  },
  drawerFixedLeft: {
      "@media screen and (min-width: 960px)": {
          position: 'fixed',
      },
  },
  drawerFixedRight: {
      "@media screen and (min-width: 960px)": {
          position: 'fixed',
          right: 0,
      },
  },
  drawerInnerLeft: {
    // Make the items inside not wrap when transitioning:
    width: drawerWidthLeft,
    // position: 'fixed',
  },
  drawerInnerRight: {
      width: drawerWidthRight,
  },
  drawerHeaderLeft: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar
  },
  drawerHeaderRight: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 8px',
      ...theme.mixins.toolbar
  },
  content: {
    width: '100%',
    flexGrow: 1,
    // backgroundColor: theme.palette.background.default,
    // padding: 20,
    display: 'flex',
    minWidth: 300,
    minHeight: '100vh',
    flexDirection: 'column',
    // height: 'calc(100% - 56px)',
    // marginTop: 56,
    overflowX: 'hidden',
    // [theme.breakpoints.up('sm')]: {
    //   // height: 'calc(100% - 64px)',
    //   // marginTop: 64,
    //   marginTop: 43,
    // },
    "& > *": {
        flex: 1,
    },
  },
  contentPage: {
      paddingTop: 64,
      "@media screen and (max-width: 600px)": {
          paddingTop: 56,
      },
  },
  contentPaddingMenuLeft: {
      "@media screen and (min-width: 960px)": {
          paddingLeft: 60,
      },
  },
  contentPaddingMenuRight: {
      // "@media screen and (min-width: 960px)": {
      //     paddingRight: 60,
      // },
  },
  guttersWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0 !important',
      '& > div': {
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'nowrap',
      }
  },
  headerToolbar: {
      marginRight: 10,
  },
  rightMenuButton: {
      paddingLeft: 8,
      paddingRight: 8,
      minWidth: 40,
      '& [data-el="label"]': {
          marginLeft: 10,
      },
  },

  // '.wrapperOpen, .wrapperClose': {
  //     '& > div': {
  //         height: '100%',
  //     },
  // },
  // wrapperOpen: {
  //     zIndex: theme.zIndex.drawer + 99,
  // },
  // wrapperClose: {
  //     '& > div': {
  //         '@media screen and (max-width: 960px)': {
  //             maxWidth: 0,
  //         }
  //     }
  // }

});



class NavWrapper extends React.Component {
  state = {
    open: false,
  };

  handleLeftDrawerToggle = (event, action) => {
      event.stopPropagation();
      event.preventDefault();
      if( action == true && this.props.config.menu_left == true) {

      } else {
          this.props.onToggleLeftMenu(action)
      }
  };

  handleRightDrawerToggle = (event, action) => {
      event.stopPropagation();
      event.preventDefault();
      if( action == true && this.props.config.menu_right == true) {

      } else {
          this.props.onToggleRightMenu(action)
      }
  };


  render() {
    const { config, classes, theme } = this.props;

    let settingsDidMount = config !== undefined ? true : false;
    let leftMenuActive = false;
    let rightMenuActive = false;

    if(settingsDidMount) {
        leftMenuActive = config.menu_left;
        rightMenuActive = config.menu_right;
    }



    return (
      <div className={classes.root}>

        <div className={classes.appFrame}>
          <AppBar position="fixed" className={classNames(classes.appBar, rightMenuActive && classes.appBarShiftRight)}>
            <Toolbar disableGutters={!leftMenuActive} className={classes.guttersWrapper}>

                <div className={style.headerLogo}>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    className={classes.leftMenuButton} onClick={(event) => this.handleLeftDrawerToggle(event, 'toggle')}
                  >
                    <Icon>menu_icon</Icon>
                  </IconButton>
                  <Typography variant="title" color="inherit" noWrap>
                    <Link to={`/`}>{config.site_settings.sitename} <sup>({confSite.version})</sup></Link>
                  </Typography>

              </div>

              <div className={classes.headerToolbar}>

                  <Auth />

                  {true == false && <Button
                      color="inherit"
                      onClick={(event) => this.handleRightDrawerToggle(event, true)}
                      className={classNames(classes.rightMenuButton, rightMenuActive && classes.hide)}
                      >
                    <Icon>favorite</Icon>
                  </Button>}
              </div>

            </Toolbar>
          </AppBar>



          <Drawer variant="permanent" data-menu-drawer={leftMenuActive ? 'active' : 'inactive'} className={!leftMenuActive ? classes.drawerFixedLeft : ''} classes={{
              paper: classNames(classes.drawerPaperLeft, !leftMenuActive && classes.drawerPaperClose)
          }} open={leftMenuActive} onClick={(event) => this.handleLeftDrawerToggle(event, true)}>
              <div className={classes.drawerInnerLeft}>
                  <div className={classes.drawerHeaderLeft}>
                      <IconButton onClick={(event) => this.handleLeftDrawerToggle(event, false)}>
                          {theme.direction === 'rtl'
                              ? <Icon>chevron_left</Icon>
                              : <Icon>chevron_right</Icon>}
                      </IconButton>
                  </div>
                  <Divider/>
                  <List className={classes.list}>
                      <LeftMenu />
                  </List>
              </div>
          </Drawer>


          <main className={classNames(classes.content, !leftMenuActive && classes.contentPaddingMenuLeft, !rightMenuActive && classes.contentPaddingMenuRight)}>
              <div className={classes.contentPage}>
                  {this.props.children}
              </div>
              <Footer {...this.props} />
          </main>


          <Drawer variant="permanent" data-menu-drawer={leftMenuActive ? 'active' : 'inactive'} anchor="right" className={!rightMenuActive ? classes.drawerFixedRight : ''} classes={{
              paper: classNames(classes.drawerPaperRight, !rightMenuActive && classes.drawerPaperClose)
          }} open={rightMenuActive} onClick={(event) => this.handleRightDrawerToggle(event, true)}>
              <div className={classes.drawerInnerRight} data-el={rightMenuActive ? 'rightMenuActive' : 'rightMenuInactive'}>
                  <div className={classNames(classes.drawerHeaderRight, classes.rightMenuHeader)}  onClick={(event) => this.handleRightDrawerToggle(event, false)}>
                      <div style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                          <IconButton>
                              {theme.direction === 'rtl'
                                  ? <Icon>chevron_left</Icon>
                                  : <Icon>chevron_right</Icon>}
                          </IconButton>

                          <Typography variant="button" color="inherit" noWrap>
                              My Favorits
                          </Typography>
                      </div>
                  </div>
                  <Divider/>
                  <List className={classes.list}>
                      <RightMenu config={this.props.config}/>
                  </List>
              </div>
          </Drawer>


        </div>
      </div>
    );
  }
}

NavWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(NavWrapper);
