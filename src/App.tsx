import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { Inotes, editnote, savenote } from './store/Slices/NotesSlice';
import { MouseEventHandler, useEffect, useState } from 'react';

function App() {
  const dispatch = useDispatch();
  const [s, set] = useState<Inotes>({
    id: "!", // Ensure this id is unique for new notes
    title: "s",
    content: "3",
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

  const pinNote = (id: string, pinned: boolean) => {
    dispatch(editnote({ ...s, id, pinned: true }));
  };


  return (
    <>
      <center>
        <input value={s.title} onChange={onChange} placeholder='title'></input>
        <button onClick={effect}>click</button>
      </center>
      <br></br>
      Pinned
      <div className='grid'>
        {notes.filter(v => v.pinned).map((v: Inotes) => {
          return (
            <div key={v.id} className='grid-item'>
              {v.title}
            </div>
          );
        })}
      </div>
      Not Pinned
      <div className='grid'>
        {notes.filter(v => !v.pinned).map((v: Inotes) => {
          return (
            <div key={v.id} className='grid-item' onClick={(e) => {e.preventDefault();pinNote(v.id, v.pinned)}}>
              {v.title}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
