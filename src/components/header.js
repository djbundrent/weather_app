import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => (
  <header>
    <span className='icn-logo'><i className='material-icons'>weather</i></span>
    <ul className='main-nav'>
      <li><NavLink exact to='/'>Home</NavLink></li>
      <li><NavLink to='/map'>Map</NavLink></li>
      <li><NavLink to='/current'>Current Weather</NavLink></li>
      <li><NavLink to='/forecast'>5-day Forecast</NavLink></li>
      <li><NavLink to='/alerts'>Alerts  </NavLink></li>
    </ul>
  </header>
)

export default Header
