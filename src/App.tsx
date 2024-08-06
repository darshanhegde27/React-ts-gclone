import { useDispatch } from 'react-redux'
import './App.css'
import { Inotes, editnote, savenote } from './store/Slices/NotesSlice';
import { MouseEventHandler, useState } from 'react';
import { useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch()
  const [s,set]:[Inotes,any]=useState({
    id: "!",
    title: "s",
    content: "3",
    pinned: false
  })
  const notes: Inotes[] = useSelector((state: any) => state.notes)
  const effect = (e: MouseEventHandler<HTMLButtonElement>) => {
    dispatch(savenote(s))
  }

  const onChange=(e:any)=>{
    e.preventDefault()
    set({
      ...s,title:e.target.value
    })
  }

  const pinned=(e:any,v:boolean)=>{
      e.preventDefault()
      dispatch(editnote({...s,pinned:!v}))
  }
  return (
    <>

    <center>
      <input onChange={(e)=>onChange(e)} placeholder='title'></input>
    <button onClick={(e: any) => effect(e)}
      >click</button>
    </center>
    <br></br>
      Pinned
    <div className='grid'>
        {notes.filter(v=>v.pinned==true).map((v: Inotes) => {
          return <div id={v.id} className='grid-item'>
            {v.title}

          </div>
        })}
      </div>

      not pinned
<div className='grid'>
        {notes.filter(v=>v.pinned===false).map((v: Inotes) => {
          return <div id={v.id} className='grid-item' onClick={(e)=>pinned(e,v.pinned)}>
            {v.title}
            

          </div>
        })}
      </div>
    </>
  )
}

export default App
