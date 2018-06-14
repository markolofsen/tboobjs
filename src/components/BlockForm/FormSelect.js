import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Button from 'material-ui/Button';


const styles = mui => ({
  formControl: {
      width: '100%',
      marginBottom: 10,
  },
  fieldRoot: {
    padding: 0,
    'label + &': {
      marginTop: mui.spacing.unit * 3,
    },
  },
  fieldSelect: {
    boxSizing: 'inherit',
    borderRadius: 2,
    backgroundColor: mui.palette.common.white,
    border: '1px solid rgba(63, 81, 181, .2)',
    fontSize: 16,
    padding: '15px 20px 16px 20px',
    // width: 'calc(100% - 24px)',
    width: '100%',
    transition: mui.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: 'rgba(63, 81, 181, .5)',
      boxShadow: '0 0 0 0.2rem rgba(63, 81, 181,.25)',
    },
  },
  // textFieldFormLabel: {
  //   fontSize: 18,
  // },
  // formHelper: {
  //     marginBottom: 10,
  // },
});

class ControlledOpenSelect extends React.Component {
  state = {
    value: '',
    open: false,
  };

  componentDidMount() {
      const {defaultValue} = this.props
      if(defaultValue) {
          this.setState({value: defaultValue})
      }

      if(this.props.onRef) {
          this.props.onRef(this)
      }
  }

  componentWillUnmount () {
      this.props.onRef(undefined)
  }

  getState() {
      return this.state.value
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes, options, defaultValue } = this.props;

    let defaultValue_ = defaultValue ? defaultValue : 'None'

    return (
      <form autoComplete="off">
        <FormControl className={classes.formControl}>
          <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.value}
            onChange={this.handleChange}

            inputProps={{
              name: 'value',
              id: 'controlled-open-select',
            }}
            classes={{
              root: classes.fieldRoot,
              select: classes.fieldSelect,
            }}
          >
            <MenuItem value={defaultValue_}>
              <em>{defaultValue_}</em>
            </MenuItem>
            {options.map((item, index) => {
                return (
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                )
            })}
          </Select>
        </FormControl>
      </form>
    );
  }
}

ControlledOpenSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
};

export default withStyles(styles)(ControlledOpenSelect);
