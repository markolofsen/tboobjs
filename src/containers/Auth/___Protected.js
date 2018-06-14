import React, {Component} from 'react'
import { connect } from 'react-redux'
import Typography from 'material-ui/Typography';


import theme from './theme.scss'

class Protected extends Component {

    render() {
        const {authData} = this.props

        return (
            <div data-content-inner>
                <div className={theme.protectedWrapper}>
                    <Typography variant="display1" gutterBottom>
                        {`Welcome ${authData.name}`}
                    </Typography>

                    {`This is a protected page, you must be logged in if you are seeing this.`}
                </div>
            </div>
        )
    }
}


export default connect(state => ({ authData: state.user.data }))(Protected)
