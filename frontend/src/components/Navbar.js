import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import Cookies from 'js-cookie'

export default function Navbar() {
  const userContext = useContext(AuthContext)
  const navigate = useNavigate()

  function logoutUser(){
    userContext.setCurrentUser(null)
    Cookies.remove('user_token')
    navigate('/entrar-conta')
  }
  
  return (
    <nav className='bg-secondary shadow-xl flex items-center justify-around w-full h-14 top-0 fixed z-50'>
      <Link to='/descubra'>Descubra</Link>
      <Link to='/poemas'>Meus Poemas</Link>
      {userContext.currentUser ? 
      <div>
        <h3>Olá {userContext.currentUser.username}</h3>
        <a className='cursor-pointer' onClick={()=>{logoutUser()}}>Sair</a>
      </div> : 
      <div className='flex gap-5'>
        <Link to='/criar-conta'>Cadastre-se</Link>
        <Link to='/entrar-conta'>Entrar</Link>
      </div>
      }
    </nav>
  )
}
