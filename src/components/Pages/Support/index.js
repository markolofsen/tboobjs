import React, {Component} from 'react';
import PropTypes from 'prop-types';

import BlockForm from '../../BlockForm'
import ContactForm from '../../ContactForm/'

import {apiContactForm} from '../../../utils/functions'

import theme from './theme.scss'



class PageSupport extends Component {

	render() {

		return (
			<div className={theme.supportWrapper}>
				<BlockForm bgid={10} title="Support">

					<p>
						If you have a story to share or a question that has not been answered on our website,
						please get in touch with us via contact details listed below or fill in the form on the right.
					</p>
					
					<ContactForm />

				</BlockForm>
            </div>
		)
	}
}

export default PageSupport
