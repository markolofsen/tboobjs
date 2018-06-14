import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';



import NavWrapper from '../components/NavWrapper'
import Preloader from '../components/Preloader'
import ContactFormWidget from '../components/ContactForm/Widget'


import {isBrowser, isMobile} from 'react-device-detect';
const _ = require('lodash');

import {apiSystemSettings, apiTokenAuth, pageTitleByPath, cookie} from '../utils/functions'


import styles from '../style/index.scss';


@cssModules(styles)
class App extends Component {


  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {

      this.systemSettings()

      apiTokenAuth().then((user) => {
          console.log(user)
          if(user) {
              this.props.onLoginByToken({
                  token: user.token,
                  name: user.email,
                  email: user.email,
                  isAdmin: user.is_superuser,
              })
          } else {
              console.log('Something wrong with auth...')
          }
      })

  }


  componentWillReceiveProps(nextProps) {
      
      const {config} = this.props

    // SCROLL TO TOP IF PAGE CHANGED
    let nextpage = nextProps.routing.location.pathname
    if (this.props.routing.location.pathname != nextpage) {
    	window.scrollTo(0, 0);
        if(isMobile) {
            this.props.onToggleLeftMenu(false)
        }
        
        if(nextProps.routing.location.pathname == '/' && config.site_settings.homepage != '/') {
            this.props.history.push(config.site_settings.homepage)
        }
        pageTitleByPath(nextProps.routing.location.pathname, config.site_settings.sitename)
    }
  }

  systemSettings = () => {
      const {config} = this.props
      
      apiSystemSettings().then(res => {
          this.props.onSiteSettings(res.data.results)
          
          if(this.props.routing.location.pathname == '/' && config.site_settings.homepage != '/') {
              this.props.history.push(config.site_settings.homepage)
          }
          
          if(isBrowser && res.data.results.leftmenu_active) {
              this.props.onToggleLeftMenu(true)
          }
      })
  }

  renderWrapper() {
      const { children, styles } = this.props;

      return (
        <div className={styles.container}>
            <NavWrapper {...this.props}>

                {children}

            </NavWrapper>
        </div>
      );
  }

  render() {

      return (
          <div>

              <ContactFormWidget />
              {this.renderWrapper()}

          </div>
      )
  }
}


App.propTypes = {
    children: PropTypes.any.isRequired,
    styles: PropTypes.object
};

export default
withRouter(
	(connect(
		(mapStateToProps) => (mapStateToProps),
		dispatch => ({
			onToggleLeftMenu: (payload) => {
				dispatch({type: 'LEFT_MENU_TOGGLE', payload})
			},
			onToggleRightMenu: (payload) => {
				dispatch({type: 'RIGHT_MENU_TOGGLE', payload})
			},
            onLoginByToken: (payload) => {
				dispatch({type: 'USER_LOGGED_IN', payload})
			},
            onSiteSettings: (payload) => {
				dispatch({type: 'SITE_SETTINGS', payload})
			},
		})
	))
	(App)
);
