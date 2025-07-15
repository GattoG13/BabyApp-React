import React from 'react'
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../imgs/iconApp.png'

function Menu() {

  let navigate = useNavigate()
  
  const salir = () => {
    localStorage.clear();
    navigate("/login")
  }
  const user = localStorage.getItem("id");

  return (
    <div className='menu'>
      <NavLink to="content">
      <img to="content" src={logo} alt="Logo" /> {/* Logo en el lado izquierdo */}
      </NavLink>
      <div>
        {user ? (
          <>
            <NavLink to="content" style={{ marginRight: '10px' }}>Inicio</NavLink>
            <button onClick={salir} style={{ marginLeft: '10px' }}>Cerrar Sesión</button>
          </>
        ) : (
          <>
            <NavLink to="login" style={{ marginRight: '10px' }}>Login</NavLink>
            <NavLink to="register" style={{ marginLeft: '10px' }}>Register</NavLink>
          </>
        )}
      </div>
      <Outlet />
    </div>
  );
}

export default Menu