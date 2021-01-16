import React from 'react'
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar navbar-light bg-primary">
        <Link className="navbar-brand" to="/">SaveMart</Link>
    </nav>
  )
}

export default NavBar
