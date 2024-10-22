import React, { useState } from 'react'
import axios from 'axios'
import Error404 from './Error404'
import {useNavigate} from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: ''
  })

  async function registerSubmit(e){
    e.preventDefault()

    try {
      const response = await axios.post('/user/register', userInfo)
    
      if(!response || !response.data){
        throw Error("No response")
      }
      
      if(response.data.error){
        console.log(response)
        alert(response.data.error)
      }else{
        setUserInfo({username: '', email: '', password: ''})
        alert("Account Created")
        navigate('/entrar-conta')
      }
    } catch (err) {
      console.log(err)
    }
    
    
  }


  return (
    <div className='bg-primary h-full'>
      <div className=' w-[500px] h-fit mx-auto my-0 py-5 px-5 rounded-2xl'>
        <form className='flex-col m-0' onSubmit={(e)=>{registerSubmit(e)}}>
          <h1 className='mb-5 text-2xl font-bold'>Cadastre-se</h1>

          <div className='relative'>
            <input id='email' type='email' placeholder='' value={userInfo.email} 
            onChange={(e)=>{setUserInfo({...userInfo, email: e.target.value})}}
            className='bg-slate-700 w-full block rounded px-3.5 pt-6 pb-2 mb-5 h-14 border border-slate-500
            text-white text-base focus:outline-none focus:border-slate-300 peer'/>
            <label htmlFor='email' 
            className='cursor-text absolute text-white opacity-70 left-3 top-4  -translate-y-3 scale-75 transtion duration-300
             peer-focus:scale-75 peer-focus:-translate-y-3 peer-placeholder-shown:scale-100
              peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:-translate-x-0'>Email</label>
          </div>

          <div className='relative'>
            <input id='nome' type='text' placeholder='' value={userInfo.username} 
            onChange={(e)=>{setUserInfo({...userInfo, username: e.target.value})}}
            className='bg-slate-700 w-full block rounded px-3.5 pt-6 pb-2 mb-5 h-14 border border-slate-500
             text-white text-base focus:outline-none focus:border-slate-300 peer'/>
            <label htmlFor='nome' 
            className='cursor-text absolute text-white opacity-60 left-3 top-4 -translate-x-3 -translate-y-3 scale-75 transtion duration-300
             peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:-translate-x-3 peer-placeholder-shown:scale-100
              peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:-translate-x-0'>Nome de Usuario</label>
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
            Criar Conta
          </button>

          <p className='text-left font-thin opacity-70 my-2'>
            Ao se registrar, você concorda em rebolar lentinhos pros cria, aos nossos Termos de Serviço e Política de Privacidade.
          </p>
          <h5>Já tem uma conta? <a href='/entrar-conta'>Entrar</a></h5>
        </form>
      </div>
    </div>
  )
}
