/* eslint-disable react/no-multi-comp */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Dialog from 'material-ui/Dialog';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Icon from 'material-ui/Icon';
import ImageGallery from 'react-image-gallery';

import styles from './theme.scss'

const theme = createMuiTheme({
  overrides: {
    MuiModal: {
      // Name of the rule
      root: {
        "& > div": {
            background: 'transparent',
        }
      },
    },
  },
});



// const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);

class SimpleDialogDemo extends React.Component {

  state = {
    open: false,
    gallery_active: false,
  };

  componentWillUnmount () {
      this.props.onRef(undefined)
  }

  componentDidMount() {
      this.props.onRef(this)
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = value => {
    this.setState({ open: false });
  };


  render() {
    return (
      <div>

        <MuiThemeProvider theme={theme}>
            <Dialog onClose={this.handleClose}
                fullScreen
                open={this.state.open}
                >
              <div>
                  <div data-gallery>
                      <div data-el="close" onClick={this.handleClose}>
                          <Icon>close</Icon>
                      </div>
                      <ImageGallery items={this.props.images} />
                  </div>
              </div>
            </Dialog>
        </MuiThemeProvider>

      </div>
    );
  }
}

SimpleDialogDemo.propTypes = {
  images: PropTypes.array.isRequired,
};

export default SimpleDialogDemo;
