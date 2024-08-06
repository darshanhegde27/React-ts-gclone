import { configureStore } from '@reduxjs/toolkit'
import notesReducer from './Slices/NotesSlice'
// ...

export const store = configureStore({
  reducer: {
    notes:notesReducer
  }
})