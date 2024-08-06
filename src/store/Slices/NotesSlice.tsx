import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Inotes {
    id: string;
    title?: string;
    content: string;
    pinned: boolean;
    imageUrl?: string;
    color?: string;
}

const initialState: Inotes[] = [];

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    savenote: (state, action: PayloadAction<Inotes>) => {
      state.push(action.payload);
    },
    editnote: (state, action: PayloadAction<Inotes>) => {
      const { id, title, content, pinned } = action.payload;
      const noteToEdit = state.find(note => note.id === id);
      if (noteToEdit) {
        if (title !== undefined) noteToEdit.title = title;
        if (content !== undefined) noteToEdit.content = content;
        noteToEdit.pinned = pinned;
      }
    },
    deletenote: (state, action: PayloadAction<string>) => {
      return state.filter(note => note.id !== action.payload);
    },
  },
});

export const { savenote, editnote, deletenote } = noteSlice.actions;
export default noteSlice.reducer;
