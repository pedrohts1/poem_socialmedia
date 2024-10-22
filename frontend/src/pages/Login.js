import React, { useContext, useState } from 'react'
import axios from 'axios'
import Error404 from './Error404'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({
    user_login: '',
    password: ''
  })

  const userContext = useContext(AuthContext)

  async function loginSubmit(e){
    e.preventDefault()

    try {
      const response = await axios.post('/user/login', userInfo)
      if(!response || !response.data){
        throw Error("No response")
      }
      
      if(response.data.error){
        console.log(response)
        alert(response.data.error)
      }else{
        setUserInfo({user_login: '',password: ''})
        userContext.setCurrentUser(response)
        alert("Login Successful")
        navigate(0)
        navigate('/poemas')
      }
    } catch (err) {
      console.log(err)
    }
    
    
  }


  return (
    <div className='bg-primary h-full'>
      <div className=' w-[500px] h-fit mx-auto my-0 py-5 px-5 rounded-2xl'>
        <form className='flex-col m-0' onSubmit={(e)=>{loginSubmit(e)}}>
          <h1 className='mb-5 text-2xl font-bold'>Seja Bem-Vindo</h1>

          <div className='relative'>
            <input id='nome' type='text' placeholder='' value={userInfo.user_login} 
            onChange={(e)=>{setUserInfo({...userInfo, user_login: e.target.value})}}
            className='bg-slate-700 w-full block rounded px-3.5 pt-6 pb-2 mb-5 h-14 border border-slate-500
             text-white text-base focus:outline-none focus:border-slate-300 peer'/>
            <label htmlFor='nome' 
            className='cursor-text absolute text-white opacity-60 left-3 top-4 -translate-x-5 -translate-y-3 scale-75 transtion duration-300
             peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:-translate-x-5 peer-placeholder-shown:scale-100
              peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:-translate-x-0'>Email ou Nome de Usuario</label>
          </div>

          <div className='relative'>
            <input id='senha' type='password' placeholder='' value={userInfo.password} 
            onChange={(e)=>{setUserInfo({...userInfo, password: e.target.value})}}
            className='bg-slate-700 w-full block rounded px-3.5 pt-6 pb-2 mb-5 h-14 border border-slate-500
            text-white text-base focus:outline-none focus:border-slate-300 peer'/>
            <label htmlFor='senha' 
            className='cursor-text absolute text-white opacity-70 left-3 top-4 -translate-y-3 scale-75 transtion duration-300
             peer-focus:scale-75 peer-focus:-translate-y-3 peer-placeholder-shown:scale-100
              peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:-translate-x-0'>Senha</label>
          </div>

          <button className='bg-green-700 px-4 py-2 w-full rounded-md transition
          hover:bg-green-600'>
            Acessar Conta
          </button>

          <p className='text-left font-thin opacity-70 my-2'>
            Seus dados estão seguros, pode confiar blz?
          </p>
          <h5>Ainda não tem uma conta? <a href='/criar-conta'>Cadastre-se</a></h5>
        </form>
      </div>
    </div>
  )
}
