import React from 'react'
import Preloader from '../../components/Preloader'

import theme from './theme.scss'


export default function Loading() {
  return (
      <div className={theme.authPreloader}>
          <Preloader />
      </div>
  )
}
