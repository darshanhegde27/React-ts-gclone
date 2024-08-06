import { createSlice, configureStore, Action, PayloadAction } from '@reduxjs/toolkit'

export interface Inotes{
    id:string,
    title:string|undefined,
    content:string
    pinned:boolean
}
const s:Inotes[]=[]
const  noteSlice = createSlice({
  name: 'counter',
  initialState:s,
  reducers: {
    savenote: (state,action:PayloadAction<Inotes>) => {
      state.push(action.payload)
    },
    editnote: (state,action:PayloadAction<Inotes>) => {
        const { id, content } = action.payload;
      const noteToEdit = state.find(note => note.id === id);
      if (noteToEdit) {
        noteToEdit.content = content;
      }
      },
  }
})

export const { savenote,editnote} = noteSlice.actions
const notesReducer=noteSlice.reducer
export default notesReducer