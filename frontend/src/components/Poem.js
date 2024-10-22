import React, { useState } from 'react'
import {MdEdit as EditIcon} from 'react-icons/md'
import {BiSolidPen as SigningIcon} from 'react-icons/bi'
//import {FaPenNib as SigningIcon} from 'react-icons/fa'
import formatDate from 'date-fns/format'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { ptBR } from 'date-fns/locale'

import WritePoem from './WritePoem'

export default function Poem({poemValues}) {
  const [editPoemTab, setEditPoemTab] = useState(false)

  return (
    <div>
      <div draggable className='bg-slate-600 text-white text-left h-fit w-fit min-w-64 max-w-xl px-3 py-4 m-2 rounded-lg
      flex flex-col'>
        <div className='flex items-center h-fit h-max-12'>
          <div className='flex-1 flex flex-col h-fit h-max-12'>
            <h1 className='font-medium text-lg leading-none max-w-[95%]'>{poemValues.title}</h1>
            <h4 className='flex gap-1 text-[0.75rem] leading-none mt-[5px] ml-[2px]'><SigningIcon/> {poemValues.author}</h4>
          </div>
          <EditIcon className='cursor-pointer' onClick={()=>{setEditPoemTab(true)}} />
        </div>
        
        <p className='bg-primary p-2 mt-2 mb-1 rounded-md h-fit whitespace-pre-line'>
          {poemValues.text}
        </p>

        <div className='relative flex justify-between text-sm'>
          <p className='peer cursor-pointer mx-1'>{formatDistanceToNow(new Date(poemValues.createdAt), {addSuffix: true, locale: ptBR})}</p>
          <div className='absolute w-56 top-6 px-2 py-1 rounded-md bg-white text-black bg-opacity-70 invisible opacity-0
           shadow-md transition delay-500 duration-[500ms] peer-hover:visible peer-hover:opacity-100'>
            Criado {formatDate(new Date(poemValues.createdAt), 'eee, dd/MM/yy hh:mm', {addSuffix: true, locale: ptBR})}
          </div>
        </div>
      </div>
      {editPoemTab && <WritePoem setEditPoemTab={setEditPoemTab} poemValues={poemValues} />}
    </div>
   
  )
}
