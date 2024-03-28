/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="#" target="_blank" rel="noopener noreferrer">
          scriptivity
        </a>
        <span className="ms-1">&copy; 2024</span>
      </div>
      <div className="ms-auto"></div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
