import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import {LuTrash as TrashIcon} from 'react-icons/lu'
import {PoemsContext} from '../pages/UserBoard'
import { AuthContext } from '../context/AuthContext'

const NEW_POEM = 1;
const EDIT_POEM = 2;
const DELETE_POEM = 3;

export default function WritePoem({setCreatePoemTab, setEditPoemTab, poemValues={title: '', author: '', text: ''}}) {
  const [deleteMsg, setDeleteMsg] = useState(false)
  const [form_values, setFormValues] = useState({
    title: poemValues.title,
    author: poemValues.author,
    text: poemValues.text
  })
  const [submitEnabled, setSubmitEnabled] = useState(false)
  const {poems, setPoems} = useContext(PoemsContext)
  const current_user = useContext(AuthContext).currentUser

  useEffect(()=>{
    if(poemValues.title == form_values.title && poemValues.author == form_values.author &&
       poemValues.text == form_values.text){
        setSubmitEnabled(false)
        return
    }
    if(form_values.title || form_values.text){
      setSubmitEnabled(true)
    }else{
      setSubmitEnabled(false)
    }
  }, [form_values])


  async function handleSubmit(e, submit_type){
    e.preventDefault()

    if(form_values.author == ''){
      form_values.author = current_user.username
    }

    let response;

    switch (submit_type) {
      case NEW_POEM:
        response = await axios.post('/poems/', form_values)
        break;
      case EDIT_POEM:
        response = await axios.patch('/poems/' + poemValues._id, form_values)
        break;
      case DELETE_POEM:
        response = await axios.delete('/poems/' + poemValues._id, form_values)
        break;
      default:
        console.log("INVALID SUBMIT TYPE")
        alert("INVALID SUBMIT TYPE")
        return 
    }

    if(!response){
      console.log("NO RESPONSE")
      alert("NO RESPONSE")
      return 
    }

    if(response.data.error){
      console.log(response)
      alert(response)
    }else{
      setFormValues({
        title: '',
        poem: '',
        author: ''
      })
      erasePoem()
      console.log(response)

      const response_poem = response.data
      
      switch (submit_type) {
        case NEW_POEM:
          setPoems([response_poem, ...poems])
          alert("Novo poema publicado")
          break;
        case EDIT_POEM:
          setPoems(poems.map((poem)=>(poem._id === response_poem._id ? poem=response_poem : poem)))
          alert("Alteração Publicada")
          break;
        case DELETE_POEM:
          setPoems(poems.filter((poem)=>(poem._id !== response_poem._id)))
          alert("Poema Deletado")
          break;
        default:
          console.log("INVALID SUBMIT TYPE")
          alert("INVALID SUBMIT TYPE")
          return 
      }
    }

  }

  function erasePoem(){
    setFormValues({
      title: '',
      poem: '',
      author: ''
    })
    setDeleteMsg(false)

    if(setCreatePoemTab){
      setCreatePoemTab(false)
    }else if(setEditPoemTab){
      setEditPoemTab(false)
    }else{
      alert("ERROR: THERES NO TAB TO CLOSE")
    }
    
  }

  function closeTab(){
    if(form_values.title || form_values.text){
      setDeleteMsg(true)
      return
    }
    erasePoem()
  }

  return (
    <div className='fixed top-20 left-[50%] translate-x-[-50%] mx-auto z-40'>
      {deleteMsg && <div className='absolute top-32 left-32 h-fit w-80 p-3 bg-slate-600 border-2 border-slate-400 z-40 rounded-md'>
        <p className='mb-5'>Qualquer alteração não salva será perdida, tem certeza que deseja cancelar?</p>
        <button onClick={()=>{erasePoem()}} className='bg-red-600 px-4 pt-1 pb-2 w-fit h-8 mx-2 rounded-md transition
            hover:bg-red-500 text-center'>Sim</button>
        <button onClick={()=>{setDeleteMsg(false)}} className='bg-yellow-600 px-4 pt-1 pb-2 w-fit h-8 mx-2 rounded-md transition
            hover:bg-yellow-500 text-center'>Retornar</button>
      </div>}
      <div className='bg-primary absolute top-0 left-0 w-full h-10 rounded-md rounded-b-none border-2 border-slate-700
      flex justify-between items-center pl-9 pr-3 z-10'>
        <h1>Criar poema</h1>
        <TrashIcon className='cursor-pointer' onClick={()=>{closeTab()}}/>
      </div>
      <form className='flex flex-col gap-5 bg-secondary w-[600px] h-fit pl-9 pr-9 py-5 mx-0 my-0 rounded-md relative
      border-2 border-slate-700'>
        <div className='flex flex-col text-left mt-8 gap-[0.35rem]'>
          <label className='px-2'>Titulo: </label>
          <input value={form_values.title} onChange={(e)=>{setFormValues({...form_values, title:e.target.value})}} 
          placeholder='Um titulo memoravel' className='bg-primary rounded-md h-8 px-4 
          focus:outline-none focus:border-2 focus:border-slate-300'/>
        </div>
        
        <div>
          <textarea value={form_values.text} onChange={(e)=>{setFormValues({...form_values, text:e.target.value})}} 
           placeholder="Escreva aqui sua obra prima" 
          className='bg-primary rounded-md h-44 w-full px-4 py-2 resize-none bg-scroll focus:border focus:border-slate-300'></textarea>
        </div>
        
        
        <div className='relative flex'>
          <label className='bg-black absolute rounded-md h-8 px-2 pt-1 border border-slate-300'>Autor:</label>
          <input value={form_values.author} placeholder={current_user.username} onChange={(e)=>{setFormValues({...form_values, author:e.target.value})}} 
           className='bg-primary rounded-md h-8 w-full pl-[4.5rem] pr-4 outline-none'/>
        </div>

        {setCreatePoemTab && <div className='flex justify-evenly gap-5'>
          <button disabled={!submitEnabled}  onClick={(e)=>{handleSubmit(e, NEW_POEM)}} className='bg-green-700 px-4 pt-1 pb-2 w-full h-8 rounded-md transition
            hover:bg-green-600 disabled:opacity-40 disabled:hover:bg-green-700'>Publicar</button>
          <button disabled={!submitEnabled} onClick={(e)=>{handleSubmit(e, NEW_POEM)}}  className='bg-yellow-600 px-4 pt-1 pb-2 w-full h-8 rounded-md transition
          hover:bg-yellow-500 disabled:opacity-40 disabled:hover:bg-yellow-600'>Salvar Rascunho</button>
        </div>}

        {setEditPoemTab && <div className='flex justify-evenly gap-5'>
          <button disabled={!submitEnabled}  onClick={(e)=>{handleSubmit(e, EDIT_POEM)}} className='bg-green-700 px-4 pt-1 pb-2 w-full h-8 rounded-md transition
            hover:bg-green-600 disabled:opacity-40 disabled:hover:bg-green-700'>Publicar Alterações</button>
          <button onClick={(e)=>{handleSubmit(e, DELETE_POEM)}}  className='bg-red-600 px-4 pt-1 pb-2 w-full h-8 rounded-md transition
          hover:bg-red-500'>Excluir Poema</button>
        </div>}
      </form>
      
    </div>
  )
}
