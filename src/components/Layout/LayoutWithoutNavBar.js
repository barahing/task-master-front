import React from 'react'
import { Outlet } from 'react-router-dom'

function LayoutWithoutNavBar() {
  return (
    <div>
        <Outlet />
        </div>
    
  )
}

export default LayoutWithoutNavBar