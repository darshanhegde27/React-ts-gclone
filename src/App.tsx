import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { Inotes, editnote, savenote } from './store/Slices/NotesSlice';
import { MouseEventHandler, useEffect, useState } from 'react';

function App() {
  const dispatch = useDispatch();
  const [d,setd]:[boolean,any]=useState(false)
  const [s, set] = useState<Inotes>({
    id: "!", // Ensure this id is unique for new notes
    title: "",
    content: "",
    pinned: false
  });
  const notes: Inotes[] = useSelector((state: any) => state.notes);

  const effect = () => {
    dispatch(savenote(s));
    set({
      id: Date.now().toString(), // Generate a new unique id for the next note
      title: "",
      content: "",
      pinned: false
    });
  };

  const onChange = (e: any) => {
    e.preventDefault();
    set({
      ...s, title: e.target.value
    });
  };

  const change=(e:any)=>{
      e.preventDefault()
      set({...s,content:e.target.value})
  }

  const pinNote = (id: string, pinned: boolean) => {
    dispatch(editnote({ ...s, id, pinned: true }));
  };


  return (
    <>
   
      
        
        <input value={s.title} onChange={onChange} placeholder='title' onClick={(e)=>{setd(true)}}
        ></input>
       {d&& <textarea
        name="postContent"
        placeholder="I really enjoyed biking yesterday!"
        rows={4}
        cols={40}
        onBlur={(e)=>{setd(false)}}
        onChange={change}
      />}<br></br>
        <button onClick={effect}>click</button>
      
      <br></br>
      
      Pinned
      
      <div className='grid'>
        {notes.filter(v => v.pinned).map((v: Inotes) => {
          return (
            <div key={v.id} className='grid-item'>
              {v.title}
              <div>{v.content}</div>
            </div>
          );
        })}
      </div>
      <hr></hr>
      Not Pinned
      <div className='grid'>
        {notes.filter(v => !v.pinned).map((v: Inotes) => {
          return (
            <div key={v.id} className='grid-item' >
              {v.title}
              <button style={{float:"right"}} onClick={(e) => {e.preventDefault();pinNote(v.id, v.pinned)}}>Pin here</button>
              <div>{v.content}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
