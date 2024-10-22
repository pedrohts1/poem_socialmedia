import React, { useEffect, useState, createContext, useContext } from 'react'
import axios from 'axios'
import Poem from '../components/Poem'
import WritePoem from '../components/WritePoem'
import {AuthContext} from '../context/AuthContext'

export const PoemsContext = createContext()

export default function UserBoard() {
  const [createPoemTab, setCreatePoemTab] = useState(false)
  const [poems, setPoems] = useState([])

  const {currentUser, setCurrentUser} = useContext(AuthContext)
  
  useEffect(()=>{
    async function getPoems(){
      try {
        const response = await axios.get('/poems')

        if(!response || !response.data || response.data.error){
          console.log(response)
          return
        }

        setPoems(response.data)
      } catch (error) {
        console.log(error)
        return
      }
    }
    getPoems()
  
  }, [])



  

  return (
    <PoemsContext.Provider value={{poems, setPoems}}>
      {currentUser && <div className='bg-primary relative flex flex-col items-center justify-center'>
        <button className='bg-green-600 mt-10 mb-10 px-4 py-2 rounded-md' onClick={(e)=>{setCreatePoemTab(!createPoemTab)}}>Criar novo Poema</button>
        {createPoemTab ? <WritePoem setCreatePoemTab={setCreatePoemTab}/>: <></>}
        
        <div className='w-[80%] bg-secondary flex flex-wrap rounded-md'>
          {poems && poems.map((poem)=>(
            <Poem key={poem._id} poemValues={poem} />
          ))}
        </div>
      </div>}
    </PoemsContext.Provider>
    
  )
}
