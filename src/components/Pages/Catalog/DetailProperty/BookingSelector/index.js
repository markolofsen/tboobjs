import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Popover from 'material-ui/Popover';



import Icon from 'material-ui/Icon';
import theme from './theme.scss'

const styles = theme => ({
    paper: {
        height: 'auto',
        maxHeight: 'auto',
        overflow: 'auto',
        width: 305,
    },
  typography: {
    margin: theme.spacing.unit * 2,
  },
});

class SimplePopover extends React.Component {
  state = {
    anchorEl: null,

    adults: 1,
    children: 0,
    infants: 0,
  };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  componentWillUnmount () {
      this.props.onRef(undefined)
  }

  componentDidMount() {
      this.props.onRef(this)
  }

  getState() {
      return this.state
  }


  changeAmount = (state, type) => {

      let value = this.state[state]
      if(type == 'up') {
          value++
      } else {
          value--
      }

      if(value < 0) {
          value = 0
      }
      if(state == 'adults' && value <= 0) {
          value = 1
      }

      this.setState({
          [state]: value
      })
  }

  renderButtons(state) {
      return (
          <ul data-ul="buttons">
              <li onClick={() => this.changeAmount(state, 'down')}>
                  <Icon>remove</Icon>
              </li>
              <li>
                  {this.state[state]}
              </li>
              <li onClick={() => this.changeAmount(state, 'up')}>
                  <Icon>add</Icon>
              </li>
          </ul>
      )
  }

  renderPopoverContent() {

      const {max_guest, age_children, age_infants} = this.props

      return (
          <div>
              <div className={theme.popover}>
                  <ul data-ul="block">
                      <li>
                          <label>Adults</label>
                      </li>
                      <li>
                          {this.renderButtons('adults')}
                      </li>
                  </ul>
                  <ul data-ul="block">
                      <li>
                          <label>Children</label>
                          {age_children && <small>Ages {age_children}</small>}
                      </li>
                      <li>
                          {this.renderButtons('children')}
                      </li>
                  </ul>
                  <ul data-ul="block">
                      <li>
                          <label>Infants</label>
                          {age_infants && <small>Under {age_infants}</small>}
                      </li>
                      <li>
                          {this.renderButtons('infants', age_infants)}
                      </li>
                  </ul>


                  <p>
                      {max_guest} guests maximum. Infants don’t count toward the number of guests.
                  </p>

              </div>
          </div>
      )
  }

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    const {max_guest, age_children, age_infants} = this.props
    const {adults, children, infants} = this.state

    let guests = adults + children

    return (
      <div>

        <ul className={theme.input} onClick={this.handleClick}>
            {guests > 0 && <li>{guests} guests</li>}
            {infants > 0 && <li>{infants} infants</li>}
        </ul>

        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          classes={{
              paper: classes.paper
          }}
        >
          <Typography className={classes.typography}>
              Manage your booking
          </Typography>
          {this.renderPopoverContent()}
        </Popover>
      </div>
    );
  }
}

SimplePopover.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimplePopover);
