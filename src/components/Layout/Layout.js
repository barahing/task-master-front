import React from 'react'
import {
    Link,
    Outlet
} from "react-router-dom"
import SideBar from '../SideBar/SideBar'
import NavBar from '../NavBar/NavBar'

function Layout() {
  return (
    <div>
        <div className='fixed w-full z-50'>
        <NavBar/>
        </div>
        <div className="flex">
          <div className="fixed mt-16">
            <SideBar/>
          </div>
          <div className="ml-64 mt-16">
          <Outlet />
          </div>
          </div>
    </div>
  )
}

export default Layout