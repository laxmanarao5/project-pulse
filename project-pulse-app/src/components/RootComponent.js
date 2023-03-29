import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './footer/Footer'

function RootComponent() {
  return (
    <div>
        <div style={{minHeight:"80vh"}}>
            
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default RootComponent