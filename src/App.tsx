import { useDispatch, useSelector } from 'react-redux';
import './App.css';

import { Inotes, deletenote, editnote, savenote } from './store/Slices/NotesSlice';
import React, { useState } from 'react';
function App() {
  const dispatch = useDispatch();
  const [note, setNote] = useState<Inotes>({
    id: "!",
    title: "",
    content: "",
    pinned: false,
    imageUrl: "",
    color: "#ffffff" 
  });
  const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>(null);
  const notes: Inotes[] = useSelector((state: any) => state.notes);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setNote({
          ...note,
          imageUrl: reader.result as string 
        });
      };
      
      reader.readAsDataURL(file); 
    }
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNote({
      ...note,
      [name]: value
    });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote({
      ...note,
      color: e.target.value
    });
  };

  const saveNote = () => {
    dispatch(savenote(note));
    setNote({
      id: Date.now().toString(),
      title: "",
      content: "",
      pinned: false,
      imageUrl: "",
      color: "#ffffff" 
    });
    setSelectedImage(null); 
  };

  const pinNote = (id: string) => {
    dispatch(editnote({ ...note, id, pinned: true }));
  };

  const deleteNote = (id: string) => {
    dispatch(deletenote(id));
  };

  return (
    <div style={{ position: 'relative', left: 50, justifyContent: 'center' }}>
      <input 
        name="title"
        value={note.title}
        onChange={handleNoteChange}
        placeholder='Title'
      />
      <textarea
        name="content"
        placeholder="I really liked assignment yesterday!"
        rows={4}
        cols={40}
        value={note.content}
        onChange={handleNoteChange}
      />
      <br />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <br />
      {selectedImage && <img src={selectedImage as string} alt="Preview" style={{ width: '100px', height: '100px' }} />}
      <br />
      <input 
        type="color" 
        style={{
          width: '50px',
          height: '50px',
          backgroundColor: note.color,
          border: '1px solid #000',
          borderRadius: '5px',
          marginTop: '10px'
        }}
        value={note.color}
        onChange={handleColorChange}
      />
      
      <br />
      <button onClick={saveNote}>Save Note</button>
      <br />
      Pinned
      <div className='grid'>
        {notes.filter(v => v.pinned).map((v: Inotes) => (
          <div 
            key={v.id} 
            className='grid-item'
            style={{ backgroundColor: v.color }}
          >
            {v.title}
            <hr />
            <div>{v.content}</div>
            {v.imageUrl && <img src={v.imageUrl} alt="Note" style={{ width: '100px', height: '100px' }} />}
            <button style={{ float: "right" }} onClick={() => deleteNote(v.id)}>Delete</button>
          </div>
        ))}
      </div>
      <hr />
      Others
      <div className='grid'>
        {notes.filter(v => !v.pinned).map((v: Inotes) => (
          <div 
            key={v.id} 
            className='grid-item'
            style={{ backgroundColor: v.color }}
            
          >
            {v.title}
            <hr />
            <div>{v.content}</div>
            {v.imageUrl && <img src={v.imageUrl} alt="Note" style={{ width: '100px', height: '100px' }} />}
            <button style={{ float: "right" }} onClick={() => pinNote(v.id)}>Pin</button>
            <button style={{ float: "right" }} onClick={() => deleteNote(v.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App